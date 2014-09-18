package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;
import com.withub.model.system.po.User;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "EA_USERLOG")
public class UserLog extends AbstractEntity {
    //========================= 属性声明 ================================================================

    private Date logTime;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "userId")
    private User user;

    private String logType;

    private String description;

    //========================= 属性方法 ================================================================


    public Date getLogTime() {

        return logTime;
    }

    public void setLogTime(Date logTime) {

        this.logTime = logTime;
    }

    public User getUser() {

        return user;
    }

    public void setUser(User user) {

        this.user = user;
    }

    public String getLogType() {

        return logType;
    }

    public void setLogType(String logType) {

        this.logType = logType;
    }

    public String getDescription() {

        return description;
    }

    public void setDescription(String description) {

        this.description = description;
    }
}
