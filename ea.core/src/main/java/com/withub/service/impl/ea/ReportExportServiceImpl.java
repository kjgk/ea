package com.withub.service.impl.ea;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.ReportExportLog;
import com.withub.model.ea.ReportExportSchedule;
import com.withub.model.ea.ReportExportScheduleDetail;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.ReportExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service("reportExportService")
@Transactional
public class ReportExportServiceImpl implements ReportExportService {

    //===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    /* ===================== 接口方法 ======================================================== */

    public RecordsetInfo queryReportExportLog(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);

        return recordsetInfo;
    }

    public RecordsetInfo queryReportExportSchedule(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);

        return recordsetInfo;
    }

    public void addReportExportSchedule(ReportExportSchedule reportExportSchedule) throws Exception {

        reportExportSchedule.setObjectId(StringUtil.getUuid());
        reportExportSchedule.setCreateTime(DateUtil.getCurrentTime());
        reportExportSchedule.setLastUpdateTime(DateUtil.getCurrentTime());
        reportExportSchedule.setObjectStatus(1);
        calcuateNextTime(reportExportSchedule);

        entityDao.save(reportExportSchedule);
    }

    public void updateReportExportSchedule(ReportExportSchedule reportExportSchedule) throws Exception {

        ReportExportSchedule temp = entityDao.getObject(ReportExportSchedule.class, reportExportSchedule.getObjectId());

        reportExportSchedule.setCreateTime(temp.getCreateTime());
        reportExportSchedule.setLastUpdateTime(DateUtil.getCurrentTime());
        reportExportSchedule.setObjectStatus(temp.getObjectStatus());
        if (!StringUtil.compareValue(temp.getReCurrenceTimeUnit(), reportExportSchedule.getReCurrenceTimeUnit())
                || temp.getReCurrenceValue() != reportExportSchedule.getReCurrenceValue()
                || temp.getStartDate().getTime() != reportExportSchedule.getStartDate().getTime()) {
            calcuateNextTime(reportExportSchedule);
        } else if (!StringUtil.compareValue(temp.getReCurringTime(), reportExportSchedule.getReCurringTime())) {
            Date nextTime = DateUtil.convertStringToDate(DateUtil.getStandardDateString(temp.getNextTime()) + " " + reportExportSchedule.getReCurringTime(), "yyyy-MM-dd HH:mm");
            Date now = new Date();
            if (now.after(nextTime)) {
                nextTime = DateUtil.addDays(nextTime, 1);
            }
            reportExportSchedule.setNextTime(nextTime);
        } else {
            reportExportSchedule.setNextTime(temp.getNextTime());
        }

        entityDao.save(reportExportSchedule);
    }

    private void calcuateNextTime(ReportExportSchedule reportExportSchedule) {

        Date now = new Date();
        Date startDate = reportExportSchedule.getStartDate();
        if (now.after(startDate)) {
            startDate = now;
        }
        Date nextTime = DateUtil.convertStringToDate(DateUtil.getStandardDateString(startDate) + " " + reportExportSchedule.getReCurringTime(), "yyyy-MM-dd HH:mm");
        if (now.after(nextTime)) {
            nextTime = DateUtil.addDays(nextTime, 1);
        }
        reportExportSchedule.setNextTime(nextTime);
    }

    public void deleteReportExportSchedule(String objectId) throws Exception {

        entityDao.logicDelete(ReportExportSchedule.class, objectId);
    }

    public ReportExportSchedule getReportExportScheduleById(String objectId) {

        return entityDao.getObject(ReportExportSchedule.class, objectId);
    }

    public ReportExportLog getReportExportLog(String objectId) {

        ReportExportLog reportExportLog = entityDao.getObject(ReportExportLog.class, objectId);

        return reportExportLog;
    }

    public List<ReportExportLog> listReportExportLog(Date startTime, Date endTime) throws Exception {

        List list = entityDao.listByJpql("select o from " + ReportExportLog.class.getName() + " o where 1=1 and ExportTime>=? and ExportTime<=? order by ExportTime", startTime, endTime);

        return (List<ReportExportLog>) list;
    }

    public void deleteReportExportLog(final String objectId) throws Exception {

        entityDao.delete(ReportExportLog.class, objectId);
    }
}

