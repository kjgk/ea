package com.withub.model.entity;

import javax.persistence.MappedSuperclass;
import java.util.Date;

@MappedSuperclass
public abstract class AbstractBaseEntity extends AbstractEntity {

    //============================== 属性声明 ============================================================


    private Date createTime;

    private Date lastUpdateTime;

    private Integer objectVersion;

    private Integer objectStatus;

    //============================== 属性方法 ============================================================

    public Date getCreateTime() {

        return createTime;
    }

    public void setCreateTime(Date createTime) {

        this.createTime = createTime;
    }


    public Date getLastUpdateTime() {

        return lastUpdateTime;
    }

    public void setLastUpdateTime(Date lastUpdateTime) {

        this.lastUpdateTime = lastUpdateTime;
    }

    public Integer getObjectVersion() {

        return objectVersion;
    }

    public void setObjectVersion(Integer objectVersion) {

        this.objectVersion = objectVersion;
    }

    public Integer getObjectStatus() {

        return objectStatus;
    }

    public void setObjectStatus(Integer objectStatus) {

        this.objectStatus = objectStatus;
    }

}
