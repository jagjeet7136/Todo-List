package com.app.todolist.validator;

import com.app.todolist.annotations.FileSize;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FileSizeValidator implements ConstraintValidator<FileSize, MultipartFile> {

    private static final Integer maxSize=1024*1024;
    private long maxSizeInMB;

    @Override
    public void initialize(FileSize constraintAnnotation) {
        this.maxSizeInMB = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file.isEmpty()) {
            return false;
        }
        return file.getSize() <= maxSize*maxSizeInMB;
    }
}