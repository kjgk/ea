package com.withub.service.impl.ea;

import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.BigScreenScrollPage;
import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.BigScreenScrollPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("bigScreenScrollPageService")
@Transactional
public class BigScreenScrollPageServiceImpl implements BigScreenScrollPageService {
//===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    //===================== 接口方法 ========================================================
    public RecordsetInfo queryBigScreenScrollPage(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo;
    }

    public BigScreenScrollPage getBigScreenScrollPageByObjectId(String bigScreenScrollPageId) throws Exception {

        BigScreenScrollPage bigScreenScrollPage = entityDao.getObject(BigScreenScrollPage.class, bigScreenScrollPageId);
        return bigScreenScrollPage;
    }

    public void updateBigScreenScrollPage(BigScreenScrollPage bigScreenScrollPage) throws Exception {

        BigScreenScrollPage oldBigScreenScrollPage = entityDao.getObject(BigScreenScrollPage.class, bigScreenScrollPage.getObjectId());
        if (oldBigScreenScrollPage != null) {
            bigScreenScrollPage.setOrderNo(oldBigScreenScrollPage.getOrderNo());
        }
        entityDao.save(bigScreenScrollPage);
    }

    public void saveBigScreenScrollPage(BigScreenScrollPage bigScreenScrollPage) throws Exception {

        bigScreenScrollPage.setObjectId(StringUtil.getUuid());
        bigScreenScrollPage.setOrderNo(getNextOrderNo(bigScreenScrollPage));
        entityDao.save(bigScreenScrollPage);
    }

    public void deleteBigScreenScrollPage(String bigScreenScrollPageId) throws Exception {

        entityDao.delete(BigScreenScrollPage.class, bigScreenScrollPageId);
    }

    public void moveBigScreenScrollPageRow(String bigScreenScrollPageId, final EntityRowMoveType moveType) throws Exception {

        BigScreenScrollPage bigScreenScrollPage = entityDao.getObject(BigScreenScrollPage.class, bigScreenScrollPageId);
        if (moveType == EntityRowMoveType.First) {
            moveBigScreenScrollPageRowFirst(bigScreenScrollPage);
        } else if (moveType == EntityRowMoveType.Last) {
            moveBigScreenScrollPageRowLast(bigScreenScrollPage);
        } else if (moveType == EntityRowMoveType.Up) {
            moveBigScreenScrollPageRowUp(bigScreenScrollPage);
        } else if (moveType == EntityRowMoveType.Down) {
            moveBigScreenScrollPageRowDown(bigScreenScrollPage);
        }
    }

    private void moveBigScreenScrollPageRowFirst(BigScreenScrollPage bigScreenScrollPage) throws Exception {

        String jpql = "update BigScreenScrollPage o  set o.orderNo=1 where o.objectId='" + bigScreenScrollPage.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=o.orderNo+1 where o.objectId<>'" + bigScreenScrollPage.getObjectId() + "'" + " and o.orderNo<" + bigScreenScrollPage.getOrderNo();
        entityDao.executeJpql(jpql);

    }

    private void moveBigScreenScrollPageRowLast(BigScreenScrollPage bigScreenScrollPage) throws Exception {

        String jpql = "select max(o.orderNo) from BigScreenScrollPage o where 1=1";
        Integer maxOrderNo = entityDao.getObject(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=" + maxOrderNo + " where o.objectId='" + bigScreenScrollPage.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + bigScreenScrollPage.getObjectId() + "'"
                + " and o.orderNo>" + bigScreenScrollPage.getOrderNo();
        entityDao.executeJpql(jpql);
    }

    private void moveBigScreenScrollPageRowUp(BigScreenScrollPage bigScreenScrollPage) throws Exception {

        String jpql = "select o from BigScreenScrollPage o where o.orderNo<" + bigScreenScrollPage.getOrderNo()
                + " order by o.orderNo desc";
        BigScreenScrollPage previousBigScreenScrollPage = entityDao.getObject(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=" + previousBigScreenScrollPage.getOrderNo() + " where o.objectId='" + bigScreenScrollPage.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=o.orderNo+1"
                + " where o.objectId<>'" + bigScreenScrollPage.getObjectId() + "'"
                + " and o.orderNo<" + bigScreenScrollPage.getOrderNo()
                + " and o.orderNo>=" + previousBigScreenScrollPage.getOrderNo();
        entityDao.executeJpql(jpql);

    }

    private void moveBigScreenScrollPageRowDown(BigScreenScrollPage bigScreenScrollPage) throws Exception {

        String jpql = "select o from BigScreenScrollPage o where o.orderNo>" + bigScreenScrollPage.getOrderNo()
                + " order by o.orderNo";
        BigScreenScrollPage nextBigScreenScrollPage = entityDao.getObject(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=" + nextBigScreenScrollPage.getOrderNo() + " where o.objectId='" + bigScreenScrollPage.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update BigScreenScrollPage o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + bigScreenScrollPage.getObjectId() + "'"
                + " and o.orderNo<=" + nextBigScreenScrollPage.getOrderNo()
                + " and o.orderNo>" + bigScreenScrollPage.getOrderNo();
        entityDao.executeJpql(jpql);
    }

    private Integer getNextOrderNo(BigScreenScrollPage bigScreenScrollPage) {

        Integer nextOrderNo = 1;
        String sql = "select max(o.orderNo) from BigScreenScrollPage o";
        List<Integer> list = entityDao.listByJpql(sql);
        Integer maxOrderNo = list.get(0);
        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }
        return nextOrderNo;
    }

}
