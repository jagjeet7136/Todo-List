package com.app.todolist.repository;

import com.app.todolist.entity.Task;
import com.app.todolist.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    Task findByIdAndUser(Long id, User user);

    List<Task> findAllByUser(User user);
}
