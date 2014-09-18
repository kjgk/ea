package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EA_ELECTRICITYPRICETIMESEGMENT")
public class ElectricityPriceTimeSegment extends AbstractBaseEntity {

    private String name;

    private Integer orderNo;

    private String tag;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
