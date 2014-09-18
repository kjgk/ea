package com.withub.service.ea;

import com.withub.model.ea.ReportExportLog;
import com.withub.model.ea.ReportExportSchedule;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.util.Date;
import java.util.List;

public interface ReportExportService {

    public RecordsetInfo queryReportExportSchedule(QueryInfo queryInfo) throws Exception;

    public RecordsetInfo queryReportExportLog(QueryInfo queryInfo) throws Exception;

    public void addReportExportSchedule(ReportExportSchedule reportExportSchedule) throws Exception;

    public void updateReportExportSchedule(ReportExportSchedule reportExportSchedule) throws Exception;

    public void deleteReportExportSchedule(final String objectId) throws Exception;

    public ReportExportSchedule getReportExportScheduleById(final String objectId);

    public ReportExportLog getReportExportLog(String objectId);

    public List<ReportExportLog> listReportExportLog(final Date startTime, final Date endTime) throws Exception;

    public void deleteReportExportLog(final String objectId) throws Exception;
}
