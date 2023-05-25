package com.app.todolist.controller;

import com.app.todolist.entity.Task;
import com.app.todolist.exception.NotFoundException;
import com.app.todolist.exception.ValidationException;
import com.app.todolist.model.request.TaskCreateRequest;
import com.app.todolist.model.request.TaskUpdateRequest;
import com.app.todolist.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Slf4j
@RestController
@Validated
@RequestMapping("task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskCreateRequest taskCreateRequest) throws
            NotFoundException, ValidationException {
        log.info("Request Received for creating a task {}", taskCreateRequest);
        Task task = taskService.createTask(taskCreateRequest);
        log.info("Task created {}", task);
        return ResponseEntity.ok(task);
    }

    @PatchMapping
    public ResponseEntity<Task> updateTask(@Valid @RequestBody TaskUpdateRequest taskUpdateRequest) throws
            NotFoundException, ValidationException {
        log.info("Request Received for updating a task {}", taskUpdateRequest);
        Task task = taskService.updateTask(taskUpdateRequest);
        log.info("Task updated {}", task);
        return ResponseEntity.ok(task);
    }

    @GetMapping
    public ResponseEntity<Task> getTask(@NotNull @RequestParam Long taskId) throws NotFoundException {
        log.info("Request received for getting a task from taskId : {}", taskId);
        Task task = taskService.getTask(taskId);
        log.info("Task fetched successfully : {}", task);
        return new ResponseEntity<>(task, HttpStatus.FOUND);
    }

    @DeleteMapping
    public ResponseEntity<Task> deleteTask(@NotNull @RequestParam Long taskId) throws NotFoundException {
        log.info("Request received for deleting a task with taskId : {}", taskId);
        Task task = taskService.deleteTask(taskId);
        log.info("Task deleted successfully : {}", task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
}
