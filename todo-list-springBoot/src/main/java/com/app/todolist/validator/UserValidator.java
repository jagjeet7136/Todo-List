package com.app.todolist.validator;

import com.app.todolist.exception.PasswordsEmptyException;
import com.app.todolist.model.request.UserCreateRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    private static final Logger logger = LoggerFactory.getLogger(UserValidator.class);

    @Override
    public boolean supports(Class<?> clazz) {
        return UserCreateRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserCreateRequest user = (UserCreateRequest) target;
        if(!StringUtils.hasText(user.getPassword()) || !StringUtils.hasText(user.getConfirmPassword())) {
            logger.error("Passwords do not match");
            throw new PasswordsEmptyException("Password and confirm password should not be empty");
        }
        if(user.getPassword().length()<6) {
            errors.rejectValue("password",  "Length",
                    "Password must be at least 6 characters");
        }
        if(!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword",  "Match",
                    "Password must match");
        }
    }
}