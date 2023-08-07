package com.app.todolist.annotations;

import com.app.todolist.validator.FileSizeValidator;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.FIELD,ElementType.METHOD,ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FileSizeValidator.class)
@Documented
public @interface FileSize {

    String message() default "File size must be within the allowed limit.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    long max() default 1;
}