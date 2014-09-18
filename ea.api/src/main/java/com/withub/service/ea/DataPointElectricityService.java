package com.withub.service.ea;

import com.withub.model.ea.DataPointElectricityConfig;
import com.withub.model.ea.ElectricityPrice;
import com.withub.model.ea.ElectricityUsageCategory;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.util.List;
import java.util.Map;

public interface DataPointElectricityService {

    public ElectricityUsageCategory getRootEntity() throws Exception;

    public ElectricityUsageCategory getElectricityUsageByObjectId(String objectId) throws Exception;

    public void createElectricityUsage(ElectricityUsageCategory electricityUsageCategory) throws Exception;

    public void updateElectricityUsage(ElectricityUsageCategory electricityUsageCategory) throws Exception;

    public void deleteElectricityUsage(String objectId) throws Exception;


    public RecordsetInfo queryDataPointElectricityConfig(QueryInfo queryInfo) throws Exception;

    public DataPointElectricityConfig getDataPointElectricityConfigByObjectId(String objectId) throws Exception;

    public void createDataPointElectricityConfig(DataPointElectricityConfig dataPointElectricityConfig) throws Exception;

    public void saveDataPointElectricityConfigs(String electricityUsageCategoryId, String dataPointIds, String voltageSegmentId) throws Exception;

    public void updateDataPointElectricityConfig(DataPointElectricityConfig dataPointElectricityConfig) throws Exception;

    public void deleteDataPointElectricityConfig(String objectId) throws Exception;

    public List listAllDataPointElectricityConfig() throws Exception;

    public List<Map> buildTimeSegmentElectricityPriceList(String electricityPriceIssueId) throws Exception;

    public List<Map> buildTimeSegmentElectricityPriceList(String electricityPriceIssueId, List<ElectricityPrice> electricityPriceList) throws Exception;

    public List<DataPointElectricityConfig> listByDataPointId(String dataPointId) throws Exception;
}
