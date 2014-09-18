package com.withub.service.ea;

import com.withub.model.ea.MetasysDatabase;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.util.List;

public interface MetasysDatabaseService {

    public RecordsetInfo queryMetasysDatabase(QueryInfo queryInfo) throws Exception;

    public List<MetasysDatabase> listMetasysDatabase() throws Exception;

    public MetasysDatabase getMetasysDatabaseById(final String objectId) throws Exception;

    public void createMetasysDatabase(MetasysDatabase metasysDatabase) throws Exception;

    public void updateMetasysDatabase(MetasysDatabase metasysDatabase) throws Exception;

    public void deleteMetasysDatabase(final String objectId) throws Exception;

}
