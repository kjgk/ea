package com.withub.service.ea;


import com.withub.model.ea.DataCollectConfig;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

public interface DataCollectConfigService {

    public RecordsetInfo queryDataCollectConfig(QueryInfo queryInfo) throws Exception;

    public DataCollectConfig getDataCollectConfigById(final String objectId);

    public void createDataCollectConfig(DataCollectConfig dataCollectConfig);

    public void updateDataCollectConfig(DataCollectConfig dataCollectConfig);

    public void deleteDataCollectConfig(final String objectId) throws Exception;

}
