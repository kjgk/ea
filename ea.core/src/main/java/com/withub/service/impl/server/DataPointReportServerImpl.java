package com.withub.service.impl.server;

import com.withub.common.enumeration.TimeUnit;
import com.withub.common.util.CollectionUtil;
import com.withub.model.ea.DataPointElectricityConfig;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.service.ea.UserPointDataService;
import com.withub.service.server.DataPointReportServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service("dataPointReportServer")
public class DataPointReportServerImpl implements DataPointReportServer {

    @Autowired
    private UserPointDataService userPointDataService;

    @Autowired
    private DataPointElectricityService dataPointElectricityService;


    @Override
    public List queryUserPointDataReport(String[] dataPoints, Date startTime, Date endTime, TimeUnit timeUnit, Integer precision, String sortType, String[] sectionTypes, String[] incrementTypes) throws Exception {

        return userPointDataService.queryUserPointDataReport(dataPoints, startTime, endTime, timeUnit, precision, sortType, sectionTypes, incrementTypes);
    }

    @Override
    public boolean checkDataPointElectricityPrice(String dataPointId) throws Exception {

        List<DataPointElectricityConfig> list = dataPointElectricityService.listByDataPointId(dataPointId);
        return CollectionUtil.isNotEmpty(list);
    }
}
