package com.withub.model.ea;


public class ElectricityPriceInfo {

    public Double today;

    public Double yestoday;

    public Double currentMonth;

    public Double previousMonth;

    public Double getToday() {

        return today;
    }

    public void setToday(Double today) {

        this.today = today;
    }

    public Double getYestoday() {

        return yestoday;
    }

    public void setYestoday(Double yestoday) {

        this.yestoday = yestoday;
    }

    public Double getCurrentMonth() {

        return currentMonth;
    }

    public void setCurrentMonth(Double currentMonth) {

        this.currentMonth = currentMonth;
    }

    public Double getPreviousMonth() {

        return previousMonth;
    }

    public void setPreviousMonth(Double previousMonth) {

        this.previousMonth = previousMonth;
    }
}
