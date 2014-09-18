package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_ELECTRICITYPRICE")
public class ElectricityPrice extends AbstractEntity {

    @ManyToOne(targetEntity = ElectricityUsageCategory.class)
    @JoinColumn(name = "electricityCategoryId")
    private ElectricityUsageCategory electricityUsageCategory;

    @ManyToOne(targetEntity = VoltageSegment.class)
    @JoinColumn(name = "voltageSegmentId")
    private VoltageSegment voltageSegment;

    @ManyToOne(targetEntity = ElectricityPriceTimeSegment.class)
    @JoinColumn(name = "electricityPriceTimeSegmentId")
    private ElectricityPriceTimeSegment electricityPriceTimeSegment;

    @ManyToOne(targetEntity = ElectricityPriceIssue.class)
    @JoinColumn(name = "electricityPriceIssueId")
    private ElectricityPriceIssue electricityPriceIssue;

    private Float  price;

    private  Integer orderNo;

    @OneToMany(targetEntity = ElectricityPriceTimeGroup.class, mappedBy = "electricityPrice", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ElectricityPriceTimeGroup> electricityPriceTimeGroupList = new ArrayList<ElectricityPriceTimeGroup>();

    public ElectricityUsageCategory getElectricityUsageCategory() {
        return electricityUsageCategory;
    }

    public void setElectricityUsageCategory(ElectricityUsageCategory electricityUsageCategory) {
        this.electricityUsageCategory = electricityUsageCategory;
    }

    public VoltageSegment getVoltageSegment() {
        return voltageSegment;
    }

    public void setVoltageSegment(VoltageSegment voltageSegment) {
        this.voltageSegment = voltageSegment;
    }


    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public ElectricityPriceTimeSegment getElectricityPriceTimeSegment() {
        return electricityPriceTimeSegment;
    }

    public void setElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment) {
        this.electricityPriceTimeSegment = electricityPriceTimeSegment;
    }

    public Integer getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {
        this.orderNo = orderNo;
    }

    public List<ElectricityPriceTimeGroup> getElectricityPriceTimeGroupList() {
        return electricityPriceTimeGroupList;
    }

    public void setElectricityPriceTimeGroupList(List<ElectricityPriceTimeGroup> electricityPriceTimeGroupList) {
        this.electricityPriceTimeGroupList = electricityPriceTimeGroupList;
    }

    public ElectricityPriceIssue getElectricityPriceIssue() {

        return electricityPriceIssue;
    }

    public void setElectricityPriceIssue(ElectricityPriceIssue electricityPriceIssue) {

        this.electricityPriceIssue = electricityPriceIssue;
    }
}