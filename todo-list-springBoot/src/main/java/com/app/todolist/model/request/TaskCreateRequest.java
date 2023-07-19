package com.app.todolist.model.request;

import lombok.Data;
import javax.validation.constraints.NotBlank;

@Data
public class TaskCreateRequest {

    @NotBlank(message = "Task name is required")
    private String taskTitle;
    private String notes;
    private String expiryDate;
    private String reminder;

}