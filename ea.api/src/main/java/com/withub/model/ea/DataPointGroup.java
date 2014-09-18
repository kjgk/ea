package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@javax.persistence.Entity
@Table(name = "EA_DATAPOINTGROUP")
public class DataPointGroup extends AbstractBaseEntity {

    //================================ 属性声明 ===========================================================

    private Integer orderNo;

    @ManyToOne(targetEntity = DataPointGroupCategory.class)
    @JoinColumn(name = "dataPointGroupCategoryId")
    private DataPointGroupCategory dataPointGroupCategory;

    @OneToOne(targetEntity = DataPoint.class)
    @JoinColumn(name = "dataPointId")
    private DataPoint dataPoint;

    //================================ 属性方法 ===========================================================


    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public DataPointGroupCategory getDataPointGroupCategory() {
        return dataPointGroupCategory;
    }

    public void setDataPointGroupCategory(DataPointGroupCategory dataPointGroupCategory) {
        this.dataPointGroupCategory = dataPointGroupCategory;
    }

    public DataPoint getDataPoint() {
        return dataPoint;
    }

    public void setDataPoint(DataPoint dataPoint) {
        this.dataPoint = dataPoint;
    }

}