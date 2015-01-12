package com.withub.service.impl.ea;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.withub.common.util.*;
import com.withub.dao.EntityDao;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.*;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.ConfigurationService;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.service.ea.DataPointService;
import com.withub.service.ea.ElectricityService;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.*;
import java.util.*;
import java.util.Date;

@Service("dataPointService")
@Transactional
public class DataPointServiceImpl implements DataPointService {

    //===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private ConfigurationService configurationService;

    @Autowired
    private ElectricityService electricityService;

    @Autowired
    private DataPointElectricityService dataPointElectricityService;

    private static final Logger logger = LoggerFactory.getLogger(DataPointServiceImpl.class);


    //===================== 接口方法 ========================================================

    public RecordsetInfo queryPointData(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public List<DataPoint> fetchRemoteDataPointList(final String hostIp, final Integer port, final String instanceName,
                                                    final String databaseName, final String username, final String password) throws Exception {

        List<DataPoint> dataPointList = new ArrayList<DataPoint>();

        // 连接数据库
        Connection connection;
        String driverClass = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        String jdbcUrl = "jdbc:sqlserver://%s:%d;databaseName=%s";
        jdbcUrl = String.format(jdbcUrl, hostIp, port, databaseName);
        try {
            Class.forName(driverClass);
            connection = DriverManager.getConnection(jdbcUrl, username, password);
        } catch (Exception e) {
            throw new Exception("数据库连接失败.");
        }

        // 获取数据
        Statement statement = connection.createStatement();
        String sql = "SELECT a.PointID,a.PointName,a.PointDataTypeID,a.UnitOfMeasureID,b.PointSliceID FROM tblPoint a "
                + "inner join tblPointSlice b on a.PointID = b.PointID where b.IsRawData = 1 ORDER BY a.PointName";
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            DataPoint dataPoint = new DataPoint();
            dataPoint.setDataPointId(Integer.parseInt(resultSet.getString(1)));
            dataPoint.setDataPointTag(resultSet.getString(2));
            dataPoint.setPointDataType(Integer.parseInt(resultSet.getString(3)));
            dataPoint.setMeasureUnitId(resultSet.getString(4));
            dataPoint.setDataPointSliceId(Integer.parseInt(resultSet.getString(5)));
            dataPointList.add(dataPoint);
        }

        return dataPointList;
    }

    public List<DataPoint> fetchLocalDataPointList(final String databaseTag) throws Exception {

        String jpql = "select o from " + DataPoint.class.getName() + " o where 1=1"
                + " and o.objectStatus=1 and o.source=1 and o.original=1 and o.databaseTag=? and timeSegment is null"
                + " order by dataPointTag";

        List list = entityDao.listByJpql(jpql, databaseTag);

        return (List<DataPoint>) list;
    }

    public List<DataPoint> analogDataPointList(final String nodeId) throws Exception {

        List<DataPoint> dataPointList = new ArrayList<DataPoint>();
        String sql = "";

        if (nodeId.equals("1")) {
            sql = "select distinct(LEFT(o.DATAPOINTTAG,position(':' in o.DATAPOINTTAG))) DATAPOINTTAG from EA_DataPoint o "
                    + " where 1=1 and o.SOURCE = 1 and o.original = 1 and o.pointDataType = 1 and o.OBJECTSTATUS = 1"
                    + " order by DATAPOINTTAG";
            List dataPoints = entityDao.listBySql(sql);
            for (Object o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                dataPoint.setObjectId(o.toString());
                dataPoint.setName(o.toString().replace(":", ""));
                dataPointList.add(dataPoint);
            }
        } else if (nodeId.split("-").length == 5) {
            return null;
        } else if (nodeId.split("\\.").length == 2) {
            sql = "select o.OBJECTID,o.name,REPLACE(o.DATAPOINTTAG,'" + nodeId + "','') DATAPOINTTAG_,o.DATAPOINTID,o.DATAPOINTTAG,o.TIMESEGMENTID,o.DATABASETAG "
                    + " from EA_DataPoint o where 1=1 and o.DATAPOINTTAG like '" + nodeId + "%' "
                    + " and o.SOURCE = 1 and o.original = 1 and o.pointDataType = 1 and o.OBJECTSTATUS = 1"
                    + " order by o.DATABASETAG, DATAPOINTTAG";
            List<Object[]> dataPoints = entityDao.listBySql(sql);
            Map<String, List> timeSegmentPoints = new HashMap();
            for (Object[] o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                String name = "";
                if (o[1] != null) {
                    name = "(" + o[1].toString() + ")";
                }
                dataPoint.setObjectId(o[0].toString());
                dataPoint.setName(o[2].toString().replace(".Present Value", "") + name);
                dataPoint.setDataPointId(Integer.parseInt(o[3].toString()));
                dataPoint.setDataPointTag(o[4].toString());
                dataPoint.setDatabaseTag(o[6].toString());

                if (o[5] != null) {
                    String key = dataPoint.getDatabaseTag() + "#" + dataPoint.getDataPointId();
                    List points = timeSegmentPoints.get(key);
                    if (points == null) {
                        points = new ArrayList();
                    }
                    points.add(dataPoint);
                    timeSegmentPoints.put(key, points);
                    continue;
                }

                dataPointList.add(dataPoint);
            }

            if (!timeSegmentPoints.isEmpty()) {
                for (DataPoint dataPoint : dataPointList) {
                    String key = dataPoint.getDatabaseTag() + "#" + dataPoint.getDataPointId();
                    if (timeSegmentPoints.containsKey(key)) {
                        dataPoint.setTimeSegmentPointList(timeSegmentPoints.get(key));
                    }
                }
            }
        } else {
            sql = "select distinct(LEFT(o.DATAPOINTTAG,char_length('" + nodeId + "')+"
                    + " position('.' in REPLACE(o.DATAPOINTTAG,'" + nodeId + "','')))) DATAPOINTTAG"
                    + " from EA_DataPoint o where 1=1 and o.SOURCE = 1 and o.original = 1 and o.pointDataType = 1"
                    + " and o.OBJECTSTATUS = 1 and o.DATAPOINTTAG like '" + nodeId + "%'"
                    + " order by DATAPOINTTAG";
            List dataPoints = entityDao.listBySql(sql);
            for (Object o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                dataPoint.setObjectId(o.toString());
                dataPoint.setName(o.toString().replace(nodeId, "").replace(".", ""));
                dataPointList.add(dataPoint);
            }
        }

        return dataPointList;
    }

    public void saveSelectedDataPoints(List<DataPoint> dataPointList, final String metasysDatabaseId) throws Exception {

        if (CollectionUtil.isEmpty(dataPointList)) {
            String jpql = "delete from " + DataPoint.class.getName() + " o where o.source=1 and o.metasysDatabase.objectId=?";
            entityDao.executeJpql(jpql, metasysDatabaseId);
        }

        MetasysDatabase metasysDatabase = entityDao.getObject(MetasysDatabase.class, metasysDatabaseId);

        /*
        *  在重新选择数据点时:
        *  1.可能已经存在编辑过名称的数据点,所以不能做全删全增操作
        *  2.如果删除数据点,则必须删除基于该数据点的组合点
          */

        List<DataPoint> localDataPointList = fetchLocalDataPointList(metasysDatabase.getDatabaseTag());
        if (CollectionUtil.isEmpty(localDataPointList)) {
            for (DataPoint dataPoint : dataPointList) {
                dataPoint.setObjectId(StringUtil.getUuid());
                dataPoint.setPointDataValueType(0);
                dataPoint.setOriginal(1);
                dataPoint.setSource(1);
                dataPoint.setDatabaseTag(metasysDatabase.getDatabaseTag());
                dataPoint.setMetasysDatabase(metasysDatabase);
                dataPoint.setCreateTime(DateUtil.getCurrentTime());
                dataPoint.setLastUpdateTime(DateUtil.getCurrentTime());
                dataPoint.setObjectStatus(1);
                entityDao.save(dataPoint);
            }
        } else {
            for (DataPoint dataPoint : dataPointList) {
                boolean find = false;
                for (DataPoint localDataPoint : localDataPointList) {
                    if (localDataPoint.getDataPointId().intValue() == dataPoint.getDataPointId().intValue()) {
                        if (dataPoint.getDataPointSliceId() != null) {
                            //更新dataPointSliceId
                            localDataPoint.setDataPointSliceId(dataPoint.getDataPointSliceId());
                            entityDao.save(localDataPoint);
                        }
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    dataPoint.setObjectId(StringUtil.getUuid());
                    dataPoint.setPointDataValueType(0);
                    dataPoint.setOriginal(1);
                    dataPoint.setSource(1);
                    dataPoint.setDatabaseTag(metasysDatabase.getDatabaseTag());
                    dataPoint.setMetasysDatabase(metasysDatabase);
                    dataPoint.setCreateTime(DateUtil.getCurrentTime());
                    dataPoint.setLastUpdateTime(DateUtil.getCurrentTime());
                    dataPoint.setObjectStatus(1);
                    entityDao.save(dataPoint);
                }
            }

            // 处理删除的数据点
            for (DataPoint localDataPoint : localDataPointList) {
                boolean find = false;
                for (DataPoint dataPoint : dataPointList) {
                    if (localDataPoint.getDataPointId().intValue() == dataPoint.getDataPointId().intValue()) {
                        find = true;
                        break;
                    }
                }
                if (!find) {
                    String jpql = "delete from " + DataPoint.class.getName() + " o where o.source=1"
                            + " and o.original=0 and metasysDatabase.objectId=? and o.dataPointTag like ?";
                    entityDao.executeJpql(jpql, metasysDatabaseId, "%" + localDataPoint.getDataPointTag() + "%");
                    entityDao.logicDelete(localDataPoint);
                }
            }
        }
    }

    public DataPoint getDataPointById(final String objectId) {

        return entityDao.getObject(DataPoint.class, objectId);
    }

    public List<DataPoint> fetchMultiDataPointList(String dataPoints) throws Exception {

        JSONArray dataPointArray = JSON.parseArray(dataPoints);
        List<DataPoint> dataPointList = new ArrayList();
        for (int i = 0; i < dataPointArray.size(); i++) {

            String dataPointId = (String) dataPointArray.get(i);
            DataPoint dataPoint = entityDao.getObject(DataPoint.class, dataPointId);
            dataPointList.add(dataPoint);
        }
        return dataPointList;
    }

    public void createUserDataPoint(DataPoint dataPoint) {

        Integer nextDataPointId = 600001;
        Integer maxDataPointId = null;
        try {
            String sql = "select max(o.dataPointId) from " + DataPoint.class.getName() + " o where o.source=2";
            maxDataPointId = entityDao.getObject(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (maxDataPointId != null) {
            nextDataPointId = maxDataPointId + 1;
        }

        dataPoint.setObjectId(StringUtil.getUuid());
        dataPoint.setDataPointId(nextDataPointId);
        dataPoint.setDataPointSliceId(nextDataPointId);
        dataPoint.setDatabaseTag("UserDataPoint");
        dataPoint.setPinYin(AlphabetUtil.getAlphabetList(dataPoint.getName()));
        dataPoint.setCreateTime(DateUtil.getCurrentTime());
        dataPoint.setLastUpdateTime(DateUtil.getCurrentTime());
        dataPoint.setObjectStatus(1);
        entityDao.save(dataPoint);

    }

    public void createDataPoint(DataPoint dataPoint) {

        dataPoint.setObjectId(StringUtil.getUuid());
        dataPoint.setPinYin(AlphabetUtil.getAlphabetList(dataPoint.getName()));
        MetasysDatabase metasysDatabase = entityDao.getObject(MetasysDatabase.class, dataPoint.getMetasysDatabase().getObjectId());
        dataPoint.setDatabaseTag(metasysDatabase.getDatabaseTag());
        dataPoint.setCreateTime(DateUtil.getCurrentTime());
        dataPoint.setLastUpdateTime(DateUtil.getCurrentTime());
        dataPoint.setObjectStatus(1);
        entityDao.save(dataPoint);
    }

    public void updateDataPoint(DataPoint dataPoint) {

        DataPoint oldDataPoint = getDataPointById(dataPoint.getObjectId());
        dataPoint.setPinYin(AlphabetUtil.getAlphabetList(dataPoint.getName()));
        dataPoint.setDataPointId(oldDataPoint.getDataPointId());
        if (dataPoint.getSource() == 2) {
            dataPoint.setDataPointSliceId(oldDataPoint.getDataPointSliceId() == null ? oldDataPoint.getDataPointId() : oldDataPoint.getDataPointSliceId());
        } else {
            dataPoint.setDataPointSliceId(oldDataPoint.getDataPointSliceId());
        }
        if (dataPoint.getMetasysDatabase() != null) {
            MetasysDatabase metasysDatabase = entityDao.getObject(MetasysDatabase.class, dataPoint.getMetasysDatabase().getObjectId());
            dataPoint.setDatabaseTag(metasysDatabase.getDatabaseTag());
        } else {
            dataPoint.setMetasysDatabase(oldDataPoint.getMetasysDatabase());
            dataPoint.setDatabaseTag(oldDataPoint.getDatabaseTag());
        }

        dataPoint.setTimeSegment(oldDataPoint.getTimeSegment());
        dataPoint.setCreateTime(oldDataPoint.getCreateTime());
        dataPoint.setMeasureUnitId(oldDataPoint.getMeasureUnitId());
        dataPoint.setLastUpdateTime(DateUtil.getCurrentTime());
        dataPoint.setObjectStatus(1);
        entityDao.update(dataPoint);
    }

    public void deleteDataPoint(final String objectId) throws Exception {

        DataPoint dataPoint = getDataPointById(objectId);
        if (dataPoint.getOriginal() == 1) {
            String jpql = "delete from " + DataPoint.class.getName() + " o where o.source=1"
                    + " and o.original=0 and o.dataPointTag like '%" + dataPoint.getDataPointTag() + "%'";
            entityDao.executeJpql(jpql);
        }

        entityDao.logicDelete(DataPoint.class, objectId);
    }

    public List<DataPoint> selectUserDataPoint() {

        String jpql = "select o from " + DataPoint.class.getName() + " o where o.objectStatus = 1 order by o.name asc";
//        String jpql = "select o from " + DataPoint.class.getName() + " o where o.source=2 order by o.name asc";
        return entityDao.listByJpql(jpql);
    }

    public List<DataPoint> searchDataPoint(String keyword) throws Exception {

        String jpql = "select o  from  " + DataPoint.class.getName() + " o  where o.name like ? or o.pinYin like ?" +
                "  or  o.dataPointTag like ? and o.objectStatus = 1 and  o.source=1 order by o.name";

        return entityDao.listByJpql(jpql, "%" + keyword + "%", keyword + "%", "%" + keyword + "%");
    }

    public List<DataPoint> listByNodeId(String nodeId, int pointDataType, boolean showTimeSegment) throws Exception {

        List<DataPoint> dataPointList = new ArrayList<DataPoint>();
        String sql = "";

        if (nodeId.equals("1")) {
            sql = "select distinct(LEFT(o.DATAPOINTTAG,position(':' in o.DATAPOINTTAG))) DATAPOINTTAG from EA_DataPoint o where 1=1"
                    + " and o.SOURCE = 1 and o.original = 1 and o.pointDataType = 1 and o.OBJECTSTATUS = 1"
                    + " order by DATAPOINTTAG";

            List dataPoints = entityDao.listBySql(sql);
            for (Object o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                dataPoint.setObjectId(o.toString());
                dataPoint.setDataPointTag(o.toString().replace(":", ""));
                dataPointList.add(dataPoint);
            }

            DataPoint dataPoint = new DataPoint();
            dataPoint.setObjectId("DeviceSwitchDataPoint");
            dataPoint.setDataPointTag("设备开关机数据点");
            dataPointList.add(dataPoint);
        } else if (nodeId.equals("DeviceSwitchDataPoint")) {
            sql = "select distinct(LEFT(o.DATAPOINTTAG,position(':' in o.DATAPOINTTAG))) DATAPOINTTAG from EA_DataPoint o where 1=1"
                    + " and o.SOURCE = 1 and o.original = 1 and o.pointDataType = 2 and o.OBJECTSTATUS = 1"
                    + " order by DATAPOINTTAG";
            List dataPoints = entityDao.listBySql(sql);
            for (Object o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                dataPoint.setObjectId(o.toString());
                dataPoint.setDataPointTag(o.toString().replace(":", ""));
                dataPointList.add(dataPoint);
            }
        } else if (nodeId.equals("2")) {
            String jpql = "select o from " + DataPoint.class.getName() + " o where 1=1"
                    + " and o.objectStatus = 1 and (o.source = 2 or o.original = 0)"
                    + " order by o.name";
            List<DataPoint> dataPoints = entityDao.listByJpql(jpql);
            for (DataPoint o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                dataPoint.setObjectId(o.getObjectId());
                dataPoint.setDataPointTag(o.getName());
                dataPoint.setPointDataValueType(o.getPointDataValueType());
                dataPointList.add(dataPoint);
            }
        } else if (nodeId.length() == 36 && nodeId.split("-").length == 5) {
            return null;
        } else if (nodeId.split("\\.").length == 2) {
            sql = "select o.OBJECTID,o.name,REPLACE(o.DATAPOINTTAG,'" + nodeId + "','') DATAPOINTTAG, o.POINTDATAVALUETYPE "
                    + " from EA_DataPoint o where 1=1 and o.SOURCE = 1 and o.original = 1 "
                    + " and o.DATAPOINTTAG like '" + nodeId + "%' and o.pointDataType = " + pointDataType
                    + (showTimeSegment ? "" : " and o.TIMESEGMENTID is null")
                    + " and o.OBJECTSTATUS = 1"
                    + " order by DATABASETAG, DATAPOINTTAG";
            List<Object[]> dataPoints = entityDao.listBySql(sql);
            for (Object[] o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                String name = "";
                if (o[1] != null) {
                    name = "(" + o[1].toString() + ")";
                }
                dataPoint.setObjectId(o[0].toString());
                dataPoint.setDataPointTag(o[2].toString().replace(".Present Value", "") + name);
                dataPoint.setPointDataValueType(Integer.parseInt(o[3].toString()));
                dataPointList.add(dataPoint);
            }
        } else {
            sql = "select distinct(LEFT(o.DATAPOINTTAG,char_length('" + nodeId + "')+"
                    + " position('.' in REPLACE(o.DATAPOINTTAG,'" + nodeId + "','')))) DATAPOINTTAG"
                    + " from EA_DataPoint o where 1=1 and o.SOURCE = 1 and o.original = 1 "
                    + " and o.DATAPOINTTAG like '" + nodeId + "%' and o.pointDataType = " + pointDataType
                    + " and o.OBJECTSTATUS = 1 order by DATAPOINTTAG";
            List dataPoints = entityDao.listBySql(sql);
            for (Object o : dataPoints) {
                DataPoint dataPoint = new DataPoint();
                dataPoint.setObjectId(o.toString());
                dataPoint.setDataPointTag(o.toString().replace(nodeId, "").replace(".", ""));
                dataPointList.add(dataPoint);
            }
        }

        return dataPointList;
    }

    public String[] importDataPoint(File file, String fileName) throws Exception {

        List property = getProperty();
        Workbook workbook = null;
        String fileType = FileUtil.getFileExtension(fileName);
        if (fileType.equalsIgnoreCase("xls")) {
            workbook = new HSSFWorkbook(new FileInputStream(file));
        } else {
            workbook = new XSSFWorkbook(new FileInputStream(file));
        }
        String[] result = {"", ""};
        Sheet sheet = workbook.getSheetAt(0);
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
            DataPoint dataPoint = new DataPoint();
            Row row = sheet.getRow(i);
            for (Element element : (List<Element>) property) {
                int cellIndex = Integer.parseInt(element.attributeValue("cellIndex"));
                String cellName = element.attributeValue("cellName");
                if (StringUtil.compareValue(cellName, "dataPointId")) {
                    if (row.getCell(cellIndex) == null || row.getCell(cellIndex).getCellType() != 0) {
                        result[0] += "," + (i + 1);
                        break;
                    } else {
                        ReflectionUtil.setFieldValue(dataPoint, cellName, (int) row.getCell(cellIndex).getNumericCellValue());
                    }
                }
                if (StringUtil.compareValue(cellName, "dataPointSliceId")) {
                    if (row.getCell(cellIndex) == null || row.getCell(cellIndex).getCellType() != 0) {
                        result[0] += "," + (i + 1);
                        break;
                    } else {
                        ReflectionUtil.setFieldValue(dataPoint, cellName, (int) row.getCell(cellIndex).getNumericCellValue());
                    }
                } else if (StringUtil.compareValue(cellName, "dataPointTag")) {
                    ReflectionUtil.setFieldValue(dataPoint, cellName, row.getCell(cellIndex) == null ? "" : row.getCell(cellIndex).getCellType() == 0 ? String.valueOf(row.getCell(cellIndex).getNumericCellValue()) : row.getCell(cellIndex).getStringCellValue());
                } else if (StringUtil.compareValue(cellName, "name")) {
                    ReflectionUtil.setFieldValue(dataPoint, cellName, row.getCell(cellIndex) == null ? "" : row.getCell(cellIndex).getCellType() == 0 ? String.valueOf(row.getCell(cellIndex).getNumericCellValue()) : row.getCell(cellIndex).getStringCellValue());
                } else if (StringUtil.compareValue(cellName, "pointDataType")) {
                    if (row.getCell(cellIndex) == null || row.getCell(cellIndex).getCellType() == 0) {
                        result[0] += "," + (i + 1);
                        break;
                    } else {
                        String value = row.getCell(cellIndex).getStringCellValue().replace(" ", "");
                        if (value.equals("布尔") || value.equals("模拟")) {
                            ReflectionUtil.setFieldValue(dataPoint, cellName, value.equals("布尔") ? 2 : 1);
                        } else {
                            result[0] += "," + (i + 1);
                            break;
                        }
                    }
                } else if (StringUtil.compareValue(cellName, "pointDataValueType")) {
                    if (row.getCell(cellIndex) == null || row.getCell(cellIndex).getCellType() == 0) {
                        result[0] += "," + (i + 1);
                        break;
                    } else {
                        String value = row.getCell(cellIndex).getStringCellValue().replace(" ", "");
                        if (value.equals("区间值") || value.equals("累计值") || value.equals("未知")) {
                            ReflectionUtil.setFieldValue(dataPoint, cellName, value.equals("区间值") ? 1 : value.equals("累计值") ? 2 : 0);
                        } else {
                            result[0] += "," + (i + 1);
                            break;
                        }
                    }
                } else if (StringUtil.compareValue(cellName, "measureUnit")) {
                    ReflectionUtil.setFieldValue(dataPoint, cellName, (row.getCell(cellIndex) == null || row.getCell(cellIndex).getCellType() == 0) ? "" : row.getCell(cellIndex).getStringCellValue().replace(" ", ""));
                } else if (StringUtil.compareValue(cellName, "original")) {
                    if (row.getCell(cellIndex) == null || row.getCell(cellIndex).getCellType() == 0) {
                        result[0] += "," + (i + 1);
                        break;
                    } else {
                        String value = row.getCell(cellIndex).getStringCellValue().replace(" ", "");
                        if (value.equals("原始")) {
                            ReflectionUtil.setFieldValue(dataPoint, cellName, value.equals("原始") ? 1 : 0);
                        } else {
                            result[0] += "," + (i + 1);
                            break;
                        }
                    }
                } else if (StringUtil.compareValue(cellName, "databaseTag")) {
                    ReflectionUtil.setFieldValue(dataPoint, cellName, row.getCell(cellIndex) == null ? "" : row.getCell(cellIndex).getCellType() == 0 ? String.valueOf(row.getCell(cellIndex).getNumericCellValue()) : row.getCell(cellIndex).getStringCellValue());
                }
            }
            if (dataPoint.getDataPointId() != null && dataPoint.getDataPointSliceId() != null && dataPoint.getOriginal() != null && dataPoint.getPointDataType() != null && dataPoint.getPointDataValueType() != null && dataPoint.getDatabaseTag() != null) {
                String jpql = "select o from " + DataPoint.class.getName() + " o where 1=1 and o.dataPointId = ?  and o.databaseTag=? and o.objectStatus = 1 ";
                DataPoint oldDataPoint = entityDao.getObject(jpql, dataPoint.getDataPointId(), dataPoint.getDatabaseTag());
                if (oldDataPoint == null) {
                    result[1] += "," + (i + 1);
                } else {
                    oldDataPoint.setName(dataPoint.getName());
                    oldDataPoint.setDataPointSliceId(dataPoint.getDataPointSliceId());
                    oldDataPoint.setPointDataType(dataPoint.getPointDataType());
                    oldDataPoint.setPointDataValueType(dataPoint.getPointDataValueType());
                    oldDataPoint.setMeasureUnit(dataPoint.getMeasureUnit());
                    oldDataPoint.setOriginal(dataPoint.getOriginal());
                    oldDataPoint.setDatabaseTag(dataPoint.getDatabaseTag());
                    entityDao.save(oldDataPoint);
                }
            }
        }
        return result;
    }

    public DataExportInfo exportDataPoint() throws Exception {

        String jpql = "select o from " + DataPoint.class.getName() + " o where 1=1 and o.source = 1 and o.original = 1 and o.timeSegment is null and o.objectStatus = 1 order by o.dataPointTag";
        List<DataPoint> dataPointList = entityDao.listByJpql(jpql);

        if (CollectionUtil.isEmpty(dataPointList)) {
            return null;
        }
        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");
        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;
        try {
            String templateFileName = DataPointServiceImpl.class.getResource("/config/template/DataPoint.xls").getFile();
            fileInputStream = new FileInputStream(templateFileName);
            HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);
            HSSFSheet sheet = workbook.getSheetAt(0);
            int rowIndex = 1;
            for (DataPoint dataPoint : dataPointList) {
                int cellIndex = 0;
                HSSFRow row = sheet.createRow(rowIndex);
                row.createCell(cellIndex++).setCellValue(dataPoint.getDataPointId());
                row.createCell(cellIndex++).setCellValue(dataPoint.getDataPointSliceId());
                row.createCell(cellIndex++).setCellValue(dataPoint.getDataPointTag());
                row.createCell(cellIndex++).setCellValue(dataPoint.getName());
                row.createCell(cellIndex++).setCellValue(dataPoint.getPointDataType() == 1 ? "模拟" : "布尔");
                row.createCell(cellIndex++).setCellValue(dataPoint.getPointDataValueType() == 1 ? "区间值" : dataPoint.getPointDataValueType() == 2 ? "累计值" : "未知");
                if (dataPoint.getMeasureUnit() != null) {
                    row.createCell(cellIndex++).setCellValue(dataPoint.getMeasureUnit());
                } else {
                    UnitOfMeasure unitOfMeasure = getUnitOfMeasure(dataPoint.getMeasureUnitId(), dataPoint.getDatabaseTag());
                    row.createCell(cellIndex++).setCellValue(StringUtil.isEmpty(unitOfMeasure.getDisplayNameShort()) ? "" : unitOfMeasure.getDisplayNameShort());
                }
                row.createCell(cellIndex++).setCellValue(dataPoint.getOriginal() == 0 ? "组合" : "原始");
                row.createCell(cellIndex++).setCellValue(dataPoint.getDatabaseTag());
                rowIndex++;
            }

            String tempFileName = StringUtil.getUuid();
            File file = new File(systemConfigInfo.getTempDirectory() + "/" + tempFileName);
            fileOutputStream = new FileOutputStream(file);
            workbook.write(fileOutputStream);
            fileOutputStream.flush();
            fileOutputStream.close();

            DataExportInfo dataExportInfo = new DataExportInfo();
            dataExportInfo.setTempFileName(tempFileName);
            dataExportInfo.setType(DataPoint.class.getSimpleName());
            dataExportInfo.setFileName("系统原始数据点" + DateUtil.getDateFormatString(new Date(), "yyyyMMdd") + ".xls");
            return dataExportInfo;
        } catch (Exception e) {
            throw e;
        } finally {
            if (fileInputStream != null) {
                fileInputStream.close();
            }
            if (fileOutputStream != null) {
                fileOutputStream.flush();
                fileOutputStream.close();
            }
        }
    }

    public void syncUnitOfMeasure() throws Exception {

        String jpql = "select o from " + MetasysDatabase.class.getName() + " o where 1=1 and o.objectStatus = 1 order by o.createTime desc";
        List<MetasysDatabase> list = entityDao.listByJpql(jpql);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        entityDao.executeSql("delete from ea_measureunit");
        for (MetasysDatabase metasysDatabase : list) {
            syncUnitOfMeasure(metasysDatabase);
        }
    }

    public List<ElectricityPrice> listElectricityPriceByIssueId(String issueId) throws Exception {

        String jpql = "select o from " + ElectricityPrice.class.getName() + " o where 1=1 and o.electricityPriceIssue.objectId = ?";
        return entityDao.listByJpql(jpql, issueId);
    }

    public List<ElectricityPrice> listElectricityPriceByDataPointId(String dataPointId, Date date) throws Exception {

        List<ElectricityPrice> electricityPriceList = new ArrayList<ElectricityPrice>();
        String jpql = "select o from " + ElectricityPriceIssue.class.getName() + " o where 1=1 and ? between o.startDate and o.endDate and o.objectStatus = 1";
        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(jpql, DateUtil.convertStringToDate(DateUtil.getStandardDateString(date), DateUtil.STANDARD_DATE_FORMAT));
        DataPointElectricityConfig dataPointElectricityConfig = entityDao.getByPropertyValue(DataPointElectricityConfig.class, "dataPoint.objectId", dataPointId);
        if (electricityPriceIssue != null && dataPointElectricityConfig != null) {
            jpql = "select o from " + ElectricityPrice.class.getName() + " o where 1=1 and o.electricityUsageCategory.objectId = ? and o.voltageSegment.objectId = ? and o.electricityPriceIssue.objectId = ? order by o.electricityPriceTimeSegment.orderNo";
            electricityPriceList = entityDao.listByJpql(jpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
        }
        return electricityPriceList;
    }

    public void deleteTableData() throws Exception {

        String querySql = "select relname from pg_class where relname like 'ea_pointactualvalue2%' order by relname DESC";
        String updateSql = "truncate table ";

        List list = entityDao.listBySql(querySql);

        for (String tableName : (List<String>) list) {
            entityDao.executeSql(updateSql + "pav." + tableName);
        }
    }

    public UnitOfMeasure getUnitOfMeasure(final String unitOfMeasureID, final String databaseTag) throws Exception {

        String jpql = "select o from " + UnitOfMeasure.class.getName() + " o where 1=1 and o.unitOfMeasureID=? and o.databaseTag=?";
        UnitOfMeasure unitOfMeasure = entityDao.getObject(jpql, unitOfMeasureID, databaseTag);
        return unitOfMeasure;
    }

    //==================================私有方法===============================
    private List getProperty() {

        String fileName = DataPointServiceImpl.class.getResource("/config/dataPoint.xml").getFile();
        File inputXml = new File(fileName);
        SAXReader saxReader = new SAXReader();
        Document document = null;
        try {
            document = saxReader.read(inputXml);
        } catch (DocumentException e) {
            e.printStackTrace();
        }
        Element root = document.getRootElement();
        Element source = root.element("source");
        List property = source.elements();

        return property;
    }

    private void syncUnitOfMeasure(MetasysDatabase metasysDatabase) throws Exception {

        // 连接数据库
        Connection connection;
        String driverClass = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        String jdbcUrl = "jdbc:sqlserver://%s:%d;databaseName=%s";
        jdbcUrl = String.format(jdbcUrl, metasysDatabase.getHostIp(), metasysDatabase.getPort(), metasysDatabase.getDatabaseName());
        try {
            Class.forName(driverClass);
            connection = DriverManager.getConnection(jdbcUrl, metasysDatabase.getUserName(), metasysDatabase.getPassword());
        } catch (Exception e) {
            throw new Exception("数据库连接失败.");
        }

        // 获取数据
        Statement statement = connection.createStatement();
        String sql = "SELECT UnitOfMeasureID,UnitOfMeasureName,MeasureType,DisplayNameShort,DisplayNameSingular,DisplayNamePlural FROM tblUnitOfMeasure ORDER BY UnitOfMeasureID";
        ResultSet resultSet = statement.executeQuery(sql);
        while (resultSet.next()) {
            UnitOfMeasure unitOfMeasure = new UnitOfMeasure();
            unitOfMeasure.setObjectId(StringUtil.getUuid());
            unitOfMeasure.setUnitOfMeasureID(resultSet.getString(1));
            unitOfMeasure.setUnitOfMeasureName(resultSet.getString(2));
            unitOfMeasure.setMeasureType(resultSet.getString(3));
            unitOfMeasure.setDisplayNameShort(resultSet.getString(4));
            unitOfMeasure.setDisplayNameSingular(resultSet.getString(5));
            unitOfMeasure.setDisplayNamePlural(resultSet.getString(6));
            unitOfMeasure.setDatabaseTag(metasysDatabase.getDatabaseTag());
            entityDao.save(unitOfMeasure);
        }
        connection.close();
    }

    /**
     * 更新分时电量
     *
     * @param electricityPriceIssueId
     * @throws Exception
     */
    public void updateDataPointTimeSegmentValue(String electricityPriceIssueId) throws Exception {

        List<DataPointElectricityConfig> configList = dataPointElectricityService.listAllDataPointElectricityConfig();

        List<DataPoint> dataPointList = new ArrayList<DataPoint>();
        for (DataPointElectricityConfig dataPointElectricityConfig : configList) {
            if (!dataPointList.contains(dataPointElectricityConfig.getDataPoint())) {
                dataPointList.add(dataPointElectricityConfig.getDataPoint());
            }
        }

        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(ElectricityPriceIssue.class, electricityPriceIssueId);
        List<Map> timeSegmentList = dataPointElectricityService.buildTimeSegmentElectricityPriceList(electricityPriceIssueId);

        int successCount = 0;
        int errorCount = 0;
        logger.debug("开始计算数据点分时电量，数据点个数" + dataPointList.size());
        for (int i = 0; i < dataPointList.size(); i++) {
            DataPoint dataPoint = dataPointList.get(i);
            try {
                updateDataPointTimeSegmentValue(electricityPriceIssue, timeSegmentList, dataPoint, true);
                logger.debug("数据点“" + dataPoint.getDataPointTag() + "”分时电量计算完成，" + (i + 1) + "/" + dataPointList.size());
                successCount++;
            } catch (Exception e) {
                e.printStackTrace();
                errorCount++;
            }
        }
        logger.debug("数据点分时电量计算完成，成功" + successCount + "个，失败" + errorCount + "个");
    }

    /**
     * 更新分时电量数据点
     *
     * @param dataPointId
     */
    public void updateTimeSegmentDataPoint(String dataPointId) throws Exception {

        DataPoint dataPoint = entityDao.getObject(DataPoint.class, dataPointId);

        List<DataPoint> timeSegmentDataPointList = entityDao.listByJpql("from " + DataPoint.class.getName()
                + " where 1=1 and databaseTag = ? and dataPointId = ? and timeSegment is not null", dataPoint.getDatabaseTag(), dataPoint.getDataPointId());

        // 新增的分时段
        for (ElectricityPriceTimeSegment electricityPriceTimeSegment : electricityService.getAllElectricityPriceTimeSegment()) {
            int result = 1;
            for (DataPoint timeSegmentDataPoint : timeSegmentDataPointList) {
                if (StringUtil.compareValue(electricityPriceTimeSegment.getObjectId(), timeSegmentDataPoint.getTimeSegment().getObjectId())) {
                    result = 0;
                    break;
                }
            }

            if (result == 1) {
                DataPoint temp = new DataPoint();
                temp.setObjectId(StringUtil.getUuid());
                temp.setTimeSegment(electricityPriceTimeSegment);
                temp.setDatabaseTag(dataPoint.getDatabaseTag());
                temp.setSource(dataPoint.getSource());
                temp.setOriginal(dataPoint.getOriginal());
                temp.setMeasureUnit(dataPoint.getMeasureUnit());
                temp.setMeasureUnitId(dataPoint.getMeasureUnitId());
                temp.setMetasysDatabase(dataPoint.getMetasysDatabase());
                temp.setPointDataType(dataPoint.getPointDataType());
                temp.setPointDataValueType(dataPoint.getPointDataValueType());
                temp.setDataPointId(dataPoint.getDataPointId());
                temp.setDataPointSliceId(dataPoint.getDataPointSliceId());
                temp.setName((StringUtil.isEmpty(dataPoint.getName()) ? dataPoint.getDataPointTag() : dataPoint.getName())
                        + "【" + electricityPriceTimeSegment.getName() + "】");
                temp.setDataPointTag(dataPoint.getDataPointTag() + "#" + electricityPriceTimeSegment.getTag());
                temp.setPinYin(AlphabetUtil.getAlphabetList(dataPoint.getName()));
                temp.setCreateTime(DateUtil.getCurrentTime());
                temp.setLastUpdateTime(DateUtil.getCurrentTime());
                temp.setObjectStatus(1);
                logger.debug("新增分时电量数据点：" + dataPoint.getName());
                entityDao.save(temp);
            }
        }

        // 删除的分时段
        for (DataPoint timeSegmentDataPoint : timeSegmentDataPointList) {
            int result = 1;
            for (ElectricityPriceTimeSegment electricityPriceTimeSegment : electricityService.getAllElectricityPriceTimeSegment()) {
                if (StringUtil.compareValue(electricityPriceTimeSegment.getObjectId(), timeSegmentDataPoint.getTimeSegment().getObjectId())) {
                    result = 0;
                    break;
                }
            }

            if (result == 1) {
                logger.debug("删除分时电量数据点：" + dataPoint.getName());
                deleteDataPoint(timeSegmentDataPoint.getObjectId());
            }
        }
    }

    /**
     * 更新单个数据点分时电量
     *
     * @param electricityPriceIssueId
     * @param dataPointId
     * @throws Exception
     */
    public void updateDataPointTimeSegmentValue(String electricityPriceIssueId, String dataPointId) throws Exception {

        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(ElectricityPriceIssue.class, electricityPriceIssueId);

        List<Map> timeSegmentList = dataPointElectricityService.buildTimeSegmentElectricityPriceList
                (electricityPriceIssueId, listElectricityPriceByDataPointId(dataPointId, electricityPriceIssue.getStartDate()));
        DataPoint dataPoint = entityDao.getObject(DataPoint.class, dataPointId);

        updateTimeSegmentDataPoint(dataPointId);

        updateDataPointTimeSegmentValue(electricityPriceIssue, timeSegmentList, dataPoint, true);
    }

    public void updateDataPointTimeSegmentValue(ElectricityPriceIssue electricityPriceIssue, List<Map> timeSegmentList, DataPoint dataPoint, boolean afresh) throws Exception {

        List<Object[]> pointIncrementValueList;
        Map<String, Double> timeSegmentActualValues = new HashMap();
        Double maxIncrementValue = 0d;
        if (afresh) {
            pointIncrementValueList = entityDao.listBySql("select UtcDateTime, PointId, DataBaseTag, IncrementValue from ea_pointactualvalue"
                    + " where 1=1 and pointId = ? and databaseTag = ? and utcDateTime >= ? and utcDateTime <= ? order by utcDateTime"
                    , dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(electricityPriceIssue.getStartDate().getTime()), new Timestamp(DateUtil.getEndDate(electricityPriceIssue.getEndDate()).getTime()));

            if (CollectionUtil.isNotEmpty(pointIncrementValueList)) {
                for (ElectricityPriceTimeSegment electricityPriceTimeSegment : electricityService.getAllElectricityPriceTimeSegment()) {
                    timeSegmentActualValues.put(electricityPriceTimeSegment.getObjectId(), 0d);
                }
            }
        } else {
            pointIncrementValueList = entityDao.listBySql("select UtcDateTime, PointId, DataBaseTag, IncrementValue from ea_pointactualvalue"
                    + " where 1=1 and pointId = ? and databaseTag = ? and utcDateTime >= ? and utcDateTime <= ? and timesegmenttag is null order by utcDateTime"
                    , dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(electricityPriceIssue.getStartDate().getTime()), new Timestamp(DateUtil.getEndDate(electricityPriceIssue.getEndDate()).getTime()));

            if (CollectionUtil.isNotEmpty(pointIncrementValueList)) {
                List<Object[]> list = entityDao.listBySql("select timesegmenttag, max(IncrementValue) maxincrementvalue, max(timesegmentactualvalue) maxtimesegmentactualvalue"
                        + " from ea_pointactualvalue"
                        + " where 1=1 and pointId = ? and databaseTag = ? and utcDateTime >= ? and utcDateTime <= ? and timesegmenttag is not null"
                        + " group by timesegmenttag"
                        , dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(electricityPriceIssue.getStartDate().getTime()), new Timestamp(DateUtil.getEndDate(electricityPriceIssue.getEndDate()).getTime()));

                for (Object[] objects : list) {
                    maxIncrementValue = Math.max(maxIncrementValue, new Double(objects[1].toString()));
                }
                for (ElectricityPriceTimeSegment electricityPriceTimeSegment : electricityService.getAllElectricityPriceTimeSegment()) {
                    for (Object[] objects : list) {
                        if (StringUtil.compareValue(electricityPriceTimeSegment.getTag(), (String) objects[0])) {
                            timeSegmentActualValues.put(electricityPriceTimeSegment.getObjectId(), new Double(objects[2].toString()));
                            break;
                        }
                    }
                    if (!timeSegmentActualValues.containsKey(electricityPriceTimeSegment.getObjectId())) {
                        timeSegmentActualValues.put(electricityPriceTimeSegment.getObjectId(), 0d);
                    }
                }
            }
        }

        if (CollectionUtil.isNotEmpty(pointIncrementValueList)) {

            logger.info("计算数据点“" + dataPoint.getDataPointTag() + "”分时电量，记录总数：" + pointIncrementValueList.size());

            for (int i = 0; i < pointIncrementValueList.size(); i++) {
                Object[] data = pointIncrementValueList.get(i);
                Date utcDatetime = (Date) data[0];
                Double incrementValue = Double.parseDouble(data[3].toString());
                Double increment;
                if (afresh) {
                    increment = i == 0 ? 0 : (incrementValue - Double.parseDouble(pointIncrementValueList.get(i - 1)[3].toString()));
                } else {
                    if (maxIncrementValue == 0d && i == 0) {
                        increment = 0d;
                    } else {
                        increment = incrementValue - (i == 0 ? maxIncrementValue : Double.parseDouble(pointIncrementValueList.get(i - 1)[3].toString()));
                    }
                }

                if (increment < 0) {
                    increment = incrementValue;
                }

                for (Map timeSegment : timeSegmentList) {
                    Long start = (Long) timeSegment.get("start");
                    Long end = (Long) timeSegment.get("end");
                    ElectricityPrice electricityPrice = (ElectricityPrice) timeSegment.get("electricityPrice");

                    if (utcDatetime.getTime() > start && utcDatetime.getTime() <= end) {
                        Double value = timeSegmentActualValues.get(electricityPrice.getElectricityPriceTimeSegment().getObjectId());
                        value += increment;
                        timeSegmentActualValues.put(electricityPrice.getElectricityPriceTimeSegment().getObjectId(), value);
                        entityDao.executeSql("update ea_pointactualvalue set timesegmenttag = ?, timesegmentactualvalue = ?" +
                                " where pointid = ? and databasetag = ? and utcdatetime = ?"
                                , electricityPrice.getElectricityPriceTimeSegment().getTag(), value, data[1], data[2], utcDatetime);
                        break;
                    }
                }
            }

            logger.info("数据点“" + dataPoint.getDataPointTag() + "”分时电量计算完成");
        }
    }
}
