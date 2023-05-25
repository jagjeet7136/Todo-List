package com.app.todolist.model.request;

import lombok.Data;
import javax.validation.constraints.NotBlank;

@Data
public class UserUpdateRequest {

    @NotBlank
    private String userFullName;

    @NotBlank
    private String username;
}
