package com.withub.service.impl.ea;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.MetasysDatabase;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.MetasysDatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("metasysDatabaseService")
@Transactional
public class ReportPageServiceImpl implements MetasysDatabaseService {

    //===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    //=======================接口方法========================================================

    public RecordsetInfo queryMetasysDatabase(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public List<MetasysDatabase> listMetasysDatabase() throws Exception {

        String jpql = "select o from " + MetasysDatabase.class.getName() + " o where 1=1 and o.objectStatus = 1 order by o.createTime desc";
        List<MetasysDatabase> list = entityDao.listByJpql(jpql);
        return list;
    }

    public MetasysDatabase getMetasysDatabaseById(final String objectId) throws Exception {

        return entityDao.getObject(MetasysDatabase.class, objectId);
    }

    public void createMetasysDatabase(MetasysDatabase metasysDatabase) throws Exception {

        metasysDatabase.setObjectId(StringUtil.getUuid());
        metasysDatabase.setCreateTime(DateUtil.getCurrentTime());
        metasysDatabase.setLastUpdateTime(DateUtil.getCurrentTime());
        metasysDatabase.setObjectStatus(1);
        metasysDatabase.setObjectVersion(1);
        entityDao.save(metasysDatabase);
    }

    public void updateMetasysDatabase(MetasysDatabase metasysDatabase) throws Exception {

        MetasysDatabase oldMetasysDatabase = entityDao.getObject(MetasysDatabase.class, metasysDatabase.getObjectId());

        if (oldMetasysDatabase != null) {
            metasysDatabase.setCreateTime(oldMetasysDatabase.getCreateTime());
            metasysDatabase.setObjectVersion(1);
            metasysDatabase.setObjectStatus(1);
        }

        metasysDatabase.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.save(metasysDatabase);
    }

    public void deleteMetasysDatabase(final String objectId) throws Exception {

        entityDao.logicDelete(MetasysDatabase.class, objectId);
    }
}
