package com.app.todolist.service;

import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
import com.app.todolist.exception.NotFoundException;
import com.app.todolist.exception.ValidationException;
import com.app.todolist.model.request.UserCreateRequest;
import com.app.todolist.model.request.UserUpdateRequest;
import com.app.todolist.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
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

    public User createUser(UserCreateRequest userCreateRequest) throws ValidationException, IOException {
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

//    public User getUser(String username) throws NotFoundException {
//        User user = userRepository.findByUsername(username);
//        if(user==null) {
//            throw new NotFoundException("User not found with username: " + username);
//        }
//        return user;
//    }

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

    public String saveProfileImage(MultipartFile file) throws IOException {
        String path = "D:\\Full-Stack-Projects-Data\\amazon-clone\\users-images";
        Files.copy(file.getInputStream(), Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
        return path;
    }

}