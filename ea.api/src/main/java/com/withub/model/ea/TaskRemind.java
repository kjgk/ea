package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;
import com.withub.model.system.po.User;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EA_TASKREMIND")
public class TaskRemind extends AbstractEntity {

    @OneToOne(targetEntity = Task.class)
    @JoinColumn(name = "taskId")
    private Task task;

    @OneToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;

    /**
     * 1:未提醒
     * 2:已提醒
     * 3:不再提醒
     */
    private Integer status;

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}

