package com.withub.service.ea;

import com.withub.model.ea.ReportPage;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

public interface ReportPageService {

    public RecordsetInfo queryReportPage(QueryInfo queryInfo) throws Exception;

    public ReportPage getReportPageById(final String objectId) throws Exception;

    public void createReportPage(ReportPage reportPage) throws Exception;

    public void updateReportPage(ReportPage reportPage) throws Exception;

    public void deleteReportPage(final String objectId) throws Exception;

    public void saveReportPageContent(ReportPage reportPage) throws Exception;

}
