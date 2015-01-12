package com.withub.service.impl.ea;

import com.withub.common.enumeration.TimeUnit;
import com.withub.common.util.*;
import com.withub.common.util.DateUtil;
import com.withub.dao.EntityDao;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.*;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.*;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.Timestamp;
import java.util.*;

@Service("userPointDataService")
@Transactional
public class UserPointDataServiceImpl implements UserPointDataService {

    //==================== 属性声明 ==================================================

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private ConfigurationService configurationService;

    @Autowired
    private PointDataFetchService pointDataFetchService;

    @Autowired
    private DataPointElectricityService dataPointElectricityService;

    @Autowired
    private ElectricityService electricityService;

    //==================== 接口方法 ==================================================

    public List queryUserPointData(String[] dataPoints, Date startTime, Date endTime, int pageNo, int pageSize) throws Exception {

        StringBuilder sb = new StringBuilder();
        String sql;
        sql = "select PointId,UTCDateTime,ActualValue,Source"
                + " from ea_pointactualvalue where 1=1"
                + " and UTCDateTime>='" + new Timestamp(startTime.getTime()) + "'"
                + " and UTCDateTime<='" + new Timestamp(endTime.getTime()) + "'\n";
        sb.append(sql);

        String dataPointString = "";

        for (int i = 0; i < dataPoints.length; i++) {
            String dataPointObjectId = dataPoints[i];
            dataPointString += "'" + dataPointObjectId + "',";
        }

        dataPointString = StringUtil.trimEnd(dataPointString, ",");

        sql = "SELECT c.pointId,c.utcDateTime,c.actualValue, c.source,c.name,c.dataPointTag,c.pointDataValueType FROM " +
                "(" +
                "SELECT ROW_NUMBER() OVER (ORDER BY utcDateTime desc) AS RowNumber,a.* ,b.NAME,b.dataPointTag,b.pointDataValueType " +
                "FROM (" + sb + ") a " +
                "inner join EA_DATAPOINT b on  b.DATAPOINTID = a.pointId " +
                "where b.OBJECTID in (" + dataPointString + ") " +
                ") c" +
                " WHERE c.RowNumber > " + pageSize * pageNo + " limit " + pageSize;


        List list = entityDao.listBySql(sql);
        return list;
    }

    public int getCountUserPointData(String[] dataPoints, Date startTime, Date endTime) throws Exception {

        int count = 0;

        for (int i = 0; i < dataPoints.length; i++) {
            String dataPointObjectId = dataPoints[i];
            DataPoint dataPoint = entityDao.getObject(DataPoint.class, dataPointObjectId);
            StringBuilder sb = new StringBuilder();
            String sql;
            sql = "select PointId,UTCDateTime,ActualValue,Source"
                    + " from ea_pointactualvalue where 1=1"
                    + " and PointID=" + dataPoint.getDataPointId()
                    + " and UTCDateTime>='" + new Timestamp(startTime.getTime()) + "'"
                    + " and UTCDateTime<='" + new Timestamp(endTime.getTime()) + "'\n";
            sb.append(sql);


            sql = "SELECT count(*) FROM (" + sb + ") a ";

            List list = entityDao.listBySql(sql);

            count += Integer.parseInt(list.get(0).toString());
        }
        return count;
    }

    public String[] importUserPointData(String dataPointId, File file, String fileName) throws Exception {

        DataPoint dataPoint = null;
        if (StringUtil.isNotEmpty(dataPointId)) {
            dataPoint = entityDao.getObject(DataPoint.class, dataPointId);
        }

        Workbook workbook = null;
        String fileType = FileUtil.getFileExtension(fileName);
        if (fileType.equalsIgnoreCase("xls")) {
            workbook = new HSSFWorkbook(new FileInputStream(file));
        } else {
            workbook = new XSSFWorkbook(new FileInputStream(file));
        }
        String[] result = {"", "", "", ""};
        Sheet sheet = workbook.getSheetAt(0);
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
            PointActualValue pointActualValue = new PointActualValue();
            Row row = sheet.getRow(i);
            if (StringUtil.isEmpty(dataPointId)) {
                if (StringUtil.isEmpty(getCellValue(row.getCell(0))) || StringUtil.isEmpty(getCellValue(row.getCell(1))) || StringUtil.isEmpty(getCellValue(row.getCell(2)))) {
                    result[0] += "," + (i + 1);
                    continue;
                }
                if (!DateUtil.isDate(DateUtil.STANDARD_DATETIME_FORMAT, getCellValue(row.getCell(1)))) {
                    result[1] += "," + (i + 1);
                    continue;
                }
                dataPoint = entityDao.getByPropertyValue(DataPoint.class, "dataPointId", Float.valueOf(getCellValue(row.getCell(0))).intValue());
                if (dataPoint == null) {
                    result[3] += "," + (i + 1);
                    continue;
                }
                try {
                    ReflectionUtil.setFieldValue(pointActualValue, "utcDateTime", DateUtil.convertStringToDate(getCellValue(row.getCell(1)), DateUtil.STANDARD_DATETIME_FORMAT));
                    ReflectionUtil.setFieldValue(pointActualValue, "actualValue", Float.valueOf(getCellValue(row.getCell(2))));
                } catch (Exception e) {
                    result[1] += "," + (i + 1);
                    continue;
                }
            } else {
                if (StringUtil.isEmpty(getCellValue(row.getCell(0))) || StringUtil.isEmpty(getCellValue(row.getCell(1)))) {
                    result[0] += "," + (i + 1);
                    continue;
                }
                if (!DateUtil.isDate(DateUtil.STANDARD_DATETIME_FORMAT, getCellValue(row.getCell(0)))) {
                    result[1] += "," + (i + 1);
                    continue;
                }
                try {
                    ReflectionUtil.setFieldValue(pointActualValue, "utcDateTime", DateUtil.convertStringToDate(getCellValue(row.getCell(0)), DateUtil.STANDARD_DATETIME_FORMAT));
                    ReflectionUtil.setFieldValue(pointActualValue, "actualValue", Float.valueOf(getCellValue(row.getCell(1))));
                } catch (Exception e) {
                    result[1] += "," + (i + 1);
                    continue;
                }
            }
            pointActualValue.setPointId(dataPoint.getDataPointId());
            pointActualValue.setSource(2);
            pointActualValue.setPointSliceId(dataPoint.getDataPointSliceId());
            pointActualValue.setDatabaseTag(dataPoint.getDatabaseTag());
            if (!isRecordExist(pointActualValue, "ea_pointactualvalue")) {
                String sql = "insert into ea_pointactualvalue(pointid,pointsliceid,utcdatetime,actualvalue,source,databaseTag,incrementvalue) values (?,?,?,?,?,?,?)";
                entityDao.executeSql(sql, pointActualValue.getPointId(), pointActualValue.getPointSliceId(), pointActualValue.getUtcDateTime(), pointActualValue.getActualValue(), pointActualValue.getSource(), pointActualValue.getDatabaseTag(), pointActualValue.getActualValue());
            } else {
                result[2] += "," + (i + 1);
            }
        }
        return result;
    }

    public List<UnitOfMeasure> listMeasureUnit() {

        String jpql = "select o from " + UnitOfMeasure.class.getName() + " o ";
        return entityDao.listByJpql(jpql);
    }

    public RecordsetInfo queryUserDataPoint(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public List queryUserPointDataReport(final String[] dataPoints, final Date startTime, final Date endTime, final TimeUnit timeUnit
            , final Integer precision, final String sortType, final String[] sectionTypes, final String[] incrementTypes) throws Exception {

        List<DataPoint> dataPointList = new ArrayList();
        Map<String, List<ActualValue>> data = new HashMap();
        Map<String, List<ActualValue>> hourData = new HashMap();
        Map<String, List<DataPointElectricityPriceInfo>> electricityPriceData = new HashMap();
        boolean electricityInfoFlag = false;    // 是否要显示电量、电价信息
        boolean sectionConvergeFlag = false;    // 是否显示区间值流水账则获取整点的聚合值
        List<ElectricityPriceTimeSegment> electricityPriceTimeSegmentList = null;

        if (incrementTypes != null) {
            for (String incrementType : incrementTypes) {
                if ("ElectricityPowerConsumption".equals(incrementType) || "ElectricityPrice".equals(incrementType)) {
                    electricityInfoFlag = true;
                    electricityPriceTimeSegmentList = electricityService.getAllElectricityPriceTimeSegment();
                    break;
                }
            }
        }
        if (sectionTypes != null) {
            for (String sectionType : sectionTypes) {
                if (!"Original".equals(sectionType)) {
                    sectionConvergeFlag = true;
                    break;
                }
            }
        }

        String precisionText = "%." + precision + "f";

        for (String dataPointId : dataPoints) {
            DataPoint dataPoint = entityDao.getObject(DataPoint.class, dataPointId);
            dataPointList.add(dataPoint);

            // 基本数据
            List<ActualValue> dataList = pointDataFetchService.fetchPointActualValue(dataPointId, startTime, endTime, timeUnit, precision);
            data.put(dataPointId, dataList);

            // 如果是区间值流水账则获取整点的聚合值
            if (dataPoint.getPointDataValueType() == 1 && timeUnit == null && sectionConvergeFlag) {
                hourData.put(dataPointId, pointDataFetchService.fetchPointActualValue(dataPointId, startTime, DateUtil.addHours(endTime, 1), TimeUnit.Hour, precision));
            }

            // 如果是累计值流水账则清空非整点的值
            if (dataPoint.getPointDataValueType() == 2 && timeUnit == null) {
                List<ActualValue> lastHourDataList = pointDataFetchService.fetchPointActualValue(dataPointId, new Date(endTime.getTime() + 1000), DateUtil.addHours(endTime, 1), timeUnit, precision);
                List<ActualValue> actualValueList = new ArrayList<ActualValue>();
                actualValueList.addAll(dataList);
                actualValueList.addAll(lastHourDataList);

                for (int i = 0; i < actualValueList.size(); i++) {
                    ActualValue actualValue = actualValueList.get(i);
                    String hourString = actualValue.getDatetimeString().substring(0, 13);
                    if (StringUtils.endsWith(actualValue.getDatetimeString(), "00:00")) {
                        int j = i + 1;
                        Double value = 0.0;
                        while (j < actualValueList.size()
                                && (StringUtil.compareValue(hourString, actualValueList.get(j).getDatetimeString().substring(0, 13))
                                || actualValueList.get(j).getDatetimeString().endsWith("00:00"))) {
                            value += actualValueList.get(j++).getSumActualValue();
                        }
                        actualValue.setSumActualValue(Double.valueOf(String.format(precisionText, value)));
                    } else {
                        actualValue.setSumActualValue(null);
                    }
                }
            }

            // 获取电价信息
            if (electricityInfoFlag) {
                electricityPriceData.put(dataPointId, pointDataFetchService.getElectricityPrice(dataPointId, startTime, endTime, precision));
            }
        }

        List<Map> resultList = new ArrayList();
        String[] datetimeArray;
        if (timeUnit == null) {
            List<String> datetimeList = new ArrayList();
            for (String dataPointId : dataPoints) {
                for (ActualValue actualValue : data.get(dataPointId)) {
                    if (!datetimeList.contains(actualValue.getDatetimeString())) {
                        datetimeList.add(actualValue.getDatetimeString());
                    }
                }
            }
            Collections.sort(datetimeList, new Comparator<String>() {

                public int compare(String o1, String o2) {

                    boolean flag;
                    if (timeUnit == null) {
                        Date date1 = DateUtil.convertStringToDate(o1, DateUtil.STANDARD_DATETIME_FORMAT);
                        Date date2 = DateUtil.convertStringToDate(o2, DateUtil.STANDARD_DATETIME_FORMAT);
                        flag = date1.before(date2);
                    } else if (timeUnit == TimeUnit.Hour) {
                        Date date1 = DateUtil.convertStringToDate(o1, "yyyy-MM-dd HH");
                        Date date2 = DateUtil.convertStringToDate(o2, "yyyy-MM-dd HH");
                        flag = date1.before(date2);
                    } else {
                        Integer value1 = Integer.parseInt(o1.replaceAll("-", ""));
                        Integer value2 = Integer.parseInt(o2.replaceAll("-", ""));
                        flag = value1 < value2;
                    }

                    if ("desc".equalsIgnoreCase(sortType)) {
                        return flag ? 1 : 0;
                    } else {
                        return flag ? 0 : 1;
                    }
                }
            });
            datetimeArray = datetimeList.toArray(new String[0]);
        } else {
            datetimeArray = DateUtil.getDatetimePointList(startTime, new Date(endTime.getTime() - 1), timeUnit).toArray(new String[0]);
            if ("desc".equalsIgnoreCase(sortType)) {
                CollectionUtils.reverseArray(datetimeArray);
            }
        }
        String[] weekArray = null;
        if (timeUnit == TimeUnit.Week) {
            List<String> weekList = DateUtil.getWeekList(startTime, endTime);
            weekArray = weekList.toArray(new String[0]);
            if ("desc".equalsIgnoreCase(sortType)) {
                CollectionUtils.reverseArray(weekArray);
            }
        }
        int weekCount = 0;
        for (String datetime : datetimeArray) {
            Map item = new HashMap();
            if (timeUnit == TimeUnit.Week) {
                item.put("datetime", weekArray[weekCount++]);
            } else {
                item.put("datetime", datetime);
            }
            for (DataPoint dataPoint : dataPointList) {
                String dataPointId = dataPoint.getObjectId();
                for (ActualValue actualValue : data.get(dataPointId)) {
                    if (StringUtil.compareValue(datetime, actualValue.getDatetimeString())) {
                        if (dataPoint.getPointDataValueType() == 1 && timeUnit == null && sectionConvergeFlag
                                && datetime.endsWith(":00:00")) {
                            for (ActualValue actualValueHour : hourData.get(dataPointId)) {
                                if (StringUtil.compareValue(actualValueHour.getDatetimeString() + ":00:00", datetime)) {
                                    item.put(dataPointId, new Double[]{
                                            actualValue.getValue()
                                            , actualValueHour.getAvgActualValue()
                                            , actualValueHour.getMaxActualValue()
                                            , actualValueHour.getMinActualValue()
                                            , actualValueHour.getSumActualValue()
                                            , null
                                    });
                                    break;
                                }
                            }
                        } else {
                            Double[][] electricityPriceValues = null;
                            if (electricityInfoFlag && electricityPriceData.get(dataPointId) != null) {
                                electricityPriceValues = new Double[electricityPriceTimeSegmentList.size()][2];
                                int index = 0;
                                for (ElectricityPriceTimeSegment timeSegment : electricityPriceTimeSegmentList) {
                                    Double powerConsumption = 0.0;  // 电量
                                    Double price = 0.0;             // 电价
                                    for (DataPointElectricityPriceInfo electricityPriceInfo : electricityPriceData.get(dataPointId)) {
                                        if (StringUtil.compareValue(timeSegment.getObjectId(), electricityPriceInfo.getElectricityPriceTimeSegmentId())) {
                                            boolean flag = false;
                                            if (timeUnit == TimeUnit.Day) {
                                                flag = StringUtil.compareValue(datetime, electricityPriceInfo.getDatetimeString());
                                            }
                                            if (timeUnit == TimeUnit.Week) {
                                                Calendar calendar = Calendar.getInstance();
                                                calendar.setFirstDayOfWeek(Calendar.MONDAY);
                                                calendar.setTime(DateUtil.convertStringToDate(electricityPriceInfo.getDatetimeString(), DateUtil.STANDARD_DATE_FORMAT));
                                                flag = Integer.parseInt(datetime) == calendar.get(Calendar.WEEK_OF_YEAR);
                                            }
                                            if (timeUnit == TimeUnit.Month) {
                                                flag = StringUtil.compareValue(datetime, electricityPriceInfo.getDatetimeString().substring(0, 7));
                                            }
                                            if (timeUnit == TimeUnit.Year) {
                                                flag = StringUtil.compareValue(datetime, electricityPriceInfo.getDatetimeString().substring(0, 4));
                                            }
                                            if (flag) {
                                                powerConsumption += electricityPriceInfo.getPowerConsumption();
                                                price += electricityPriceInfo.getPrice();
                                            }
                                        }
                                    }
                                    if (powerConsumption == 0.0) {
                                        electricityPriceValues[index] = null;
                                    } else {
                                        electricityPriceValues[index][0] = Double.valueOf(String.format(precisionText, powerConsumption));
                                        electricityPriceValues[index][1] = Double.valueOf(String.format(precisionText, price));
                                    }
                                    index++;
                                }

                            }
                            item.put(dataPointId, new Object[]{
                                    actualValue.getValue()
                                    , actualValue.getAvgActualValue()
                                    , actualValue.getMaxActualValue()
                                    , actualValue.getMinActualValue()
                                    , actualValue.getSumActualValue()
                                    , electricityPriceValues
                            });
                        }
                        break;
                    }
                }
            }
            resultList.add(item);
        }

        Map totalItem = new HashMap();
        totalItem.put("datetime", "total");

        // 累计值流水账取合计值时的开始和结束时间
        Date startTime_ = null, endTime_ = null;
        if (timeUnit == null) {
            if (StringUtil.compareValue(DateUtil.getDateFormatString(startTime, "mm:ss"), "00:00")) {
                startTime_ = startTime;
            } else {
                startTime_ = DateUtil.convertStringToDate(DateUtil.getDateFormatString(DateUtil.addHours(startTime, 1), "yyyy-MM-dd HH"), "yyyy-MM-dd HH");
            }
            if (StringUtil.compareValue(DateUtil.getDateFormatString(endTime, "mm:ss"), "00:00")) {
                endTime_ = DateUtil.addHours(endTime, 1);
            } else {
                endTime_ = DateUtil.convertStringToDate(DateUtil.getDateFormatString(DateUtil.addHours(endTime, 1), "yyyy-MM-dd HH"), "yyyy-MM-dd HH");
            }
        }
        for (DataPoint dataPoint : dataPointList) {
            String dataPointId = dataPoint.getObjectId();
            List<ActualValue> list = null;
            if (dataPoint.getPointDataValueType() == 2 && timeUnit == null) {
                list = pointDataFetchService.fetchPointActualValue(dataPointId, startTime_, endTime_, TimeUnit.None, precision);
            } else {
                list = pointDataFetchService.fetchPointActualValue(dataPointId, startTime, endTime, TimeUnit.None, precision);
            }

            if (CollectionUtil.isNotEmpty(list)) {
                ActualValue actualValue = list.get(0);

                // 电价合计
                Double[][] electricityPriceValues = null;
                for (Map item : resultList) {
                    if (item.get(dataPointId) == null) {
                        continue;
                    }
                    Double[][] electricityPrice = (Double[][]) ((Object[]) item.get(dataPointId))[5];
                    if (electricityPrice == null) {
                        continue;
                    }
                    for (int i = 0; i < electricityPriceTimeSegmentList.size(); i++) {
                        if (electricityPrice[i] != null) {
                            if (electricityPriceValues == null) {
                                electricityPriceValues = new Double[electricityPriceTimeSegmentList.size()][2];
                            }
                            if (electricityPriceValues[i][0] == null) {
                                electricityPriceValues[i][0] = 0.0;
                            }
                            if (electricityPriceValues[i][1] == null) {
                                electricityPriceValues[i][1] = 0.0;
                            }
                            electricityPriceValues[i][0] += electricityPrice[i][0];
                            electricityPriceValues[i][1] += electricityPrice[i][1];
                        }
                    }
                }

                if (electricityPriceValues != null) {
                    for (Double[] values : electricityPriceValues) {
                        if (values[0] != null) {
                            values[0] = Double.valueOf(String.format(precisionText, values[0]));
                        }
                        if (values[1] != null) {
                            values[1] = Double.valueOf(String.format(precisionText, values[1]));
                        }
                    }
                }

                totalItem.put(dataPointId, new Object[]{
                        null
                        , actualValue.getAvgActualValue()
                        , actualValue.getMaxActualValue()
                        , actualValue.getMinActualValue()
                        , actualValue.getSumActualValue()
                        , electricityPriceValues
                });
            }
        }
        resultList.add(totalItem);
        return resultList;
    }

    public DataExportInfo exportUserPointDataReport(final String[] dataPoints, final Date startTime, final Date endTime, final TimeUnit timeUnit
            , final Integer precision, final String sortType, final String[] sectionTypes, final String[] incrementTypes, final String collectLabel) throws Exception {

        String precisionText = "%." + precision + "f";
        List<Map> data = queryUserPointDataReport(dataPoints, startTime, endTime, timeUnit, precision, sortType, sectionTypes, incrementTypes);

        List<ElectricityPriceTimeSegment> electricityPriceTimeSegmentList = null;
        boolean electricityInfoFlag = false;               // 是否要显示电量、电价信息
        boolean dataPointElectricityInfoFlag = false;      // 所有数据点中是否有电量、电价信息
        boolean electricityPowerConsumptionFlag = false;
        boolean electricityPriceFlag = false;
        int incrementTypeLength = 0;                       // 除去电价后的累计值显示类型个数
        int defaultCellWith = 5000;                        // 单元格默认宽度
        for (String incrementType : incrementTypes) {
            if (incrementType.equals("ElectricityPowerConsumption")) {
                electricityPowerConsumptionFlag = true;
            } else if (incrementType.equals("ElectricityPrice")) {
                electricityPriceFlag = true;
            } else {
                incrementTypeLength++;
            }
            if ((electricityPowerConsumptionFlag || electricityPriceFlag) && !electricityInfoFlag) {
                electricityPriceTimeSegmentList = electricityService.getAllElectricityPriceTimeSegment();
                if (CollectionUtil.isNotEmpty(electricityPriceTimeSegmentList)) {
                    electricityInfoFlag = true;
                }
            }
        }

        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");

        FileInputStream fileInputStream = null;
        FileOutputStream fileOutputStream = null;
        try {
            String templateFileName = UserPointDataServiceImpl.class.getResource("/config/template/UserDataPointReport.xls").getFile();

            fileInputStream = new FileInputStream(templateFileName);
            HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);
            HSSFSheet sheet = workbook.getSheetAt(0);
            sheet.setColumnWidth(0, defaultCellWith);
            CellStyle valueCellStyle = workbook.createCellStyle();
            valueCellStyle.setAlignment(CellStyle.ALIGN_RIGHT);
            valueCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            CellStyle textCellStyle = workbook.createCellStyle();
            textCellStyle.setAlignment(CellStyle.ALIGN_CENTER);
            textCellStyle.setVerticalAlignment(CellStyle.VERTICAL_CENTER);

            List<DataPointInfo> dataPointInfoList = new ArrayList();
            int rowIndex = 0;
            {
                HSSFRow row = sheet.getRow(rowIndex);
                int cellIndex = 1;
                String name = "";
                for (int i = 0; i < dataPoints.length; i++) {
                    DataPoint dataPoint = entityDao.getObject(DataPoint.class, dataPoints[i]);
                    DataPointInfo dataPointInfo = new DataPointInfo();
                    dataPointInfo.setDataPointObjectId(dataPoint.getObjectId());
                    dataPointInfo.setDataPointName(dataPoint.getName());
                    dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
                    dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
                    dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());
                    if (electricityInfoFlag) {
                        List electricityConfigList = dataPointElectricityService.listByDataPointId(dataPoint.getObjectId());
                        if (CollectionUtil.isNotEmpty(electricityConfigList)) {
                            dataPointInfo.setElectricityInfoFlag(1);
                            dataPointElectricityInfoFlag = true;
                        } else {
                            dataPointInfo.setElectricityInfoFlag(0);
                        }

                    } else {
                        dataPointInfo.setElectricityInfoFlag(0);
                    }

                    dataPointInfoList.add(dataPointInfo);
                    String measureStr = "";
                    if (dataPointInfo.getMeasureUnit() != null && StringUtil.isNotEmpty(dataPointInfo.getMeasureUnit().toString().trim())) {
                        measureStr = "（单位: " + dataPointInfo.getMeasureUnit().toString() + "）";
                    }
                    if (dataPointInfo.getDataPointName() == null && StringUtil.isEmpty(dataPointInfo.getMeasureUnit().toString())) {
                        name = dataPointInfo.getDataPointTag().toString() + measureStr;
                    } else {
                        name = dataPointInfo.getDataPointName().toString() + measureStr;
                    }
                    int width = name.length() * 500;
                    int cellLength = 0;
                    if (dataPointInfo.getPointDataValueType() == 1) {
                        cellLength = sectionTypes.length;
                    }
                    if (dataPointInfo.getPointDataValueType() == 2) {
                        cellLength = incrementTypeLength;
                        if (dataPointInfo.getElectricityInfoFlag() == 1) {
                            cellLength += electricityPriceTimeSegmentList.size();
                        }
                    }

                    // 计算每个单元格的宽度
                    width = Math.max(new Double(width / cellLength).intValue(), defaultCellWith);

                    Cell cell = row.createCell(cellIndex);
                    cell.setCellStyle(textCellStyle);
                    cell.setCellValue(name);
                    int tempCellIndex = cellIndex;
                    for (int j = 0; j < cellLength; j++) {
                        sheet.setColumnWidth(tempCellIndex++, width);
                    }
                    if (tempCellIndex - cellIndex > 1) {
                        sheet.addMergedRegion(new CellRangeAddress((short) 0, (short) 0, (short) cellIndex, (short) (tempCellIndex - 1)));
                    }
                    cellIndex = tempCellIndex;
                }
            }

            // 合并单元格“数据时间”
            if (dataPointElectricityInfoFlag) {
                sheet.addMergedRegion(new CellRangeAddress((short) 0, (short) 2, (short) 0, (short) 0));
            } else {
                sheet.addMergedRegion(new CellRangeAddress((short) 0, (short) 1, (short) 0, (short) 0));
            }

            {
                HSSFRow row = sheet.createRow(++rowIndex);
                HSSFRow electrictyInfoRow = null;
                if (dataPointElectricityInfoFlag) {
                    electrictyInfoRow = sheet.createRow(++rowIndex);
                }
                int cellIndex = 1;
                for (DataPointInfo dataPointInfo : dataPointInfoList) {
                    if (dataPointInfo.getPointDataValueType() == 1) {
                        for (String text : sectionTypes) {
                            if (text.equals("Original")) {
                                text = "原始值";
                            } else if (text.equals("Avg")) {
                                text = "平均值";
                            } else if (text.equals("Max")) {
                                text = "最大值";
                            } else if (text.equals("Min")) {
                                text = "最小值";
                            }
                            if (dataPointElectricityInfoFlag) {
                                sheet.addMergedRegion(new CellRangeAddress((short) 1, (short) 2, (short) cellIndex, (short) cellIndex));
                            }
                            Cell cell = row.createCell(cellIndex++);
                            cell.setCellStyle(textCellStyle);
                            cell.setCellValue(text);
                        }
                    }
                    if (dataPointInfo.getPointDataValueType() == 2) {
                        for (String incrementType : incrementTypes) {
                            if (incrementType.equals("ElectricityPowerConsumption") || incrementType.equals("ElectricityPrice")) {
                            } else {
                                String text = "";
                                Cell cell = row.createCell(cellIndex);
                                if (incrementType.equals("Original")) {
                                    text = "原始值";
                                } else if (incrementType.equals("Increment")) {
                                    text = "增量";
                                }
                                if (dataPointElectricityInfoFlag) {
                                    sheet.addMergedRegion(new CellRangeAddress((short) 1, (short) 2, (short) cellIndex, (short) cellIndex));
                                }
                                cell.setCellStyle(textCellStyle);
                                cell.setCellValue(text);
                                cellIndex++;
                            }
                        }

                        if (dataPointInfo.getElectricityInfoFlag() == 1 && (electricityPowerConsumptionFlag || electricityPriceFlag)) {
                            String text = "";
                            if (electricityPowerConsumptionFlag) {
                                text = "电量";
                            }
                            if (electricityPriceFlag) {
                                text += (electricityPowerConsumptionFlag ? "、" : "") + "电价";
                            }
                            Cell cell = row.createCell(cellIndex);
                            cell.setCellStyle(textCellStyle);
                            cell.setCellValue(text);

                            int electrictyCellIndex = cellIndex;
                            for (int i = 0; i < electricityPriceTimeSegmentList.size(); i++) {
                                ElectricityPriceTimeSegment timeSegment = electricityPriceTimeSegmentList.get(i);
                                Cell electrictyCell = electrictyInfoRow.createCell(electrictyCellIndex++);
                                electrictyCell.setCellStyle(textCellStyle);
                                electrictyCell.setCellValue(timeSegment.getName());
                            }
                            sheet.addMergedRegion(new CellRangeAddress((short) 1, (short) 1, (short) cellIndex, (short) electrictyCellIndex - 1));
                            cellIndex = electrictyCellIndex;
                        }
                    }
                }
            }

            for (Map item : data) {
                int cellIndex = 0;
                HSSFRow row = sheet.createRow(++rowIndex);
                String datetime = (String) item.get("datetime");
                {
                    Cell cell = row.createCell(cellIndex++);
                    cell.setCellStyle(textCellStyle);
                    cell.setCellValue("total".equals(datetime) ? collectLabel : datetime);
                }
                for (DataPointInfo dataPointInfo : dataPointInfoList) {
                    Object[] values = (Object[]) item.get(dataPointInfo.getDataPointObjectId());
                    String[] valueType = null;
                    if (dataPointInfo.getPointDataValueType() == 1) {
                        valueType = sectionTypes;
                    }
                    if (dataPointInfo.getPointDataValueType() == 2) {
                        valueType = incrementTypes;
                    }

                    // 计算增量电价
                    for (String type : valueType) {
                        if ("ElectricityPowerConsumption".equals(type) || "ElectricityPrice".equals(type)) {

                        } else {
                            int index = 0;
                            Cell cell = row.createCell(cellIndex++);
                            cell.setCellStyle(valueCellStyle);
                            cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                            if ("Original".equals(type)) {
                                index = 0;
                            } else if ("Avg".equals(type)) {
                                index = 1;
                            } else if ("Max".equals(type)) {
                                index = 2;
                            } else if ("Min".equals(type)) {
                                index = 3;
                            } else if ("Increment".equals(type)) {
                                index = 4;
                            }

                            Double value = getItemValue(values, index);
                            if (value == null) {
                                cell.setCellValue("");
                            } else {
                                if (electricityPriceFlag && "Increment".equals(type)) {
                                    Double totalPrice = 0.0;
                                    Double[][] electricityValues = (Double[][]) values[5];
                                    if (electricityValues != null) {
                                        for (Double[] electricityValue : electricityValues) {
                                            if (electricityValue != null && electricityValue[1] != null) {
                                                totalPrice += electricityValue[1];
                                            }
                                        }
                                    }
                                    if (totalPrice == 0.0) {
                                        cell.setCellValue(value);
                                    } else {
                                        totalPrice = Double.valueOf(String.format(precisionText, totalPrice));
                                        cell.setCellValue(value + "（" + totalPrice + "元）");
                                    }
                                } else {
                                    cell.setCellValue(value);
                                }
                            }
                        }
                    }

                    // 计算分时电价
                    if (dataPointInfo.getElectricityInfoFlag() == 1) {
                        Double[][] electricityValues = (Double[][]) values[5];
                        if (electricityValues != null) {
                            for (Double[] electricityValue : electricityValues) {
                                Cell cell = row.createCell(cellIndex++);
                                cell.setCellStyle(valueCellStyle);
                                cell.setCellType(Cell.CELL_TYPE_NUMERIC);
                                if (electricityValue == null) {
                                    cell.setCellValue("");
                                } else {
                                    if (electricityValue[0] == null) {
                                        electricityValue[0] = 0.0;
                                    }
                                    if (electricityValue[1] == null) {
                                        electricityValue[1] = 0.0;
                                    }
                                    if (electricityPowerConsumptionFlag && electricityPriceFlag) {
                                        cell.setCellValue(electricityValue[0] + "(" + electricityValue[1] + "元)");
                                    } else if (electricityPowerConsumptionFlag) {
                                        cell.setCellValue(electricityValue[0]);
                                    } else if (electricityPriceFlag) {
                                        cell.setCellValue(electricityValue[1] + "元");
                                    }
                                }
                            }
                        }
                    }
                }
            }

            String tempFileName = StringUtil.getUuid();
            File file = new File(systemConfigInfo.getTempDirectory() + "/" + tempFileName);
            fileOutputStream = new FileOutputStream(file);
            workbook.write(fileOutputStream);
            fileOutputStream.flush();
            fileOutputStream.close();

            DataExportInfo dataExportInfo = new DataExportInfo();
            dataExportInfo.setTempFileName(tempFileName);
            dataExportInfo.setType(PointActualValue.class.getSimpleName());
            dataExportInfo.setFileName("报表(" + DateUtil.getDateFormatString(startTime, "yyyyMMdd") + "~" + DateUtil.getDateFormatString(endTime, "yyyyMMdd") + ").xls");
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

    //==================================私有方法======================================

    private boolean isRecordExist(PointActualValue pointActualValue, String tableName) throws Exception {

        String sql = "select PointId from " + tableName + " where PointId=? and UTCDateTime=? and databaseTag=?";
        List<Object> list = entityDao.listBySql(sql, pointActualValue.getPointId(), pointActualValue.getUtcDateTime(), pointActualValue.getDatabaseTag());
        return list.size() > 0;
    }

    private String getCellValue(Cell cell) {

        if (cell == null) {
            return null;
        }

        String str = cell.toString();
        if (StringUtil.isNotEmpty(str)) {
            return str.trim();
        } else {
            return null;
        }
    }

    private Double getItemValue(Object[] values, int index) {

        return values == null || values[index] == null ? null : Double.valueOf((values[index] + "").replaceAll("0+?$", "").replaceAll("[.]$", ""));
    }
}
