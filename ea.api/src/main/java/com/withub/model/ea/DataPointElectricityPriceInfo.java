package com.withub.model.ea;


import com.withub.common.util.DateUtil;

import java.util.Date;

public class DataPointElectricityPriceInfo implements Comparable {

    public String datetimeString;

    public String dataPointId;

    public String electricityPriceId;

    public String electricityPriceTimeSegmentId;

    public Double price;

    public Double powerConsumption;

    public DataPointElectricityPriceInfo() {
    }

    public String getDatetimeString() {
        return datetimeString;
    }

    public void setDatetimeString(String datetimeString) {
        this.datetimeString = datetimeString;
    }

    public String getDataPointId() {
        return dataPointId;
    }

    public void setDataPointId(String dataPointId) {
        this.dataPointId = dataPointId;
    }

    public String getElectricityPriceId() {
        return electricityPriceId;
    }

    public void setElectricityPriceId(String electricityPriceId) {
        this.electricityPriceId = electricityPriceId;
    }

    public String getElectricityPriceTimeSegmentId() {
        return electricityPriceTimeSegmentId;
    }

    public void setElectricityPriceTimeSegmentId(String electricityPriceTimeSegmentId) {
        this.electricityPriceTimeSegmentId = electricityPriceTimeSegmentId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getPowerConsumption() {
        return powerConsumption;
    }

    public void setPowerConsumption(Double powerConsumption) {
        this.powerConsumption = powerConsumption;
    }

    @Override
    public int compareTo(Object o) {
        DataPointElectricityPriceInfo target = (DataPointElectricityPriceInfo) o;

        Date date0 = DateUtil.convertStringToDate(datetimeString.split("~")[0], DateUtil.STANDARD_DATEMINUTE_FORMAT);
        Date date1 = DateUtil.convertStringToDate(target.getDatetimeString().split("~")[0], DateUtil.STANDARD_DATEMINUTE_FORMAT);
        return date0.after(date1) ? 1 : 0;
    }
}
