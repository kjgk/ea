package com.withub.web.controller.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.model.ea.ReportExportLog;
import com.withub.model.ea.ReportExportSchedule;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.ConfigurationService;
import com.withub.service.ea.ReportExportService;
import com.withub.web.common.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class ReportExportController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private ReportExportService reportExportService;
    @Autowired
    private ConfigurationService configurationService;
    //===================== Controller方法 ====================================================

    @RequestMapping(value = "/reportExportLog/query", method = RequestMethod.GET)
    public void queryrReportExportLog(HttpServletRequest request, ModelMap modelMap) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ReportExportLog.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        this.setDateRangeQueryCondition(request, queryInfo, "exportTime");
        this.setDescOrderBy(queryInfo, "exportTime");

        RecordsetInfo recordsetInfo = reportExportService.queryReportExportLog(queryInfo);

        List list = recordsetInfo.getEntityList();

        List items = new ArrayList();
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        for (ReportExportLog reportExportLog : (List<ReportExportLog>) list) {

            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", reportExportLog.getObjectId());
            item.put("scheduleName", reportExportLog.getReportExportSchedule().getName());
            item.put("name", reportExportLog.getName());
            item.put("exportTime", reportExportLog.getExportTime().getTime());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/reportExportLog/delete/{objectId}", method = RequestMethod.GET)
    public void deleteReportExportLog(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        reportExportService.deleteReportExportLog(objectId);
    }

    @RequestMapping(value = "/reportExportSchedule/query", method = RequestMethod.GET)
    public void queryrReportExportSchedule(HttpServletRequest request, ModelMap modelMap) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(ReportExportSchedule.class);
        this.setPageInfoQueryCondition(request, queryInfo);

        this.setStringValueEqualsQueryCondition(request, queryInfo, "name", "name");

        this.setDescOrderBy(queryInfo, "name");
        RecordsetInfo recordsetInfo = reportExportService.queryReportExportSchedule(queryInfo);

        List list = recordsetInfo.getEntityList();
        List items = new ArrayList();
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        for (ReportExportSchedule reportExportSchedule : (List<ReportExportSchedule>) list) {

            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", reportExportSchedule.getObjectId());
            item.put("name", reportExportSchedule.getName());
            item.put("reCurrenceTimeUnit", reportExportSchedule.getReCurrenceTimeUnit());
            item.put("reCurrenceValue", reportExportSchedule.getReCurrenceValue());
            item.put("startDate", reportExportSchedule.getStartDate().getTime());
            item.put("reCurringTime", reportExportSchedule.getReCurringTime());
            item.put("rePortNameTemplate", reportExportSchedule.getRePortNameTemplate());
            item.put("dataPointGroupCategory", reportExportSchedule.getDataPointGroupCategory().getName());
            item.put("nextTime", reportExportSchedule.getNextTime());
            items.add(item);
        }
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/reportExportSchedule/load/{objectId}", method = RequestMethod.GET)
    public void loadReportExportSchedule(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        ReportExportSchedule reportExportSchedule = reportExportService.getReportExportScheduleById(objectId);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("objectId", reportExportSchedule.getObjectId());
        data.put("name", reportExportSchedule.getName());
        data.put("reCurrenceTimeUnit", reportExportSchedule.getReCurrenceTimeUnit());
        data.put("reCurrenceValue", reportExportSchedule.getReCurrenceValue());
        data.put("startDate", DateUtil.getDateFormatString(reportExportSchedule.getStartDate(), "yyyy-MM-dd"));
        data.put("reCurringTime", reportExportSchedule.getReCurringTime());
        data.put("rePortNameTemplate", reportExportSchedule.getRePortNameTemplate());
        data.put("dataPointGroupCategory.objectId", reportExportSchedule.getDataPointGroupCategory().getObjectId());
        data.put("timeUnit", reportExportSchedule.getTimeUnit());
        data.put("sortType", reportExportSchedule.getSortType());
        data.put("precision", reportExportSchedule.getPrecision());
        data.put("_sectionTypes", reportExportSchedule.getSectionTypes());
        data.put("_incrementTypes", reportExportSchedule.getIncrementTypes());
        data.put("collectLabel", reportExportSchedule.getCollectLabel());

        modelMap.put("data", data);
    }

    @RequestMapping(value = "/reportExportSchedule/create", method = RequestMethod.POST)
    public void saveReportExportSchedule(ModelMap modelMap, ReportExportSchedule reportExportSchedule) throws Exception {

        reportExportService.addReportExportSchedule(reportExportSchedule);
    }

    @RequestMapping(value = "/reportExportSchedule/update", method = RequestMethod.POST)
    public void updateReportExportSchedule(ModelMap modelMap, ReportExportSchedule reportExportSchedule) throws Exception {

        reportExportService.updateReportExportSchedule(reportExportSchedule);
    }

    @RequestMapping(value = "/reportExportSchedule/delete/{objectId}", method = RequestMethod.GET)
    public void deleteReportExportSchedule(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        reportExportService.deleteReportExportSchedule(objectId);
    }

    @RequestMapping(value = "/reportExport/download/{objectId}", method = RequestMethod.GET)
    public void downloadTempFile(HttpServletRequest request, HttpServletResponse response, @PathVariable(value = "objectId") String objectId) throws Exception {

        ReportExportLog reportExportLog = reportExportService.getReportExportLog(objectId);

        String fileName = reportExportLog.getFileName();

        String path = reportExportLog.getPath();

        String name = reportExportLog.getName();

        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");

        File file = new File(systemConfigInfo.getReportExportDirectory() + "/" + path + "/" + fileName);
        FileInputStream fileInputStream = new FileInputStream(file);

        response.setHeader("Content-Length", file.length() + "");
        response.setHeader("Content-Disposition", "filename=" + new String(name.getBytes("GBK"), "ISO-8859-1"));
        response.setContentType("application/octet-stream");

        FileCopyUtils.copy(fileInputStream, response.getOutputStream());

        fileInputStream.close();
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

}

