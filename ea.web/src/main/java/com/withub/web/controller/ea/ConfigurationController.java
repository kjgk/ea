package com.withub.web.controller.ea;


import com.withub.model.system.config.ConfigurationInfo;
import com.withub.model.system.config.DatabaseConfigInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.model.system.config.WeatherConfigInfo;
import com.withub.service.ea.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class ConfigurationController {

    //============================ 属性声明 ==============================================================

    @Autowired
    private ConfigurationService configurationService;

    //============================ Controller 方法 =======================================================

    @RequestMapping(value = "/configuration/save", method = RequestMethod.POST)
    public void saveConfiguration(ModelMap modelMap, ConfigurationInfo configurationInfo) throws Exception {

        configurationService.saveConfigurationInfo(configurationInfo);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/configuration/load", method = RequestMethod.GET)
    public void loadConfiguration(ModelMap modelMap) throws Exception {

        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");
        DatabaseConfigInfo databaseConfigInfo = (DatabaseConfigInfo) configurationService.getConfigInfo(DatabaseConfigInfo.class.getName(), "DATABASE");
        WeatherConfigInfo weatherConfigInfo = (WeatherConfigInfo) configurationService.getConfigInfo(WeatherConfigInfo.class.getName(), "WEATHER");

        Map<String, Object> data = new HashMap<String, Object>();

        // systemConfigInfo
        if (systemConfigInfo != null) {
            data.put("systemConfigInfo.beginYear", systemConfigInfo.getBeginYear());
            data.put("systemConfigInfo.jciUrl", systemConfigInfo.getJciUrl());
            data.put("systemConfigInfo.loginPageTheme", systemConfigInfo.getLoginPageTheme());
            data.put("systemConfigInfo.tempDirectory", systemConfigInfo.getTempDirectory());
            data.put("systemConfigInfo.pictureDirectory", systemConfigInfo.getPictureDirectory());
            data.put("systemConfigInfo.videoDirectory", systemConfigInfo.getVideoDirectory());
            data.put("systemConfigInfo.reportExportDirectory", systemConfigInfo.getReportExportDirectory());
            data.put("systemConfigInfo.uniqueCode", systemConfigInfo.getUniqueCode());
            data.put("systemConfigInfo.authorizationCode", systemConfigInfo.getAuthorizationCode());
            data.put("systemConfigInfo.authorizationTime", systemConfigInfo.getAuthorizationTime());
        }
        // databaseConfigInfo
        if (databaseConfigInfo != null) {
            data.put("databaseConfigInfo.pointActualValueTableStartYear", databaseConfigInfo.getPointActualValueTableStartYear());
            data.put("databaseConfigInfo.pointActualValueTableEndYear", databaseConfigInfo.getPointActualValueTableEndYear());
        }

        // weatherConfigInfo
        if (weatherConfigInfo != null) {
            data.put("weatherConfigInfo.display", weatherConfigInfo.getDisplay());
            data.put("weatherConfigInfo.cityName", weatherConfigInfo.getCityName());
            data.put("weatherConfigInfo.cityCode", weatherConfigInfo.getCityCode());
            data.put("weatherConfigInfo.weatherWebServiceTag", weatherConfigInfo.getWeatherWebServiceTag());
            data.put("weatherConfigInfo.humidityDataPoint", weatherConfigInfo.getHumidityDataPoint());
            data.put("weatherConfigInfo.temperatureDataPoint", weatherConfigInfo.getTemperatureDataPoint());
            data.put("weatherConfigInfo.priority", weatherConfigInfo.getPriority());
        }

        modelMap.put("data", data);
        modelMap.put("success", true);
    }

}
