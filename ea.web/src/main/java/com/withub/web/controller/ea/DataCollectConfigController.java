package com.withub.web.controller.ea;

import com.withub.common.util.DateUtil;
import com.withub.model.ea.DataCollectConfig;
import com.withub.model.entity.query.ExpressionOperation;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.DataCollectConfigService;
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
public class DataCollectConfigController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private DataCollectConfigService dataCollectConfigService;

    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/dataCollectConfig/query", method = RequestMethod.GET)
    public void queryDataCollectConfig(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String tableName = request.getParameter("tableName");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(DataCollectConfig.class);
        this.setPageInfoQueryCondition(request, queryInfo);

        this.setQueryInfoCondition(queryInfo, "tableName", tableName, ExpressionOperation.MatchMiddle);
        this.setAscOrderBy(queryInfo, "tableName");

        RecordsetInfo recordsetInfo = dataCollectConfigService.queryDataCollectConfig(queryInfo);

        List<DataCollectConfig> dataCollectConfigList = recordsetInfo.getEntityList();

        if (CollectionUtils.isEmpty(dataCollectConfigList)) {
            return;
        }

        List items = new ArrayList();
        for (DataCollectConfig dataCollectConfig : dataCollectConfigList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", dataCollectConfig.getObjectId());
            item.put("tableName", dataCollectConfig.getTableName());
            item.put("historyDataStartUtcDateTime", DateUtil.addHours(dataCollectConfig.getHistoryDataStartUtcDateTime(), 8));
            item.put("historyDataEndUtcDateTime", DateUtil.addHours(dataCollectConfig.getHistoryDataEndUtcDateTime(), 8));
            item.put("historyDataLastCollectTime", DateUtil.addHours(dataCollectConfig.getHistoryDataLastCollectTime(), 8));
            item.put("enableHistoryDataCollect", dataCollectConfig.getEnableHistoryDataCollect());
            item.put("startUtcDateTime", DateUtil.addHours(dataCollectConfig.getStartUtcDateTime(), 8));
            item.put("lastCollectTime", DateUtil.addHours(dataCollectConfig.getLastCollectTime(), 8));
            item.put("enableCollect", dataCollectConfig.getEnableCollect());
            item.put("databaseTag", dataCollectConfig.getDatabaseTag());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
    }

    @RequestMapping(value = "/dataCollectConfig/load/{objectId}", method = RequestMethod.GET)
    public void loadDataCollectConfig(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        DataCollectConfig dataCollectConfig = dataCollectConfigService.getDataCollectConfigById(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", dataCollectConfig.getObjectId());
        data.put("tableName", dataCollectConfig.getTableName());
        data.put("metasysDatabase.objectId", dataCollectConfig.getMetasysDatabase().getObjectId());
        data.put("historyDataStartUtcDateTime", DateUtil.getDateFormatString(DateUtil.addHours(dataCollectConfig.getHistoryDataStartUtcDateTime(), 8), DateUtil.STANDARD_DATEMINUTE_FORMAT));
        data.put("historyDataEndUtcDateTime", DateUtil.getDateFormatString(DateUtil.addHours(dataCollectConfig.getHistoryDataEndUtcDateTime(), 8), DateUtil.STANDARD_DATEMINUTE_FORMAT));
        data.put("historyDataLastCollectTime", DateUtil.getDateFormatString(DateUtil.addHours(dataCollectConfig.getHistoryDataLastCollectTime(), 8), DateUtil.STANDARD_DATEMINUTE_FORMAT));
        data.put("enableHistoryDataCollect", dataCollectConfig.getEnableHistoryDataCollect());
        data.put("startUtcDateTime", DateUtil.getDateFormatString(DateUtil.addHours(dataCollectConfig.getStartUtcDateTime(), 8), DateUtil.STANDARD_DATEMINUTE_FORMAT));
        data.put("lastCollectTime", DateUtil.getDateFormatString(DateUtil.addHours(dataCollectConfig.getLastCollectTime(), 8), DateUtil.STANDARD_DATEMINUTE_FORMAT));
        data.put("enableCollect", dataCollectConfig.getEnableCollect());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/dataCollectConfig/create", method = RequestMethod.POST)
    public void saveDataCollectConfigExpression(ModelMap modelMap, DataCollectConfig dataCollectConfig) {

        dataCollectConfigService.createDataCollectConfig(dataCollectConfig);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataCollectConfig/update", method = RequestMethod.POST)
    public void updateDataCollectConfig(ModelMap modelMap, DataCollectConfig dataCollectConfig) {

        dataCollectConfigService.updateDataCollectConfig(dataCollectConfig);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/dataCollectConfig/delete/{objectId}", method = RequestMethod.GET)
    public void deleteDataCollectConfig(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        dataCollectConfigService.deleteDataCollectConfig(objectId);
        modelMap.put("success", true);
    }

}

