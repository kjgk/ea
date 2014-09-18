package com.withub.web.controller.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.ea.DataPointGroup;
import com.withub.model.ea.DataPointGroupCategory;
import com.withub.service.ea.DataPointGroupService;
import com.withub.web.common.BaseController;
import com.withub.web.common.ext.StaticCheckedTreeNode;
import com.withub.web.common.ext.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class DataPointGroupController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private DataPointGroupService dataPointGroupService;

    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/dataPointGroupCategory/loadManagerTree", method = RequestMethod.GET)
    public void loadGroupManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            DataPointGroupCategory root = dataPointGroupService.getRootEntity();
            TreeNode node = new TreeNode();
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setLeaf(false);
            node.setType(DataPointGroupCategory.class.getSimpleName());
            node.setExpanded(true);
            nodes.add(node);
            return;
        }

        String id = nodeId.split("_")[1];
        DataPointGroupCategory dataPointGroupCategory = dataPointGroupService.getDataPointGroupCategoryByObjectId(id);
        if (CollectionUtil.isEmpty(dataPointGroupCategory.getChildList())) {
            return;
        }
        for (DataPointGroupCategory child : (dataPointGroupCategory.getChildList())) {
            TreeNode node = new TreeNode();
            node.setObjectId(child.getObjectId());
            node.setText(child.getName());
            node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
            node.setType(DataPointGroupCategory.class.getSimpleName());
            node.setOrderNo(child.getOrderNo());
            nodes.add(node);
        }
    }

    @RequestMapping(value = "/dataPointGroupCategory/loadTree", method = RequestMethod.GET)
    public void loadGroupTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes,
                              @RequestParam(value = "check", required = false) Boolean check) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            DataPointGroupCategory root = dataPointGroupService.getRootEntity();
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
            DataPointGroupCategory dataPointGroupCategory = dataPointGroupService.getDataPointGroupCategoryByObjectId(nodeId);
            if (CollectionUtil.isEmpty(dataPointGroupCategory.getChildList())) {
                return;
            }
            for (DataPointGroupCategory child : (dataPointGroupCategory.getChildList())) {
                TreeNode node = new TreeNode();
                if (check != null && check) {
                    node = new StaticCheckedTreeNode();
                }
                node.setObjectId(child.getObjectId());
                node.setText(child.getName());
                node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
//                node.getAttributes().put("page", child.getUrl());
//                node.getAttributes().put("openMode", 1);
                nodes.add(node);
            }
        }
    }

    @RequestMapping(value = "/dataPointGroupCategory/loadTreePath", method = RequestMethod.GET)
    public void loadGroupTreePath(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "node") ArrayList<String> nodes) throws Exception {

        DataPointGroupCategory dataPointGroup = dataPointGroupService.getDataPointGroupCategoryByObjectId(nodeId);
        if (dataPointGroup.getParent() == null) {
            return;
        } else {
            nodes.add(dataPointGroup.getParent().getObjectId());
            loadGroupTreePath(dataPointGroup.getParent().getObjectId(), nodes);
        }
    }

    @RequestMapping(value = "/dataPointGroupCategory/create", method = RequestMethod.POST)
    public void createDataPointGroupCategory(ModelMap modelMap, DataPointGroupCategory dataPointGroupCategory) throws Exception {

        dataPointGroupService.saveDataPointGroupCategory(dataPointGroupCategory);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroupCategory/update", method = RequestMethod.POST)
    public void updateDataPointGroupCategory(ModelMap modelMap, DataPointGroupCategory dataPointGroupCategory) throws Exception {

        dataPointGroupService.updateDataPointGroupCategory(dataPointGroupCategory);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroupCategory/getAll/{objectId}", method = RequestMethod.GET)
    public void getAllDataPointGroups(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        DataPointGroupCategory dataPointGroupCategory = dataPointGroupService.getDataPointGroupCategoryByObjectId(objectId);
        if (dataPointGroupCategory == null) {
            return;
        }
        List<DataPointGroupCategory> dataPointGroupCategoryList = new ArrayList<DataPointGroupCategory>();
        dataPointGroupCategoryList.add(dataPointGroupCategory);
        dataPointGroupService.getAllDataPointGroupCategoryById(dataPointGroupCategory, dataPointGroupCategoryList);
        List<DataPointGroup> dataPointGroupList = dataPointGroupService.listByDataPointGroupCategorys(dataPointGroupCategoryList);

        List<HashMap> dataPointGroupCategorys = new ArrayList<HashMap>();
        List<HashMap> dataPoints = new ArrayList<HashMap>();
        Map<String, String> objectIdMap = new HashMap<String, String>();
        for (DataPointGroupCategory dpgc : dataPointGroupCategoryList) {
            HashMap<String, String> item = new HashMap<String, String>();
            String newObjectId = StringUtil.getUuid();
            objectIdMap.put(dpgc.getObjectId(), newObjectId);
            item.put("objectId", newObjectId);
            item.put("parentId", objectIdMap.get(dpgc.getParent() == null ? "" : dpgc.getParent().getObjectId()));
            item.put("name", dpgc.getName());
            dataPointGroupCategorys.add(item);
        }
        for (DataPointGroup dataPointGroup : dataPointGroupList) {
            HashMap<String, String> item = new HashMap<String, String>();
            item.put("objectId", dataPointGroup.getDataPoint().getObjectId());
            item.put("categoryId", objectIdMap.get(dataPointGroup.getDataPointGroupCategory().getObjectId()));
            dataPoints.add(item);
        }

        modelMap.put("dataPointGroupCategorys", dataPointGroupCategorys);
        modelMap.put("dataPoints", dataPoints);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroupCategory/delete/{objectId}", method = RequestMethod.GET)
    public void deleteDataPointGroupCategory(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataPointGroupService.deleteDataPointGroupCategory(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroupCategory/load/{objectId}", method = RequestMethod.GET)
    public void loadDataPointGroupCategory(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        DataPointGroupCategory dataPointGroupCategory = dataPointGroupService.getDataPointGroupCategoryByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", dataPointGroupCategory.getObjectId());
        model.put("name", dataPointGroupCategory.getName());
        model.put("parent.objectId", dataPointGroupCategory.getParent().getObjectId());
        model.put("description", dataPointGroupCategory.getDescription());
        modelMap.put("data", model);
        modelMap.put("success", true);
    }


    @RequestMapping(value = "/dataPointGroup/query", method = RequestMethod.GET)
    public void listDataPointGroup(@RequestParam("id") String id, @ModelAttribute("items") ArrayList<HashMap> items) throws Exception {

        List<DataPointGroup> dataPointGroupList = dataPointGroupService.listByDataPointGroupCategoryId(id);
        if (CollectionUtil.isEmpty(dataPointGroupList)) {
            return;
        }

        for (DataPointGroup dataPointGroup : dataPointGroupList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataPointGroup.getObjectId());
            item.put("dataPointName", dataPointGroup.getDataPoint().getName());
            items.add(item);
        }
    }

    @RequestMapping(value = "/dataPointGroup/create", method = RequestMethod.POST)
    public void createDataPointGroup(ModelMap modelMap, DataPointGroup dataPointGroup) throws Exception {

        dataPointGroupService.saveDataPointGroup(dataPointGroup);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroup/save", method = RequestMethod.POST)
    public void saveDataPointGroup(ModelMap modelMap, @RequestParam(value = "dataPointGroupCategoryId") String dataPointGroupCategoryId, @RequestParam(value = "dataPointIds") String dataPointIds) throws Exception {

        dataPointGroupService.saveDataPointGroups(dataPointGroupCategoryId, dataPointIds);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroup/update", method = RequestMethod.POST)
    public void updateDataPointGroup(ModelMap modelMap, DataPointGroup dataPointGroup) throws Exception {

        dataPointGroupService.updateDataPointGroup(dataPointGroup);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroup/load/{objectId}", method = RequestMethod.GET)
    public void loadDataPointGroup(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        DataPointGroup dataPointGroup = dataPointGroupService.getDataPointGroupByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", dataPointGroup.getObjectId());
        model.put("dataPointGroupCategory.objectId", dataPointGroup.getDataPointGroupCategory().getObjectId());
        model.put("dataPoint.objectId", dataPointGroup.getDataPoint().getObjectId());
        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataPointGroup/delete/{objectId}", method = RequestMethod.GET)
    public void deleteDataPointGroup(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataPointGroupService.deleteDataPointGroup(objectId);
        modelMap.put("success", true);
    }

}

