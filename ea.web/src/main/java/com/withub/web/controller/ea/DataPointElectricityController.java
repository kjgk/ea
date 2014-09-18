package com.withub.web.controller.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.ea.DataPointElectricityConfig;
import com.withub.model.ea.ElectricityUsageCategory;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.web.common.BaseController;
import com.withub.web.common.ext.StaticCheckedTreeNode;
import com.withub.web.common.ext.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class DataPointElectricityController extends BaseController {

    //=========================================属性声明======================================
    @Autowired
    private DataPointElectricityService dataPointElectricityService;

    //=======================================Controller方法========================================

    //用电类型分类
    @RequestMapping(value = "/electricityUsageCategory/loadManagerTree", method = RequestMethod.GET)
    public void loadManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            ElectricityUsageCategory root = dataPointElectricityService.getRootEntity();
            TreeNode node = new TreeNode();
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setLeaf(false);
            node.setType(ElectricityUsageCategory.class.getSimpleName());
            node.setExpanded(true);
            nodes.add(node);
            return;
        }

        String id = nodeId.split("_")[1];
        ElectricityUsageCategory electricityUsageCategory = dataPointElectricityService.getElectricityUsageByObjectId(id);
        if (CollectionUtil.isEmpty(electricityUsageCategory.getChildList())) {
            return;
        }
        for (ElectricityUsageCategory child : (electricityUsageCategory.getChildList())) {
            TreeNode node = new TreeNode();
            node.setObjectId(child.getObjectId());
            node.setText(child.getName());
            node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
            node.setType(ElectricityUsageCategory.class.getSimpleName());
            node.setOrderNo(child.getOrderNo());
            nodes.add(node);
        }
    }

    @RequestMapping(value = "/electricityUsageCategory/loadTree", method = RequestMethod.GET)
    public void loadTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes,
                         @RequestParam(value = "check", required = false) Boolean check) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            ElectricityUsageCategory root = dataPointElectricityService.getRootEntity();
            TreeNode node = new TreeNode();
            if (check != null && check) {
                node = new StaticCheckedTreeNode();
            }
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setLeaf(false);
            node.setExpanded(true);
            nodes.add(node);
        } else {
            ElectricityUsageCategory electricityUsageCategory = dataPointElectricityService.getElectricityUsageByObjectId(nodeId);
            if (CollectionUtil.isEmpty(electricityUsageCategory.getChildList())) {
                return;
            }
            for (ElectricityUsageCategory child : (electricityUsageCategory.getChildList())) {
                TreeNode node = new TreeNode();
                if (check != null && check) {
                    node = new StaticCheckedTreeNode();
                }
                node.setObjectId(child.getObjectId());
                node.setText(child.getName());
                node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
                nodes.add(node);
            }
        }
    }

    @RequestMapping(value = "/electricityUsageCategory/loadTreePath", method = RequestMethod.GET)
    public void loadTreePath(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "node") ArrayList<String> nodes) throws Exception {

        ElectricityUsageCategory electricityUsageCategory = dataPointElectricityService.getElectricityUsageByObjectId(nodeId);
        if (electricityUsageCategory.getParent() == null) {
            return;
        } else {
            nodes.add(electricityUsageCategory.getParent().getObjectId());
            loadTreePath(electricityUsageCategory.getParent().getObjectId(), nodes);
        }
    }

    @RequestMapping(value = "/electricityUsageCategory/create", method = RequestMethod.POST)
    public void createElectricityUsage(ModelMap modelMap, ElectricityUsageCategory electricityUsageCategory) throws Exception {

        dataPointElectricityService.createElectricityUsage(electricityUsageCategory);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/electricityUsageCategory/update", method = RequestMethod.POST)
    public void updateElectricityUsage(ModelMap modelMap, ElectricityUsageCategory electricityUsageCategory) throws Exception {

        dataPointElectricityService.updateElectricityUsage(electricityUsageCategory);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/electricityUsageCategory/load/{objectId}", method = RequestMethod.GET)
    public void loadElectricityUsage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        ElectricityUsageCategory electricityUsageCategory = dataPointElectricityService.getElectricityUsageByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", electricityUsageCategory.getObjectId());
        model.put("name", electricityUsageCategory.getName());
        model.put("description", electricityUsageCategory.getDescription());
        model.put("orderNo", electricityUsageCategory.getOrderNo());
        model.put("parent.objectId", electricityUsageCategory.getParent().getObjectId());

        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/electricityUsageCategory/delete/{objectId}", method = RequestMethod.GET)
    public void deleteElectricityUsage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataPointElectricityService.deleteElectricityUsage(objectId);
        modelMap.put("success", true);
    }

    //数据点用电类型
    @RequestMapping(value = "/dataPointElectricityConfig/query", method = RequestMethod.GET)
    public void listByElectricityUsageCategoryId(HttpServletRequest request, @ModelAttribute("items") ArrayList<HashMap> items) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(DataPointElectricityConfig.class);
//        this.setPageInfoQueryCondition(request, queryInfo);
        this.setInputFieldQueryCondition(request, queryInfo, "electricityUsageCategory.objectId", "electricityUsageCategoryId");

        this.setAscOrderBy(queryInfo, "voltageSegment.beginValue");

        RecordsetInfo recordsetInfo = dataPointElectricityService.queryDataPointElectricityConfig(queryInfo);
        List list = recordsetInfo.getEntityList();

        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        for (DataPointElectricityConfig dataPointElectricityConfig : (List<DataPointElectricityConfig>) list) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataPointElectricityConfig.getObjectId());
            item.put("dataPointId", dataPointElectricityConfig.getDataPoint().getObjectId());
            item.put("dataPoint", dataPointElectricityConfig.getDataPoint().getName());
            item.put("dataPointTag", dataPointElectricityConfig.getDataPoint().getDataPointTag());
            item.put("electricityUsageCategory", dataPointElectricityConfig.getElectricityUsageCategory().getName());
            item.put("voltageSegment", dataPointElectricityConfig.getVoltageSegment().getBeginValue() + "~" + dataPointElectricityConfig.getVoltageSegment().getEndValue());
            items.add(item);
        }
    }

    @RequestMapping(value = "/dataPointElectricityConfig/create", method = RequestMethod.POST)
    public void createDataPointElectricityConfig(ModelMap modelMap, DataPointElectricityConfig dataPointElectricityConfig) throws Exception {

        dataPointElectricityService.createDataPointElectricityConfig(dataPointElectricityConfig);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointElectricityConfig/save", method = RequestMethod.POST)
    public void saveDataPointElectricityConfigs(ModelMap modelMap, @RequestParam(value = "electricityUsageCategoryId") String electricityUsageCategoryId, @RequestParam(value = "dataPointIds") String dataPointIds, @RequestParam(value = "voltageSegmentId") String voltageSegmentId) throws Exception {

        dataPointElectricityService.saveDataPointElectricityConfigs(electricityUsageCategoryId, dataPointIds, voltageSegmentId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointElectricityConfig/update", method = RequestMethod.POST)
    public void updateDataPointElectricityConfig(ModelMap modelMap, DataPointElectricityConfig dataPointElectricityConfig) throws Exception {

        dataPointElectricityService.updateDataPointElectricityConfig(dataPointElectricityConfig);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointElectricityConfig/load/{objectId}", method = RequestMethod.GET)
    public void loadDataPointElectricityConfig(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        DataPointElectricityConfig dataPointElectricityConfig = dataPointElectricityService.getDataPointElectricityConfigByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", dataPointElectricityConfig.getObjectId());
        model.put("dataPoint.objectId", dataPointElectricityConfig.getDataPoint().getObjectId());
        model.put("electricityUsageCategory.objectId", dataPointElectricityConfig.getElectricityUsageCategory().getObjectId());
        model.put("voltageSegment.objectId", dataPointElectricityConfig.getVoltageSegment().getObjectId());

        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointElectricityConfig/delete/{objectId}", method = RequestMethod.GET)
    public void deleteDataPointElectricityConfig(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataPointElectricityService.deleteDataPointElectricityConfig(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointElectricityConfig/exist", method = RequestMethod.GET)
    public void existDataPointElectricityConfig(ModelMap modelMap, @RequestParam(value = "dataPointId") String dataPointId) throws Exception {

        List list = dataPointElectricityService.listByDataPointId(dataPointId);
        boolean result = CollectionUtil.isNotEmpty(list);
        modelMap.put("data", result);
    }

    //=======================================属性方法========================================
    public DataPointElectricityService getDataPointElectricityService() {

        return dataPointElectricityService;
    }

    public void setDataPointElectricityService(DataPointElectricityService dataPointElectricityService) {

        this.dataPointElectricityService = dataPointElectricityService;
    }
}
