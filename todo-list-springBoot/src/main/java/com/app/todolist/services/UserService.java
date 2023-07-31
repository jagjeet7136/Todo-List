package com.app.todolist.services;

import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
import com.app.todolist.exceptions.NotFoundException;
import com.app.todolist.exceptions.ValidationException;
import com.app.todolist.exceptions.ForbiddenException;
import com.app.todolist.model.request.UserCreateRequest;
import com.app.todolist.model.request.UserUpdateRequest;
import com.app.todolist.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public User createUser(UserCreateRequest userCreateRequest) throws ValidationException {
        if(!userCreateRequest.getPassword().trim().equals(userCreateRequest.getConfirmPassword().trim())) {
            throw new ValidationException("passwords do not match");
        }
        usernameAlreadyExists(userCreateRequest.getEmail());
        User newUser = new User();
        newUser.setUserFullName(userCreateRequest.getUserFullName().trim());
        newUser.setUsername(userCreateRequest.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(userCreateRequest.getPassword()));
        newUser.setTasks(new ArrayList<>());
        return userRepository.save(newUser);
    }

    public User getUser(String username, String savedUser) throws NotFoundException {
        if(!username.equals(savedUser)) {
            throw new ForbiddenException("Cannot get the user : " + username);
        }
        User user = userRepository.findByUsername(username);
        if(user==null) {
            throw new NotFoundException("User not found with username : " + username);
        }
        return user;
    }

    public User updateUser(UserUpdateRequest userUpdateRequest, User user) throws NotFoundException {
        user.setUserFullName(userUpdateRequest.getUserFullName());
        user = userRepository.save(user);
        return user;
    }

    public void usernameAlreadyExists(String username) throws ValidationException {
        if (username!=null && !username.isBlank() && userRepository.existsByUsername(username)) {
            log.error("Username already exists {}", username);
            throw new ValidationException(username.concat(" already exist"));
        }
    }

//    public User deleteUser(String username) throws NotFoundException {
//        User user = userRepository.findByUsername(username);
//        if(user==null) {
//            throw new NotFoundException(username + " do not exists");
//        }
//        userRepository.delete(user);
//        return user;
//    }

    public List<Task> getUserTasks(User user) throws NotFoundException {
        List<Task> tasks = user.getTasks();
        if(tasks==null) {
            return new ArrayList<>();
        }
        return tasks;
    }

    public User getLoggedInUser(Principal principal) {
        return (User) ((Authentication) principal).getPrincipal();
    }

}