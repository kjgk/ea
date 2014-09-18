package com.withub.web.controller.ea;


import com.withub.common.enumeration.TimeUnit;
import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.DataPoint;
import com.withub.model.ea.DataPointGroup;
import com.withub.model.ea.DataPointInfo;
import com.withub.model.ea.UnitOfMeasure;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.service.ea.DataPointGroupService;
import com.withub.service.ea.DataPointService;
import com.withub.service.ea.UserPointDataService;
import com.withub.util.ConfigUtil;
import com.withub.web.common.BaseController;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;


@Controller
@RequestMapping(value = "/ea")
public class UserPointDataController extends BaseController {

    //===================== 属性声明 =================================================

    @Autowired
    private UserPointDataService userPointDataService;

    @Autowired
    private DataPointService dataPointService;

    @Autowired
    private DataPointGroupService dataPointGroupService;

    @Autowired
    private DataPointElectricityService dataPointElectricityService;

    //===================== Controller方法 ===========================================

    @RequestMapping(value = "/userDataPoint/query", method = RequestMethod.GET)
    public void queryUserDataPoint(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(DataPoint.class);
        this.setIntegerValueEqualsQueryCondition(queryInfo, "source", 2);

        if (StringUtil.isNotEmpty(name)) {
            this.setInputFieldQueryCondition(request, queryInfo, "name");
        }

        this.setAscOrderBy(queryInfo, "name");

        RecordsetInfo recordsetInfo = userPointDataService.queryUserDataPoint(queryInfo);

        List<DataPoint> dataPointList = recordsetInfo.getEntityList();

        if (CollectionUtils.isEmpty(dataPointList)) {
            return;
        }
        List items = new ArrayList();
        for (DataPoint dataPoint : dataPointList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataPoint.getObjectId());
            item.put("dataPointId", dataPoint.getDataPointId());
            item.put("dataPointSliceId", dataPoint.getDataPointSliceId() == null ? "-" : dataPoint.getDataPointSliceId());
            item.put("name", dataPoint.getName());
            item.put("dataPointTag", dataPoint.getDataPointTag());
            item.put("pointDataType", dataPoint.getPointDataType());
            item.put("measureUnit", dataPoint.getMeasureUnit());
            item.put("pointDataValueType", dataPoint.getPointDataValueType());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
    }

    @RequestMapping(value = "/userDataPointReport/list", method = RequestMethod.GET)
    public void listUserPointDataReport(String dataPointId, String dataPointGroupCategoryId, TimeUnit timeUnit
            , Integer precision, String sortType, String[] sectionTypes, String[] incrementTypes, Date startTime, Date endTime, ModelMap modelMap) throws Exception {

        String[] dataPoints;
        if (StringUtil.isEmpty(dataPointId)) {
            List<DataPointGroup> dataPointGroups = dataPointGroupService.listByDataPointGroupCategoryId(dataPointGroupCategoryId);
            dataPoints = new String[dataPointGroups.size()];

            int index = 0;
            for (DataPointGroup dataPointGroup : dataPointGroups) {
                dataPoints[index++] = dataPointGroup.getDataPoint().getObjectId();
            }
        } else {
            dataPoints = new String[]{dataPointId};
        }

        List list = null;
        if (dataPoints.length > 0) {
            list = userPointDataService.queryUserPointDataReport(dataPoints, startTime, endTime, timeUnit, precision, sortType, sectionTypes, incrementTypes);
        }
        modelMap.put("items", list);
    }


    @RequestMapping(value = "/userDataPointReport/export", method = RequestMethod.GET)
    public void exportUserDataPoint(String dataPointGroupCategoryId, TimeUnit timeUnit
            , Integer precision, String sortType, String[] sectionTypes, String[] incrementTypes, String collectLabel, Date startTime, Date endTime, ModelMap modelMap) throws Exception {

        List<DataPointGroup> dataPointGroups = dataPointGroupService.listByDataPointGroupCategoryId(dataPointGroupCategoryId);
        String[] dataPointArray = new String[dataPointGroups.size()];

        int index = 0;
        for (DataPointGroup dataPointGroup : dataPointGroups) {
            dataPointArray[index++] = dataPointGroup.getDataPoint().getObjectId();
        }
        DataExportInfo dataExportInfo = userPointDataService.exportUserPointDataReport(dataPointArray, startTime, endTime
                , timeUnit, precision, sortType, sectionTypes, incrementTypes, collectLabel);
        modelMap.put("data", dataExportInfo);
    }

    @RequestMapping(value = "/userDataPointReport/loadDataPointInfo", method = RequestMethod.GET)
    public void loadDataPointInfo(String dataPointGroupCategoryId, ModelMap modelMap) throws Exception {

        List<DataPointGroup> dataPointGroups = dataPointGroupService.listByDataPointGroupCategoryId(dataPointGroupCategoryId);
        String[] dataPointArray = new String[dataPointGroups.size()];

        int index = 0;
        for (DataPointGroup dataPointGroup : dataPointGroups) {
            dataPointArray[index++] = dataPointGroup.getDataPoint().getObjectId();
        }

        List items = new ArrayList();
        for (String dataPointId : dataPointArray) {
            DataPoint dataPoint = dataPointService.getDataPointById(dataPointId);
            DataPointInfo dataPointInfo = new DataPointInfo();
            dataPointInfo.setDataPointObjectId(dataPoint.getObjectId());
            dataPointInfo.setDataPointName(dataPoint.getName());
            dataPointInfo.setDataPointTag(dataPoint.getDataPointTag());
            dataPointInfo.setPointDataValueType(dataPoint.getPointDataValueType());
            dataPointInfo.setMeasureUnit(dataPoint.getMeasureUnit());
            dataPointInfo.setElectricityInfoFlag(CollectionUtil.isEmpty(dataPointElectricityService.listByDataPointId(dataPointId)) ? 0 : 1);
            items.add(dataPointInfo);
        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/userDataPoint/create", method = RequestMethod.POST)
    public void createUserDataPoint(ModelMap modelMap, DataPoint dataPoint) {

        dataPoint.setSource(2);
        dataPointService.createUserDataPoint(dataPoint);
    }

    @RequestMapping(value = "/userDataPoint/load/{objectId}", method = RequestMethod.GET)
    public void loadDataPoint(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        DataPoint dataPoint = dataPointService.getDataPointById(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", dataPoint.getObjectId());
        data.put("dataPointTag", dataPoint.getDataPointTag());
        data.put("dataPointTagDisabled", dataPoint.getDataPointTag());
        data.put("pointDataType", dataPoint.getPointDataType());
        data.put("pointDataValueType", dataPoint.getPointDataValueType());
        data.put("name", dataPoint.getName());
        data.put("original", dataPoint.getOriginal());
        data.put("source", dataPoint.getSource());
        data.put("measureUnit", dataPoint.getMeasureUnit());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/userDataPoint/update", method = RequestMethod.POST)
    public void updateDataPoint(ModelMap modelMap, DataPoint dataPoint) {

        dataPointService.updateDataPoint(dataPoint);
    }

    @RequestMapping(value = "/userDataPoint/delete/{objectId}", method = RequestMethod.GET)
    public void deleteDataPoint(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataPointService.deleteDataPoint(objectId);
    }

    @RequestMapping(value = "/userPointData/query", method = RequestMethod.GET)
    public void queryUserPointData(HttpServletRequest request, ModelMap modelMap) throws Exception {

        if (StringUtil.isEmpty(request.getParameter("dataPoints"))) {
            return;
        }
        String[] dataPointArray = request.getParameter("dataPoints").split("\\|");
        Date startTime = DateUtil.convertStringToDate(request.getParameter("startTime"), DateUtil.STANDARD_DATEMINUTE_FORMAT);
        Date endTime = DateUtil.convertStringToDate(request.getParameter("endTime"), DateUtil.STANDARD_DATEMINUTE_FORMAT);

        int pageNo = Integer.parseInt(request.getParameter("pageNo")) - 1;
        int pageSize = Integer.parseInt(request.getParameter("pageSize"));

        if (dataPointArray.length == 0) {
            return;
        }

        int total = userPointDataService.getCountUserPointData(dataPointArray, startTime, endTime);

        if (total == 0) {
            return;
        }

        List list = userPointDataService.queryUserPointData(dataPointArray, startTime, endTime, pageNo, pageSize);

        if (CollectionUtils.isEmpty(list)) {
            return;
        }
        List items = new ArrayList();

        for (int i = 0; i < list.size(); i++) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            Object[] o = (Object[]) list.get(i);

            item.put("pointId", o[0]);
            item.put("utcDateTime", o[1]);
            item.put("actualValue", o[2]);
            item.put("source", o[3]);
            item.put("dataPointName", o[4]);
            item.put("dataPointTag", o[5]);
            item.put("pointDataValueType", o[6]);
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", total);
    }

    @RequestMapping(value = "/userPointData/upload", method = RequestMethod.POST)
    public void swfUpload(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        String fileName = attachment.getFileItem().getName();
        String tempFileName = StringUtil.getUuid();
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();

        attachment.getFileItem().write(new File(systemConfigInfo.getTempDirectory() + "/" + tempFileName));

        modelMap.put("fileName", fileName);
        modelMap.put("tempFileName", tempFileName);
    }

    @RequestMapping(value = "/userPointData/import", method = RequestMethod.GET)
    public void importUserPointData(ModelMap modelMap, @RequestParam(value = "dataPointId", required = false) String dataPointId,
                                    @RequestParam(value = "fileName", required = false) String fileName,
                                    @RequestParam(value = "tempFileName", required = false) String tempFileName) throws Exception {

        File file = new File(ConfigUtil.getSystemConfigInfo().getTempDirectory() + "/" + tempFileName);
        String[] result = userPointDataService.importUserPointData(dataPointId, file, fileName);
        String info = "";
        if (StringUtil.isNotEmpty(result[0])) {
            info += "文件第" + result[0].substring(1) + "列数据有空值！";
        }
        if (StringUtil.isNotEmpty(result[1])) {
            info += "文件第" + result[1].substring(1) + "列数据值有误或不为文本格式！";
        }
        if (StringUtil.isNotEmpty(result[2])) {
            info += "文件第" + result[2].substring(1) + "列数据在系统中已存在！";
        }
        if (StringUtil.isNotEmpty(result[3])) {
            info += "文件第" + result[3].substring(1) + "列数据的数据点在系统中未配置！";
        }
        modelMap.put("importInfo", info);
    }

    @RequestMapping(value = "/userPointData/listMeasureUnit", method = RequestMethod.GET)
    public void listMeasureUnit(ModelMap modelMap) {

        List<UnitOfMeasure> listMeasureUnit = userPointDataService.listMeasureUnit();
        if (CollectionUtil.isEmpty(listMeasureUnit)) {
            return;
        }

        List items = new ArrayList();
        for (UnitOfMeasure unitOfMeasure : listMeasureUnit) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("value", unitOfMeasure.getObjectId());
            item.put("label", unitOfMeasure.getDisplayNameShort());
            items.add(item);

        }
        modelMap.put("items", items);
    }

}
