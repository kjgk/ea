package com.withub.model.ea;

public class ActualValue {

    private Integer pointId;

    private String dataPointId;

    private String datetimeString;

    private Double value;

    private Double maxActualValue;

    private Double minActualValue;

    private Double avgActualValue;

    private Double sumActualValue;

    public Integer getPointId() {
        return pointId;
    }

    public void setPointId(Integer pointId) {
        this.pointId = pointId;
    }

    public String getDataPointId() {
        return dataPointId;
    }

    public void setDataPointId(String dataPointId) {
        this.dataPointId = dataPointId;
    }

    public String getDatetimeString() {

        return datetimeString;
    }

    public void setDatetimeString(String datetimeString) {

        this.datetimeString = datetimeString;
    }

    public Double getMaxActualValue() {

        return maxActualValue;
    }

    public void setMaxActualValue(Double maxActualValue) {

        this.maxActualValue = maxActualValue;
    }

    public Double getMinActualValue() {

        return minActualValue;
    }

    public void setMinActualValue(Double minActualValue) {

        this.minActualValue = minActualValue;
    }

    public Double getAvgActualValue() {

        return avgActualValue;
    }

    public void setAvgActualValue(Double avgActualValue) {

        this.avgActualValue = avgActualValue;
    }

    public Double getSumActualValue() {

        return sumActualValue;
    }

    public void setSumActualValue(Double sumActualValue) {

        this.sumActualValue = sumActualValue;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
