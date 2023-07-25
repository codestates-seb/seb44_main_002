package project.server.global.exception.handler;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import project.server.global.exception.BusinessLogicException;
import project.server.global.exception.ExceptionCode;
import project.server.global.exception.response.ErrorResponse;

@RestControllerAdvice
@Slf4j
public class CustomExceptionHandler {

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());
        log.info("# error status : {}, error code : {}", e.getExceptionCode().getStatus(), e.getExceptionCode().getMessage());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    public ResponseEntity handleExpiredTokenException(ExpiredJwtException e) {
        ExceptionCode ec = ExceptionCode.TOKEN_EXPIRED;
        final ErrorResponse response = ErrorResponse.of(ec);
        log.info("# error status : {}, error code : {}", ec.getStatus(), ec.getMessage());
        return new ResponseEntity<>(response, HttpStatus.valueOf(ec.getStatus()));
    }
}
