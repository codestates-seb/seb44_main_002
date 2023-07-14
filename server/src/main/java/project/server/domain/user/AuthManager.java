package project.server.domain.user;

import org.springframework.security.core.Authentication;
import project.server.exception.BusinessLogicException;
import project.server.exception.ExceptionCode;

public class AuthManager {

    public static String getEmailFromAuthentication(Authentication authentication, boolean permitUnsignedUser) {
        if (authentication == null && permitUnsignedUser) {
            return null;
        }
        if (authentication == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_SIGN_IN);
        }
        return (String) authentication.getPrincipal();
    }
}
