package project.server.auth.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import project.server.auth.utils.CustomAuthorityUtils;
import project.server.domain.user.entity.User;
import project.server.domain.user.repository.UserRepository;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

import java.util.Collection;
import java.util.Optional;

@Component
@Slf4j
public class DetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;

    public DetailsService(UserRepository userRepository, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        User findUser = user.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUNT));

        return new CustomUserDetails(findUser);
    }

    public final class CustomUserDetails extends User implements UserDetails {
        CustomUserDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setName(user.getName());
            setPassword(user.getPassword());
            setAge(user.getAge());
            setGender(user.getGender());
            setRoles(user.getRoles());
            setActiveUser(user.isActiveUser());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
