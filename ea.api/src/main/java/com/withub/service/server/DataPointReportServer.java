package com.withub.service.server;


import com.withub.common.enumeration.TimeUnit;

import java.util.Date;
import java.util.List;

public interface DataPointReportServer {

    public List queryUserPointDataReport(String[] dataPoints, Date startTime, Date endTime, TimeUnit timeUnit, Integer precision, String sortType, String[] sectionTypes, String[] incrementTypes) throws Exception;

    public boolean checkDataPointElectricityPrice(String dataPointId) throws Exception;
}
