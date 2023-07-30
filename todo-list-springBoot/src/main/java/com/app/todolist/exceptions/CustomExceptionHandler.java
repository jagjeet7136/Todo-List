package com.app.todolist.exception;

import com.app.todolist.model.dto.ApiErrorDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatus status,
                                                                  WebRequest request) {

        List<String> errors = new ArrayList<String>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getDefaultMessage());
        }
        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
            errors.add(error.getDefaultMessage());
        }
        ApiErrorDTO apiError = new ApiErrorDTO(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors,
                LocalDateTime.now());
        return handleExceptionInternal(ex, apiError, headers, apiError.getStatus(), request);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiErrorDTO> handleValidationException(HttpServletRequest req, ValidationException ex) {
        ApiErrorDTO apiErrorDTO = handleAllExceptions(ex);
        apiErrorDTO.setStatus(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiErrorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiErrorDTO> handleNotFoundException(HttpServletRequest req, NotFoundException ex) {
        ApiErrorDTO apiErrorDTO = handleAllExceptions(ex);
        apiErrorDTO.setStatus(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiErrorDTO, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintViolation(
            ConstraintViolationException ex, WebRequest request) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
        }
        ApiErrorDTO apiError =
                new ApiErrorDTO(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors, LocalDateTime.now());
        return new ResponseEntity<Object>(
                apiError, new HttpHeaders(), apiError.getStatus());
    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<ApiErrorDTO> handleDateTimeParseException(HttpServletRequest req, NotFoundException ex) {
        ApiErrorDTO apiErrorDTO = handleAllExceptions(ex);
        apiErrorDTO.setStatus(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiErrorDTO, HttpStatus.NOT_FOUND);
    }

    private static ApiErrorDTO handleAllExceptions(Exception ex) {
        ApiErrorDTO apiErrorDTO = new ApiErrorDTO();
        apiErrorDTO.setMessage(ex.getMessage());
        apiErrorDTO.setErrors(new ArrayList<>());
        apiErrorDTO.setTime(LocalDateTime.now());
        return apiErrorDTO;
    }

}
