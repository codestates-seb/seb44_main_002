package project.server.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    USER_NOT_FOUNT(404, "유저가 없어용"),
    EMAIL_EXISTS(409, "이미 가입된 이메일이에용"),
    COCKTAIL_NOT_FOUND(404, "칵테일이 없어용"),
    COMMENT_NOT_FOUND(404, "해당 댓글 없음"),
    REPLY_NOT_FOUND(404, "해당 대댓글 없음"),
    INVALID_RATE_VALUE(500, "유효하지 않은 값이에용"),
    UNAUTHORIZED_USER(403, "권한이 없어용"),
    NOT_SIGN_IN(401, "로그인부터 하세용"),
    USER_INPUT_ERROR(401, "잘못된 요청입니다");

    private final int status;

    private final String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
