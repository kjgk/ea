package com.withub.model.system.config;


public final class WeatherConfigInfo extends AbstractBaseConfigInfo {

    private static final long serialVersionUID = 1L;

    //================================ 属性声明 ===========================================================

    private String display;

    private String cityName;

    private String cityCode;

    private String weatherWebServiceTag;

    private String humidityDataPoint;

    private String temperatureDataPoint;

    private String priority;

    //================================ 属性方法 ===========================================================

    public static long getSerialVersionUID() {

        return serialVersionUID;
    }

    public String getDisplay() {

        return display;
    }

    public void setDisplay(String display) {

        this.display = display;
    }

    public String getCityName() {

        return cityName;
    }

    public void setCityName(String cityName) {

        this.cityName = cityName;
    }

    public String getCityCode() {

        return cityCode;
    }

    public void setCityCode(String cityCode) {

        this.cityCode = cityCode;
    }

    public String getWeatherWebServiceTag() {

        return weatherWebServiceTag;
    }

    public void setWeatherWebServiceTag(String weatherWebServiceTag) {

        this.weatherWebServiceTag = weatherWebServiceTag;
    }

    public String getHumidityDataPoint() {

        return humidityDataPoint;
    }

    public void setHumidityDataPoint(String humidityDataPoint) {

        this.humidityDataPoint = humidityDataPoint;
    }

    public String getTemperatureDataPoint() {

        return temperatureDataPoint;
    }

    public void setTemperatureDataPoint(String temperatureDataPoint) {

        this.temperatureDataPoint = temperatureDataPoint;
    }

    public String getPriority() {

        return priority;
    }

    public void setPriority(String priority) {

        this.priority = priority;
    }
}
