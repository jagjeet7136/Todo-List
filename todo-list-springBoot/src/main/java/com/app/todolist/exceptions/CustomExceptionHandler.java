package com.app.todolist.exceptions;

import com.app.todolist.model.dto.ApiErrorDTO;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class CustomExceptionHandler {

//    @Override
//    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
//                                                                  HttpHeaders headers, HttpStatus status,
//                                                                  WebRequest request) {
//
//        List<String> errors = new ArrayList<String>();
//        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
//            errors.add(error.getDefaultMessage());
//        }
//        for (ObjectError error : ex.getBindingResult().getGlobalErrors()) {
//            errors.add(error.getDefaultMessage());
//        }
//        ApiErrorDTO apiError = new ApiErrorDTO(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors,
//                LocalDateTime.now());
//        return handleExceptionInternal(ex, apiError, headers, apiError.getStatus(), request);
//    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorDTO> handleValidationExceptions(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        List<String> errorDetails = new ArrayList<>();
        for (FieldError fieldError : fieldErrors) {
            errorDetails.add(fieldError.getDefaultMessage());
        }
        ApiErrorDTO errorResponse = handleAllExceptions(ex);
        errorResponse.setStatus(HttpStatus.BAD_REQUEST);
        errorResponse.setErrors(errorDetails);
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
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

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ApiErrorDTO> handleForbiddenException(HttpServletRequest req, ForbiddenException ex) {
        ApiErrorDTO apiErrorDTO = handleAllExceptions(ex);
        apiErrorDTO.setStatus(HttpStatus.FORBIDDEN);
        return new ResponseEntity<>(apiErrorDTO, HttpStatus.FORBIDDEN);
    }

    //This is needed when we directly work with javax.validation
//    @ExceptionHandler({ConstraintViolationException.class})
//    public ResponseEntity<Object> handleConstraintViolation(
//            ConstraintViolationException ex, WebRequest request) {
//        List<String> errors = new ArrayList<>();
//        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
//            errors.add(violation.getPropertyPath() + ": " + violation.getMessage());
//        }
//        ApiErrorDTO apiError =
//                new ApiErrorDTO(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), errors, LocalDateTime.now());
//        return new ResponseEntity<Object>(
//                apiError, new HttpHeaders(), apiError.getStatus());
//    }

    @ExceptionHandler(DateTimeParseException.class)
    public ResponseEntity<ApiErrorDTO> handleDateTimeParseException(HttpServletRequest req, NotFoundException ex) {
        ApiErrorDTO apiErrorDTO = handleAllExceptions(ex);
        apiErrorDTO.setStatus(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(apiErrorDTO, HttpStatus.NOT_FOUND);
    }

//    @ExceptionHandler(FileSizeLimitExceededException.class)
//    public ResponseEntity<ApiErrorDTO> handleBindException(FileSizeLimitExceededException bindException){
////        BindingResult bindingResult = bindException.getBindingResult();
////        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
////        List<String> errorDetails = new ArrayList<>();
////        for (FieldError fieldError : fieldErrors) {
////            errorDetails.add(fieldError.getDefaultMessage());
////        }
//        ApiErrorDTO errorResponse = handleAllExceptions(bindException);
//        errorResponse.setMessage(bindException.getLocalizedMessage());
//        errorResponse.setStatus(HttpStatus.BAD_REQUEST);
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//    }

    private static ApiErrorDTO handleAllExceptions(Exception ex) {
        ApiErrorDTO apiErrorDTO = new ApiErrorDTO();
        apiErrorDTO.setMessage(ex.getMessage());
        apiErrorDTO.setErrors(new ArrayList<>());
        apiErrorDTO.setTime(LocalDateTime.now());
        return apiErrorDTO;
    }

}
