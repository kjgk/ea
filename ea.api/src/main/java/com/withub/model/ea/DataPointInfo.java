package com.withub.model.ea;


public class DataPointInfo {

    private Integer dataPointId;

    private String dataPointName;

    private String dataPointTag;

    private String dataPointObjectId;

    private Integer pointDataValueType;

    private String measureUnit;

    /**
     * 是否设置了分时电价
     */
    private Integer electricityInfoFlag;

    public Integer getDataPointId() {
        return dataPointId;
    }

    public void setDataPointId(Integer dataPointId) {
        this.dataPointId = dataPointId;
    }

    public String getDataPointName() {
        return dataPointName;
    }

    public void setDataPointName(String dataPointName) {
        this.dataPointName = dataPointName;
    }

    public String getDataPointTag() {
        return dataPointTag;
    }

    public void setDataPointTag(String dataPointTag) {
        this.dataPointTag = dataPointTag;
    }

    public Integer getPointDataValueType() {

        return pointDataValueType;
    }

    public void setPointDataValueType(Integer pointDataValueType) {

        this.pointDataValueType = pointDataValueType;
    }

    public String getMeasureUnit() {
        return measureUnit;
    }

    public void setMeasureUnit(String measureUnit) {
        this.measureUnit = measureUnit;
    }


    public String getDataPointObjectId() {
        return dataPointObjectId;
    }

    public void setDataPointObjectId(String dataPointObjectId) {
        this.dataPointObjectId = dataPointObjectId;
    }

    public Integer getElectricityInfoFlag() {
        return electricityInfoFlag;
    }

    public void setElectricityInfoFlag(Integer electricityInfoFlag) {
        this.electricityInfoFlag = electricityInfoFlag;
    }
}
