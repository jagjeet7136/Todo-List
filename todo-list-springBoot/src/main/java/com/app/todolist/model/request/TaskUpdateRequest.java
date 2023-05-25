package com.app.todolist.model.request;

import lombok.Data;
import javax.validation.constraints.NotNull;

@Data
public class TaskUpdateRequest {

    @NotNull
    private Long id;
    private String taskTitle;
    private String expiryDate;
    private String notes;
    private String reminder;
}
