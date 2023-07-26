package project.server.global.validator;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Slf4j
public class PasswordValidator implements ConstraintValidator<Password, String> {
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$";

    @Override
    public void initialize(Password constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false;
        }

        boolean isValid = password.matches(PASSWORD_PATTERN);

        if (!isValid) {
            log.info("# PasswordValidator : 비밀번호 유효성 검사 실패");
            if (password.length() < 8) {
                log.info("비밀번호는 8글자 이상이어야 합니다.");
            }
            if (!password.matches(".*[0-9].*")) {
                log.info("비밀번호는 숫자를 포함해야 합니다.");
            }
            if (!password.matches(".*[!@#$%^&*].*")) {
                log.info("비밀번호는 특수문자를 포함해야 합니다.");
            }
            if (!password.matches(".*[a-zA-Z].*")) {
                log.info("비밀번호는 문자를 포함해야 합니다.");
            }
        }
        return isValid;
    }
}
