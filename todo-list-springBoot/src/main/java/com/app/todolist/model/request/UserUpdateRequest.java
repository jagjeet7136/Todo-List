package com.app.todolist.model.request;

import lombok.Data;

@Data
public class UserUpdateRequest {

    private String oldPassword;
    private String newPassword;
    private String newConfirmPassword;

}
