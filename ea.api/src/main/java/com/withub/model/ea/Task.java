package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;
import com.withub.model.system.po.User;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "EA_TASK")
public class Task extends AbstractBaseEntity {

    private String title;

    private Date startTime;

    /**
     * 是否重复提醒
     * <p/>
     * 0: 是
     * 1: 否
     */
    private Integer repeat;

    /**
     * 提醒范围
     * <p/>
     * 1: 对自己
     * 2: 所有用户
     */
    private Integer scope;

    private Integer status;

    private String content;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "CREATOR")
    private User creator;

    @Transient
    private Integer remindStatus;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Integer getRepeat() {
        return repeat;
    }

    public void setRepeat(Integer repeat) {
        this.repeat = repeat;
    }

    public Integer getScope() {
        return scope;
    }

    public void setScope(Integer scope) {
        this.scope = scope;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Integer getRemindStatus() {
        return remindStatus;
    }

    public void setRemindStatus(Integer remindStatus) {
        this.remindStatus = remindStatus;
    }
}
