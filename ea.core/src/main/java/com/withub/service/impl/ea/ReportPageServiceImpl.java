package com.withub.service.impl.ea;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.ReportPage;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.ReportPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("reportPageService")
@Transactional
public class ReportPageServiceImpl implements ReportPageService {

    //===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    //=======================接口方法========================================================

    public RecordsetInfo queryReportPage(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public ReportPage getReportPageById(final String objectId) throws Exception {

        return entityDao.getObject(ReportPage.class, objectId);
    }

    public void createReportPage(ReportPage reportPage) throws Exception {

        reportPage.setObjectId(StringUtil.getUuid());
        reportPage.setCreateTime(DateUtil.getCurrentTime());
        reportPage.setLastUpdateTime(DateUtil.getCurrentTime());
        reportPage.setObjectStatus(1);
        reportPage.setObjectVersion(1);
        entityDao.save(reportPage);
    }

    public void updateReportPage(ReportPage reportPage) throws Exception {

        ReportPage temp = entityDao.getObject(ReportPage.class, reportPage.getObjectId());

        temp.setName(reportPage.getName());
        temp.setLastUpdateTime(DateUtil.getCurrentTime());
        temp.setObjectVersion(temp.getObjectVersion() + 1);
        entityDao.save(temp);
    }

    public void deleteReportPage(final String objectId) throws Exception {

        entityDao.logicDelete(ReportPage.class, objectId);
    }

    public void saveReportPageContent(ReportPage reportPage) throws Exception {

        ReportPage temp = entityDao.getObject(ReportPage.class, reportPage.getObjectId());

        temp.setJsonContent(reportPage.getJsonContent());
        temp.setLastUpdateTime(DateUtil.getCurrentTime());
        temp.setObjectVersion(temp.getObjectVersion() + 1);
        entityDao.save(temp);
    }

}
