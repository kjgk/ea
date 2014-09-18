package com.withub.web.servlet;

import com.withub.common.util.FileUtil;
import com.withub.common.util.SystemUtil;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.ConfigurationService;
import com.withub.spring.SpringContextUtil;
import com.withub.util.ConfigUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServlet;

public class SystemInitServlet extends HttpServlet {

    private static final Logger logger = LoggerFactory.getLogger(SystemInitServlet.class);

    private ConfigurationService configurationService = (ConfigurationService) SpringContextUtil.getInstance().getBean("configurationService");

    public SystemInitServlet() {

        super();
        try {
            logger.debug("SystemInitServlet start.");

            logger.debug("开始初始化配置信息.");
            ConfigUtil.getInstance().init();

            SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
            systemConfigInfo.setUniqueCode(SystemUtil.getUniqueCodes());
            configurationService.saveConfigInfo(systemConfigInfo);
            ConfigUtil.getInstance().refresh(systemConfigInfo);
            if (!FileUtil.directoryExists(systemConfigInfo.getTempDirectory())) {
                FileUtil.createDirectory(systemConfigInfo.getTempDirectory());
            }
            if (!FileUtil.directoryExists(systemConfigInfo.getPictureDirectory())) {
                FileUtil.createDirectory(systemConfigInfo.getPictureDirectory());
            }
            if (!FileUtil.directoryExists(systemConfigInfo.getVideoDirectory())) {
                FileUtil.createDirectory(systemConfigInfo.getVideoDirectory());
            }
            logger.debug("SystemInitServlet finish.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
