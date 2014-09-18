package com.withub.web.controller.ea;

import com.withub.common.enumeration.TimeUnit;
import com.withub.common.util.DateUtil;
import com.withub.model.ea.ActualValue;
import com.withub.model.ea.DataPoint;
import com.withub.model.ea.DataPointInfo;
import com.withub.model.ea.ElectricityPriceInfo;
import com.withub.service.ea.DataPointService;
import com.withub.service.ea.PointDataFetchService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

@Controller
@RequestMapping(value = "/ea/pointDataFetch/actualValue")
public class PointDataFetchController {

    //========================== 属性声明 ================================================================

    @Autowired
    private PointDataFetchService pointDataFetchService;

    @Autowired
    private DataPointService dataPointService;

    //========================== Controller方法 ==========================================================

    @RequestMapping(value = "/fetchSinglePointMultiTimeSegmentActualValue", method = RequestMethod.GET)
    public void fetchSinglePointMultiTimeSegmentActualValue(String dataPointObjectId, String dateRanges, TimeUnit timeUnit, ModelMap modelMap) throws Exception {

        JSONArray dateRangeArray = (JSONArray) JSONSerializer.toJSON(dateRanges);
        List items = new ArrayList();
        for (int i = 0; i < dateRangeArray.size(); i++) {
            Map map = new HashMap();
            JSONObject object = dateRangeArray.getJSONObject(i);
            if (DateUtil.getDiffDays(new Date(object.getLong("startTime")), new Date(object.getLong("endTime"))) < 3) {
                timeUnit = TimeUnit.Hour;
            }

            DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
            DataPointInfo dataPointInfo = new DataPointInfo();
            dataPointInfo.setDataPointId(dataPoint.getDataPointId());
            dataPointInfo.setDataPointName(dataPoint.getName());
            dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
            dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
            dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());

            List<ActualValue> actualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId
                    , new Date(object.getLong("startTime")), DateUtil.getBeginDate(DateUtil.addDays(new Date(object.getLong("endTime")), 1)), timeUnit);

            map.put("dataPointInfo", dataPointInfo);
            map.put("actualValueList", actualValueList);
            items.add(map);
        }

        modelMap.put("items", items);
    }

    @RequestMapping(value = "/fetchSinglePointLatestActualValue", method = RequestMethod.GET)
    public void fetchSinglePointLatestActualValue(String dataPointObjectId, ModelMap modelMap) throws Exception {

        double value = pointDataFetchService.fetchLatestActualValue(dataPointObjectId);
        modelMap.put("value", value);
    }

    @RequestMapping(value = "/fetchMultiPointLatestActualValue", method = RequestMethod.GET)
    public void fetchMultiPointLatestActualValue(String dataPointObjectIds, @RequestParam(value = "numerators", required = false) Integer numerators, ModelMap modelMap) throws Exception {

        String[] dataPointArray = dataPointObjectIds.split("\\|");
        List items = new ArrayList();
        if (numerators == null) {
            for (int i = 0; i < dataPointArray.length; i++) {
                String dataPointObjectId = dataPointArray[i];
                double value = pointDataFetchService.fetchLatestActualValue(dataPointObjectId);
                items.add(value);
            }
        } else {
            Double numeratorValue = 0.0;
            Double denominatorValue = 0.0;
            for (int i = 0; i < numerators; i++) {
                String dataPointObjectId = dataPointArray[i];
                numeratorValue += pointDataFetchService.fetchLatestActualValue(dataPointObjectId);
            }
            for (int i = numerators; i < dataPointArray.length; i++) {
                String dataPointObjectId = dataPointArray[i];
                denominatorValue += pointDataFetchService.fetchLatestActualValue(dataPointObjectId);
            }
            items.add(numeratorValue);
            items.add(denominatorValue);
        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/fetchSinglePointActualValue", method = RequestMethod.GET)
    public void fetchSinglePointActualValue(String dataPointObjectId, String beginDate, String endDate, TimeUnit timeUnit, @RequestParam(value = "dateFormatFlag", required = false) String dateFormatFlag, ModelMap modelMap) throws Exception {

        List items = new ArrayList();
        List<ActualValue> actualValueList = new ArrayList<ActualValue>();
        if (dateFormatFlag != null && dateFormatFlag.equals("dont")) {
            actualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId
                    , DateUtil.convertStringToDate(beginDate, DateUtil.STANDARD_DATETIME_FORMAT)
                    , DateUtil.convertStringToDate(endDate, DateUtil.STANDARD_DATETIME_FORMAT), timeUnit);
        } else {
            actualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId
                    , DateUtil.convertStringToDate(beginDate, DateUtil.STANDARD_DATE_FORMAT)
                    , DateUtil.addDays(DateUtil.convertStringToDate(endDate, DateUtil.STANDARD_DATE_FORMAT), 1), timeUnit);
        }
        Map map = new HashMap();

        DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
        DataPointInfo dataPointInfo = new DataPointInfo();
        dataPointInfo.setDataPointId(dataPoint.getDataPointId());
        dataPointInfo.setDataPointName(dataPoint.getName());
        dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
        dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
        dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());

        map.put("dataPointInfo", dataPointInfo);
        map.put("actualValueList", actualValueList);

        items.add(map);
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/fetchMultiPointActualValue", method = RequestMethod.GET)
    public void fetchMultiPointActualValue(String dataPointObjectIds, String beginDate, String endDate, TimeUnit timeUnit, ModelMap modelMap) throws Exception {

        String[] dataPointArray = dataPointObjectIds.split("\\|");
        List items = new ArrayList();
        for (int i = 0; i < dataPointArray.length; i++) {
            Map map = new HashMap();
            String dataPointObjectId = dataPointArray[i];
            DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
            DataPointInfo dataPointInfo = new DataPointInfo();
            dataPointInfo.setDataPointId(dataPoint.getDataPointId());
            dataPointInfo.setDataPointName(dataPoint.getName());
            dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
            dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
            dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());

            List<ActualValue> actualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId
                    , DateUtil.convertStringToDate(beginDate, DateUtil.STANDARD_DATE_FORMAT)
                    , DateUtil.addDays(DateUtil.convertStringToDate(endDate, DateUtil.STANDARD_DATE_FORMAT), 1), timeUnit);

            map.put("dataPointInfo", dataPointInfo);
            map.put("actualValueList", actualValueList);
            items.add(map);
        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/fetchSinglePointElectricityPrice", method = RequestMethod.GET)
    public void fetchSinglePointElectricityPrice(String dataPointObjectId, ModelMap modelMap) throws Exception {

        List electricityPriceList = new ArrayList();
        ElectricityPriceInfo electricityPriceInfo = pointDataFetchService.getElectricityPriceInfo(dataPointObjectId);
        electricityPriceList.add(electricityPriceInfo.getToday());
        electricityPriceList.add(electricityPriceInfo.getYestoday());
        electricityPriceList.add(electricityPriceInfo.getCurrentMonth());
        electricityPriceList.add(electricityPriceInfo.getPreviousMonth());

        modelMap.put("electricityPriceList", electricityPriceList);
    }

    @RequestMapping(value = "/fetchSinglePointContrastActualValue", method = RequestMethod.GET)
    public void fetchSinglePointContrastActualValue(String dataPointObjectIds, String latelyInterval, TimeUnit timeUnit, String contrastCycle, @RequestParam(value = "firstCounts", required = false) Integer firstCounts, ModelMap modelMap) throws Exception {

        //计算基准时间段
        Date currentBeginDate = null;
        Date currentEndDate = new Date();
        if (timeUnit == TimeUnit.Minute) {
            currentBeginDate = DateUtil.addMinutes(currentEndDate, -Integer.parseInt(latelyInterval));
        } else if (timeUnit == TimeUnit.Hour) {
            currentBeginDate = DateUtil.addHours(currentEndDate, -Integer.parseInt(latelyInterval));
        } else if (timeUnit == TimeUnit.Day) {
            currentBeginDate = DateUtil.addDays(currentEndDate, -Integer.parseInt(latelyInterval));
        } else if (timeUnit == TimeUnit.Week) {
            currentBeginDate = DateUtil.addDays(currentEndDate, -Integer.parseInt(latelyInterval) * 7);
        } else if (timeUnit == TimeUnit.Month) {
            currentBeginDate = DateUtil.addMonths(currentEndDate, -Integer.parseInt(latelyInterval));
        } else if (timeUnit == TimeUnit.Year) {
            currentBeginDate = DateUtil.addYears(currentEndDate, -Integer.parseInt(latelyInterval));
        }
//        System.out.println(DateUtil.getDateFormatString(currentBeginDate,DateUtil.STANDARD_DATETIME_FORMAT) + "~" + DateUtil.getDateFormatString(currentEndDate,DateUtil.STANDARD_DATETIME_FORMAT));
        String[] dataPointArray = dataPointObjectIds.split("\\|");

        if (firstCounts == null) {
            //计算对比时间段
            Date beforeBeginDate = currentBeginDate;
            Date beforeEndDate = currentEndDate;
            String[] contrastInfo = contrastCycle.split(",");
            beforeBeginDate = DateUtil.addTimes(beforeBeginDate, Integer.parseInt(contrastInfo[0]), Integer.parseInt(contrastInfo[1]), Integer.parseInt(contrastInfo[2]), Integer.parseInt(contrastInfo[3]), Integer.parseInt(contrastInfo[4]), 0);
            beforeEndDate = DateUtil.addTimes(beforeEndDate, Integer.parseInt(contrastInfo[0]), Integer.parseInt(contrastInfo[1]), Integer.parseInt(contrastInfo[2]), Integer.parseInt(contrastInfo[3]), Integer.parseInt(contrastInfo[4]), 0);

//            System.out.println(DateUtil.getDateFormatString(beforeBeginDate,DateUtil.STANDARD_DATETIME_FORMAT) + "~" + DateUtil.getDateFormatString(beforeEndDate,DateUtil.STANDARD_DATETIME_FORMAT));
            //时间段间对比
            Double currentValue = 0.0;
            Double beforeValue = 0.0;
            for (int i = 0; i < dataPointArray.length; i++) {
                String dataPointObjectId = dataPointArray[i];
                List<ActualValue> currentActualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId, currentBeginDate, currentEndDate, TimeUnit.None);
                if (CollectionUtils.isEmpty(currentActualValueList)) {
                    return;
                }
                currentValue += currentActualValueList.get(0).getAvgActualValue() == null ? currentActualValueList.get(0).getSumActualValue().doubleValue() : currentActualValueList.get(0).getAvgActualValue();

                List<ActualValue> beforeActualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId, beforeBeginDate, beforeEndDate, TimeUnit.None);
                if (CollectionUtils.isEmpty(beforeActualValueList)) {
                    return;
                }
                beforeValue += beforeActualValueList.get(0).getAvgActualValue() == null ? beforeActualValueList.get(0).getSumActualValue().doubleValue() : beforeActualValueList.get(0).getAvgActualValue();
            }
            Double value = 0.0;
            if (beforeValue != 0.0) {
                value = (currentValue - beforeValue) / beforeValue;
            }
            modelMap.put("value", value);
        } else {
            //数据点间对比
            Double firstValue = 0.0;
            Double secondValue = 0.0;
            for (int i = 0; i < firstCounts; i++) {
                String dataPointObjectId = dataPointArray[i];
                List<ActualValue> firstActualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId, currentBeginDate, currentEndDate, TimeUnit.None);
                if (CollectionUtils.isEmpty(firstActualValueList)) {
                    return;
                }
                firstValue += firstActualValueList.get(0).getAvgActualValue() == null ? firstActualValueList.get(0).getSumActualValue().doubleValue() : firstActualValueList.get(0).getAvgActualValue();
            }
            for (int i = firstCounts; i < dataPointArray.length; i++) {
                String dataPointObjectId = dataPointArray[i];
                List<ActualValue> secondActualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId, currentBeginDate, currentEndDate, TimeUnit.None);
                if (CollectionUtils.isEmpty(secondActualValueList)) {
                    return;
                }
                secondValue += secondActualValueList.get(0).getAvgActualValue() == null ? secondActualValueList.get(0).getSumActualValue().doubleValue() : secondActualValueList.get(0).getAvgActualValue();
            }
            Double value = 0.0;
            if (secondValue != 0.0) {
                value = (firstValue - secondValue) / secondValue;
            }
            modelMap.put("value", value);
        }
    }

    @RequestMapping(value = "/fetchSinglePointSameTimeSegmentContrastActualValue", method = RequestMethod.GET)
    public void fetchSinglePointSameTimeSegmentContrastActualValue(String dataPointObjectId, String datumBeginDate, String datumEndDate, String contrastBeginDate, String contrastEndDate, TimeUnit timeUnit, ModelMap modelMap) throws Exception {

        DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);
        DataPointInfo dataPointInfo = new DataPointInfo();
        dataPointInfo.setDataPointId(dataPoint.getDataPointId());
        dataPointInfo.setDataPointName(dataPoint.getName());
        dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
        dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
        dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());

        List<ActualValue> datumActualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId
                , DateUtil.convertStringToDate(datumBeginDate, DateUtil.STANDARD_DATE_FORMAT)
                , DateUtil.addDays(DateUtil.convertStringToDate(datumEndDate, DateUtil.STANDARD_DATE_FORMAT), 1), timeUnit);

        List<ActualValue> contrastActualValueList = pointDataFetchService.fetchPointActualValue(dataPointObjectId
                , DateUtil.convertStringToDate(contrastBeginDate, DateUtil.STANDARD_DATE_FORMAT)
                , DateUtil.addDays(DateUtil.convertStringToDate(contrastEndDate, DateUtil.STANDARD_DATE_FORMAT), 1), timeUnit);

        modelMap.put("dataPointInfo", dataPointInfo);
        modelMap.put("datumActualValueList", datumActualValueList);
        modelMap.put("contrastActualValueList", contrastActualValueList);
    }


    @RequestMapping(value = "/fetchMultiPointElectricityPriceList", method = RequestMethod.GET)
    public void fetchMultiPointElectricityPriceList(String dataPointObjectIds, String beginDate, String endDate, ModelMap modelMap) throws Exception {

        String[] dataPointArray = dataPointObjectIds.split("\\|");

        List items = new ArrayList();
        for (int i = 0; i < dataPointArray.length; i++) {

            Map map = new HashMap();

            String dataPointObjectId = dataPointArray[i];
            DataPoint dataPoint = dataPointService.getDataPointById(dataPointObjectId);

            DataPointInfo dataPointInfo = new DataPointInfo();
            dataPointInfo.setDataPointId(dataPoint.getDataPointId());
            dataPointInfo.setDataPointName(dataPoint.getName());
            dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
            dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
            dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());

            List electricityPriceList = dataPointService.listElectricityPriceByDataPointId(dataPointObjectId, DateUtil.convertStringToDate(beginDate, DateUtil.STANDARD_DATE_FORMAT));

            List valueList = pointDataFetchService.getElectricityPrice(dataPointObjectId
                    , DateUtil.convertStringToDate(beginDate, DateUtil.STANDARD_DATE_FORMAT)
                    , DateUtil.addDays(DateUtil.convertStringToDate(endDate, DateUtil.STANDARD_DATE_FORMAT), 1));

            map.put("dataPointInfo", dataPointInfo);
            map.put("electricityPriceList", electricityPriceList);
            map.put("valueList", valueList);
            items.add(map);
        }
        modelMap.put("items", items);
    }
}
