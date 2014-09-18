package com.withub.service.impl.ea;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.*;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.service.ea.DataPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service("dataPointElectricityService")
@Transactional
public class DataPointElectricityServiceImpl implements DataPointElectricityService {

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private DataPointService dataPointService;

    public ElectricityUsageCategory getRootEntity() throws Exception {

        String sql = "select o from ElectricityUsageCategory o where o.parent.objectId is null";
        return entityDao.getObject(sql);
    }

    public ElectricityUsageCategory getElectricityUsageByObjectId(String objectId) throws Exception {

        return entityDao.getByPropertyValue(ElectricityUsageCategory.class, "objectId", objectId);
    }

    public void createElectricityUsage(ElectricityUsageCategory electricityUsageCategory) throws Exception {

        electricityUsageCategory.setObjectId(StringUtil.getUuid());
        electricityUsageCategory.setOrderNo(getNextOrderNo(electricityUsageCategory));

        entityDao.save(electricityUsageCategory);
    }

    public void updateElectricityUsage(ElectricityUsageCategory electricityUsageCategory) throws Exception {

        ElectricityUsageCategory oldElectricityUsageCategory = entityDao.getObject(ElectricityUsageCategory.class, electricityUsageCategory.getObjectId());
        electricityUsageCategory.setOrderNo(oldElectricityUsageCategory.getOrderNo());

        entityDao.update(electricityUsageCategory);
    }

    public void deleteElectricityUsage(String objectId) throws Exception {

        entityDao.delete(ElectricityUsageCategory.class, objectId);
    }

    private Integer getNextOrderNo(ElectricityUsageCategory electricityUsageCategory) throws Exception {

        Integer nextOrderNo = 1;

        String parentId = electricityUsageCategory.getParent().getObjectId();

        String sql = "select max(o.orderNo) from ElectricityUsageCategory o where o.parent.objectId='" + parentId + "'";

        List<Integer> list = entityDao.listByJpql(sql);
        Integer maxOrderNo = list.get(0);

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }

        return nextOrderNo;
    }


    public RecordsetInfo queryDataPointElectricityConfig(QueryInfo queryInfo) throws Exception {

        return entityDao.query(queryInfo);
    }

    public DataPointElectricityConfig getDataPointElectricityConfigByObjectId(String objectId) throws Exception {

        return entityDao.getObject(DataPointElectricityConfig.class, objectId);
    }

    public void createDataPointElectricityConfig(DataPointElectricityConfig dataPointElectricityConfig) throws Exception {

        String jpql = "select o from DataPointElectricityConfig o where o.dataPoint.objectId =? and o.electricityUsageCategory.objectId = ?";

        DataPointElectricityConfig oldDataPointElectricityConfig = entityDao.getObject(jpql, dataPointElectricityConfig.getDataPoint().getObjectId(), dataPointElectricityConfig.getElectricityUsageCategory().getObjectId());

        if (oldDataPointElectricityConfig != null) {
            oldDataPointElectricityConfig.setVoltageSegment(dataPointElectricityConfig.getVoltageSegment());
            entityDao.update(oldDataPointElectricityConfig);
        } else {
            dataPointElectricityConfig.setObjectId(StringUtil.getUuid());
            entityDao.save(dataPointElectricityConfig);
        }
    }

    public void saveDataPointElectricityConfigs(String electricityUsageCategoryId, String dataPointIds, String voltageSegmentId) throws Exception {

        ElectricityUsageCategory electricityUsageCategory = getElectricityUsageByObjectId(electricityUsageCategoryId);
        VoltageSegment voltageSegment = entityDao.getByPropertyValue(VoltageSegment.class, "objectId", voltageSegmentId);
        String[] dataPointIdArray = dataPointIds.split("\\|");
        for (int i = 0; i < dataPointIdArray.length; i++) {
            DataPointElectricityConfig dataPointElectricityConfig = new DataPointElectricityConfig();
            dataPointElectricityConfig.setObjectId(StringUtil.getUuid());
            dataPointElectricityConfig.setElectricityUsageCategory(electricityUsageCategory);
            dataPointElectricityConfig.setDataPoint(entityDao.getObject(DataPoint.class, dataPointIdArray[i]));
            dataPointElectricityConfig.setVoltageSegment(voltageSegment);
            createDataPointElectricityConfig(dataPointElectricityConfig);
        }
    }

    public void updateDataPointElectricityConfig(DataPointElectricityConfig dataPointElectricityConfig) throws Exception {

        entityDao.update(dataPointElectricityConfig);
    }

    public void deleteDataPointElectricityConfig(String objectId) throws Exception {

        entityDao.delete(DataPointElectricityConfig.class, objectId);
    }

    public List listAllDataPointElectricityConfig() throws Exception {

        String jpql = "select o from " + DataPointElectricityConfig.class.getName() + " o where 1=1";
        return entityDao.listByJpql(jpql);
    }


    public List<Map> buildTimeSegmentElectricityPriceList(String electricityPriceIssueId, List<ElectricityPrice> electricityPriceList) throws Exception {

        ElectricityPriceIssue electricityPriceIssue = entityDao.getObject(ElectricityPriceIssue.class, electricityPriceIssueId);

        Date startTime = electricityPriceIssue.getStartDate();
        Date endTime = new Date();

        List<Map> timeSegmentList = new ArrayList();

        Date dateTime = new Date(startTime.getTime());
        while (dateTime.before(endTime)) {
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

                                Map data = new HashMap();
                                data.put("start", startPriceTime.getTime());
                                data.put("end", endPriceTime.getTime());
                                data.put("electricityPrice", electricityPrice);
                                timeSegmentList.add(data);
                            }
                        }
                    }
                }
            }

            dateTime = DateUtil.addDays(dateTime, 1);
        }

        return timeSegmentList;
    }

    public List<Map> buildTimeSegmentElectricityPriceList(String electricityPriceIssueId) throws Exception {

        List<ElectricityPrice> electricityPriceList = dataPointService.listElectricityPriceByIssueId(electricityPriceIssueId);
        return buildTimeSegmentElectricityPriceList(electricityPriceIssueId, electricityPriceList);
    }

    public List<DataPointElectricityConfig> listByDataPointId(String dataPointId) {

        String jpql = "select o from " + DataPointElectricityConfig.class.getSimpleName() + " o where o.dataPoint.objectId =?";
        return entityDao.listByJpql(jpql, dataPointId);
    }
}
