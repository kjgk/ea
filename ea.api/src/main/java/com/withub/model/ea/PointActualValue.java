package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import java.util.Date;

public class PointActualValue extends AbstractEntity {

    //========================== 属性声明 ================================================================
    private Integer pointId;

    private Integer pointSliceId;

    private Date utcDateTime;

    private Float actualValue;

    private Integer source;

    private String databaseTag;

    //========================== 属性方法 ================================================================
    public Integer getPointId() {

        return pointId;
    }

    public void setPointId(Integer pointId) {

        this.pointId = pointId;
    }

    public Integer getPointSliceId() {

        return pointSliceId;
    }

    public void setPointSliceId(Integer pointSliceId) {

        this.pointSliceId = pointSliceId;
    }

    public Date getUtcDateTime() {

        return utcDateTime;
    }

    public void setUtcDateTime(Date utcDateTime) {

        this.utcDateTime = utcDateTime;
    }

    public Float getActualValue() {

        return actualValue;
    }

    public void setActualValue(Float actualValue) {

        this.actualValue = actualValue;
    }

    public Integer getSource() {

        return source;
    }

    public void setSource(Integer source) {

        this.source = source;
    }

    public String getDatabaseTag() {

        return databaseTag;
    }

    public void setDatabaseTag(String databaseTag) {

        this.databaseTag = databaseTag;
    }
}
