package project.server.domain.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.server.auth.utils.CustomAuthorityUtils;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    public static final boolean DELETED_USER = false;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public UserDto.Response createUser(UserDto.Post requestBody) {
        verifyExistsEmail(requestBody.getEmail());
        User user = requestBody.postToEntity();

        String encodedPassword = passwordEncoder.encode(requestBody.getPassword());
        user.setPassword(encodedPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        return UserSerializer.entityToUnsignedResponse(savedUser);
    }

    public UserDto.Response updateUser(UserDto.Patch dto, long userId, String email) {
        User requestUser = findUserByEmail(email);
        if(!requestUser.hasAuthority(userId)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        User user = findUserByUserId(userId);
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);
        return UserSerializer.entityToSignedResponse(user, requestUser);
    }

    public void deleteUser(long userId, String email) {
        User requestUser = findUserByEmail(email);
        if(!requestUser.hasAuthority(userId)){
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
        }
        User user = findUserByUserId(userId);
        user.setActiveUser(DELETED_USER);
        user.setEmail("");
    }

    public UserDto.Response getUser(String email, long userId) {
        User user = findUserByUserId(userId);
        if(!user.isActiveUser()){
            throw new BusinessLogicException(ExceptionCode.DELETED_USER);
        }
        if(unsigned(email)){
            return UserSerializer.entityToUnsignedResponse(user);
        }
        User readUser = findUserByEmail(email);
        return UserSerializer.entityToSignedResponse(user, readUser);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUNT));
    }

    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    public User findUserByUserId(long userId){
        return userRepository.findById(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUNT));
    }

    private boolean unsigned(String email) {
        return email == null;
    }
}
