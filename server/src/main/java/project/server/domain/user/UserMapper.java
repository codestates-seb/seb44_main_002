package project.server.domain.user;


import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto.Response userToUserResponseDto(User requestBody);

    User userPostDtoToUser(UserDto.post requestBody);

}
