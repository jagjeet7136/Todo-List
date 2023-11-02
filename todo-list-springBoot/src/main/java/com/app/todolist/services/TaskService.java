package com.app.todolist.services;

import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
import com.app.todolist.exceptions.NotFoundException;
import com.app.todolist.exceptions.ValidationException;
import com.app.todolist.model.request.TaskCreateRequest;
import com.app.todolist.model.request.TaskUpdateRequest;
import com.app.todolist.repository.TaskRepository;
import com.app.todolist.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");


    public Task createTask(TaskCreateRequest taskCreateRequest, User user) throws ValidationException {
        Task newTask = new Task();
        newTask.setTaskTitle(taskCreateRequest.getTaskTitle());
        newTask.setUser(user);
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
        user.setTotalTasksCreated(user.getTotalTasksCreated()!=null ? user.getTotalTasksCreated()+1 : 1);
        userRepository.save(user);
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
        user.setDeletedTasks(user.getDeletedTasks()!=null ? user.getDeletedTasks()+1 : 1);
        return task;
    }

    public void completeTask(Long taskId, User user) throws NotFoundException, ValidationException {
        Task task = taskRepository.findByIdAndUser(taskId, user);
        if(task==null) {
            throw new NotFoundException("No task found with id : " + taskId);
        }
        else {
            user.setCompletedTasks(user.getCompletedTasks()!=null ? user.getCompletedTasks()+1 : 1);
        }
        try {
            taskRepository.delete(task);
        }
        catch (Exception ex) {
            throw new ValidationException("Some error occur while deleting task : " + taskId);
        }
        userRepository.save(user);
    }
}
