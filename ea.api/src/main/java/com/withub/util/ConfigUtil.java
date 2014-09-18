package com.withub.util;

import com.withub.common.util.FileUtil;
import com.withub.model.system.config.AbstractBaseConfigInfo;
import com.withub.model.system.config.DatabaseConfigInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.model.system.config.WeatherConfigInfo;
import com.withub.service.ea.ConfigurationService;
import com.withub.spring.SpringContextUtil;

public final class ConfigUtil {

    //================================ 属性声明 ==========================================================

    private ConfigurationService configurationService = (ConfigurationService) SpringContextUtil.getInstance().getBean("configurationService");

    private static SystemConfigInfo systemConfigInfo;

    private static DatabaseConfigInfo databaseConfigInfo;

    private static WeatherConfigInfo weatherConfigInfo;

    private static ConfigUtil instance = null;

    public static ConfigUtil getInstance() {

        if (instance == null) {
            instance = new ConfigUtil();
        }
        return instance;
    }

    private ConfigUtil() {

    }

    //================================ 方法  =============================================================

    public void init() throws Exception {

        AbstractBaseConfigInfo abstractBaseConfigInfo = configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");
        systemConfigInfo = (SystemConfigInfo) abstractBaseConfigInfo;

        abstractBaseConfigInfo = configurationService.getConfigInfo(DatabaseConfigInfo.class.getName(), "DATABASE");
        databaseConfigInfo = (DatabaseConfigInfo) abstractBaseConfigInfo;

        abstractBaseConfigInfo = configurationService.getConfigInfo(WeatherConfigInfo.class.getName(), "WEATHER");
        weatherConfigInfo = (WeatherConfigInfo) abstractBaseConfigInfo;

        // 创建临时目录
        FileUtil.createDirectory(systemConfigInfo.getTempDirectory());
    }

    public void refresh(Object object) throws Exception {

        if (object instanceof DatabaseConfigInfo) {
            databaseConfigInfo = (DatabaseConfigInfo) object;
        } else if (object instanceof SystemConfigInfo) {
            systemConfigInfo = (SystemConfigInfo) object;
            FileUtil.createDirectory(systemConfigInfo.getTempDirectory());
        } else if (object instanceof WeatherConfigInfo) {
            weatherConfigInfo = (WeatherConfigInfo) object;
        }
    }

    //================================ 属性方法 ==========================================================


    public static SystemConfigInfo getSystemConfigInfo() {

        return systemConfigInfo;
    }

    public static DatabaseConfigInfo getDatabaseConfigInfo() {

        return databaseConfigInfo;
    }

    public static WeatherConfigInfo getWeatherConfigInfo() {

        return weatherConfigInfo;
    }
}

