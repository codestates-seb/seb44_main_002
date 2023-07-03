package project.server.domain.user;

import org.springframework.stereotype.Service;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public User createUser(UserDto.post requestBody) {
        verifyExistsEmail(requestBody.getEmail());
        User user = userMapper.userPostDtoToUser(requestBody);

        return userRepository.save(user);
    }

    public void verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);
    }

    public User findUser(long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUNT));
    }

    public User updateUser(UserDto.Patch Dto) {
        User user = findUser(Dto.getUserId());
        user.setPassword(Dto.getPassword());
        return userRepository.save(user);
    }

    public void deleteUser(long userId) {
        User user = findUser(userId);
        userRepository.delete(user);
    }
}
