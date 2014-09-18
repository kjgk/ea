package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_ELECTRICITYPRICETIMEGROUP")
public class ElectricityPriceTimeGroup extends AbstractEntity {

    @ManyToOne(targetEntity = ElectricityPrice.class)
    @JoinColumn(name = "electricityPriceId")
    private ElectricityPrice electricityPrice;

    private  Integer orderNo;

    @OneToMany(targetEntity = ElectricityPriceDate.class, mappedBy = "electricityPriceTimeGroup", fetch = FetchType.LAZY)
    private List<ElectricityPriceDate> electricityPriceDateList = new ArrayList<ElectricityPriceDate>();

    @OneToMany(targetEntity = ElectricityPriceTime.class, mappedBy = "electricityPriceTimeGroup", fetch = FetchType.LAZY)
    private List<ElectricityPriceTime> electricityPriceTimeList = new ArrayList<ElectricityPriceTime>();

    public ElectricityPrice getElectricityPrice() {
        return electricityPrice;
    }

    public void setElectricityPrice(ElectricityPrice electricityPrice) {
        this.electricityPrice = electricityPrice;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public List<ElectricityPriceDate> getElectricityPriceDateList() {
        return electricityPriceDateList;
    }

    public void setElectricityPriceDateList(List<ElectricityPriceDate> electricityPriceDateList) {
        this.electricityPriceDateList = electricityPriceDateList;
    }

    public List<ElectricityPriceTime> getElectricityPriceTimeList() {
        return electricityPriceTimeList;
    }

    public void setElectricityPriceTimeList(List<ElectricityPriceTime> electricityPriceTimeList) {
        this.electricityPriceTimeList = electricityPriceTimeList;
    }
}
