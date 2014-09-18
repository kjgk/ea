package com.withub.model.ea;


import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "EA_DATACOLLECTCONFIG")
public class DataCollectConfig extends AbstractEntity {

    private String databaseTag;

    private String tableName;

    private Date historyDataStartUtcDateTime;

    private Date historyDataEndUtcDateTime;

    private Date historyDataLastCollectTime;

    private Integer enableHistoryDataCollect;

    private Date startUtcDateTime;

    private Date lastCollectTime;

    private Integer enableCollect;

    @OneToOne(targetEntity = MetasysDatabase.class)
    @JoinColumn(name = "metasysDatabaseId")
    private MetasysDatabase metasysDatabase;

    public String getDatabaseTag() {

        return databaseTag;
    }

    public void setDatabaseTag(String databaseTag) {

        this.databaseTag = databaseTag;
    }

    public String getTableName() {

        return tableName;
    }

    public void setTableName(String tableName) {

        this.tableName = tableName;
    }

    public Date getHistoryDataStartUtcDateTime() {

        return historyDataStartUtcDateTime;
    }

    public void setHistoryDataStartUtcDateTime(Date historyDataStartUtcDateTime) {

        this.historyDataStartUtcDateTime = historyDataStartUtcDateTime;
    }

    public Date getHistoryDataEndUtcDateTime() {

        return historyDataEndUtcDateTime;
    }

    public void setHistoryDataEndUtcDateTime(Date historyDataEndUtcDateTime) {

        this.historyDataEndUtcDateTime = historyDataEndUtcDateTime;
    }

    public Date getHistoryDataLastCollectTime() {

        return historyDataLastCollectTime;
    }

    public void setHistoryDataLastCollectTime(Date historyDataLastCollectTime) {

        this.historyDataLastCollectTime = historyDataLastCollectTime;
    }

    public Integer getEnableHistoryDataCollect() {

        return enableHistoryDataCollect;
    }

    public void setEnableHistoryDataCollect(Integer enableHistoryDataCollect) {

        this.enableHistoryDataCollect = enableHistoryDataCollect;
    }

    public Date getStartUtcDateTime() {

        return startUtcDateTime;
    }

    public void setStartUtcDateTime(Date startUtcDateTime) {

        this.startUtcDateTime = startUtcDateTime;
    }

    public Date getLastCollectTime() {

        return lastCollectTime;
    }

    public void setLastCollectTime(Date lastCollectTime) {

        this.lastCollectTime = lastCollectTime;
    }

    public Integer getEnableCollect() {

        return enableCollect;
    }

    public void setEnableCollect(Integer enableCollect) {

        this.enableCollect = enableCollect;
    }

    public MetasysDatabase getMetasysDatabase() {

        return metasysDatabase;
    }

    public void setMetasysDatabase(MetasysDatabase metasysDatabase) {

        this.metasysDatabase = metasysDatabase;
    }
}
