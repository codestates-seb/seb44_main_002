package project.server.exception.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import project.server.exception.ExceptionCode;

@Getter
public class ErrorResponse {
    private final int status;
    private final String message;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }


}
