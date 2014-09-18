package com.withub.service.ea;

import com.withub.model.ea.Task;
import com.withub.model.ea.TaskRemind;

import java.util.List;

public interface TaskService {

    Task getTaskById(String id);

    List<Task> listByUserId(String userId);

    void updateTask(Task task);

    void createTask(Task task);

    void deleteTask(String taskId);

    void deleteTask(String[] taskIds);

    List<TaskRemind> listTaskRemind(String userId);

    void updateTaskRemind(String taskRemindId);
}
