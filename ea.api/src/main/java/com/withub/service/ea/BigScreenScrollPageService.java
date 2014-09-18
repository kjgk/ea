package com.withub.service.ea;


import com.withub.model.ea.BigScreenScrollPage;
import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

public interface BigScreenScrollPageService {

    public RecordsetInfo queryBigScreenScrollPage(QueryInfo queryInfo) throws Exception;

    public BigScreenScrollPage getBigScreenScrollPageByObjectId(String bigScreenScrollPageId) throws Exception;

    public void updateBigScreenScrollPage(BigScreenScrollPage bigScreenScrollPage) throws Exception;

    public void saveBigScreenScrollPage(BigScreenScrollPage bigScreenScrollPage) throws Exception;

    public void deleteBigScreenScrollPage(String bigScreenScrollPageId) throws Exception;

    public void moveBigScreenScrollPageRow(String bigScreenScrollPageId, final EntityRowMoveType moveType) throws Exception;

}
