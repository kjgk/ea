package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "EA_ELECTRICITYPRICETIMESEGMENTDETAIL")
public class ElectricityPriceTimeSegmentDetail extends AbstractEntity {

    @ManyToOne(targetEntity = ElectricityPriceTimeSegment.class)
    @JoinColumn(name = "electricityPriceTimeSegmentId")
    private  ElectricityPriceTimeSegment electricityPriceTimeSegment;

    private String  beginTime;

    private String  endTime;

    public ElectricityPriceTimeSegment getElectricityPriceTimeSegment() {
        return electricityPriceTimeSegment;
    }

    public void setElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment) {
        this.electricityPriceTimeSegment = electricityPriceTimeSegment;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
