package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "EA_DATAPOINT")
public class DataPoint extends AbstractBaseEntity {

    //========================== 属性声明 ================================================================

    private Integer dataPointId;

    private Integer dataPointSliceId;

    private String dataPointTag;

    private Integer pointDataType;

    private Integer pointDataValueType;

    private String measureUnitId;

    private String measureUnit;

    private String name;

    private String pinYin;

    private Integer original;

    private Integer source;

    @OneToOne(targetEntity = ElectricityPriceTimeSegment.class)
    @JoinColumn(name = "timeSegmentId")
    private ElectricityPriceTimeSegment timeSegment;

    @OneToOne(targetEntity = MetasysDatabase.class)
    @JoinColumn(name = "metasysDatabaseId")
    private MetasysDatabase metasysDatabase;

    private String databaseTag;

    @Transient
    private List<DataPoint> timeSegmentPointList;

    //========================== 属性方法 ================================================================

    public Integer getDataPointId() {

        return dataPointId;
    }

    public void setDataPointId(Integer dataPointId) {

        this.dataPointId = dataPointId;
    }

    public Integer getDataPointSliceId() {

        return dataPointSliceId;
    }

    public void setDataPointSliceId(Integer dataPointSliceId) {

        this.dataPointSliceId = dataPointSliceId;
    }

    public String getDataPointTag() {

        return dataPointTag;
    }

    public void setDataPointTag(String dataPointTag) {

        this.dataPointTag = dataPointTag;
    }

    public Integer getPointDataType() {

        return pointDataType;
    }

    public void setPointDataType(Integer pointDataType) {

        this.pointDataType = pointDataType;
    }

    public Integer getPointDataValueType() {

        return pointDataValueType;
    }

    public void setPointDataValueType(Integer pointDataValueType) {

        this.pointDataValueType = pointDataValueType;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getPinYin() {

        return pinYin;
    }

    public void setPinYin(String pinYin) {

        this.pinYin = pinYin;
    }

    public Integer getOriginal() {

        return original;
    }

    public void setOriginal(Integer original) {

        this.original = original;
    }

    public Integer getSource() {

        return source;
    }

    public void setSource(Integer source) {

        this.source = source;
    }

    public String getMeasureUnitId() {

        return measureUnitId;
    }

    public void setMeasureUnitId(String measureUnitId) {

        this.measureUnitId = measureUnitId;
    }

    public String getMeasureUnit() {

        return measureUnit;
    }

    public void setMeasureUnit(String measureUnit) {

        this.measureUnit = measureUnit;
    }

    public String getDatabaseTag() {

        return databaseTag;
    }

    public void setDatabaseTag(String databaseTag) {

        this.databaseTag = databaseTag;
    }

    public MetasysDatabase getMetasysDatabase() {
        return metasysDatabase;
    }

    public void setMetasysDatabase(MetasysDatabase metasysDatabase) {
        this.metasysDatabase = metasysDatabase;
    }

    public ElectricityPriceTimeSegment getTimeSegment() {
        return timeSegment;
    }

    public void setTimeSegment(ElectricityPriceTimeSegment timeSegment) {
        this.timeSegment = timeSegment;
    }

    public List<DataPoint> getTimeSegmentPointList() {
        return timeSegmentPointList;
    }

    public void setTimeSegmentPointList(List<DataPoint> timeSegmentPointList) {
        this.timeSegmentPointList = timeSegmentPointList;
    }
}
