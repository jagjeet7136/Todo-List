package com.app.todolist.controller;

import com.app.todolist.configuration.JwtTokenProvider;
import com.app.todolist.constants.SecurityConstants;
import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
import com.app.todolist.exception.NotFoundException;
import com.app.todolist.exception.ValidationException;
import com.app.todolist.model.request.LoginRequest;
import com.app.todolist.model.request.UserCreateRequest;
import com.app.todolist.model.request.UserUpdateRequest;
import com.app.todolist.model.response.JWTLoginSuccessResponse;
import com.app.todolist.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("user")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserCreateRequest userCreateRequest) throws
            ValidationException {
        log.info("Request received for new user creation {}", userCreateRequest);
        User user = userService.createUser(userCreateRequest);
        log.info("User created successfully {}", user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<User> getUser(@NotBlank @RequestParam String username) throws NotFoundException {
        log.info("Request received for fetching a user {}", username);
        User user = userService.getUser(username);
        log.info("User fetched successfully {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<User> updateUser(@Valid @RequestBody UserUpdateRequest userUpdateRequest) throws
            NotFoundException {
        log.info("Request received for user update {}", userUpdateRequest);
        User user = userService.updateUser(userUpdateRequest);
        log.info("User updated successfully {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteUser(@NotBlank @RequestParam String username) throws NotFoundException {
        log.info("Request received for deleting a user {}", username);
        User user = userService.deleteUser(username);
        log.info("User deleted successfully {}", user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("{username}")
    ResponseEntity<List<Task>> getUserTasks(@NotBlank @PathVariable String username) throws NotFoundException {
        log.info("Request received for fetching user tasks : {}", username);
        List<Task> tasksList = userService.getUserTasks(username);
        log.info("User tasks fetched successfully {}", tasksList);
        return new ResponseEntity<>(tasksList, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                              BindingResult bindingResult) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = SecurityConstants.TOKEN_PREFIX + jwtTokenProvider.helperGenerateToken(authentication);
        log.info("Token generated: {}", token);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, token));
    }

}
