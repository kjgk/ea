package com.withub.job;


import com.withub.model.ea.DataPointElectricityConfig;
import com.withub.model.ea.ElectricityPriceIssue;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.service.ea.DataPointService;
import com.withub.service.ea.ElectricityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class DataPointTimeSegmentUpdateJob {

    @Autowired
    private ElectricityService electricityService;

    @Autowired
    private DataPointService dataPointService;

    @Autowired
    private DataPointElectricityService dataPointElectricityService;

    private static final Logger logger = LoggerFactory.getLogger(DataPointTimeSegmentUpdateJob.class);


    public void execute() throws Exception {

        logger.info("开始更新更新数据点分时电量");

        ElectricityPriceIssue electricityPriceIssue = electricityService.getCurrentElectricityPriceIssue();

        if (electricityPriceIssue != null) {
            List<Map> timeSegmentList = dataPointElectricityService.buildTimeSegmentElectricityPriceList(electricityPriceIssue.getObjectId());

            List<DataPointElectricityConfig> configList = dataPointElectricityService.listAllDataPointElectricityConfig();

            logger.info("数据点个数：" + configList.size());

            for (DataPointElectricityConfig dataPointElectricityConfig : configList) {
                try {
                    // 更新分时电量数据点
                    dataPointService.updateTimeSegmentDataPoint(dataPointElectricityConfig.getDataPoint().getObjectId());

                    // 计算分时电量值
                    dataPointService.updateDataPointTimeSegmentValue(electricityPriceIssue, timeSegmentList, dataPointElectricityConfig.getDataPoint(), false);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        logger.info("完成更新更新数据点分时电量");
    }
}
