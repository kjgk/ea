package com.withub.service.impl.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.Task;
import com.withub.model.ea.TaskRemind;
import com.withub.model.system.po.User;
import com.withub.service.ea.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;


@Service("taskService")
@Transactional
public class TaskServiceImpl implements TaskService {

    @Autowired
    private EntityDao entityDao;

    public Task getTaskById(String objectId) {

        return entityDao.getObject(Task.class, objectId);
    }

    @Override
    public List<Task> listByUserId(String userId) {

        String jpql = "from " + Task.class.getName()
                + " where creator.objectId = ? order by createTime desc";
        List<Task> list = entityDao.listByJpql(jpql, userId);
        if (CollectionUtil.isNotEmpty(list)) {

            jpql = "from " + TaskRemind.class.getName()
                    + " where user.objectId = ? and task.objectId = ?";
            for (Task task : list) {
                List<TaskRemind> taskRemindList = entityDao.listByJpql(jpql, userId, task.getObjectId());
                if (CollectionUtil.isNotEmpty(taskRemindList)) {
                    task.setRemindStatus(taskRemindList.get(0).getStatus());
                }
            }
        }
        return list;
    }

    public void createTask(Task task) {

        task.setObjectId(StringUtil.getUuid());
        task.setStatus(1);
        task.setCreateTime(DateUtil.getCurrentTime());
        task.setLastUpdateTime(DateUtil.getCurrentTime());
        task.setObjectVersion(1);
        task.setObjectStatus(1);
        entityDao.save(task);

        saveTaskRemind(task);
    }

    public void updateTask(Task task) {

        Task temp = getTaskById(task.getObjectId());
        temp.setTitle(task.getTitle());
        temp.setContent(task.getContent());
        temp.setRepeat(task.getRepeat());
        temp.setScope(task.getScope());
        temp.setStartTime(task.getStartTime());
        entityDao.save(temp);

        saveTaskRemind(temp);
    }

    private void saveTaskRemind(Task task) {

        String jpql = "delete from " + TaskRemind.class.getName() + " where task.objectId = ?";
        entityDao.executeJpql(jpql, task.getObjectId());

        if (task.getScope() == 1) {
            TaskRemind taskRemind = new TaskRemind();
            taskRemind.setObjectId(StringUtil.getUuid());
            taskRemind.setStatus(1);
            taskRemind.setTask(task);
            taskRemind.setUser(task.getCreator());
            entityDao.save(taskRemind);
        }

        if (task.getScope() == 2) {
            jpql = "from " + User.class.getName() + " where 1=1";
            List<User> userList = entityDao.listByJpql(jpql);
            for (User user : userList) {
                TaskRemind taskRemind = new TaskRemind();
                taskRemind.setObjectId(StringUtil.getUuid());
                taskRemind.setStatus(1);
                taskRemind.setTask(task);
                taskRemind.setUser(user);
                entityDao.save(taskRemind);
            }
        }

    }

    public void deleteTask(String objectId) {

        String jpql = "delete from " + TaskRemind.class.getName() + " where task.objectId = ?";
        entityDao.executeJpql(jpql, objectId);
        entityDao.delete(Task.class, objectId);
    }

    public void deleteTask(String[] taskIds) {
        for (String taskId : taskIds) {
            deleteTask(taskId);
        }
    }

    public List<TaskRemind> listTaskRemind(String userId) {

        String jpql = "from " + TaskRemind.class.getName()
                + " where user.objectId = ? and status in (1, 2) and task.startTime <= ? order by task.createTime desc";
        List<TaskRemind> list = entityDao.listByJpql(jpql, userId, new Date());

        if (CollectionUtil.isNotEmpty(list)) {
            for (TaskRemind taskRemind : list) {
                if (taskRemind.getStatus() == 1) {
                    taskRemind.setStatus(2);
                    entityDao.save(taskRemind);
                }
            }
        }

        return list;
    }

    public void updateTaskRemind(String taskRemindId) {

        TaskRemind taskRemind = this.entityDao.getObject(TaskRemind.class, taskRemindId);
        taskRemind.setStatus(3);
        entityDao.save(taskRemind);

        if (StringUtil.compareValue(taskRemind.getUser().getObjectId(), taskRemind.getTask().getCreator().getObjectId())) {
            taskRemind.getTask().setStatus(2);
            entityDao.save(taskRemind.getTask());
        }
    }
}
