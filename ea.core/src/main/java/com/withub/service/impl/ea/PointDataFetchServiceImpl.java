package com.withub.service.impl.ea;

import com.withub.common.enumeration.TimeUnit;
import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.*;
import com.withub.model.exception.BaseBusinessException;
import com.withub.service.ea.DataPointService;
import com.withub.service.ea.PointDataFetchService;
import com.withub.util.ConfigUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service("pointDataFetchService")
public class PointDataFetchServiceImpl implements PointDataFetchService {

    //========================== 属性声明 ================================================================

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private DataPointService dataPointService;

    //========================  接口方法 =================================================================

    public Double fetchLatestActualValue(final String dataPointObjectId) throws Exception {

        Double latestActualValue;
        DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);

        if (dataPoint.getOriginal() == 1) {
            latestActualValue = fetchSinglePointLatestActualValue(dataPoint);
        } else {
            latestActualValue = fetchComplexPointLatestActualValue(dataPoint);
        }

        return Double.valueOf(String.format("%.2f", latestActualValue));
    }

    private Double fetchSinglePointLatestActualValue(final DataPoint dataPoint) throws Exception {

        Double latestActualValue = 0.0;
        Date currentTime = DateUtil.getCurrentTime();
        String tableName = "ea_pointactualvalue";

        String sql = "select ActualValue from " + tableName + " where 1=1"
                + " and PointId = ?"
                + " and DatabaseTag = ?"
                + " and UTCDateTime>?"
                + " order by UTCDateTime desc limit 1";
        Timestamp timestamp = new Timestamp(DateUtil.addHours(new Date(), -3).getTime());
        List list = entityDao.listBySql(sql, dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), timestamp);
        if (list.size() > 0) {
            latestActualValue = Double.parseDouble(list.get(0).toString());
        }

        return Double.valueOf(String.format("%.2f", latestActualValue));
    }

    private Double fetchComplexPointLatestActualValue(final DataPoint dataPoint) throws Exception {

        String expressionString = dataPoint.getDataPointTag();

        String jpql = "select o from " + DataPoint.class.getName() + " o"
                + " where o.objectStatus=1 and o.source=1 and o.original=1 order by o.dataPointId";
        List<DataPoint> dataPointList = entityDao.listByJpql(jpql);
        for (DataPoint tempDataPoint : dataPointList) {
            String tempDataPointTag = tempDataPoint.getDataPointTag();
            if (dataPoint.getDataPointTag().contains(tempDataPointTag)) {
                Double value = fetchSinglePointLatestActualValue(tempDataPoint);
                expressionString = expressionString.replace(tempDataPoint.getDataPointTag(), value + "");
            }
        }

        ExpressionParser parser = new SpelExpressionParser();
        Expression expression = parser.parseExpression(expressionString);
        return Double.valueOf(String.format("%.2f", expression.getValue(Double.class)));
    }

    public List<ActualValue> fetchPointActualValue(final String dataPointObjectId, final Date startTime, final Date endTime, final TimeUnit timeUnit) throws Exception {

        return fetchPointActualValue(dataPointObjectId, startTime, endTime, timeUnit, 2);
    }

    public List<ActualValue> fetchPointActualValue(final String dataPointObjectId, final Date startTime, final Date endTime, final TimeUnit timeUnit, final Integer precision) throws Exception {

        DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
        if (dataPoint.getPointDataValueType() == 0) {
            throw new BaseBusinessException("", "数据点[" + dataPoint.getDataPointId() + "]的值类型未知");
        }

        String precisionText = "%." + precision + "f";

        List<ActualValue> actualValueList = new ArrayList<ActualValue>();
        List<DataPoint> dataPointList = new ArrayList<DataPoint>();
        String expression = null;
        if (dataPoint.getOriginal() == 0) {
            expression = dataPoint.getDataPointTag();
            String jpql = "select o from " + DataPoint.class.getName()
                    + " o where o.objectStatus=1 and o.original=1 and o.source=1 and metasysDatabase.objectId=? " +
                    " order by o.dataPointId, o.dataPointTag desc";
            List<DataPoint> list = entityDao.listByJpql(jpql, dataPoint.getMetasysDatabase().getObjectId());
            for (DataPoint tempDataPoint : list) {
                if (expression.contains(tempDataPoint.getDataPointTag())) {

                    expression = expression.replaceAll(tempDataPoint.getDataPointTag()
                            , " MAX(case PointId when '"
                            + tempDataPoint.getDatabaseTag()
                            + "#" + tempDataPoint.getDataPointId()
                            + (tempDataPoint.getTimeSegment() == null ? "" : "#" + tempDataPoint.getTimeSegment().getTag())
                            + "' then ActualValue else 0 end)");
                    dataPointList.add(tempDataPoint);
                }
            }
        } else {
            dataPointList.add(dataPoint);
        }

        String baseSql = getBaseQueryString(startTime, endTime, dataPointList, dataPoint.getPointDataValueType(), timeUnit, expression);

        // 流水账
        if (timeUnit == null) {
            String sql = "select " + getUTCDateTimeConvertString(TimeUnit.None) + " datetimeString, ActualValue, coalesce(IncrementValue, ActualValue) IncrementValue " +
                    " from (" + baseSql + ") t order by datetimeString";
            List<Object[]> list = entityDao.listBySql(sql);

            // 获取之前的最大值
            Double preMaxValue = 0.0;
            if (dataPoint.getPointDataValueType() == 2) {
                Date systemDefinedYearMonth = DateUtil.convertStringToDate(ConfigUtil.getSystemConfigInfo().getBeginYear() + "", "yyyyMM");
                sql = getBaseQueryString(systemDefinedYearMonth, new Date(startTime.getTime() - 1000), dataPointList, dataPoint.getPointDataValueType(), timeUnit, expression);
                sql = "select coalesce(max(coalesce(IncrementValue, ActualValue)), 0) from (" + sql + ") t";
                preMaxValue = entityDao.executeDoubleScalar(sql);
            }
            for (int i = 0; i < list.size(); i++) {
                Object[] result = list.get(i);
                ActualValue actualValue = new ActualValue();
                actualValue.setDatetimeString(String.valueOf(result[0]));
                actualValue.setValue(Double.valueOf(String.format(precisionText, result[1])));
                if (dataPoint.getPointDataValueType() == 2) {
                    Double preValue;
                    if (i == 0) {
                        preValue = preMaxValue;
                    } else {
                        preValue = Double.valueOf(list.get(i - 1)[2].toString());
                    }

                    if (i == 0 && preMaxValue == 0.0) {
                        // 如果第一个时间点之前没有值
                        actualValue.setSumActualValue(0.0);
                    } else {
                        actualValue.setSumActualValue(Double.valueOf(String.format(precisionText, Double.valueOf(result[2].toString()) - preValue)));
                    }
                }
                actualValueList.add(actualValue);
            }
        } else if (timeUnit == TimeUnit.None) {

            // 处理数据点是区间内变化值的情况
            if (dataPoint.getPointDataValueType() == 1) {
                String sql = "select coalesce(sum(ActualValue), 0) sumActualValue"
                        + " ,coalesce(avg(ActualValue), 0) avgActualValue"
                        + " ,coalesce(min(ActualValue), 0) minActualValue"
                        + " ,coalesce(max(ActualValue), 0) maxActualValue"
                        + " from (" + baseSql + ") t";
                Object[] result = (Object[]) entityDao.listBySql(sql).get(0);

                ActualValue actualValue = new ActualValue();
                actualValue.setSumActualValue(Double.valueOf(String.format(precisionText, result[0])));
                actualValue.setAvgActualValue(Double.valueOf(String.format(precisionText, result[1])));
                actualValue.setMinActualValue(Double.valueOf(String.format(precisionText, result[2])));
                actualValue.setMaxActualValue(Double.valueOf(String.format(precisionText, result[3])));
                actualValueList.add(actualValue);
            }

            // 处理数据点是累计值的情况
            if (dataPoint.getPointDataValueType() == 2) {
                String sql = "select coalesce(max(ActualValue), 0) ActualValue  from (" + baseSql + ") t";
                Double sumActualValue = entityDao.executeDoubleScalar(sql);
                ActualValue actualValue = new ActualValue();
                actualValue.setSumActualValue(Double.valueOf(String.format(precisionText, sumActualValue)));
                actualValue.setAvgActualValue(actualValue.getSumActualValue());
                actualValueList.add(actualValue);
            }
        } else {

            String utcDateTimeConvertString = getUTCDateTimeConvertString(timeUnit);

            // 处理数据点是区间内变化值的情况
            if (dataPoint.getPointDataValueType() == 1) {
                String sql = "select " + utcDateTimeConvertString + " datetimeString"
                        + " ,coalesce(sum(ActualValue), 0) sumActualValue"
                        + " ,coalesce(avg(ActualValue), 0) avgActualValue"
                        + " ,coalesce(min(ActualValue), 0) minActualValue"
                        + " ,coalesce(max(ActualValue), 0) maxActualValue"
                        + " from (" + baseSql + ") t"
                        + " group by " + utcDateTimeConvertString
                        + " order by " + utcDateTimeConvertString;
                List list = entityDao.listBySql(sql);
                for (int i = 0; i < list.size(); i++) {
                    Object[] result = (Object[]) list.get(i);
                    ActualValue actualValue = new ActualValue();
                    actualValue.setDatetimeString(String.valueOf(result[0]).replace(".0", ""));
                    actualValue.setSumActualValue(Double.valueOf(String.format(precisionText, result[1])));
                    actualValue.setAvgActualValue(Double.valueOf(String.format(precisionText, result[2])));
                    actualValue.setMinActualValue(Double.valueOf(String.format(precisionText, result[3])));
                    actualValue.setMaxActualValue(Double.valueOf(String.format(precisionText, result[4])));
                    actualValueList.add(actualValue);
                }
            }

            // 处理数据点是累计值的情况
            if (dataPoint.getPointDataValueType() == 2) {
                String sql = "select utcDateTime datetimeString, ActualValue"
                        + " from (" + baseSql + ") t"
                        + " order by utcDateTime";
                List<Object[]> list = entityDao.listBySql(sql);
                for (Object[] result : list) {
                    ActualValue actualValue = new ActualValue();
                    actualValue.setDatetimeString(String.valueOf(result[0]).replace(".0", ""));
                    actualValue.setSumActualValue(Double.valueOf(String.format(precisionText, result[1])));
                    actualValue.setAvgActualValue(actualValue.getSumActualValue());
                    actualValueList.add(actualValue);
                }
            }
        }


        // 补全数据
        if (timeUnit == null || timeUnit == TimeUnit.None) {
            return actualValueList;
        } else {
            List<String> datetimeList = DateUtil.getDatetimePointList(startTime, new Date(endTime.getTime() - 1), timeUnit);
            List resultList = new ArrayList();
            for (String datetimie : datetimeList) {
                ActualValue actualValue = new ActualValue();
//                actualValue.setAvgActualValue(0.0);
                for (ActualValue temp : actualValueList) {
                    if (StringUtil.compareValue(datetimie, temp.getDatetimeString())) {
                        actualValue = temp;
                        break;
                    }
                }
                actualValue.setDatetimeString(datetimie);
                actualValue.setPointId(dataPoint.getDataPointId());
                resultList.add(actualValue);
            }
            return resultList;
        }
    }

    public ElectricityPriceInfo getElectricityPriceInfo(String dataPointObjectId) throws Exception {

        DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
        if (dataPoint.getPointDataValueType() != 2) {
            throw new BaseBusinessException("", "数据点[" + dataPoint.getDataPointId() + "]的值类型应为累计值!");
        }

        if (dataPoint.getOriginal() == 1) {
            return getSingleElectricityPriceInfo(dataPoint);
        } else {
            return getComplexElectricityPriceInfo(dataPoint);
        }
    }

    public List<DataPointElectricityPriceInfo> getElectricityPrice(final String dataPointObjectId, final Date startTime, final Date endTime) throws Exception {

        return getElectricityPrice(dataPointObjectId, startTime, endTime, 2);
    }

    public List<DataPointElectricityPriceInfo> getElectricityPrice(String dataPointObjectId, Date startTime, Date endTime, Integer precision) throws Exception {

        DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
        if (dataPoint.getPointDataValueType() != 2) {
            return null;
        }
        String precisionText = "%." + precision + "f";

        List<ElectricityPrice> electricityPriceList = dataPointService.listElectricityPriceByDataPointId(dataPointObjectId, startTime);
        List priceList = new ArrayList();
        List<ActualValue> actualValueList = fetchPointActualValue(dataPointObjectId, startTime, endTime, null, precision);

        Date dateTime = new Date(startTime.getTime());
        while (dateTime.before(endTime)) {
            String dateTimeString = DateUtil.getDateFormatString(dateTime, DateUtil.STANDARD_DATE_FORMAT);
            for (ElectricityPrice electricityPrice : electricityPriceList) {
                List<ElectricityPriceTimeGroup> electricityPriceTimeGroupList = electricityPrice.getElectricityPriceTimeGroupList();
                for (ElectricityPriceTimeGroup electricityPriceTimeGroup : electricityPriceTimeGroupList) {
                    List<ElectricityPriceDate> electricityPriceDateList = electricityPriceTimeGroup.getElectricityPriceDateList();
                    List<ElectricityPriceTime> electricityPriceTimeList = electricityPriceTimeGroup.getElectricityPriceTimeList();
                    for (ElectricityPriceDate electricityPriceDate : electricityPriceDateList) {
                        Date startPriceDate = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy") + "-" + electricityPriceDate.getStartMonth() + "-" + electricityPriceDate.getStartDay() + " 00:00:00", "yyyy-MM-dd HH:mm:ss");
                        Date endPriceDate = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy") + "-" + electricityPriceDate.getEndMonth() + "-" + electricityPriceDate.getEndDay() + " 23:59:59", "yyyy-MM-dd HH:mm:ss");
                        if ((dateTime.after(startPriceDate) && dateTime.before(endPriceDate)) || dateTime.equals(startPriceDate) || dateTime.equals(endPriceDate)) {
                            for (ElectricityPriceTime electricityPriceTime : electricityPriceTimeList) {
                                Date startPriceTime = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy-MM-dd") + " " + electricityPriceTime.getStartTime(), DateUtil.STANDARD_DATEMINUTE_FORMAT);
                                Date endPriceTime = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy-MM-dd") + " " + electricityPriceTime.getEndTime(), DateUtil.STANDARD_DATEMINUTE_FORMAT);
                                if (endPriceTime.getTime() == dateTime.getTime()) {
                                    endPriceTime = DateUtil.addDays(endPriceTime, 1);
                                }

                                Long start = startPriceTime.getTime();
                                Long end = endPriceTime.getTime();
                                Double price = 0.0;
                                Double powerConsumption = 0.0;
                                for (ActualValue actualValue : actualValueList) {
                                    Long timeMillis = DateUtil.convertStringToDate(actualValue.getDatetimeString(), DateUtil.STANDARD_DATETIME_FORMAT).getTime();
                                    if (timeMillis > start && timeMillis <= end) {
                                        powerConsumption += actualValue.getSumActualValue();
                                        price += electricityPrice.getPrice() * actualValue.getSumActualValue();
                                    }
                                }
                                DataPointElectricityPriceInfo electricityPriceInfo = new DataPointElectricityPriceInfo();
                                electricityPriceInfo.setElectricityPriceId(electricityPrice.getObjectId());
                                electricityPriceInfo.setElectricityPriceTimeSegmentId(electricityPrice.getElectricityPriceTimeSegment().getObjectId());
                                electricityPriceInfo.setDatetimeString(dateTimeString);
                                electricityPriceInfo.setPowerConsumption(Double.valueOf(String.format(precisionText, powerConsumption)));
                                electricityPriceInfo.setPrice(Double.valueOf(String.format(precisionText, price)));
                                if (electricityPriceInfo.getPowerConsumption() > 1000) {
                                    System.out.print("");
                                }
                                priceList.add(electricityPriceInfo);
                            }
                        }
                    }
                }
            }

            dateTime = DateUtil.addDays(dateTime, 1);
        }

        return priceList;
    }


    //========================  私有方法 =================================================================

    private String getUTCDateTimeConvertString(TimeUnit timeUnit) {

        String utcDateTimeConvertString = "";

        if (timeUnit == TimeUnit.Year) {
            utcDateTimeConvertString = "to_char(UTCDateTime - interval '1 seconds','YYYY')";
        } else if (timeUnit == TimeUnit.Month) {
            utcDateTimeConvertString = "to_char(UTCDateTime - interval '1 seconds','YYYY-MM')";
        } else if (timeUnit == TimeUnit.Week) {
            utcDateTimeConvertString = "date_part('week', UTCDateTime - interval '1 seconds')";
        } else if (timeUnit == TimeUnit.Day) {
            utcDateTimeConvertString = "to_char(UTCDateTime - interval '1 seconds','YYYY-MM-DD')";
        } else if (timeUnit == TimeUnit.Hour) {
            utcDateTimeConvertString = "to_char(UTCDateTime - interval '1 seconds','YYYY-MM-DD HH24')";
        } else if (timeUnit == TimeUnit.None) {
            utcDateTimeConvertString = "to_char(UTCDateTime, 'YYYY-MM-DD HH24:MI:SS')";
        }

        return utcDateTimeConvertString;
    }

    private String getBaseQueryString(Date startTime, Date endTime, List<DataPoint> dataPointList, Integer dataValueType, TimeUnit timeUnit, String expression) {

        String sql = "", sql1 = "", sql2 = "";
        List<DataPoint> dataPointList1 = new ArrayList();  // 普通数据点
        List<DataPoint> dataPointList2 = new ArrayList();  // 分时电价数据点
        for (DataPoint dataPoint : dataPointList) {
            if (dataPoint.getTimeSegment() == null) {
                dataPointList1.add(dataPoint);
            } else {
                dataPointList2.add(dataPoint);
            }
        }

        if (CollectionUtil.isNotEmpty(dataPointList1)) {
            String pointTag = "DatabaseTag||'#'||PointId";
            String points = "";
            StringBuilder sb = new StringBuilder();
            for (DataPoint dataPoint : dataPointList1) {
                points += "'" + dataPoint.getDatabaseTag() + "#" + dataPoint.getDataPointId() + "',";
            }
            points = StringUtil.trimEnd(points, ",");
            sb.append("select DatabaseTag, PointId, UTCDateTime, ActualValue, coalesce(IncrementValue, ActualValue) IncrementValue"
                    + " from ea_pointactualvalue where 1=1"
                    + " and " + pointTag + " in (" + points + ")"
                    + " and UTCDateTime>='" + new Timestamp(startTime.getTime()) + "'"
                    + " and UTCDateTime<='" + new Timestamp(endTime.getTime()) + "'\n");

            if (timeUnit != null && dataValueType == 2) {
                if (timeUnit == TimeUnit.None) {
                    sql1 = "select t1.PointId,text 'UTCDateTime' UTCDateTime,\n" +
                            "\tcoalesce(t1.maxactualvalue - t2.maxactualvalue, t1.maxactualvalue - t1.minactualvalue) ActualValue\n" +
                            "from (\n" +
                            "\tselect " + pointTag + " PointId, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + " \n" +
                            ") t1 left join (\n" +
                            "\tselect " + pointTag + " PointId, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + " \n" +
                            ") t2 on t1.RowNumber = t2.RowNumber + 1 and t1.PointId = t2.PointId";
                } else {
                    String utcDateTimeConvertString = getUTCDateTimeConvertString(timeUnit);
                    sql1 = "select t1.PointId, t1.UTCDateTime,\n" +
                            "\tcoalesce(t1.maxactualvalue - t2.maxactualvalue, t1.maxactualvalue - t1.minactualvalue) ActualValue\n" +
                            "from (\n" +
                            "\tselect " + pointTag + " PointId, " + utcDateTimeConvertString + " UTCDateTime, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ", " + utcDateTimeConvertString + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + ", " + utcDateTimeConvertString + "\n" +
                            ") t1 left join (\n" +
                            "\tselect " + pointTag + " PointId, " + utcDateTimeConvertString + " UTCDateTime, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ", " + utcDateTimeConvertString + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + ", " + utcDateTimeConvertString + "\n" +
                            ") t2 on t1.RowNumber = t2.RowNumber + 1 and t1.PointId = t2.PointId";
                }
            } else {
                sql1 = "select " + pointTag + " PointId, UTCDateTime, ActualValue, IncrementValue from (" + sb.toString() + ") t1";
            }
        }

        if (CollectionUtil.isNotEmpty(dataPointList2)) {
            String pointTag = "DatabaseTag||'#'||PointId||'#'||TimeSegmentTag";
            String points = "";
            StringBuilder sb = new StringBuilder();
            for (DataPoint dataPoint : dataPointList2) {
                points += "'" + dataPoint.getDatabaseTag() + "#" + dataPoint.getDataPointId() + "#" + dataPoint.getTimeSegment().getTag() + "',";
            }
            points = StringUtil.trimEnd(points, ",");
            startTime = DateUtil.addDays(startTime, -1);         // 开始时间-1天，计算前一天的分时电量
            sb.append("select DatabaseTag, PointId, UTCDateTime, TimeSegmentTag, ActualValue, TimeSegmentActualValue IncrementValue"
                    + " from ea_pointactualvalue where 1=1"
                    + " and " + pointTag + " in (" + points + ")"
                    + " and UTCDateTime>='" + new Timestamp(startTime.getTime()) + "'"
                    + " and UTCDateTime<='" + new Timestamp(endTime.getTime()) + "'\n");

            if (timeUnit != null && dataValueType == 2) {
                if (timeUnit == TimeUnit.None) {
                    sql2 = "select t1.PointId,text 'UTCDateTime' UTCDateTime,\n" +
                            "\tcoalesce(t1.maxactualvalue - t2.maxactualvalue, t1.maxactualvalue) ActualValue\n" +
                            "from (\n" +
                            "\tselect " + pointTag + " PointId, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + " \n" +
                            ") t1 left join (\n" +
                            "\tselect " + pointTag + " PointId, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + " \n" +
                            ") t2 on t1.RowNumber = t2.RowNumber + 1 and t1.PointId = t2.PointId";
                } else {
                    String utcDateTimeConvertString = getUTCDateTimeConvertString(timeUnit);
                    sql2 = "select t1.PointId, t1.UTCDateTime,\n" +
                            "\tcoalesce(t1.maxactualvalue - t2.maxactualvalue, t1.maxactualvalue) ActualValue\n" +
                            "from (\n" +
                            "\tselect " + pointTag + " PointId, " + utcDateTimeConvertString + " UTCDateTime, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ", " + utcDateTimeConvertString + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + ", " + utcDateTimeConvertString + "\n" +
                            ") t1 left join (\n" +
                            "\tselect " + pointTag + " PointId, " + utcDateTimeConvertString + " UTCDateTime, MIN(IncrementValue) minactualvalue, MAX(IncrementValue) maxactualvalue\n" +
                            "\t, ROW_NUMBER() OVER (ORDER BY " + pointTag + ", " + utcDateTimeConvertString + ") RowNumber\n" +
                            "\t from (" + sb + ") t0\n" +
                            "\tgroup by " + pointTag + ", " + utcDateTimeConvertString + "\n" +
                            ") t2 on t1.RowNumber = t2.RowNumber + 1 and t1.PointId = t2.PointId";
                }
            } else {
                sql2 = "select " + pointTag + " PointId, UTCDateTime, ActualValue, IncrementValue from (" + sb.toString() + ") t1";
            }
        }

        if (StringUtil.isNotEmpty(sql1) && StringUtil.isNotEmpty(sql2)) {
            sql = sql1 + "\nunion all\n" + sql2;
        } else {
            sql = sql1 + sql2;
        }

        if (StringUtil.isNotEmpty(expression)) {
            if (expression.indexOf("/") != -1) {
                expression = handleExpression(expression);
            }
            sql = "select UTCDateTime, " + expression + " ActualValue from (" + sql + ") t0 group by UTCDateTime";
        }

        return sql;
    }


    private ElectricityPriceInfo getSingleElectricityPriceInfo(DataPoint dataPoint) throws Exception {

        DataPointElectricityConfig dataPointElectricityConfig = entityDao.getByPropertyValue(DataPointElectricityConfig.class, "dataPoint.objectId", dataPoint.getObjectId());
        if (dataPointElectricityConfig == null) {
            throw new BaseBusinessException("", "数据点[" + dataPoint.getDataPointId() + "]未配置电价信息!");
        }
        Date today = DateUtil.getCurrentTime();
        String electricityPriceIssueJpql = "select o from " + ElectricityPriceIssue.class.getName() + " o where 1=1 "
                + " and to_char(o.startDate, 'YYYY-MM-DD HH24:MI:SS') <= ? "
                + " and to_char(o.endDate, 'YYYY-MM-DD HH24:MI:SS') > ? "
                + " and o.objectStatus = 1";
        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, DateUtil.getDateFormatString(today, DateUtil.STANDARD_DATETIME_FORMAT), DateUtil.getDateFormatString(today, DateUtil.STANDARD_DATETIME_FORMAT));
        if (electricityPriceIssue == null) {
            throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(today, "yyyy-MM-dd") + "]未发布电价!");
        }
        String electricityPriceListJpql = "select o from " + ElectricityPrice.class.getName() + " o where 1=1 and o.electricityUsageCategory.objectId = ? and o.voltageSegment.objectId = ? and o.electricityPriceIssue.objectId = ?";
        List<ElectricityPrice> electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());

        Double todayPrice = getDateElectricityPrice(dataPoint, today, electricityPriceList);

        electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, DateUtil.getDateFormatString(DateUtil.addDays(today, -1), DateUtil.STANDARD_DATETIME_FORMAT), DateUtil.getDateFormatString(DateUtil.addDays(today, -1), DateUtil.STANDARD_DATETIME_FORMAT));
        if (electricityPriceIssue == null) {
            throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(DateUtil.addDays(today, -1), "yyyy-MM-dd") + "]未发布电价!");
        }
        electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
        Double yestodayPrice = getDateElectricityPrice(dataPoint, DateUtil.getEndDate(DateUtil.addDays(today, -1)), electricityPriceList);
        Double currentMonthPrice = 0.0, previousMonthPrice = 0.0;
        Date currentMonthFirstDay = DateUtil.convertStringToDate(DateUtil.getDateFormatString(today, "yyyy-MM") + "-01 23:59:59", "yyyy-MM-dd HH:mm:ss");
        Date tempDay = currentMonthFirstDay;
        while (tempDay.before(today)) {
            electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, DateUtil.getDateFormatString(tempDay, DateUtil.STANDARD_DATETIME_FORMAT), DateUtil.getDateFormatString(tempDay, DateUtil.STANDARD_DATETIME_FORMAT));
            if (electricityPriceIssue == null) {
                throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(tempDay, "yyyy-MM-dd") + "]未发布电价!");
            }
            electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
            currentMonthPrice += getDateElectricityPrice(dataPoint, tempDay, electricityPriceList);
            tempDay = DateUtil.addDays(tempDay, 1);
        }
        currentMonthPrice += todayPrice;
        Date previousMonthFirstDay = DateUtil.addMonths(currentMonthFirstDay, -1);
        tempDay = previousMonthFirstDay;
        while (tempDay.before(currentMonthFirstDay)) {
            electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, DateUtil.getDateFormatString(tempDay, DateUtil.STANDARD_DATETIME_FORMAT), DateUtil.getDateFormatString(tempDay, DateUtil.STANDARD_DATETIME_FORMAT));
            if (electricityPriceIssue == null) {
                throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(tempDay, "yyyy-MM-dd") + "]未发布电价!");
            }
            electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
            previousMonthPrice += getDateElectricityPrice(dataPoint, tempDay, electricityPriceList);
            tempDay = DateUtil.addDays(tempDay, 1);
        }

        ElectricityPriceInfo electricityPriceInfo = new ElectricityPriceInfo();
        electricityPriceInfo.setToday(todayPrice);
        electricityPriceInfo.setYestoday(yestodayPrice);
        electricityPriceInfo.setCurrentMonth(currentMonthPrice);
        electricityPriceInfo.setPreviousMonth(previousMonthPrice);

        return electricityPriceInfo;
    }

    private ElectricityPriceInfo getComplexElectricityPriceInfo(DataPoint dataPoint) throws Exception {

        DataPointElectricityConfig dataPointElectricityConfig = entityDao.getByPropertyValue(DataPointElectricityConfig.class, "dataPoint.objectId", dataPoint.getObjectId());
        if (dataPointElectricityConfig == null) {
            throw new BaseBusinessException("", "组合数据点[" + dataPoint.getName() + "]未配置电价信息!");
        }

        String dataPointTag = dataPoint.getDataPointTag();
        List<DataPoint> dataPointTagList = new ArrayList<DataPoint>();
        String jpql = "select o from " + DataPoint.class.getName() + " o where o.objectStatus=1 and o.original=1 and o.source = 1 order by o.dataPointId";
        List<DataPoint> dataPointList = entityDao.listByJpql(jpql);
        for (DataPoint tempDataPoint : dataPointList) {
            String tempDataPointTag = tempDataPoint.getDataPointTag();
            if (dataPointTag.contains(tempDataPointTag)) {
                dataPointTagList.add(tempDataPoint);
            }
        }

        Date today = DateUtil.getCurrentTime();
        String electricityPriceIssueJpql = "select o from " + ElectricityPriceIssue.class.getName() + " o where 1=1 "
                + " and to_char(o.startDate, 'YYYY-MM-DD HH24:MI:SS') <= ? "
                + " and to_char(o.endDate, 'YYYY-MM-DD HH24:MI:SS') > ? "
                + " and o.objectStatus = 1";
        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, today, today);
        if (electricityPriceIssue == null) {
            throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(today, "yyyy-MM-dd") + "]未发布电价!");
        }
        String electricityPriceListJpql = "select o from " + ElectricityPrice.class.getName() + " o where 1=1 and o.electricityUsageCategory.objectId = ? and o.voltageSegment.objectId = ? and o.electricityPriceIssue.objectId = ?";
        List<ElectricityPrice> electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
        String pointTag = dataPointTag;
        for (DataPoint dp : dataPointTagList) {
            pointTag = pointTag.replace(dp.getDataPointTag(), getDateElectricityPrice(dp, today, electricityPriceList) + "");
        }
        ExpressionParser parser = new SpelExpressionParser();
        Expression expression = parser.parseExpression(pointTag);
        Double todayPrice = expression.getValue(Double.class);

        electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, DateUtil.addDays(today, -1), DateUtil.addDays(today, -1));
        if (electricityPriceIssue == null) {
            throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(DateUtil.addDays(today, -1), "yyyy-MM-dd") + "]未发布电价!");
        }
        electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
        pointTag = dataPointTag;
        for (DataPoint dp : dataPointTagList) {
            pointTag = pointTag.replace(dp.getDataPointTag(), getDateElectricityPrice(dp, DateUtil.getEndDate(DateUtil.addDays(today, -1)), electricityPriceList) + "");
        }
//        parser = new SpelExpressionParser();
        expression = parser.parseExpression(pointTag);
        Double yestodayPrice = expression.getValue(Double.class);

        Double currentMonthPrice = 0.0;
        Date currentMonthFirstDay = DateUtil.convertStringToDate(DateUtil.getDateFormatString(today, "yyyy-MM") + "-01 23:59:59", "yyyy-MM-dd HH:mm:ss");
        Date tempDay = currentMonthFirstDay;
        while (tempDay.before(today)) {
            electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, tempDay, tempDay);
            if (electricityPriceIssue == null) {
                throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(tempDay, "yyyy-MM-dd") + "]未发布电价!");
            }
            electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
            pointTag = dataPointTag;
            for (DataPoint dp : dataPointTagList) {
                pointTag = pointTag.replace(dp.getDataPointTag(), getDateElectricityPrice(dp, tempDay, electricityPriceList) + "");
            }
//            parser = new SpelExpressionParser();
            expression = parser.parseExpression(pointTag);
            currentMonthPrice += expression.getValue(Double.class);
            tempDay = DateUtil.addDays(tempDay, 1);
        }
        currentMonthPrice += todayPrice;

        Double previousMonthPrice = 0.0;
        Date previousMonthFirstDay = DateUtil.addMonths(currentMonthFirstDay, -1);
        tempDay = previousMonthFirstDay;
        while (tempDay.before(currentMonthFirstDay)) {
            electricityPriceIssue = entityDao.getObject(electricityPriceIssueJpql, tempDay, tempDay);
            if (electricityPriceIssue == null) {
                throw new BaseBusinessException("", "日期[" + DateUtil.getDateFormatString(tempDay, "yyyy-MM-dd") + "]未发布电价!");
            }
            electricityPriceList = entityDao.listByJpql(electricityPriceListJpql, dataPointElectricityConfig.getElectricityUsageCategory().getObjectId(), dataPointElectricityConfig.getVoltageSegment().getObjectId(), electricityPriceIssue.getObjectId());
            pointTag = dataPointTag;
            for (DataPoint dp : dataPointTagList) {
                pointTag = pointTag.replace(dp.getDataPointTag(), getDateElectricityPrice(dp, tempDay, electricityPriceList) + "");
            }
//            parser = new SpelExpressionParser();
            expression = parser.parseExpression(pointTag);
            previousMonthPrice += expression.getValue(Double.class);
            tempDay = DateUtil.addDays(tempDay, 1);
        }

        ElectricityPriceInfo electricityPriceInfo = new ElectricityPriceInfo();
        electricityPriceInfo.setToday(todayPrice);
        electricityPriceInfo.setYestoday(yestodayPrice);
        electricityPriceInfo.setCurrentMonth(currentMonthPrice);
        electricityPriceInfo.setPreviousMonth(previousMonthPrice);

        return electricityPriceInfo;
    }

    private Double getDateElectricityPrice(DataPoint dataPoint, Date dateTime, List<ElectricityPrice> electricityPriceList) throws Exception {

        Date beginTime = DateUtil.getBeginDate(dateTime);
        String sql = "select max(ActualValue) maxActualValue"
                + " from ea_pointactualvalue where 1=1"
                + " and PointId=? and DatabaseTag=? and UTCDateTime between ? and ?";
        List list = entityDao.listBySql(sql, dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(beginTime.getTime()), new Timestamp(dateTime.getTime()));

        if (list.get(0) == null) {
            return 0.0;
        }
        String tempSql = "select max(ActualValue) maxActualValue"
                + " from ea_pointactualvalue where 1=1"
                + " and PointId=? and DatabaseTag=? and UTCDateTime >= ? and UTCDateTime < ?";
        Double totalPower = Double.valueOf(String.valueOf(list.get(0))) - getPreviousMaxIncrementValue(dataPoint, beginTime);
        Double calculatedPower = 0.0;
        Double totalPrice = 0.0;
        for (ElectricityPrice electricityPrice : electricityPriceList) {
            List<ElectricityPriceTimeGroup> electricityPriceTimeGroupList = electricityPrice.getElectricityPriceTimeGroupList();
            for (ElectricityPriceTimeGroup electricityPriceTimeGroup : electricityPriceTimeGroupList) {
                List<ElectricityPriceDate> electricityPriceDateList = electricityPriceTimeGroup.getElectricityPriceDateList();
                List<ElectricityPriceTime> electricityPriceTimeList = electricityPriceTimeGroup.getElectricityPriceTimeList();
                for (ElectricityPriceDate electricityPriceDate : electricityPriceDateList) {
                    Date startPriceDate = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy") + "-" + electricityPriceDate.getStartMonth() + "-" + electricityPriceDate.getStartDay() + " 00:00:00", "yyyy-MM-dd HH:mm:ss");
                    Date endPriceDate = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy") + "-" + electricityPriceDate.getEndMonth() + "-" + electricityPriceDate.getEndDay() + " 23:59:59", "yyyy-MM-dd HH:mm:ss");
                    if ((dateTime.after(startPriceDate) && dateTime.before(endPriceDate)) || dateTime.equals(startPriceDate) || dateTime.equals(endPriceDate)) {
                        for (ElectricityPriceTime electricityPriceTime : electricityPriceTimeList) {
                            Date startPriceTime = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy-MM-dd") + " " + electricityPriceTime.getStartTime(), DateUtil.STANDARD_DATEMINUTE_FORMAT);
                            Date endPriceTime = DateUtil.convertStringToDate(DateUtil.getDateFormatString(dateTime, "yyyy-MM-dd") + " " + electricityPriceTime.getEndTime(), DateUtil.STANDARD_DATEMINUTE_FORMAT);
                            if (electricityPriceTime.getEndTime().equals("00:00")) {
                                endPriceTime = DateUtil.getEndDate(dateTime);
                            }
                            if (endPriceTime.before(startPriceDate)) {
                                endPriceTime = DateUtil.addDays(endPriceTime, 1);
                            }
                            if (endPriceTime.after(dateTime)) {
                                endPriceTime = dateTime;
                            }
                            if (endPriceTime.equals(dateTime)) {
                                list = entityDao.listBySql(sql, dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(startPriceTime.getTime()), new Timestamp(endPriceTime.getTime()));
                            } else {
                                list = entityDao.listBySql(tempSql, dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(startPriceTime.getTime()), new Timestamp(endPriceTime.getTime()));
                            }
                            Double currentPower = 0.0;
                            if (list.get(0) != null) {
                                currentPower = Double.valueOf(String.valueOf(list.get(0))) - getPreviousMaxIncrementValue(dataPoint, startPriceTime);
                            }
                            totalPrice += electricityPriceTime.getElectricityPriceTimeGroup().getElectricityPrice().getPrice() * currentPower;
                            calculatedPower += currentPower;
                        }
                    }
                }
            }
        }
        totalPrice += (totalPower - calculatedPower) * 0.6;
        return totalPrice;
    }

    private Double getPreviousMaxIncrementValue(DataPoint dataPoint, Date dateTime) throws Exception {

        String sql = "select max(IncrementValue) maxIncrementValue"
                + " from ea_pointactualvalue where 1=1"
                + " and PointId=? and DatabaseTag=? and UTCDateTime < ?";
        List list = entityDao.listBySql(sql, dataPoint.getDataPointId(), dataPoint.getDatabaseTag(), new Timestamp(dateTime.getTime()));

        if (list.get(0) == null) {
            return 0.0;
        } else {
            return Double.valueOf(String.valueOf(list.get(0)));
        }
    }

    //对于组合表达式判断除数为0的情况
    private String handleExpression(String expression) {

        String sql = "";
        Set<String> set = dividerFilter(expression);
        // 如果表达式没有除数
        if (set.size() <= 0) {
            sql = expression;
        } else {
            List<String> dividerList = new ArrayList<String>();
            dividerList.addAll(set);
//            Collections.sort(dividerList);
            Collections.sort(dividerList, new Comparator<String>() {

                public int compare(String arg0, String arg1) {

                    return arg0.length() - arg1.length();
                }
            });
            StringBuffer result = new StringBuffer();
            for (String s : dividerList) {
                result.append("(" + s + "=0)or");
            }
            result.delete(result.length() - 2, result.length());
            sql = " case when (" + result.toString()
                    + ") then 0 else " + expression
                    + " end ";
        }
        return sql;
    }

    private Set<String> dividerFilter(String expression) {
        // 去掉原始字符串一个或多个空格
//        expression = expression.replaceAll("\\s+", "");
        int index = -1;
        // 利用treeSet将长度短的除数排到前面来先判断，如：表达戒a\(b+c\d),则将除数b移到前除数b+c\d前面来,防止出现除数为0的情况出现
        Set<String> dividers = new HashSet<String>();
        // 循环检查除号进行过滤，直到检查到过滤后的表达式中没有除号'/',同时使用index将除号的位置标记
        while ((index = expression.indexOf("/", index + 1)) > 0) {
            // 如果除号后面紧跟的是左括号'(',即除数是一个有括号包围的表达式，如：/()。'('这是除数的起点
            if (expression.charAt(index + 1) == '(') {
                // 将位置标记点移动到左括号'('后面的字符上,
                int next = index + 2;
                // 用一个计数器来记录(的数目
                int count = 1;
                // 循环检查括号，检查到左括号'('计数器就加1,如果检查到左括号')',则计数器就减1
                while (count != 0) {
                    if (expression.charAt(next) == '(') {
                        count++;
                    } else if (expression.charAt(next) == ')') {
                        count--;
                    }
                    next++;
                }
                // 得到第一表达式中第一层的除数
                String divider = expression.substring(index + 1, next);
                // 使用递归逐层得到除数
                int index1 = divider.indexOf("/", 0);
                if (index1 > 0) {
                    Set<String> set = dividerFilter(divider);
                    dividers.addAll(set);
                }
                dividers.add(divider);
            } else {
                // 除数中没有括号'()',但可能有右括号，如：表达戒a/(b+c/d)中的d);所以要判断右括号')'的情况
                int next = index + 1;
                do {
                    char c = expression.charAt(next);
                    if (c == '+' || c == '-' || c == '*' || c == '/'
                            ) {
                        break;
                    } else if (c == ')' && expression.substring(index + 1, next).indexOf("(") != expression.substring(index + 1, next).indexOf(")")) {
                        next++;
                        break;
                    } else {
                        next++;
                    }
                } while (next < expression.length());
                dividers.add(expression.substring(index + 1, next));
            }
        }
        return dividers;
    }
}
