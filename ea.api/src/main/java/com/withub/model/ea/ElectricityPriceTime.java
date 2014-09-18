package com.withub.model.ea;


import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "EA_ELECTRICITYPRICETIME")
public class ElectricityPriceTime extends AbstractEntity {

    @ManyToOne(targetEntity = ElectricityPriceTimeGroup.class)
    @JoinColumn(name = "electricityPriceTimeGroupId")
    private ElectricityPriceTimeGroup electricityPriceTimeGroup;

    private String startTime;

    private String endTime;

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public ElectricityPriceTimeGroup getElectricityPriceTimeGroup() {
        return electricityPriceTimeGroup;
    }

    public void setElectricityPriceTimeGroup(ElectricityPriceTimeGroup electricityPriceTimeGroup) {
        this.electricityPriceTimeGroup = electricityPriceTimeGroup;
    }
}
