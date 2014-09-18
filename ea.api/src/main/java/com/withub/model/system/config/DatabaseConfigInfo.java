package com.withub.model.system.config;


public final class DatabaseConfigInfo extends AbstractBaseConfigInfo {

    private static final long serialVersionUID = 1L;

    private int pointActualValueTableStartYear;

    private int pointActualValueTableEndYear;

    public static long getSerialVersionUID() {

        return serialVersionUID;
    }

    public int getPointActualValueTableStartYear() {
        return pointActualValueTableStartYear;
    }

    public void setPointActualValueTableStartYear(int pointActualValueTableStartYear) {
        this.pointActualValueTableStartYear = pointActualValueTableStartYear;
    }

    public int getPointActualValueTableEndYear() {
        return pointActualValueTableEndYear;
    }

    public void setPointActualValueTableEndYear(int pointActualValueTableEndYear) {
        this.pointActualValueTableEndYear = pointActualValueTableEndYear;
    }
}
