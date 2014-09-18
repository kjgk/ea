package com.withub.service.ea;

import com.withub.model.DataExportInfo;
import com.withub.model.ea.DataPoint;
import com.withub.model.ea.ElectricityPrice;
import com.withub.model.ea.ElectricityPriceIssue;
import com.withub.model.ea.UnitOfMeasure;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface DataPointService {

    public RecordsetInfo queryPointData(QueryInfo queryInfo) throws Exception;

    public List<DataPoint> fetchRemoteDataPointList(final String hostIp, final Integer port, final String instanceName,
                                                    final String databaseName, final String username, final String password)
            throws Exception;

    public List<DataPoint> fetchLocalDataPointList(final String databaseTag) throws Exception;

    public List<DataPoint> analogDataPointList(final String nodeId) throws Exception;

    public void saveSelectedDataPoints(List<DataPoint> dataPointList, final String metasysDatabaseId) throws Exception;

    public DataPoint getDataPointById(final String objectId);

    public List<DataPoint> fetchMultiDataPointList(String dataPoints) throws Exception;

    public void createDataPoint(DataPoint dataPoint);

    public void createUserDataPoint(DataPoint dataPoint);

    public void updateDataPoint(DataPoint dataPoint);

    public void deleteDataPoint(final String objectId) throws Exception;

    public List<DataPoint> selectUserDataPoint();

    public List<DataPoint> searchDataPoint(String keyword) throws Exception;

    public List<DataPoint> listByNodeId(String nodeId, int pointDataType, boolean showTimeSegment) throws Exception;

    public String[] importDataPoint(File file, String fileName) throws Exception;

    public DataExportInfo exportDataPoint() throws Exception;

    public void syncUnitOfMeasure() throws Exception;

    public List<ElectricityPrice> listElectricityPriceByDataPointId(String dataPointId, Date date) throws Exception;

    public List<ElectricityPrice> listElectricityPriceByIssueId(String issueId) throws Exception;

    public void deleteTableData() throws Exception;

    public UnitOfMeasure getUnitOfMeasure(final String unitOfMeasureID, final String databaseTag) throws Exception;

    public void updateTimeSegmentDataPoint(String dataPointId) throws Exception;

    public void updateDataPointTimeSegmentValue(String electricityPriceIssueId) throws Exception;

    public void updateDataPointTimeSegmentValue(String electricityPriceIssueId, String dataPointId) throws Exception;

    public void updateDataPointTimeSegmentValue(ElectricityPriceIssue electricityPriceIssue, List<Map> timeSegmentList, DataPoint dataPoint, boolean afresh) throws Exception;
}
