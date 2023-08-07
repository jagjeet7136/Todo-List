package com.app.todolist.model.request;

import com.app.todolist.annotations.FileSize;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageUploadRequest {

    @FileSize(max = 1, message = "File limit exceeded")
    private MultipartFile file;
}
