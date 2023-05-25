package com.app.todolist.model.request;

import lombok.Data;
import javax.validation.constraints.NotBlank;

@Data
public class TaskCreateRequest {

    @NotBlank
    private String taskTitle;
    @NotBlank
    private String username;
    private String notes;
    private String expiryDate;
    private String reminder;

}