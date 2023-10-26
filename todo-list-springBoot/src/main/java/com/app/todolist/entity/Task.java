package com.app.todolist.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String taskTitle;

    @ManyToOne(fetch = FetchType.LAZY)  //FK ensures that every task is associated with a valid user
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;   //In JPA we use class name instead of column name

    private LocalDate expiryDate;

    private String notes;

    private LocalDateTime reminder;

    @CreationTimestamp
    private LocalDateTime createdOn;

    @UpdateTimestamp
    private LocalDateTime updatedOn;

}
