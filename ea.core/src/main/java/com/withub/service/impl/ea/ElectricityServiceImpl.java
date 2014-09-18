package com.withub.service.impl.ea;


import com.alibaba.fastjson.JSONArray;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.*;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.ElectricityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service("electricityService")
@Transactional
public class ElectricityServiceImpl implements ElectricityService {

    //================================属性声明==================================
    @Autowired
    private EntityDao entityDao;

    //================================接口方法=================================
    //电压区间
    public void saveVoltageSegment(VoltageSegment voltageSegment) {

        entityDao.save(voltageSegment);
    }

    public void updateVoltageSegment(VoltageSegment voltageSegment) {

        entityDao.update(voltageSegment);
    }

    public VoltageSegment getVoltageSegment(String objectId) {

        return entityDao.getObject(VoltageSegment.class, objectId);
    }

    public void deleteVoltageSegment(String objectId) {

        entityDao.delete(VoltageSegment.class, objectId);
    }

    public RecordsetInfo queryVoltageSegment(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    //电价发布
    public void saveElectricityPriceIssue(ElectricityPriceIssue electricityPriceIssue) {

        electricityPriceIssue.setObjectId(StringUtil.getUuid());
        electricityPriceIssue.setCreateTime(DateUtil.getCurrentTime());
        electricityPriceIssue.setLastUpdateTime(DateUtil.getCurrentTime());
        electricityPriceIssue.setObjectVersion(1);
        electricityPriceIssue.setObjectStatus(1);
        entityDao.save(electricityPriceIssue);
    }


    public void updateElectricityPriceIssue(ElectricityPriceIssue electricityPriceIssue) {

        electricityPriceIssue.setCreateTime(DateUtil.getCurrentTime());
        electricityPriceIssue.setLastUpdateTime(DateUtil.getCurrentTime());
        electricityPriceIssue.setObjectVersion(1);
        electricityPriceIssue.setObjectStatus(1);
        entityDao.update(electricityPriceIssue);
    }


    public void deleteElectricityPriceIssue(String objectId) {

        String jpql = "update " + ElectricityPriceIssue.class.getName() + " set objectStatus = 0 where objectId = ?";
        entityDao.executeJpql(jpql, objectId);
    }


    public ElectricityPriceIssue getElectricityPriceIssue(String objectId) {

        return entityDao.getObject(ElectricityPriceIssue.class, objectId);
    }


    public RecordsetInfo queryElectricityPriceIssue(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public ElectricityPriceIssue getCurrentElectricityPriceIssue() throws Exception {

        Date now = DateUtil.getCurrentTime();
        return entityDao.getObject("from ElectricityPriceIssue where 1=1 and startDate <= ? and endDate >= ?", now, now);
    }

    public List<ElectricityPriceIssue> listElectricityPriceIssue() throws Exception {

        String jpql = "select o from " + ElectricityPriceIssue.class.getName() + " o where 1=1 and o.objectStatus = 1 order by o.startDate desc";
        return entityDao.listByJpql(jpql);
    }

    //月段电价
    public void saveElectricityPriceMonthSegment(ElectricityPriceMonthSegment electricityPriceMonthSegment) {

        electricityPriceMonthSegment.setObjectId(StringUtil.getUuid());
        electricityPriceMonthSegment.setOrderNo(getElectricityPriceMonthSegmentNextOrderNo());
        entityDao.save(electricityPriceMonthSegment);
    }

    public void updateElectricityPriceMonthSegment(ElectricityPriceMonthSegment electricityPriceMonthSegment) {

        ElectricityPriceMonthSegment oldElectricityPriceMonthSegment = getElectricityPriceMonthSegment(electricityPriceMonthSegment.getObjectId());
        electricityPriceMonthSegment.setOrderNo(oldElectricityPriceMonthSegment.getOrderNo());

        entityDao.update(electricityPriceMonthSegment);
    }

    public ElectricityPriceMonthSegment getElectricityPriceMonthSegment(String objectId) {

        return entityDao.getObject(ElectricityPriceMonthSegment.class, objectId);
    }

    public void deleteElectricityPriceMonthSegment(String objectId) {

        entityDao.delete(ElectricityPriceMonthSegment.class, objectId);
    }

    public RecordsetInfo queryElectricityPriceMonthSegment(QueryInfo queryInfo) throws Exception {

        return entityDao.query(queryInfo);
    }


    public void saveElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment) {

        electricityPriceTimeSegment.setObjectId(StringUtil.getUuid());
        electricityPriceTimeSegment.setCreateTime(DateUtil.getCurrentTime());
        electricityPriceTimeSegment.setLastUpdateTime(DateUtil.getCurrentTime());
        electricityPriceTimeSegment.setObjectVersion(1);
        electricityPriceTimeSegment.setObjectStatus(1);
        entityDao.save(electricityPriceTimeSegment);

    }

    public void updateElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment) {

        ElectricityPriceTimeSegment temp = entityDao.getObject(ElectricityPriceTimeSegment.class, electricityPriceTimeSegment.getObjectId());

        temp.setName(electricityPriceTimeSegment.getName());
        temp.setTag(electricityPriceTimeSegment.getTag());
        temp.setOrderNo(electricityPriceTimeSegment.getOrderNo());
        temp.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.update(temp);
    }

    public void deleteElectricityPriceTimeSegment(String objectId) throws Exception {

        entityDao.logicDelete(ElectricityPriceTimeSegment.class, objectId);
    }

    public ElectricityPriceTimeSegment getElectricityPriceTimeSegment(String objectId) {

        return entityDao.getObject(ElectricityPriceTimeSegment.class, objectId);
    }

    public List<ElectricityPriceTimeSegment> getAllElectricityPriceTimeSegment() {

        return entityDao.listByJpql("select o from " + ElectricityPriceTimeSegment.class.getSimpleName() + " o where 1=1 and o.objectStatus = 1 order by o.orderNo");
    }

    public RecordsetInfo queryElectricityPriceTimeSegment(QueryInfo queryInfo) throws Exception {

        return entityDao.query(queryInfo);
    }

    @Override
    public RecordsetInfo queryElectricityPriceTimeSegmentDetail(QueryInfo queryInfo) throws Exception {

        return entityDao.query(queryInfo);
    }

    @Override
    public String queryElectricityPriceRange(String electricityPriceIssueId) throws Exception {

        String jpql = "select o from " + VoltageSegment.class.getName() + " o  order by o.beginValue";
        List<VoltageSegment> voltageSegmentList = entityDao.listByJpql(jpql);

        List<ElectricityPriceTimeSegment> electricityPriceTimeSegmentList = getAllElectricityPriceTimeSegment();

        jpql = "select o from " + ElectricityUsageCategory.class.getName() + " o where o.parent.objectId is null";
        ElectricityUsageCategory root = entityDao.getObject(jpql);
        List<ElectricityUsageCategory> electricityUsageCategoryList = root.getChildList();


        jpql = "select o from " + ElectricityPrice.class.getName() + " o  where o.electricityPriceIssue.objectId= ? order by orderNo";
        List<ElectricityPrice> electricityPriceRangeList = entityDao.listByJpql(jpql, electricityPriceIssueId);

        Map electricityPriceRangeMap = new HashMap();
        for (ElectricityPrice electricityPrice : electricityPriceRangeList) {
            String key = electricityPrice.getElectricityUsageCategory().getObjectId() + "_" + electricityPrice.getElectricityPriceTimeSegment().getObjectId() +
                    "_" + electricityPrice.getVoltageSegment().getObjectId();

            StringBuilder divString = new StringBuilder();
            if (electricityPriceRangeMap.containsKey(key)) {

                divString.append(electricityPriceRangeMap.get(key) + "<br/>");

            }
            divString.append(getElectricityPriceDivString(electricityPrice));

            electricityPriceRangeMap.put(key, divString.toString());

        }

        int timeSegments = electricityPriceTimeSegmentList.size();
        int categorys = electricityUsageCategoryList.size();
        int row = categorys * timeSegments;

        StringBuilder table = new StringBuilder();

        // table 头
        table.append("<table  class='table table-hover  table-condensed' id='electricityPriceRange'>");
        table.append("<thead>");
        table.append("<tr>");
        table.append("<th  style='vertical-align:middle; text-align:center;' rowspan='2'colspan='2'>用电分类</th>");
        table.append("<th  style='vertical-align:middle; text-align:center;' colspan='" + voltageSegmentList.size() + "'>电度电价（单位：元/千瓦时）</th>");
        table.append("</tr>");

        table.append("<tr>");
        for (VoltageSegment voltageSegment : voltageSegmentList) {
            table.append("<th style='vertical-align:middle; text-align:center;'  width='140px'>" + voltageSegment.getName() + "</th>");
        }
        table.append("</tr>");
        table.append("</thead>");
        ElectricityUsageCategory electricityUsageCategory = null;
        ElectricityPriceTimeSegment electricityPriceTimeSegment = null;

        // table 内容
        for (int i = 0; i < row; i++) {

            table.append("<tr>");
            if (i % (timeSegments) == 0) {
                int index = i / (timeSegments);
                electricityUsageCategory = electricityUsageCategoryList.get(index);
                table.append("<th  style='vertical-align:middle; text-align:center;' rowspan='" + timeSegments + "'>" + electricityUsageCategory.getName() + "</th>");
            }

            {
                int index = i % timeSegments;
                if (index >= timeSegments) {
                    index = index % timeSegments;
                }
                electricityPriceTimeSegment = electricityPriceTimeSegmentList.get(index);

                table.append("<th   style='vertical-align:middle; text-align:center;' width='60px'>" + electricityPriceTimeSegment.getName() + "</th>");

            }


            for (VoltageSegment voltageSegment : voltageSegmentList) {

                String id = electricityUsageCategory.getObjectId() + "_" + electricityPriceTimeSegment.getObjectId() + "_" + voltageSegment.getObjectId();

                if (electricityPriceRangeMap.get(id) != null) {

                    table.append("<td valign='top'  >" +
                            "<div id='" + id + "' class='hasValue'  style='height: 100%;width:auto; text-align:left;'>" + electricityPriceRangeMap.get(id) + "</div>" +
                            "</td>");
                } else {
                    table.append("<td valign='top' >" +
                            "<div id='" + id + "'class='noValue' style='height: 100%;width:auto; text-align:left; '>&nbsp;&nbsp;&nbsp;&nbsp;</div>" +
                            "</td>");
                }

            }
            table.append("</tr>");
        }

        table.append("</table>");

        return table.toString();
    }

    @Override
    public List<ElectricityPrice> getElectricityPricesByElectricityPriceElementIds(String electricityPriceElementIds, String electricityPriceIssueId) throws Exception {

        String[] ids = electricityPriceElementIds.split("_");

        String jpql = "select o from  " + ElectricityPrice.class.getName() + " o where 1=1 "
                + " and  o.electricityUsageCategory.objectId =? "
                + " and o.electricityPriceTimeSegment.objectId =?"
                + " and o.voltageSegment.objectId =? and o.electricityPriceIssue.objectId = ? order by orderNo ";


        List<ElectricityPrice> electricityPriceList = entityDao.listByJpql(jpql, ids[0], ids[1], ids[2], electricityPriceIssueId);


        return electricityPriceList;
    }

    @Override
    public void saveElectricityPriceRange(String dateTimePriceArray, String electricityPriceElementIds, String electricityPriceIssueId) throws Exception {

        List<ElectricityPrice> electricityPriceList = getElectricityPricesByElectricityPriceElementIds(electricityPriceElementIds, electricityPriceIssueId);

        for (ElectricityPrice electricityPrice : electricityPriceList) {

            for (ElectricityPriceTimeGroup electricityPriceTimeGroup : electricityPrice.getElectricityPriceTimeGroupList()) {

                for (ElectricityPriceDate electricityPriceDate : electricityPriceTimeGroup.getElectricityPriceDateList()) {

                    entityDao.delete(electricityPriceDate);
                }

                for (ElectricityPriceTime electricityPriceTime : electricityPriceTimeGroup.getElectricityPriceTimeList()) {

                    entityDao.delete(electricityPriceTime);
                }

                entityDao.delete(electricityPriceTimeGroup);
            }

            entityDao.delete(electricityPrice);
        }


        ElectricityUsageCategory electricityUsageCategory = new ElectricityUsageCategory();
        VoltageSegment voltageSegment = new VoltageSegment();
        ElectricityPriceTimeSegment electricityPriceTimeSegment = new ElectricityPriceTimeSegment();

        ElectricityPrice electricityPrice = new ElectricityPrice();

        String[] ids = electricityPriceElementIds.split("_");
        electricityUsageCategory.setObjectId(ids[0]);
        electricityPriceTimeSegment.setObjectId(ids[1]);
        voltageSegment.setObjectId(ids[2]);

        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(ElectricityPriceIssue.class, electricityPriceIssueId);

        electricityPrice.setElectricityUsageCategory(electricityUsageCategory);
        electricityPrice.setElectricityPriceTimeSegment(electricityPriceTimeSegment);
        electricityPrice.setVoltageSegment(voltageSegment);
        electricityPrice.setElectricityPriceIssue(electricityPriceIssue);

        JSONArray array = JSONArray.parseArray(dateTimePriceArray);


        for (int i = 0; i < array.size(); i++) {

            JSONArray dateTimePrice = array.getJSONArray(i);
            JSONArray dateTimeGroupJSONArray = dateTimePrice.getJSONArray(0);
            Float price;

            price = dateTimePrice.getFloat(1);

            electricityPrice.setPrice(price);
            electricityPrice.setOrderNo(i);
            electricityPrice.setObjectId(StringUtil.getUuid());
            entityDao.save(electricityPrice);

            for (int j = 0; j < dateTimeGroupJSONArray.size(); j++) {

                JSONArray electricityPriceTimeGroupJSONArray = dateTimeGroupJSONArray.getJSONArray(j);

                ElectricityPriceTimeGroup electricityPriceTimeGroup = new ElectricityPriceTimeGroup();
                electricityPriceTimeGroup.setObjectId(StringUtil.getUuid());
                electricityPriceTimeGroup.setElectricityPrice(electricityPrice);
                electricityPriceTimeGroup.setOrderNo(j);
                entityDao.save(electricityPriceTimeGroup);


                JSONArray dateJSONArray = electricityPriceTimeGroupJSONArray.getJSONArray(0);

                for (int m = 0; m < dateJSONArray.size(); m++) {

                    JSONArray electricityPriceDateJSONArray = dateJSONArray.getJSONArray(m);
                    int startMonth = electricityPriceDateJSONArray.getInteger(0);
                    int startDay = electricityPriceDateJSONArray.getInteger(1);
                    int endtMonth = electricityPriceDateJSONArray.getInteger(2);
                    int endtDay = electricityPriceDateJSONArray.getInteger(3);

                    ElectricityPriceDate electricityPriceDate = new ElectricityPriceDate();
                    electricityPriceDate.setObjectId(StringUtil.getUuid());
                    electricityPriceDate.setElectricityPriceTimeGroup(electricityPriceTimeGroup);
                    electricityPriceDate.setStartDay(startDay);
                    electricityPriceDate.setEndDay(endtDay);
                    electricityPriceDate.setStartMonth(startMonth);
                    electricityPriceDate.setEndMonth(endtMonth);

                    entityDao.save(electricityPriceDate);

                }

                JSONArray timeJSONArray = electricityPriceTimeGroupJSONArray.getJSONArray(1);
                for (int n = 0; n < timeJSONArray.size(); n++) {

                    JSONArray electricityPriceTimeJSONArray = timeJSONArray.getJSONArray(n);
                    String startTime = electricityPriceTimeJSONArray.getString(0);
                    String endTime = electricityPriceTimeJSONArray.getString(1);

                    ElectricityPriceTime electricityPriceTime = new ElectricityPriceTime();
                    electricityPriceTime.setObjectId(StringUtil.getUuid());
                    electricityPriceTime.setElectricityPriceTimeGroup(electricityPriceTimeGroup);
                    electricityPriceTime.setStartTime(startTime);
                    electricityPriceTime.setEndTime(endTime);

                    entityDao.save(electricityPriceTime);

                }
            }
        }
    }


    private Integer getElectricityPriceMonthSegmentNextOrderNo() {

        Integer nextOrderNo = 1;

        String sql = "select max(o.orderNo) from ElectricityPriceTimeSegment o";

        List<Integer> list = entityDao.listByJpql(sql);
        Integer maxOrderNo = list.get(0);

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }

        return nextOrderNo;
    }

    private Integer getElectricityPriceTimeSegmentNextOrderNo() {

        Integer nextOrderNo = 1;

        String sql = "select max(o.orderNo) from ElectricityPriceMonthSegment o";

        List<Integer> list = entityDao.listByJpql(sql);
        Integer maxOrderNo = list.get(0);

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }

        return nextOrderNo;
    }

    private String getElectricityPriceDivString(ElectricityPrice electricityPrice) {

        StringBuilder divString = new StringBuilder();

        divString.append("<div >" + "<b>电价:" + electricityPrice.getPrice() + " </b><br/>");
        for (ElectricityPriceTimeGroup electricityPriceTimeGroup : electricityPrice.getElectricityPriceTimeGroupList()) {
            for (ElectricityPriceDate electricityPriceDate : electricityPriceTimeGroup.getElectricityPriceDateList()) {
                divString.append(electricityPriceDate.getStartMonth() + "月-" + electricityPriceDate.getStartDay()
                        + "日~" + electricityPriceDate.getEndMonth() + "月-" + electricityPriceDate.getEndDay() + "日<br/>");
            }
            for (ElectricityPriceTime electricityPriceTime : electricityPriceTimeGroup.getElectricityPriceTimeList()) {
                divString.append(electricityPriceTime.getStartTime() + "~" + electricityPriceTime.getEndTime() + "<br/>");
            }
        }

        divString.append("</div>");

        return divString.toString();
    }

    //================================属性方法==================================
    public EntityDao getEntityDao() {

        return entityDao;
    }

    public void setEntityDao(EntityDao entityDao) {

        this.entityDao = entityDao;
    }
}
