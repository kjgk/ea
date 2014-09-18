package com.withub.model.system.config;

public class ConfigurationInfo {

    private SystemConfigInfo systemConfigInfo;

    private DatabaseConfigInfo databaseConfigInfo;

    private WeatherConfigInfo weatherConfigInfo;

    public SystemConfigInfo getSystemConfigInfo() {

        return systemConfigInfo;
    }

    public void setSystemConfigInfo(SystemConfigInfo systemConfigInfo) {

        this.systemConfigInfo = systemConfigInfo;
    }

    public DatabaseConfigInfo getDatabaseConfigInfo() {

        return databaseConfigInfo;
    }

    public void setDatabaseConfigInfo(DatabaseConfigInfo databaseConfigInfo) {

        this.databaseConfigInfo = databaseConfigInfo;
    }

    public WeatherConfigInfo getWeatherConfigInfo() {
        return weatherConfigInfo;
    }

    public void setWeatherConfigInfo(WeatherConfigInfo weatherConfigInfo) {
        this.weatherConfigInfo = weatherConfigInfo;
    }
}
