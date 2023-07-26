package project.server.global.validator;

import lombok.extern.slf4j.Slf4j;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Slf4j
public class PasswordValidator implements ConstraintValidator<Password, String> {
    private static final String PASSWORD_PATTERN = "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$";
    private static final int PASSWORD_LENGTH = 8;
    private static final Pattern PASSWORD_NUMBER = Pattern.compile(".*[0-9].*");
    private static final Pattern PASSWORD_SPECIAL_CHAR = Pattern.compile(".*[!@#$%^&*].*");
    private static final Pattern PASSWORD_CHARACTER = Pattern.compile(".*[a-zA-Z].*");

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false;
        }

        boolean isValid = password.matches(PASSWORD_PATTERN);

        if (!isValid) {
            log.info("# PasswordValidator : 비밀번호 유효성 검사 실패");
            if (password.length() < PASSWORD_LENGTH) {
                log.info("비밀번호는 8글자 이상이어야 합니다.");
            }
            if (!PASSWORD_NUMBER.matcher(password).matches()) {
                log.info("비밀번호는 숫자를 포함해야 합니다.");
            }
            if (!PASSWORD_SPECIAL_CHAR.matcher(password).matches()) {
                log.info("비밀번호는 특수문자를 포함해야 합니다.");
            }
            if (!PASSWORD_CHARACTER.matcher(password).matches()) {
                log.info("비밀번호는 문자를 포함해야 합니다.");
            }
        }
        return isValid;
    }

    @Override
    public void initialize(Password constraintAnnotation) {
    }
}
