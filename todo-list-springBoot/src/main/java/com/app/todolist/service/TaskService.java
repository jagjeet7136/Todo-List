package com.app.todolist.service;

import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
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


    public Task createTask(TaskCreateRequest taskCreateRequest, String username) throws NotFoundException,
            ValidationException {
        Task newTask = new Task();
        newTask.setTaskTitle(taskCreateRequest.getTaskTitle());
        newTask.setUser(userService.getUser(username));
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

    public Task updateTask(TaskUpdateRequest taskUpdateRequest, User user) throws NotFoundException,
            ValidationException {
        Task task = taskRepository.findByIdAndUser(taskUpdateRequest.getId(), user);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskUpdateRequest.getId());
        }
        log.info("Task retrieved with id : {} is : {}", taskUpdateRequest.getId(), task);
        if((taskUpdateRequest.getTaskTitle()==null || taskUpdateRequest.getTaskTitle().trim().isEmpty()) &&
                (taskUpdateRequest.getNotes()==null || taskUpdateRequest.getNotes().trim().isEmpty()) &&
                (taskUpdateRequest.getExpiryDate()==null || taskUpdateRequest.getExpiryDate().trim().isEmpty()) &&
                (taskUpdateRequest.getReminder()==null || taskUpdateRequest.getReminder().trim().isEmpty())) {
            throw new ValidationException("Nothing is updated : " + taskUpdateRequest);
        }
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

    public Task getTask(Long taskId, User loggedInUser) throws NotFoundException {
        Task task = taskRepository.findByIdAndUser(taskId, loggedInUser);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskId + " with username : " +
                    loggedInUser.getUsername());
        }
        return task;
    }

    public Task deleteTask(String taskId, User user) throws NotFoundException, ValidationException {
        Long convertedTaskId = null;
        try {
            convertedTaskId = Long.valueOf(taskId);
        }
        catch(Exception ex) {
            throw new ValidationException("Invalid taskId : " + taskId);
        }
        Task task = taskRepository.findByIdAndUser(convertedTaskId, user);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskId);
        }
        taskRepository.delete(task);
        return task;
    }

    public List<Task> getAllTasks(User user) {
        return taskRepository.findAllByUser(user);
    }

}
