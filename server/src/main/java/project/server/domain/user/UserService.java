package project.server.domain.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.server.auth.utils.CustomAuthorityUtils;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public UserDto.Response createUser(UserDto.post requestBody) {
        verifyExistsEmail(requestBody.getEmail());
        User user = requestBody.postToEntity();

        String encodedPassword = passwordEncoder.encode(requestBody.getPassword());
        user.setPassword(encodedPassword);

        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        return savedUser.entityToResponse();
    }

    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    public User findUser(long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUNT));
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUNT));
    }

    public User updateUser(UserDto.Patch dto, long userId) {
        User user = findUser(userId);
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public void deleteUser(long userId) {
        User user = findUser(userId);
        userRepository.delete(user);
    }

    public User findUserByAuthentication(Authentication authentication) {
        if (authentication == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_SIGN_IN);
        }
        String email = (String) authentication.getPrincipal();
        return findUserByEmail(email);
    }
}
