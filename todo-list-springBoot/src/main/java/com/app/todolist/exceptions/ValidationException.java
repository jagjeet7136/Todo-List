package com.app.todolist.exception;

public class ValidationException extends Exception {
    public ValidationException() {}
    public ValidationException(String message) {
        super(message);
    }
}