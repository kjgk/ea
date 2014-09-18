package com.withub.service.ea;

import com.withub.common.enumeration.TimeUnit;
import com.withub.model.ea.ActualValue;
import com.withub.model.ea.DataPointElectricityPriceInfo;
import com.withub.model.ea.ElectricityPriceInfo;

import java.util.Date;
import java.util.List;

public interface PointDataFetchService {

    public Double fetchLatestActualValue(final String dataPointObjectId) throws Exception;

    public List<ActualValue> fetchPointActualValue(final String dataPointObjectId, final Date startTime, final Date endTime, final TimeUnit timeUnit) throws Exception;

    public List<ActualValue> fetchPointActualValue(final String dataPointObjectId, final Date startTime, final Date endTime, final TimeUnit timeUnit, final Integer precision) throws Exception;

    public ElectricityPriceInfo getElectricityPriceInfo(String dataPointObjectId) throws Exception;

    public List<DataPointElectricityPriceInfo> getElectricityPrice(final String dataPointObjectId, final Date startTime, final Date endTime) throws Exception;

    public List<DataPointElectricityPriceInfo> getElectricityPrice(final String dataPointObjectId, final Date startTime, final Date endTime, final Integer precision) throws Exception;
}
