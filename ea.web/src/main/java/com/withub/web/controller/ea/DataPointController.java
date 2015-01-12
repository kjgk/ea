package com.withub.web.controller.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.DataPoint;
import com.withub.model.ea.ElectricityPriceIssue;
import com.withub.model.ea.MetasysDatabase;
import com.withub.model.ea.UnitOfMeasure;
import com.withub.model.entity.query.ExpressionOperation;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.DataPointService;
import com.withub.service.ea.ElectricityService;
import com.withub.service.ea.MetasysDatabaseService;
import com.withub.service.ea.PointDataFetchService;
import com.withub.util.ConfigUtil;
import com.withub.web.common.BaseController;
import com.withub.web.common.ext.StaticCheckedTreeNode;
import com.withub.web.common.ext.TreeNode;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class DataPointController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private DataPointService dataPointService;

    @Autowired
    private ElectricityService electricityService;

    @Autowired
    private PointDataFetchService pointDataFetchService;

    @Autowired
    private MetasysDatabaseService metasysDatabaseService;

    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/dataPoint/query", method = RequestMethod.GET)
    public void queryDataPoint(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String original = request.getParameter("original");
        String pointDataValueType = request.getParameter("pointDataValueType");
        String name = request.getParameter("name");
        String metasysDatabaseId = request.getParameter("metasysDatabaseId");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(DataPoint.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        this.setIntegerValueEqualsQueryCondition(queryInfo, "source", 1);

        if (StringUtil.isNotEmpty(original)) {
            this.setIntegerValueEqualsQueryCondition(queryInfo, "original", Integer.parseInt(original));
        }

        if (StringUtil.isNotEmpty(pointDataValueType)) {
            this.setIntegerValueEqualsQueryCondition(queryInfo, "pointDataValueType", Integer.parseInt(pointDataValueType));
        }

        if (StringUtil.isNotEmpty(name)) {
            this.setInputFieldQueryCondition(request, queryInfo, "name");
        }

        if (StringUtil.isNotEmpty(metasysDatabaseId)) {
            MetasysDatabase metasysDatabase = metasysDatabaseService.getMetasysDatabaseById(metasysDatabaseId);
            this.setStringValueEqualsQueryCondition(queryInfo, "databaseTag", metasysDatabase.getDatabaseTag());
        }

        // 过滤分时电量数据点
        this.setQueryInfoCondition(queryInfo, "timeSegment", null, ExpressionOperation.Equals);

        this.setAscOrderBy(queryInfo, "dataPointTag");

        RecordsetInfo recordsetInfo = dataPointService.queryPointData(queryInfo);

        List<DataPoint> dataPointList = recordsetInfo.getEntityList();

        if (CollectionUtils.isEmpty(dataPointList)) {
            return;
        }

        List items = new ArrayList();
        for (DataPoint dataPoint : dataPointList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataPoint.getObjectId());
            item.put("dataPointId", dataPoint.getDataPointId() == null ? "-" : dataPoint.getDataPointId());
            item.put("dataPointSliceId", dataPoint.getDataPointSliceId() == null ? "-" : dataPoint.getDataPointSliceId());
            item.put("name", dataPoint.getName());
            item.put("dataPointTag", dataPoint.getDataPointTag());
            item.put("pointDataType", dataPoint.getPointDataType());
            item.put("pointDataValueType", dataPoint.getPointDataValueType());
            item.put("original", dataPoint.getOriginal());
            if (dataPoint.getMeasureUnit() != null) {
                item.put("measureUnit", dataPoint.getMeasureUnit());
            } else {
                UnitOfMeasure unitOfMeasure = dataPointService.getUnitOfMeasure(dataPoint.getMeasureUnitId(), dataPoint.getDatabaseTag());
                item.put("measureUnit", StringUtil.isEmpty(unitOfMeasure.getDisplayNameShort()) ? "" : unitOfMeasure.getDisplayNameShort());
            }
            item.put("databaseTag", dataPoint.getDatabaseTag());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
    }

    @RequestMapping(value = "/dataPoint/loadDataPointConfig", method = RequestMethod.POST)
    public void loadDataPointConfig(ModelMap modelMap, @RequestParam(value = "metasysDatabaseId") String metasysDatabaseId) throws Exception {

        MetasysDatabase metasysDatabase = metasysDatabaseService.getMetasysDatabaseById(metasysDatabaseId);
        List<DataPoint> remoteDataPointList = dataPointService.fetchRemoteDataPointList(metasysDatabase.getHostIp(), metasysDatabase.getPort(), metasysDatabase.getInstanceName(), metasysDatabase.getDatabaseName(), metasysDatabase.getUserName(), metasysDatabase.getPassword());
        List<String[]> remoteDataPoints = new ArrayList<String[]>();
        for (DataPoint remoteDataPoint : remoteDataPointList) {
            String key = remoteDataPoint.getDataPointId() + "~" + remoteDataPoint.getDataPointSliceId() + "~" + remoteDataPoint.getPointDataType() + "~" + remoteDataPoint.getDataPointTag() + "~" + remoteDataPoint.getMeasureUnitId();
            remoteDataPoints.add(new String[]{key, remoteDataPoint.getDataPointTag()});
        }
        modelMap.put("remoteDataPoints", remoteDataPoints);

        List<DataPoint> localDataPointList = dataPointService.fetchLocalDataPointList(metasysDatabase.getDatabaseTag());
        List<String[]> localDataPoints = new ArrayList<String[]>();
        if (CollectionUtil.isNotEmpty(localDataPointList)) {
            for (DataPoint localDataPoint : localDataPointList) {
                String key = localDataPoint.getDataPointId() + "~" + localDataPoint.getDataPointSliceId() + "~" + localDataPoint.getPointDataType() + "~" + localDataPoint.getDataPointTag() + "~" + localDataPoint.getMeasureUnitId();
                String value;
                if (StringUtil.isNotEmpty(localDataPoint.getName())) {
                    value = localDataPoint.getName() + "(" + localDataPoint.getDataPointTag() + ")";
                } else {
                    value = localDataPoint.getDataPointTag();
                }
                localDataPoints.add(new String[]{key, value});
            }
        }
        modelMap.put("localDataPoints", localDataPoints);
        modelMap.put("databaseTag", metasysDatabase.getDatabaseTag());
    }

    @RequestMapping(value = "/dataPoint/fetchRemoteDataPoint", method = RequestMethod.POST)
    public void fetchRemoteDataPoint(ModelMap modelMap, @RequestParam(value = "metasysDatabaseId") String metasysDatabaseId) throws Exception {

        MetasysDatabase metasysDatabase = metasysDatabaseService.getMetasysDatabaseById(metasysDatabaseId);
        List<DataPoint> remoteDataPointList = dataPointService.fetchRemoteDataPointList(metasysDatabase.getHostIp(), metasysDatabase.getPort(), metasysDatabase.getInstanceName(), metasysDatabase.getDatabaseName(), metasysDatabase.getUserName(), metasysDatabase.getPassword());
        List<String[]> remoteDataPoints = new ArrayList<String[]>();
        for (DataPoint remoteDataPoint : remoteDataPointList) {
            String key = remoteDataPoint.getDataPointId() + "~" + remoteDataPoint.getDataPointSliceId() + "~" + remoteDataPoint.getPointDataType() + "~" + remoteDataPoint.getDataPointTag() + "~" + remoteDataPoint.getMeasureUnitId();
            remoteDataPoints.add(new String[]{key, remoteDataPoint.getDataPointTag()});
        }
        modelMap.put("remoteDataPoints", remoteDataPoints);
        modelMap.put("databaseTag", metasysDatabase.getDatabaseTag());
    }

    @RequestMapping(value = "/dataPoint/saveSelectedDataPoints", method = RequestMethod.POST)
    public void saveSelectedDataPoints(@RequestParam(value = "selectedDataPoints", required = false) List<String> selectedDataPoints
            , @RequestParam(value = "metasysDatabaseId", required = false) String metasysDatabaseId, ModelMap modelMap) throws Exception {

        List<DataPoint> dataPointList = new ArrayList<DataPoint>();
        if (CollectionUtil.isNotEmpty(selectedDataPoints)) {
            for (String dataPointInfo : selectedDataPoints) {
                String[] dataPointInfoArray = dataPointInfo.split("~");
                DataPoint dataPoint = new DataPoint();
                dataPoint.setDataPointId(Integer.parseInt(dataPointInfoArray[0]));
                dataPoint.setDataPointSliceId(Integer.parseInt(dataPointInfoArray[1]));
                dataPoint.setPointDataType(Integer.parseInt(dataPointInfoArray[2]));
                dataPoint.setDataPointTag(dataPointInfoArray[3]);
                dataPoint.setMeasureUnitId(dataPointInfoArray[4]);

                dataPointList.add(dataPoint);
            }
        }

        dataPointService.saveSelectedDataPoints(dataPointList, metasysDatabaseId);

        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPoint/load/{objectId}", method = RequestMethod.GET)
    public void loadDataPoint(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        DataPoint dataPoint = dataPointService.getDataPointById(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", dataPoint.getObjectId());
        data.put("dataPointId", dataPoint.getDataPointId());
        data.put("dataPointSliceId", dataPoint.getDataPointSliceId());
        data.put("dataPointTag", dataPoint.getDataPointTag());
        data.put("dataPointTagDisabled", dataPoint.getDataPointTag());
        data.put("pointDataType", dataPoint.getPointDataType());
        data.put("pointDataValueType", dataPoint.getPointDataValueType());
        data.put("name", dataPoint.getName());
        data.put("original", dataPoint.getOriginal());
        data.put("source", dataPoint.getSource());
        if (dataPoint.getMeasureUnit() != null) {
            data.put("measureUnit", dataPoint.getMeasureUnit());
        } else {
            UnitOfMeasure unitOfMeasure = dataPointService.getUnitOfMeasure(dataPoint.getMeasureUnitId(), dataPoint.getDatabaseTag());
            data.put("measureUnit", StringUtil.isEmpty(unitOfMeasure.getDisplayNameShort()) ? "" : unitOfMeasure.getDisplayNameShort());
        }
        data.put("databaseTag", dataPoint.getDatabaseTag());
        data.put("metasysDatabase.objectId", dataPoint.getMetasysDatabase() == null ? null : dataPoint.getMetasysDatabase().getObjectId());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/dataPoint/update", method = RequestMethod.POST)
    public void updateDataPoint(ModelMap modelMap, DataPoint dataPoint) {

        dataPointService.updateDataPoint(dataPoint);
    }

    @RequestMapping(value = "/dataPoint/delete/{objectId}", method = RequestMethod.GET)
    public void deleteDataPoint(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataPointService.deleteDataPoint(objectId);
    }

    @RequestMapping(value = "/dataPoint/createUserDataPoint", method = RequestMethod.POST)
    public void createUserDataPoint(ModelMap modelMap, DataPoint dataPoint) {

        dataPoint.setSource(2);
        dataPointService.createDataPoint(dataPoint);
    }

    @RequestMapping(value = "/dataPoint/create", method = RequestMethod.POST)
    public void saveDataPointExpression(ModelMap modelMap, DataPoint dataPoint) {

        dataPointService.createDataPoint(dataPoint);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPoint/selectUserDataPoint", method = RequestMethod.GET)
    public void selectUserDataPoint(ModelMap modelMap) {

        List<DataPoint> dataPointList = dataPointService.selectUserDataPoint();
        if (CollectionUtil.isEmpty(dataPointList)) {
            return;
        }

        List items = new ArrayList();
        for (DataPoint dataPoint : dataPointList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("value", dataPoint.getObjectId());
            item.put("label", dataPoint.getName());
            items.add(item);

        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/dataPoint/loadManagerTree", method = RequestMethod.GET)
    public void loadManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            {
                TreeNode node = new TreeNode();
                node.setObjectId("1");
                node.setText("数据点");
                node.setType("");
                node.setLeaf(false);
                node.setOrderNo(1);
                nodes.add(node);
            }
            return;
        }
        String id = nodeId.replace("_", "");
        List<DataPoint> dataPoints = dataPointService.analogDataPointList(id);
        if (CollectionUtils.isEmpty(dataPoints)) {
            return;
        }
        int orderNo = 1;
        for (DataPoint dataPoint : dataPoints) {
            TreeNode node = new TreeNode();
            node.setObjectId(dataPoint.getObjectId());
            node.setText(dataPoint.getName());
            node.setType(StringUtil.isEmpty(dataPoint.getDataPointTag()) ? "" : dataPoint.getDataPointTag());
            node.setLeaf(CollectionUtil.isEmpty(dataPointService.analogDataPointList(dataPoint.getObjectId())));
            node.setOrderNo(dataPoint.getDataPointId() == null ? orderNo : dataPoint.getDataPointId());
            if (dataPoint.getTimeSegmentPointList() != null) {
                node.getAttributes().put("timeSegmentPointList", dataPoint.getTimeSegmentPointList());
            }
            nodes.add(node);
            orderNo++;
        }
    }

    @RequestMapping(value = "/dataPoint/loadTree", method = RequestMethod.GET)
    public void loadTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes,
                         @RequestParam(value = "check", required = false) Boolean check,
                         @RequestParam(value = "showTimeSegment", required = false, defaultValue = "false") Boolean showTimeSegment) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            TreeNode node = new TreeNode();
            node.setObjectId("1");
            node.setText("JCI");
            node.setLeaf(false);
            node.setExpanded(true);
            nodes.add(node);

            node = new TreeNode();
            node.setObjectId("2");
            node.setText("自定义");
            node.setLeaf(false);
            node.setExpanded(true);
            nodes.add(node);
        } else {
            String id = nodeId.split("_")[0];
            String type = nodeId.replace(id, "");
            int pointDataType = 1;
            if (type.contains("_dsdp")) {
                pointDataType = 2;
            }
            List<DataPoint> dataPointList = dataPointService.listByNodeId(id, pointDataType, showTimeSegment);
            if (CollectionUtil.isEmpty(dataPointList)) {
                return;
            }
            for (DataPoint dataPoint : dataPointList) {
                TreeNode node = new TreeNode();

                boolean isLeaf = CollectionUtil.isEmpty(dataPointService.listByNodeId(dataPoint.getObjectId(), pointDataType, showTimeSegment));
                if (check != null && check && isLeaf) {
                    node = new StaticCheckedTreeNode();
                }
                if (dataPoint.getObjectId().length() == 36 && dataPoint.getObjectId().split("-").length == 5) {
                    node.setObjectId(dataPoint.getObjectId());
                } else {
                    if (dataPoint.getObjectId().equals("DeviceSwitchDataPoint")) {
                        node.setObjectId(dataPoint.getObjectId() + "_dsdp");
                    } else {
                        node.setObjectId(dataPoint.getObjectId() + type);
                    }
                }
                node.setText(dataPoint.getDataPointTag());
                node.setLeaf(isLeaf);
                node.getAttributes().put("pointDataValueType", dataPoint.getPointDataValueType());
                nodes.add(node);
            }
        }
    }

    @RequestMapping(value = "/dataPoint/loadTreePath", method = RequestMethod.GET)
    public void loadTreePath(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "node") ArrayList<String> nodes) throws Exception {

        DataPoint dataPoint = dataPointService.getDataPointById(nodeId);
        if (dataPoint != null) {
            String dataPointTag = dataPoint.getDataPointTag();
            dataPointTag = dataPointTag.replaceAll(".Present Value", "");
            String[] tags = dataPointTag.split("[.]");
            if (dataPoint.getPointDataType() == 2) {
                nodes.add(tags[0] + "." + tags[1] + "._dsdp");
                nodes.add(tags[0] + "._dsdp");
                nodes.add(tags[0].split(":")[0] + ":_dsdp");
                nodes.add("DeviceSwitchDataPoint_dsdp");
            } else {
                nodes.add(tags[0] + "." + tags[1] + ".");
                nodes.add(tags[0] + ".");
                nodes.add(tags[0].split(":")[0] + ":");
            }
            nodes.add("1");
        } else {
            nodes.add("2");
        }
    }

    @RequestMapping(value = "/dataPoint/search", method = RequestMethod.GET)
    public void searchDataPoint(@RequestParam(value = "keyword", required = false) String keyword, @RequestParam(value = "objectId", required = false) String objectId, ModelMap modelMap) throws Exception {

        List<DataPoint> dataPointList = new ArrayList();

        if (StringUtil.isNotEmpty(objectId)) {
            DataPoint dataPoint = dataPointService.getDataPointById(objectId);
            dataPointList.add(dataPoint);
        } else {
            dataPointList = dataPointService.searchDataPoint(keyword);
        }

        List items = new ArrayList();
        for (DataPoint dataPoint : dataPointList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataPoint.getObjectId());
            item.put("name", dataPoint.getName());
            item.put("original", dataPoint.getOriginal());
            item.put("dataPointTag", dataPoint.getDataPointTag());
            item.put("pointDataValueType", dataPoint.getPointDataValueType());
            if (StringUtil.isNotEmpty(dataPoint.getMeasureUnitId())) {
                UnitOfMeasure unitOfMeasure = dataPointService.getUnitOfMeasure(dataPoint.getMeasureUnitId(), dataPoint.getDatabaseTag());
                item.put("displayNameShort", unitOfMeasure.getDisplayNameShort());
            }
            items.add(item);


        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/dataPoint/fetchMultiDataPointList", method = RequestMethod.GET)
    public void fetchMultiDataPointList(String dataPoints, ModelMap modelMap) throws Exception {

        List<DataPoint> dataPointList = dataPointService.fetchMultiDataPointList(dataPoints);

        List items = new ArrayList();
        for (DataPoint dataPoint : dataPointList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataPoint.getObjectId());
            item.put("name", dataPoint.getName());
            item.put("dataPointTag", dataPoint.getDataPointTag());
            item.put("pointDataType", dataPoint.getPointDataType());
            item.put("original", dataPoint.getOriginal());
            if (StringUtil.isNotEmpty(dataPoint.getMeasureUnitId())) {
                UnitOfMeasure unitOfMeasure = dataPointService.getUnitOfMeasure(dataPoint.getMeasureUnitId(), dataPoint.getDatabaseTag());
                item.put("displayNameShort", unitOfMeasure.getDisplayNameShort());
            }
            items.add(item);
        }

        modelMap.put("items", items);
    }

    @RequestMapping(value = "/dataPoint/upload", method = RequestMethod.POST)
    public void swfUpload(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        String fileName = attachment.getFileItem().getName();
        String tempFileName = StringUtil.getUuid();
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();

        attachment.getFileItem().write(new File(systemConfigInfo.getTempDirectory() + "/" + tempFileName));

        modelMap.put("fileName", fileName);
        modelMap.put("tempFileName", tempFileName);
    }

    @RequestMapping(value = "/dataPoint/import", method = RequestMethod.POST)
    public void importDataPoint(ModelMap modelMap,
                                @RequestParam(value = "fileName", required = false) String fileName,
                                @RequestParam(value = "tempFileName", required = false) String tempFileName) throws Exception {

        File file = new File(ConfigUtil.getSystemConfigInfo().getTempDirectory() + "/" + tempFileName);
        String[] result = dataPointService.importDataPoint(file, fileName);
        String info = "";
        if (StringUtil.isNotEmpty(result[0])) {
            info += "文件第" + result[0].substring(1) + "列数据值有误！";
        }
        if (StringUtil.isNotEmpty(result[1])) {
            info += "文件第" + result[1].substring(1) + "列数据在系统中未配置！";
        }
        modelMap.put("success", true);
        modelMap.put("importInfo", info);
    }

    @RequestMapping(value = "/dataPoint/export", method = RequestMethod.GET)
    public void exportDataPoint(HttpServletRequest request, ModelMap modelMap) throws Exception {

        DataExportInfo dataExportInfo = dataPointService.exportDataPoint();
        modelMap.put("data", dataExportInfo);
    }


    @RequestMapping(value = "/dataPoint/syncUnitOfMeasure", method = RequestMethod.POST)
    public void syncUnitOfMeasure(ModelMap modelMap) throws Exception {

        dataPointService.syncUnitOfMeasure();
        modelMap.put("success", true);
    }


    @RequestMapping(value = "/dataPoint/deleteTableData", method = RequestMethod.POST)
    public void deleteTableData(ModelMap modelMap) throws Exception {

        dataPointService.deleteTableData();
    }

    @RequestMapping(value = "/dataPoint/updateElectricityPriceValue", method = RequestMethod.POST)
    public void updateDataPointTimeSegmentValue(ModelMap modelMap
            , @RequestParam(required = false) String issueId
            , @RequestParam(required = false) String dataPointId) throws Exception {

        if (StringUtil.isEmpty(issueId)) {
            ElectricityPriceIssue electricityPriceIssue = electricityService.getCurrentElectricityPriceIssue();
            if (electricityPriceIssue == null) {
                throw new Exception("当前年份的分时电价表未设置！");
            }
            issueId = electricityPriceIssue.getObjectId();
        }

        if (StringUtil.isNotEmpty(dataPointId)) {
            dataPointService.updateDataPointTimeSegmentValue(issueId, dataPointId);
        } else {
            dataPointService.updateDataPointTimeSegmentValue(issueId);
        }
    }

    //===================== 属性方法 ====================================================

    public DataPointService getDataPointService() {

        return dataPointService;
    }

    public void setDataPointService(DataPointService dataPointService) {

        this.dataPointService = dataPointService;
    }

    public PointDataFetchService getPointDataFetchService() {

        return pointDataFetchService;
    }

    public void setPointDataFetchService(PointDataFetchService pointDataFetchService) {

        this.pointDataFetchService = pointDataFetchService;
    }
}

