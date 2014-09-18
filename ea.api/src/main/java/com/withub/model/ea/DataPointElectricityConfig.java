package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EA_DATAPOINTELECTRICITYCONFIG")
public class DataPointElectricityConfig extends AbstractEntity{

    @OneToOne(targetEntity = DataPoint.class)
    @JoinColumn(name = "dataPointId")
    private DataPoint dataPoint;

    @OneToOne(targetEntity = ElectricityUsageCategory.class)
    @JoinColumn(name = "electricityUsageCategoryId")
    private ElectricityUsageCategory electricityUsageCategory;

    @OneToOne(targetEntity = VoltageSegment.class)
    @JoinColumn(name = "voltageSegmentId")
    private VoltageSegment voltageSegment;

    public DataPoint getDataPoint() {

        return dataPoint;
    }

    public void setDataPoint(DataPoint dataPoint) {

        this.dataPoint = dataPoint;
    }

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
}
