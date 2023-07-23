package project.server.global.exception.handler;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;
import project.server.global.exception.response.ErrorResponse;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    public ResponseEntity handleExpiredTokenException(ExpiredJwtException e) {
        ExceptionCode ec = ExceptionCode.TOKEN_EXPIRED;
        final ErrorResponse response = ErrorResponse.of(ec);
        return new ResponseEntity<>(response, HttpStatus.valueOf(ec.getStatus()));
    }
}
