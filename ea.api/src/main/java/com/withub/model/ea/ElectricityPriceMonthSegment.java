package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EA_ELECTRICITYPRICEMONTHSEGMENT")
public class ElectricityPriceMonthSegment extends AbstractEntity {

    private String name;

    private String months;

    private Integer orderNo;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getMonths() {

        return months;
    }

    public void setMonths(String months) {

        this.months = months;
    }

    public Integer getOrderNo() {

        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {

        this.orderNo = orderNo;
    }
}
