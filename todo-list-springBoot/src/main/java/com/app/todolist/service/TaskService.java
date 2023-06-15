package com.app.todolist.service;

import com.app.todolist.entity.Task;
import com.app.todolist.exception.NotFoundException;
import com.app.todolist.exception.ValidationException;
import com.app.todolist.model.request.TaskCreateRequest;
import com.app.todolist.model.request.TaskUpdateRequest;
import com.app.todolist.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Slf4j
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");


    public Task createTask(TaskCreateRequest taskCreateRequest) throws NotFoundException, ValidationException {
        Task newTask = new Task();
        newTask.setTaskTitle(taskCreateRequest.getTaskTitle());
//        newTask.setUser(userService.getUser(taskCreateRequest.getUsername()));
        try {
            if(taskCreateRequest.getExpiryDate()!=null && !taskCreateRequest.getExpiryDate().isBlank()) {
                newTask.setExpiryDate(LocalDate.parse(taskCreateRequest.getExpiryDate(), dateFormatter));
            }
        }
        catch (Exception ex) {
            throw new ValidationException("Expiry date format Not Valid : " + taskCreateRequest.getExpiryDate());
        }
        try {
            if(taskCreateRequest.getReminder()!=null && !taskCreateRequest.getReminder().isBlank()) {
                newTask.setReminder(LocalDateTime.parse(taskCreateRequest.getReminder(), dateTimeFormatter));
            }
        }
        catch (Exception ex) {
            throw new ValidationException("Reminder date format Not Valid : " + taskCreateRequest.getReminder());
        }
        newTask.setNotes(taskCreateRequest.getNotes());
        return taskRepository.save(newTask);
    }

    public Task updateTask(TaskUpdateRequest taskUpdateRequest) throws NotFoundException, ValidationException {
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElse(null);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskUpdateRequest.getId());
        }
        log.info("Task retrieved with id : {} is : {}", taskUpdateRequest.getId(), task);
        if(taskUpdateRequest.getTaskTitle()!=null && !taskUpdateRequest.getTaskTitle().isBlank()) {
            task.setTaskTitle(taskUpdateRequest.getTaskTitle());
        }
        if(taskUpdateRequest.getNotes()!=null && !taskUpdateRequest.getNotes().isBlank()) {
            task.setNotes(taskUpdateRequest.getNotes());
        }
        try {
            if(taskUpdateRequest.getExpiryDate()!=null && !taskUpdateRequest.getExpiryDate().isBlank()) {
                task.setExpiryDate(LocalDate.parse(taskUpdateRequest.getExpiryDate(), dateFormatter));
            }
        }
        catch (Exception ex) {
            throw new ValidationException("Expiry date format Not Valid : " + taskUpdateRequest.getExpiryDate());
        }
        try {
            if(taskUpdateRequest.getReminder()!=null && !taskUpdateRequest.getReminder().isBlank()) {
                task.setReminder(LocalDateTime.parse(taskUpdateRequest.getReminder(), dateTimeFormatter));
            }
        }
        catch (Exception ex) {
            throw new ValidationException("Reminder date format Not Valid : " + taskUpdateRequest.getReminder());
        }
        task = taskRepository.save(task);
        return task;
    }

    public Task getTask(Long taskId) throws NotFoundException {
        Task task = taskRepository.findById(taskId).orElse(null);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskId);
        }
        return task;
    }

    public Task deleteTask(Long taskId) throws NotFoundException {
        Task task = taskRepository.findById(taskId).orElse(null);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskId);
        }
        taskRepository.delete(task);
        return task;
    }

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks;
    }

}
