package com.app.todolist.exception;

public class PasswordsEmptyException extends RuntimeException{
    public PasswordsEmptyException(String message) {
        super(message);
    }
}
