package com.withub.service.impl.ea;

import com.sun.org.apache.bcel.internal.generic.DUP;
import com.withub.common.util.DateUtil;
import com.withub.common.util.ReflectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.Configuration;
import com.withub.model.system.config.*;
import com.withub.service.ea.ConfigurationService;
import com.withub.util.ConfigUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;


@Service("configurationService")
@Transactional
public class ConfigurationServiceImpl implements ConfigurationService {

    @Autowired
    private EntityDao entityDao;

    public void saveConfigurationInfo(ConfigurationInfo configurationInfo) throws Exception {

        SystemConfigInfo systemConfigInfo = configurationInfo.getSystemConfigInfo();
        systemConfigInfo.setObjectId("SYSTEM");
        saveConfigInfo(systemConfigInfo);


        DatabaseConfigInfo tempDatabaseConfigInfo = (DatabaseConfigInfo) getConfigInfo(DatabaseConfigInfo.class.getName(), "DATABASE");
        DatabaseConfigInfo databaseConfigInfo = configurationInfo.getDatabaseConfigInfo();

        if (databaseConfigInfo.getPointActualValueTableStartYear() != tempDatabaseConfigInfo.getPointActualValueTableStartYear()
                || databaseConfigInfo.getPointActualValueTableEndYear() != tempDatabaseConfigInfo.getPointActualValueTableEndYear()) {

            dropPointActualValueTable();

            createPointActualValueTable(databaseConfigInfo.getPointActualValueTableStartYear(), databaseConfigInfo.getPointActualValueTableEndYear());
        }


        databaseConfigInfo.setObjectId("DATABASE");
        saveConfigInfo(databaseConfigInfo);


        WeatherConfigInfo weatherConfigInfo = configurationInfo.getWeatherConfigInfo();
        weatherConfigInfo.setObjectId("WEATHER");
        saveConfigInfo(weatherConfigInfo);
    }

    public void saveDatabaseConfigurationInfo(AbstractBaseConfigInfo configInfo) throws Exception {

        configInfo.setObjectId("DATABASE");
        saveConfigInfo(configInfo);
    }

    public void saveConfigInfo(AbstractBaseConfigInfo configInfo) throws Exception {

        Configuration configuration;

        String value = ReflectionUtil.serializeObjectToString(configInfo);
        Configuration oldConfiguration = getConfiguration(configInfo.getClass().getName(), configInfo.getObjectId());
        if (oldConfiguration == null) {
            configuration = new Configuration();
            configuration.setObjectId(StringUtil.getUuid());
            configuration.setClassName(configInfo.getClass().getName());
            configuration.setRelatedObjectId(configInfo.getObjectId());
        } else {
            configuration = oldConfiguration;
        }
        configuration.setValue(value);
        entityDao.save(configuration);
        ConfigUtil.getInstance().refresh(configInfo);
    }


    public Configuration getConfiguration(String className, String relatedObjectId) {

        String jpql = "select o from " + Configuration.class.getName() + " o where "
                + " lower(o.className)= ? and o.relatedObjectId= ?";

        Configuration configuration = entityDao.getObject(jpql, className.trim().toLowerCase(), relatedObjectId);
        return configuration;
    }


    public AbstractBaseConfigInfo getConfigInfo(String className, String relatedObjectId) throws Exception {

        AbstractBaseConfigInfo configInfo = null;
        Configuration configuration = getConfiguration(className, relatedObjectId);

        if (configuration != null) {
            Object object = ReflectionUtil.deserializeObjectFromString(configuration.getValue());
            configInfo = (AbstractBaseConfigInfo) object;
        }

        return configInfo;
    }

    public void createPointActualValueTable(int startYear, int endYear) throws Exception {

        int year = startYear;
        while (year <= endYear) {
            for (int i = 1; i <= 12; i++) {
                Date startMonth = DateUtil.convertStringToDate(year + "-" + String.format("%1$02d", i) + "-01", DateUtil.STANDARD_DATE_FORMAT);
                Date endMonth = DateUtil.addMonths(startMonth, 1);

                String tablename = "ea_pointactualvalue" + year + String.format("%1$02d", i);
                String sql = "create Table pav." + tablename + "( CHECK (utcdatetime >= timestamp '" + DateUtil.getDateFormatString(startMonth, DateUtil.STANDARD_DATE_FORMAT) + " 00:00:00' AND utcdatetime < timestamp '" + DateUtil.getDateFormatString(endMonth, DateUtil.STANDARD_DATE_FORMAT) + " 00:00:00' )) INHERITS (ea_pointactualvalue)";
                entityDao.executeSql(sql);
                sql = "create unique index i_" + tablename + " on pav." + tablename + "(pointid,utcdatetime,databasetag)";
                entityDao.executeSql(sql);
            }
            year++;
        }
    }

    public void dropPointActualValueTable() throws Exception {

        String sql = "select relname as TABLE_NAME from pg_class c\n" +
                "where  relkind = 'r' and relname like 'ea_pointactualvalue%' and relname != 'ea_pointactualvalue' order by relname\n";

        List list = entityDao.listBySql(sql);

        for (String tablename : (List<String>) list) {
            entityDao.executeSql("drop index if exists pav.i_" + tablename);
            entityDao.executeSql("drop table if exists pav." + tablename);
        }
    }

    public EntityDao getEntityDao() {

        return entityDao;
    }

    public void setEntityDao(EntityDao entityDao) {

        this.entityDao = entityDao;
    }
}
