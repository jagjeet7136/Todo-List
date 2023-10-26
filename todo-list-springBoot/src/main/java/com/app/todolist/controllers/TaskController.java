package com.app.todolist.controllers;

import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
import com.app.todolist.exceptions.NotFoundException;
import com.app.todolist.exceptions.ValidationException;
import com.app.todolist.model.request.TaskCreateRequest;
import com.app.todolist.model.request.TaskUpdateRequest;
import com.app.todolist.services.TaskService;
import com.app.todolist.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;

@Slf4j
@RestController
@Validated
@RequestMapping("task")
@CrossOrigin  //Only for local
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody TaskCreateRequest taskCreateRequest, Principal principal)
            throws NotFoundException, ValidationException {
        log.info("Request Received for creating a task {}", taskCreateRequest);
        User loggedInUser = userService.getLoggedInUser(principal);
        Task task = taskService.createTask(taskCreateRequest, loggedInUser);
        log.info("Task created {}", task);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity<Task> updateTask(@Valid @RequestBody TaskUpdateRequest taskUpdateRequest, Principal principal)
            throws
            NotFoundException, ValidationException {
        log.info("Request Received for updating a task {}", taskUpdateRequest);
        User loggedInUser = userService.getLoggedInUser(principal);
        Task task = taskService.updateTask(taskUpdateRequest, loggedInUser);
        log.info("Task updated {}", task);
        return ResponseEntity.ok(task);
    }

    @GetMapping
    public ResponseEntity<Task> getTask(@NotNull @RequestParam Long taskId, Principal principal) throws
            NotFoundException {
        log.info("Request received for getting a task from taskId : {}", taskId);
        User loggedInUser = userService.getLoggedInUser(principal);
        Task task = taskService.getTask(taskId, loggedInUser);
        log.info("Task fetched successfully : {}", task);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Task> deleteTask(@NotNull @RequestParam String taskId, Principal principal) throws
            NotFoundException, ValidationException {
        log.info("Request received for deleting a task with taskId : {}", taskId);
        User loggedInUser = userService.getLoggedInUser(principal);
        Task task = taskService.deleteTask(taskId, loggedInUser);
        log.info("Task deleted successfully : {}", task);
        return ResponseEntity.ok(task);
    }

    @PatchMapping("/completeTask")
    public void completeTask(@NotNull @RequestParam Long taskId, Principal principal) throws NotFoundException {
        log.info("Request received for completing a task with taskId : {}", taskId);
        User loggedInUser = userService.getLoggedInUser(principal);
        taskService.completeTask(taskId, loggedInUser);
        log.info("Task completed successfully : {} of user : {}", taskId, loggedInUser);
    }
}
