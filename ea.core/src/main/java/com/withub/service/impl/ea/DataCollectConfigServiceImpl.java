package com.withub.service.impl.ea;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.DataCollectConfig;
import com.withub.model.ea.MetasysDatabase;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.DataCollectConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("DataCollectConfigService")
@Transactional
public class DataCollectConfigServiceImpl implements DataCollectConfigService {

    @Autowired
    private EntityDao entityDao;


    public RecordsetInfo queryDataCollectConfig(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public DataCollectConfig getDataCollectConfigById(final String objectId) {

        return entityDao.getObject(DataCollectConfig.class, objectId);
    }

    public void createDataCollectConfig(DataCollectConfig dataCollectConfig) {

        MetasysDatabase metasysDatabase = entityDao.getObject(MetasysDatabase.class, dataCollectConfig.getMetasysDatabase().getObjectId());
        dataCollectConfig.setObjectId(StringUtil.getUuid());
        dataCollectConfig.setDatabaseTag(metasysDatabase.getDatabaseTag());
        dataCollectConfig.setHistoryDataStartUtcDateTime(DateUtil.addHours(dataCollectConfig.getHistoryDataStartUtcDateTime(), -8));
        dataCollectConfig.setHistoryDataEndUtcDateTime(DateUtil.addHours(dataCollectConfig.getHistoryDataEndUtcDateTime(), -8));
        dataCollectConfig.setHistoryDataLastCollectTime(DateUtil.addHours(dataCollectConfig.getHistoryDataLastCollectTime(), -8));
        dataCollectConfig.setStartUtcDateTime(DateUtil.addHours(dataCollectConfig.getStartUtcDateTime(), -8));
        dataCollectConfig.setLastCollectTime(DateUtil.addHours(dataCollectConfig.getLastCollectTime(), -8));
        entityDao.save(dataCollectConfig);
    }

    public void updateDataCollectConfig(DataCollectConfig dataCollectConfig) {

        DataCollectConfig oldDataCollectConfig = getDataCollectConfigById(dataCollectConfig.getObjectId());
        MetasysDatabase metasysDatabase = entityDao.getObject(MetasysDatabase.class, dataCollectConfig.getMetasysDatabase().getObjectId());
        dataCollectConfig.setDatabaseTag(metasysDatabase.getDatabaseTag());
        dataCollectConfig.setHistoryDataStartUtcDateTime(DateUtil.addHours(dataCollectConfig.getHistoryDataStartUtcDateTime(), -8));
        dataCollectConfig.setHistoryDataEndUtcDateTime(DateUtil.addHours(dataCollectConfig.getHistoryDataEndUtcDateTime(), -8));
        dataCollectConfig.setHistoryDataLastCollectTime(DateUtil.addHours(dataCollectConfig.getHistoryDataLastCollectTime(), -8));
        dataCollectConfig.setStartUtcDateTime(DateUtil.addHours(dataCollectConfig.getStartUtcDateTime(), -8));
        dataCollectConfig.setLastCollectTime(DateUtil.addHours(dataCollectConfig.getLastCollectTime(), -8));
        entityDao.update(dataCollectConfig);
    }

    public void deleteDataCollectConfig(final String objectId) throws Exception {

        entityDao.delete(DataCollectConfig.class, objectId);
    }

}
