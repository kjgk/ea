package com.withub.web.controller.ea;

import com.withub.common.util.StringUtil;
import com.withub.model.ea.ReportPage;
import com.withub.model.entity.query.ExpressionOperation;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.ReportPageService;
import com.withub.web.common.BaseController;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class ReportPageController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private ReportPageService reportPageService;

    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/reportPage/query", method = RequestMethod.GET)
    public void queryrReportPage(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String name = request.getParameter("name");

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ReportPage.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        this.setDescOrderBy(queryInfo, "createTime");
        if (StringUtil.isNotEmpty(name)) {
            this.setQueryInfoCondition(queryInfo, "name", name, ExpressionOperation.MatchMiddle);
        }

        RecordsetInfo recordsetInfo = reportPageService.queryReportPage(queryInfo);

        List<ReportPage> reportPageList = recordsetInfo.getEntityList();

        if (CollectionUtils.isEmpty(reportPageList)) {
            return;
        }

        List items = new ArrayList();
        for (ReportPage reportPage : reportPageList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", reportPage.getObjectId());
            item.put("name", reportPage.getName());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
    }

    @RequestMapping(value = "/reportPage/create", method = RequestMethod.POST)
    public void createReportPage(ModelMap modelMap, ReportPage reportPage) throws Exception {

        reportPageService.createReportPage(reportPage);
    }

    @RequestMapping(value = "/reportPage/load/{objectId}", method = RequestMethod.GET)
    public void loadReportPage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        ReportPage reportPage = reportPageService.getReportPageById(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", reportPage.getObjectId());
        data.put("name", reportPage.getName());
        data.put("jsonContent", reportPage.getJsonContent());
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/reportPage/update", method = RequestMethod.POST)
    public void updateReportPage(ModelMap modelMap, ReportPage reportPage) throws Exception {

        reportPageService.updateReportPage(reportPage);
    }

    @RequestMapping(value = "/reportPage/delete/{objectId}", method = RequestMethod.GET)
    public void deleteReportPage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        reportPageService.deleteReportPage(objectId);
    }

    @RequestMapping(value = "/reportPage/saveContent", method = RequestMethod.POST)
    public void saveReportPageContent(ModelMap modelMap, @RequestBody ReportPage reportPage) throws Exception {

        reportPageService.saveReportPageContent(reportPage);
    }


}
