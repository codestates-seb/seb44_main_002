package project.server.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    USER_NOT_FOUNT(404, "유저가 없어용"),
    EMAIL_EXISTS(409, "이미 가입된 이메일이에용");

    private final int status;

    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
