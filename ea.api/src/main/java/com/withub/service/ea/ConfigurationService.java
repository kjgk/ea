package com.withub.service.ea;


import com.withub.model.ea.Configuration;
import com.withub.model.system.config.AbstractBaseConfigInfo;
import com.withub.model.system.config.ConfigurationInfo;

import java.util.Date;

public interface ConfigurationService {

    void saveConfigurationInfo(ConfigurationInfo configurationInfo) throws Exception;

    Configuration getConfiguration(final String className, final String relatedObjectId);

    AbstractBaseConfigInfo getConfigInfo(final String className, final String relatedObjectId) throws Exception;

    void saveDatabaseConfigurationInfo(AbstractBaseConfigInfo configInfo) throws Exception;

    void saveConfigInfo(AbstractBaseConfigInfo configInfo) throws Exception;
}
