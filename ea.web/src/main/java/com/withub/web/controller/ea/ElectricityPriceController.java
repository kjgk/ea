package com.withub.web.controller.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.ea.*;
import com.withub.model.entity.query.ExpressionOperation;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.DataPointElectricityService;
import com.withub.service.ea.ElectricityService;
import com.withub.web.common.BaseController;
import com.withub.web.common.ext.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping(value = "/ea")
public class ElectricityPriceController extends BaseController {

    //==================== 属性声明 ====================================================

    @Autowired
    private ElectricityService electricityService;

    @Autowired
    private DataPointElectricityService dataPointElectricityService;

    @InitBinder
    public void initBinder(WebDataBinder binder) {

        {
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            dateFormat.setLenient(true);
            binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
        }
        {
            DateFormat dateFormat = new SimpleDateFormat("HH:mm");
            dateFormat.setLenient(true);
            binder.registerCustomEditor(Date.class, "beginTime", new CustomDateEditor(dateFormat, true));
            binder.registerCustomEditor(Date.class, "endTime", new CustomDateEditor(dateFormat, true));
        }
    }

    //==================== Controller方法 ================================================

    @RequestMapping(value = "/voltageSegment/query", method = RequestMethod.GET)
    public void queryVoltageSegment(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(VoltageSegment.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        if (StringUtil.isNotEmpty(name)) {
            this.setQueryInfoCondition(queryInfo, "name", name, ExpressionOperation.MatchMiddle);
        }

        this.setAscOrderBy(queryInfo, "beginValue");

        RecordsetInfo recordsetInfo = electricityService.queryVoltageSegment(queryInfo);

        List<VoltageSegment> voltageSegmentList = recordsetInfo.getEntityList();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(voltageSegmentList)) {
            return;
        }

        List items = new ArrayList();
        for (VoltageSegment voltageSegment : voltageSegmentList) {
            HashMap item = new HashMap();
            item.put("objectId", voltageSegment.getObjectId());
            item.put("name", voltageSegment.getName());
            item.put("beginValue", voltageSegment.getBeginValue());
            item.put("endValue", voltageSegment.getEndValue());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/voltageSegment/load/{objectId}", method = RequestMethod.GET)
    public void loadVoltageSegment(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        VoltageSegment voltageSegment = electricityService.getVoltageSegment(objectId);
        Map data = new HashMap();
        data.put("objectId", voltageSegment.getObjectId());
        data.put("name", voltageSegment.getName());
        data.put("beginValue", voltageSegment.getBeginValue());
        data.put("endValue", voltageSegment.getEndValue());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/voltageSegment/create", method = RequestMethod.POST)
    public void createVoltageSegment(ModelMap modelMap, VoltageSegment voltageSegment) {

        voltageSegment.setObjectId(StringUtil.getUuid());
        electricityService.saveVoltageSegment(voltageSegment);
    }

    @RequestMapping(value = "/voltageSegment/update", method = RequestMethod.POST)
    public void updateVoltageSegment(ModelMap modelMap, VoltageSegment voltageSegment) {

        electricityService.updateVoltageSegment(voltageSegment);
    }

    @RequestMapping(value = "/voltageSegment/delete/{objectId}", method = RequestMethod.GET)
    public void deleteVoltageSegment(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        electricityService.deleteVoltageSegment(objectId);
    }

    @RequestMapping(value = "/voltageSegment/listVoltageSegment", method = RequestMethod.GET)
    public void listVoltageSegment(HttpServletRequest request, ModelMap modelMap) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(VoltageSegment.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        this.setAscOrderBy(queryInfo, "beginValue");

        RecordsetInfo recordsetInfo = electricityService.queryVoltageSegment(queryInfo);

        List<VoltageSegment> voltageSegmentList = recordsetInfo.getEntityList();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(voltageSegmentList)) {
            return;
        }

        List items = new ArrayList();
        for (VoltageSegment voltageSegment : voltageSegmentList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("value", voltageSegment.getObjectId());
            item.put("label", voltageSegment.getBeginValue() + "~" + voltageSegment.getEndValue());
            items.add(item);
        }

        modelMap.put("items", items);
    }

    @RequestMapping(value = "/electricityPriceMonthSegment/query", method = RequestMethod.GET)
    public void queryElectricityPriceMonthSegment(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ElectricityPriceMonthSegment.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        if (StringUtil.isNotEmpty(name)) {
            this.setStringValueEqualsQueryCondition(request, queryInfo, "name", "name");
        }

        this.setAscOrderBy(queryInfo, "orderNo");

        RecordsetInfo recordsetInfo = electricityService.queryElectricityPriceMonthSegment(queryInfo);

        List<ElectricityPriceMonthSegment> electricityPriceMonthSegmentList = recordsetInfo.getEntityList();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(electricityPriceMonthSegmentList)) {
            return;
        }

        List items = new ArrayList();
        for (ElectricityPriceMonthSegment electricityPriceMonthSegment : electricityPriceMonthSegmentList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", electricityPriceMonthSegment.getObjectId());
            item.put("name", electricityPriceMonthSegment.getName());
            item.put("months", electricityPriceMonthSegment.getMonths());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/electricityPriceMonthSegment/load/{objectId}", method = RequestMethod.GET)
    public void loadElectricityPriceMonthSegment(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        ElectricityPriceMonthSegment electricityPriceMonthSegment = electricityService.getElectricityPriceMonthSegment(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", electricityPriceMonthSegment.getObjectId());
        data.put("name", electricityPriceMonthSegment.getName());
        String[] a = electricityPriceMonthSegment.getMonths().split(",");
        data.put("months", a);

        modelMap.put("data", data);
    }

    @RequestMapping(value = "/electricityPriceMonthSegment/create", method = RequestMethod.POST)
    public void createElectricityPriceMonthSegment(ModelMap modelMap, ElectricityPriceMonthSegment electricityPriceMonthSegment) {

        electricityService.saveElectricityPriceMonthSegment(electricityPriceMonthSegment);
    }

    @RequestMapping(value = "/electricityPriceMonthSegment/update", method = RequestMethod.POST)
    public void updateElectricityPriceMonthSegment(ModelMap modelMap, ElectricityPriceMonthSegment electricityPriceMonthSegment) {

        electricityService.updateElectricityPriceMonthSegment(electricityPriceMonthSegment);
    }

    @RequestMapping(value = "/electricityPriceMonthSegment/delete/{objectId}", method = RequestMethod.GET)
    public void deleteElectricityPriceMonthSegment(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        electricityService.deleteElectricityPriceMonthSegment(objectId);
    }

    @RequestMapping(value = "/electricityPriceTimeSegment/query", method = RequestMethod.GET)
    public void queryElectricityPriceTimeSegment(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ElectricityPriceTimeSegment.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        if (StringUtil.isNotEmpty(name)) {
            this.setStringValueEqualsQueryCondition(request, queryInfo, "name", "name");
        }

        this.setAscOrderBy(queryInfo, "orderNo");

        RecordsetInfo recordsetInfo = electricityService.queryElectricityPriceTimeSegment(queryInfo);

        List<ElectricityPriceTimeSegment> electricityPriceTimeSegmentList = recordsetInfo.getEntityList();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(electricityPriceTimeSegmentList)) {
            return;
        }

        List items = new ArrayList();
        for (ElectricityPriceTimeSegment electricityPriceTimeSegment : electricityPriceTimeSegmentList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", electricityPriceTimeSegment.getObjectId());
            item.put("name", electricityPriceTimeSegment.getName());
            item.put("tag", electricityPriceTimeSegment.getTag());
            item.put("orderNo", electricityPriceTimeSegment.getOrderNo());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/electricityPriceTimeSegment/save", method = RequestMethod.POST)
    public void saveElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment, ModelMap modelMap) throws Exception {

        electricityService.saveElectricityPriceTimeSegment(electricityPriceTimeSegment);

        modelMap.put("success", true);
    }

    @RequestMapping(value = "/electricityPriceTimeSegment/delete/{objectId}", method = RequestMethod.GET)
    public void deleteElectricityPriceTimeSegment(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        electricityService.deleteElectricityPriceTimeSegment(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/electricityPriceTimeSegment/load/{objectId}", method = RequestMethod.GET)
    public void loadElectricityPriceTimeSegment(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        ElectricityPriceTimeSegment electricityPriceTimeSegment = electricityService.getElectricityPriceTimeSegment(objectId);
        Map data = new HashMap();
        data.put("objectId", electricityPriceTimeSegment.getObjectId());
        data.put("name", electricityPriceTimeSegment.getName());
        data.put("tag", electricityPriceTimeSegment.getTag());
        data.put("orderNo", electricityPriceTimeSegment.getOrderNo());

        modelMap.put("data", data);
    }

    @RequestMapping(value = "/electricityPriceTimeSegment/update", method = RequestMethod.POST)
    public void updateElectricityPriceTimeSegment(ModelMap modelMap, ElectricityPriceTimeSegment electricityPriceTimeSegment) throws Exception {

        electricityService.updateElectricityPriceTimeSegment(electricityPriceTimeSegment);
    }

    @RequestMapping(value = "/electricityPriceTimeSegment/getAll", method = RequestMethod.GET)
    public void getAllElectricityPriceTimeSegment(HttpServletRequest request, ModelMap modelMap) throws Exception {

        List<ElectricityPriceTimeSegment> list = electricityService.getAllElectricityPriceTimeSegment();
        List items = new ArrayList();
        for (ElectricityPriceTimeSegment electricityPriceTimeSegment : list) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", electricityPriceTimeSegment.getObjectId());
            item.put("name", electricityPriceTimeSegment.getName());
            item.put("tag", electricityPriceTimeSegment.getTag());
            item.put("orderNo", electricityPriceTimeSegment.getOrderNo());
            items.add(item);
        }
        modelMap.put("items", items);
    }


    @RequestMapping(value = "/electricityPriceTimeSegmentDetail/query", method = RequestMethod.GET)
    public void queryElectricityPriceTimeSegmentDetail(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String electricityPriceTimeSegmentId = request.getParameter("electricityPriceTimeSegmentId");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ElectricityPriceTimeSegmentDetail.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        if (StringUtil.isNotEmpty(electricityPriceTimeSegmentId)) {
            this.setStringValueEqualsQueryCondition(request, queryInfo, "electricityPriceTimeSegment.objectId", "electricityPriceTimeSegmentId");
        }

        RecordsetInfo recordsetInfo = electricityService.queryElectricityPriceTimeSegmentDetail(queryInfo);

        List<ElectricityPriceTimeSegmentDetail> electricityPriceTimeSegmentDetailList = recordsetInfo.getEntityList();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(electricityPriceTimeSegmentDetailList)) {
            return;
        }

        List items = new ArrayList();
        for (ElectricityPriceTimeSegmentDetail electricityPriceTimeSegmentDetail : electricityPriceTimeSegmentDetailList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", electricityPriceTimeSegmentDetail.getObjectId());
            item.put("beginTime", electricityPriceTimeSegmentDetail.getBeginTime());
            item.put("endTime", electricityPriceTimeSegmentDetail.getEndTime());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);
    }


    @RequestMapping(value = "/electricityPriceElements/loadManagerTree", method = RequestMethod.GET)
    public void loadManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            {
                TreeNode node = new TreeNode();
                node.setObjectId("ElectricityPriceTimeSegmentManager");
                node.setText("分时电价管理");
                node.setLeaf(false);
                node.setType("ElectricityPriceTimeSegmentManager");
                node.setExpanded(true);
                nodes.add(node);
            }

            return;
        }

        String type = nodeId.split("_")[0];


        if (StringUtil.compareValue(type, "ElectricityPriceTimeSegmentManager")) {
            {
                TreeNode node = new TreeNode();
                node.setObjectId("ElectricityPrice");
                node.setText("分时电价表");
                node.setLeaf(false);
                node.setType(ElectricityPrice.class.getSimpleName());
                node.setExpanded(true);
                nodes.add(node);
            }
            {
                TreeNode node = new TreeNode();
                node.setObjectId("ElectricityPriceElements");
                node.setText("分时电价要素");
                node.setLeaf(false);
                node.setType("ElectricityPriceElements");
                node.setExpanded(false);
                nodes.add(node);
            }
            return;
        } else if (StringUtil.compareValue(type, "ElectricityPriceElements")) {

            {
                ElectricityUsageCategory root = dataPointElectricityService.getRootEntity();
                TreeNode node = new TreeNode();
                node.setObjectId(root.getObjectId());
                node.setText(root.getName());
                node.setLeaf(false);
                node.setType(ElectricityUsageCategory.class.getSimpleName());
                node.setExpanded(true);
                nodes.add(node);
            }

            {
                TreeNode node = new TreeNode();
                node.setObjectId("ElectricityPriceTimeSegment");
                node.setText("分时时间段定义");
                node.setLeaf(true);
                node.setType(ElectricityPriceTimeSegment.class.getSimpleName());
                node.setExpanded(false);
                nodes.add(node);
            }
            {
                TreeNode node = new TreeNode();
                node.setObjectId("ElectricityPriceTimeSegment");
                node.setText("电压区间定义");
                node.setLeaf(true);
                node.setType(VoltageSegment.class.getSimpleName());
                node.setExpanded(false);
                nodes.add(node);
            }
            /*{
                TreeNode node = new TreeNode();
                node.setObjectId("ElectricityPriceIssue");
                node.setText("电价发布定义");
                node.setLeaf(true);
                node.setType(ElectricityPriceIssue.class.getSimpleName());
                node.setExpanded(false);
                nodes.add(node);
            }*/
            return;
        } else if (StringUtil.compareValue(type, ElectricityUsageCategory.class.getSimpleName())) {

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
            return;
        } else if (StringUtil.compareValue(type, ElectricityPrice.class.getSimpleName())) {

            List<ElectricityPriceIssue> electricityPriceIssueList = electricityService.listElectricityPriceIssue();

            if (CollectionUtil.isEmpty(electricityPriceIssueList)) {
                return;
            }
            for (ElectricityPriceIssue electricityPriceIssue : electricityPriceIssueList) {
                TreeNode node = new TreeNode();
                node.setObjectId(electricityPriceIssue.getObjectId());
                node.setText(electricityPriceIssue.getName());
                node.setLeaf(true);
                node.setType(ElectricityPrice.class.getSimpleName() + "_" + ElectricityPriceIssue.class.getSimpleName());
                nodes.add(node);
            }
            return;
        }

    }


    @RequestMapping(value = "/electricityPriceRange/query", method = RequestMethod.GET)
    public void queryElectricityPriceRange(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String electricityPriceIssueId = request.getParameter("electricityPriceIssueId");

        String table = electricityService.queryElectricityPriceRange(electricityPriceIssueId);

        modelMap.put("items", table);
    }

    @RequestMapping(value = "/electricityPrice/load/{electricityPriceElementIds}", method = RequestMethod.GET)
    public void loadElectricityPrice(HttpServletRequest request, ModelMap modelMap, @PathVariable(value = "electricityPriceElementIds") String electricityPriceElementIds) throws Exception {

        String electricityPriceIssueId = request.getParameter("electricityPriceIssueId");
        List<ElectricityPrice> electricityPriceList = electricityService.getElectricityPricesByElectricityPriceElementIds(electricityPriceElementIds, electricityPriceIssueId);

        List dateTimePriceList = new ArrayList();

        for (ElectricityPrice electricityPrice : electricityPriceList) {
            Map electricityPriceMap = new HashMap();

            List electricityPriceTimeGroupList = new ArrayList();

            for (ElectricityPriceTimeGroup electricityPriceTimeGroup : electricityPrice.getElectricityPriceTimeGroupList()) {
                Map electricityPriceTimeGroupMap = new HashMap();
                List dateList = new ArrayList();
                List timeList = new ArrayList();
                for (ElectricityPriceDate electricityPriceDate : electricityPriceTimeGroup.getElectricityPriceDateList()) {
                    Map dateMap = new HashMap();
                    dateMap.put("startMonth", electricityPriceDate.getStartMonth());
                    dateMap.put("startDay", electricityPriceDate.getStartDay());
                    dateMap.put("endMonth", electricityPriceDate.getEndMonth());
                    dateMap.put("endDay", electricityPriceDate.getEndDay());

                    dateList.add(dateMap);
                }

                for (ElectricityPriceTime electricityPriceTime : electricityPriceTimeGroup.getElectricityPriceTimeList()) {
                    Map timeMap = new HashMap();
                    timeMap.put("startTime", electricityPriceTime.getStartTime());
                    timeMap.put("endTime", electricityPriceTime.getEndTime());

                    timeList.add(timeMap);
                }

                electricityPriceTimeGroupMap.put("dateList", dateList);
                electricityPriceTimeGroupMap.put("timeList", timeList);
                electricityPriceTimeGroupList.add(electricityPriceTimeGroupMap);

            }
            electricityPriceMap.put("price", electricityPrice.getPrice());
            electricityPriceMap.put("electricityPriceTimeGroupList", electricityPriceTimeGroupList);

            dateTimePriceList.add(electricityPriceMap);
        }

        modelMap.put("dateTimePriceList", dateTimePriceList);
    }

    @RequestMapping(value = "/electricityPriceRange/save", method = RequestMethod.POST)
    public void saveElectricityPriceRange(HttpServletRequest request,
                                          @RequestParam(value = "dateTimePriceArray", required = false) String dateTimePriceArray,
                                          @RequestParam(value = "electricityPriceElementIds", required = false) String electricityPriceElementIds,
                                          @RequestParam(value = "electricityPriceIssueId", required = false) String electricityPriceIssueId,
                                          ModelMap modelMap) throws Exception {


        electricityService.saveElectricityPriceRange(dateTimePriceArray, electricityPriceElementIds, electricityPriceIssueId);

    }

    @RequestMapping(value = "/electricityPriceIssue/query", method = RequestMethod.GET)
    public void queryElectricityPriceIssue(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ElectricityPriceIssue.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        if (StringUtil.isNotEmpty(name)) {
            this.setQueryInfoCondition(queryInfo, "name", name, ExpressionOperation.MatchMiddle);
        }

        this.setQueryInfoCondition(queryInfo, "objectVersion", 1, ExpressionOperation.Equals);
        this.setDescOrderBy(queryInfo, "startDate");

        RecordsetInfo recordsetInfo = electricityService.queryElectricityPriceIssue(queryInfo);

        List<ElectricityPriceIssue> electricityPriceIssueList = recordsetInfo.getEntityList();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(electricityPriceIssueList)) {
            return;
        }

        List items = new ArrayList();
        for (ElectricityPriceIssue electricityPriceIssue : electricityPriceIssueList) {
            HashMap item = new HashMap();
            item.put("objectId", electricityPriceIssue.getObjectId());
            item.put("name", electricityPriceIssue.getName());
            item.put("startDate", DateUtil.getDateFormatString(electricityPriceIssue.getStartDate(), DateUtil.STANDARD_DATE_FORMAT));
            item.put("endDate", DateUtil.getDateFormatString(electricityPriceIssue.getEndDate(), DateUtil.STANDARD_DATE_FORMAT));
            item.put("createTime", electricityPriceIssue.getCreateTime());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);


    }

    @RequestMapping(value = "/electricityPriceIssue/load/{objectId}", method = RequestMethod.GET)
    public void loadElectricityPriceIssue(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        ElectricityPriceIssue electricityPriceIssue = electricityService.getElectricityPriceIssue(objectId);
        Map data = new HashMap();
        data.put("objectId", electricityPriceIssue.getObjectId());
        data.put("name", electricityPriceIssue.getName());
        data.put("startDate", DateUtil.getDateFormatString(electricityPriceIssue.getStartDate(), DateUtil.STANDARD_DATE_FORMAT));
        data.put("endDate", DateUtil.getDateFormatString(electricityPriceIssue.getEndDate(), DateUtil.STANDARD_DATE_FORMAT));
        data.put("createTime", electricityPriceIssue.getCreateTime());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/electricityPriceIssue/create", method = RequestMethod.POST)
    public void createElectricityPriceIssue(ModelMap modelMap, ElectricityPriceIssue electricityPriceIssue) {

        electricityService.saveElectricityPriceIssue(electricityPriceIssue);
    }

    @RequestMapping(value = "/electricityPriceIssue/update", method = RequestMethod.POST)
    public void updateElectricityPriceIssue(ModelMap modelMap, ElectricityPriceIssue electricityPriceIssue) {

        electricityService.updateElectricityPriceIssue(electricityPriceIssue);
    }

    @RequestMapping(value = "/electricityPriceIssue/delete/{objectId}", method = RequestMethod.GET)
    public void deleteElectricityPriceIssue(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        electricityService.deleteElectricityPriceIssue(objectId);
    }

}
