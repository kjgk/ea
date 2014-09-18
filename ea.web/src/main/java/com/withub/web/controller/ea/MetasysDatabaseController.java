package com.withub.web.controller.ea;

import com.withub.common.util.StringUtil;
import com.withub.model.ea.MetasysDatabase;
import com.withub.model.entity.query.ExpressionOperation;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.MetasysDatabaseService;
import com.withub.web.common.BaseController;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class MetasysDatabaseController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private MetasysDatabaseService metasysDatabaseService;

    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/metasysDatabase/query", method = RequestMethod.GET)
    public void queryrMetasysDatabase(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(MetasysDatabase.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        this.setDescOrderBy(queryInfo, "createTime");
        if (StringUtil.isNotEmpty(name)) {
            this.setQueryInfoCondition(queryInfo, "name", name, ExpressionOperation.MatchMiddle);
        }

        RecordsetInfo recordsetInfo = metasysDatabaseService.queryMetasysDatabase(queryInfo);

        List<MetasysDatabase> metasysDatabaseList = recordsetInfo.getEntityList();

        if (CollectionUtils.isEmpty(metasysDatabaseList)) {
            return;
        }

        List items = new ArrayList();
        for (MetasysDatabase metasysDatabase : metasysDatabaseList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", metasysDatabase.getObjectId());
            item.put("name", metasysDatabase.getName());
            item.put("databaseTag", metasysDatabase.getDatabaseTag());
            item.put("hostIp", metasysDatabase.getHostIp());
            item.put("port", metasysDatabase.getPort());
            item.put("instanceName", metasysDatabase.getInstanceName());
            item.put("databaseName", metasysDatabase.getDatabaseName());
            item.put("userName", metasysDatabase.getUserName());
            item.put("password", metasysDatabase.getPassword());
            item.put("timeNode", metasysDatabase.getTimeNode());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
    }

    @RequestMapping(value = "/metasysDatabase/listMetasysDatabase", method = RequestMethod.GET)
    public void listMetasysDatabase(boolean detail, ModelMap modelMap) throws Exception {

        List<MetasysDatabase> metasysDatabaseList = metasysDatabaseService.listMetasysDatabase();
        if (org.apache.commons.collections.CollectionUtils.isEmpty(metasysDatabaseList)) {
            return;
        }

        List items = new ArrayList();
        for (MetasysDatabase metasysDatabase : metasysDatabaseList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("value", metasysDatabase.getObjectId());
            if (detail) {
                item.put("label", metasysDatabase.getName() + "/" + metasysDatabase.getDatabaseTag() + "/" + metasysDatabase.getHostIp() + ":" + metasysDatabase.getPort());
            } else {
                item.put("label", metasysDatabase.getDatabaseTag());
            }
            items.add(item);
        }

        modelMap.put("items", items);
    }

    @RequestMapping(value = "/metasysDatabase/create", method = RequestMethod.POST)
    public void saveMetasysDatabaseExpression(ModelMap modelMap, MetasysDatabase metasysDatabase) throws Exception {

        metasysDatabaseService.createMetasysDatabase(metasysDatabase);
    }

    @RequestMapping(value = "/metasysDatabase/load/{objectId}", method = RequestMethod.GET)
    public void loadMetasysDatabase(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        MetasysDatabase metasysDatabase = metasysDatabaseService.getMetasysDatabaseById(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", metasysDatabase.getObjectId());
        data.put("name", metasysDatabase.getName());
        data.put("databaseTag", metasysDatabase.getDatabaseTag());
        data.put("hostIp", metasysDatabase.getHostIp());
        data.put("port", metasysDatabase.getPort());
        data.put("instanceName", metasysDatabase.getInstanceName());
        data.put("databaseName", metasysDatabase.getDatabaseName());
        data.put("userName", metasysDatabase.getUserName());
        data.put("password", metasysDatabase.getPassword());
        data.put("timeNode", metasysDatabase.getTimeNode());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/metasysDatabase/update", method = RequestMethod.POST)
    public void updateMetasysDatabase(ModelMap modelMap, MetasysDatabase metasysDatabase) throws Exception {

        metasysDatabaseService.updateMetasysDatabase(metasysDatabase);
    }

    @RequestMapping(value = "/metasysDatabase/delete/{objectId}", method = RequestMethod.GET)
    public void deleteMetasysDatabase(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        metasysDatabaseService.deleteMetasysDatabase(objectId);
    }
}
