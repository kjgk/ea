package com.withub.model.ea;


import com.withub.model.entity.AbstractEntity;

import javax.persistence.*;

@Entity
@Table(name = "EA_ELECTRICITYPRICEDATE")
public class ElectricityPriceDate extends AbstractEntity {

    @ManyToOne(targetEntity = ElectricityPriceTimeGroup.class)
    @JoinColumn(name = "electricityPriceTimeGroupId")
    private ElectricityPriceTimeGroup electricityPriceTimeGroup;

    private Integer startMonth;

    private Integer endMonth;

    private Integer startDay;

    private Integer endDay;

    public Integer getStartMonth() {
        return startMonth;
    }

    public void setStartMonth(Integer startMonth) {
        this.startMonth = startMonth;
    }

    public Integer getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(Integer endMonth) {
        this.endMonth = endMonth;
    }

    public Integer getStartDay() {
        return startDay;
    }

    public void setStartDay(Integer startDay) {
        this.startDay = startDay;
    }

    public Integer getEndDay() {
        return endDay;
    }

    public void setEndDay(Integer endDay) {
        this.endDay = endDay;
    }

    public ElectricityPriceTimeGroup getElectricityPriceTimeGroup() {
        return electricityPriceTimeGroup;
    }

    public void setElectricityPriceTimeGroup(ElectricityPriceTimeGroup electricityPriceTimeGroup) {
        this.electricityPriceTimeGroup = electricityPriceTimeGroup;
    }
}
