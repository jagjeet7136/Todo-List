package com.app.todolist.model.request;

import lombok.Data;
import javax.validation.constraints.*;

@Data
public class UserCreateRequest {

    @NotBlank(message = "The full name is required.")
    @Size(min = 2, max = 100, message = "The length of full name must be between 2 and 100 characters.")
    private String userFullName;

    @NotBlank(message = "The email address is required.")
    @Email(message = "The email address is invalid.", flags = { Pattern.Flag.CASE_INSENSITIVE })
    private String email;

    @NotBlank(message = "The password is required")
    @Size(min = 6, max = 100, message = "The password length must be between 6 and 100 characters.")
    private String password;

    @NotBlank(message = "The confirm password is required")
    @Size(min = 6, max = 100, message = "The password length must be between 6 and 100 characters.")
    private String confirmPassword;
}
