package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EA_METASYSDATABASE")
public class MetasysDatabase extends AbstractBaseEntity {

    //========================== 属性声明 ================================================================

    private String name;

    private String databaseTag;

    private String hostIp;

    private Integer port;

    private String instanceName;

    private String databaseName;

    private String userName;

    private String password;

    private String timeNode;

    //========================== 属性方法 ================================================================

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getDatabaseTag() {

        return databaseTag;
    }

    public void setDatabaseTag(String databaseTag) {

        this.databaseTag = databaseTag;
    }

    public String getHostIp() {

        return hostIp;
    }

    public void setHostIp(String hostIp) {

        this.hostIp = hostIp;
    }

    public Integer getPort() {

        return port;
    }

    public void setPort(Integer port) {

        this.port = port;
    }

    public String getInstanceName() {

        return instanceName;
    }

    public void setInstanceName(String instanceName) {

        this.instanceName = instanceName;
    }

    public String getDatabaseName() {

        return databaseName;
    }

    public void setDatabaseName(String databaseName) {

        this.databaseName = databaseName;
    }

    public String getUserName() {

        return userName;
    }

    public void setUserName(String userName) {

        this.userName = userName;
    }

    public String getPassword() {

        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public String getTimeNode() {

        return timeNode;
    }

    public void setTimeNode(String timeNode) {

        this.timeNode = timeNode;
    }
}
