package com.withub.service.impl.ea;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.DataPoint;
import com.withub.model.ea.DataPointGroup;
import com.withub.model.ea.DataPointGroupCategory;
import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.service.ea.ConfigurationService;
import com.withub.service.ea.DataPointGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("dataPointGroupService")
@Transactional
public class DataPointGroupServiceImpl implements DataPointGroupService {

    //===================== 属性声明 ========================================================

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private ConfigurationService configurationService;

    //===================== 接口方法 ========================================================

    public DataPointGroupCategory getRootEntity() throws Exception {

        String jpql = "select o from " + DataPointGroupCategory.class.getName() + " o where o.parent is null";
        return entityDao.getObject(jpql);
    }

    public DataPointGroupCategory getDataPointGroupCategoryByObjectId(String dataPointGroupCategoryId) throws Exception {

        return entityDao.getObject(DataPointGroupCategory.class, dataPointGroupCategoryId);
    }

    public void updateDataPointGroupCategory(DataPointGroupCategory dataPointGroupCategory) throws Exception {

        DataPointGroupCategory oldDataPointGroupCategory = entityDao.getObject(DataPointGroupCategory.class, dataPointGroupCategory.getObjectId());

        if (oldDataPointGroupCategory != null) {
            dataPointGroupCategory.setCreateTime(oldDataPointGroupCategory.getCreateTime());
            dataPointGroupCategory.setObjectVersion(1);
            dataPointGroupCategory.setObjectStatus(1);
            dataPointGroupCategory.setOrderNo(oldDataPointGroupCategory.getOrderNo());
        }

        dataPointGroupCategory.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.save(dataPointGroupCategory);
    }

    public void saveDataPointGroupCategory(DataPointGroupCategory dataPointGroupCategory) throws Exception {

        dataPointGroupCategory.setObjectId(StringUtil.getUuid());
        dataPointGroupCategory.setCreateTime(DateUtil.getCurrentTime());
        dataPointGroupCategory.setLastUpdateTime(DateUtil.getCurrentTime());
        dataPointGroupCategory.setObjectVersion(1);
        dataPointGroupCategory.setObjectStatus(1);
        dataPointGroupCategory.setOrderNo(getNextOrderNo(dataPointGroupCategory));

        entityDao.save(dataPointGroupCategory);
    }

    public void deleteDataPointGroupCategory(String dataPointGroupCategoryId) throws Exception {

        entityDao.logicDelete(DataPointGroupCategory.class, dataPointGroupCategoryId);
    }

    public List<DataPointGroup> listByDataPointGroupCategoryId(String parentId) throws Exception {

        String jpql = "select o from " + DataPointGroup.class.getName() + " o where o.dataPointGroupCategory.objectId = ? and o.objectStatus =1 order by orderNo";
        return entityDao.listByJpql(jpql, parentId);
    }

    public List<DataPointGroup> listByDataPointGroupCategorys(List<DataPointGroupCategory> dataPointGroupCategoryList) throws Exception {

        List<DataPointGroup> dataPointGroupList = new ArrayList<DataPointGroup>();
        for (DataPointGroupCategory dataPointGroupCategory : dataPointGroupCategoryList) {
            List<DataPointGroup> dataPointGroups = listByDataPointGroupCategoryId(dataPointGroupCategory.getObjectId());
            if (CollectionUtil.isNotEmpty(dataPointGroups)) {
                dataPointGroupList.addAll(dataPointGroups);
            }
        }
        return dataPointGroupList;
    }

    public DataPointGroup getDataPointGroupByObjectId(String dataPointGroupId) throws Exception {

        DataPointGroup dataPointGroup = entityDao.getObject(DataPointGroup.class, dataPointGroupId);
        return dataPointGroup;
    }

    public void updateDataPointGroup(DataPointGroup dataPointGroup) throws Exception {

        DataPointGroup oldDataPointGroup = entityDao.getObject(DataPointGroup.class, dataPointGroup.getObjectId());
        if (oldDataPointGroup != null) {
            dataPointGroup.setCreateTime(oldDataPointGroup.getCreateTime());
            dataPointGroup.setObjectVersion(1);
            dataPointGroup.setObjectStatus(1);
            dataPointGroup.setOrderNo(oldDataPointGroup.getOrderNo());
        }

        dataPointGroup.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.save(dataPointGroup);

    }

    public void saveDataPointGroup(DataPointGroup dataPointGroup) throws Exception {

        dataPointGroup.setObjectId(StringUtil.getUuid());
        dataPointGroup.setCreateTime(DateUtil.getCurrentTime());
        dataPointGroup.setLastUpdateTime(DateUtil.getCurrentTime());
        dataPointGroup.setObjectVersion(1);
        dataPointGroup.setObjectStatus(1);
        dataPointGroup.setOrderNo(getNextOrderNo(dataPointGroup));

        entityDao.save(dataPointGroup);
    }

    public void saveDataPointGroups(String dataPointGroupCategoryId, String dataPointIds) throws Exception {

        DataPointGroupCategory dataPointGroupCategory = getDataPointGroupCategoryByObjectId(dataPointGroupCategoryId);
        String[] dataPointIdArray = dataPointIds.split("\\|");
        for (int i = 0; i < dataPointIdArray.length; i++) {
            DataPointGroup dataPointGroup = getDataPointGroup(dataPointGroupCategoryId, dataPointIdArray[i]);
            if (dataPointGroup == null) {
                dataPointGroup = new DataPointGroup();
                dataPointGroup.setDataPointGroupCategory(dataPointGroupCategory);
                dataPointGroup.setDataPoint(entityDao.getObject(DataPoint.class, dataPointIdArray[i]));
                saveDataPointGroup(dataPointGroup);
            }
        }
    }

    public void deleteDataPointGroup(String dataPointGroupId) throws Exception {

        entityDao.logicDelete(DataPointGroup.class, dataPointGroupId);
    }

    public void moveDataPointGroupRow(String dataPointGroupId, EntityRowMoveType moveType) throws Exception {

        DataPointGroup dataPointGroup = entityDao.getObject(DataPointGroup.class, dataPointGroupId);
        if (moveType == EntityRowMoveType.First) {
            movedataPointGroupRowFirst(dataPointGroup);
        } else if (moveType == EntityRowMoveType.Last) {
            moveDataPointGroupRowLast(dataPointGroup);
        } else if (moveType == EntityRowMoveType.Up) {
            moveDataPointGroupRowUp(dataPointGroup);
        } else if (moveType == EntityRowMoveType.Down) {
            moveDataPointGroupRowDown(dataPointGroup);
        }
    }

    private void movedataPointGroupRowFirst(DataPointGroup dataPointGroup) throws Exception {

        String dataPointGroupCategoryId = dataPointGroup.getDataPointGroupCategory().getObjectId();

        String jpql = "update DataPointGroup o  set o.orderNo=1 where o.objectId='" + dataPointGroup.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update DataPointGroup o set o.orderNo=o.orderNo+1 where o.objectId<>'" + dataPointGroup.getObjectId() + "'" + " and o.orderNo<" + dataPointGroup.getOrderNo()
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "'";
        entityDao.executeJpql(jpql);

    }

    private void moveDataPointGroupRowLast(DataPointGroup dataPointGroup) throws Exception {


        String dataPointGroupCategoryId = dataPointGroup.getDataPointGroupCategory().getObjectId();
        String jpql = "select max(o.orderNo) from DataPointGroup o where 1=1"
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "'";

        Integer maxOrderNo = entityDao.getObject(jpql);

        jpql = "update DataPointGroup o set o.orderNo=" + maxOrderNo + " where o.objectId='" + dataPointGroup.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        jpql = "update DataPointGroup o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + dataPointGroup.getObjectId() + "'"
                + " and o.orderNo>" + dataPointGroup.getOrderNo()
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "'";

        entityDao.executeJpql(jpql);

    }

    private void moveDataPointGroupRowUp(DataPointGroup dataPointGroup) throws Exception {

        String dataPointGroupCategoryId = dataPointGroup.getDataPointGroupCategory().getObjectId();

        String jpql = "select o from DataPointGroup o where o.orderNo<" + dataPointGroup.getOrderNo()
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "'order by o.orderNo desc";

        DataPointGroup previousDataPointGroup = entityDao.getObject(jpql);
        jpql = "update DataPointGroup o set o.orderNo=" + previousDataPointGroup.getOrderNo() + " where o.objectId='" + dataPointGroup.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update DataPointGroup o set o.orderNo=o.orderNo+1"
                + " where o.objectId<>'" + dataPointGroup.getObjectId() + "'"
                + " and o.orderNo<" + dataPointGroup.getOrderNo()
                + " and o.orderNo>=" + previousDataPointGroup.getOrderNo()
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "'";
        entityDao.executeJpql(jpql);

    }

    private void moveDataPointGroupRowDown(DataPointGroup dataPointGroup) throws Exception {

        String dataPointGroupCategoryId = dataPointGroup.getDataPointGroupCategory().getObjectId();

        String jpql = "select o from DataPointGroup o where o.orderNo>" + dataPointGroup.getOrderNo()
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "' order by o.orderNo";

        DataPointGroup nextDataPointGroup = entityDao.getObject(jpql);

        jpql = "update DataPointGroup o set o.orderNo=" + nextDataPointGroup.getOrderNo() + " where o.objectId='" + dataPointGroup.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update DataPointGroup o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + dataPointGroup.getObjectId() + "'"
                + " and o.orderNo<=" + nextDataPointGroup.getOrderNo()
                + " and o.orderNo>" + dataPointGroup.getOrderNo()
                + " and o.dataPointGroupCategory.objectId='" + dataPointGroupCategoryId + "'";

        entityDao.executeJpql(jpql);
    }


    private Integer getNextOrderNo(DataPointGroupCategory dataPointGroupCategory) throws Exception {

        Integer nextOrderNo = 1;
        Integer maxOrderNo = null;
        try {
            String parentId = dataPointGroupCategory.getParent().getObjectId();
            String sql = "select max(o.orderNo) from DataPointGroupCategory o where  o.parent.objectId='" + parentId + "'";
            maxOrderNo = entityDao.getObject(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }
        return nextOrderNo;
    }

    private Integer getNextOrderNo(DataPointGroup dataPointGroup) {

        Integer nextOrderNo = 1;
        String sql = "select max(o.orderNo) from DataPointGroup o where dataPointGroupCategoryId='" + dataPointGroup.getDataPointGroupCategory().getObjectId() + "'";
        List<Integer> list = entityDao.listByJpql(sql);
        Integer maxOrderNo = list.get(0);

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }

        return nextOrderNo;
    }

    public List<DataPointGroupCategory> getAllValidDataPointGroupCategory() throws Exception {

        DataPointGroupCategory root = getRootEntity();
        List<DataPointGroupCategory> categoryList = root.getChildList();
        for (DataPointGroupCategory dataPointGroupCategory : categoryList) {
            dataPointGroupCategory.setDataPointGroupList(listByDataPointGroupCategoryId(dataPointGroupCategory.getObjectId()));
        }
        return categoryList;
    }

    public void getAllDataPointGroupCategoryById(DataPointGroupCategory dataPointGroupCategory, List<DataPointGroupCategory> dataPointGroupCategoryList) throws Exception {

        if (CollectionUtil.isNotEmpty(dataPointGroupCategory.getChildList())) {
            dataPointGroupCategoryList.addAll(dataPointGroupCategory.getChildList());
            for (DataPointGroupCategory dpgc : dataPointGroupCategory.getChildList()) {
                getAllDataPointGroupCategoryById(dpgc, dataPointGroupCategoryList);
            }
        }
    }

    public void moveDataPointGroupCategoryRow(String dataPointGroupCategoryId, EntityRowMoveType moveType) throws Exception {

        DataPointGroupCategory dataPointGroupCategory = entityDao.getObject(DataPointGroupCategory.class, dataPointGroupCategoryId);
        if (moveType == EntityRowMoveType.First) {
            moveDataPointGroupCategoryRowFirst(dataPointGroupCategory);
        } else if (moveType == EntityRowMoveType.Last) {
            moveDataPointGroupCategoryRowLast(dataPointGroupCategory);
        } else if (moveType == EntityRowMoveType.Up) {
            moveDataPointGroupCategoryRowUp(dataPointGroupCategory);
        } else if (moveType == EntityRowMoveType.Down) {
            moveDataPointGroupCategoryRowDown(dataPointGroupCategory);
        }
    }

    private void moveDataPointGroupCategoryRowFirst(DataPointGroupCategory dataPointGroupCategory) throws Exception {

        String parentId = dataPointGroupCategory.getParent().getObjectId();

        String jpql = "update DataPointGroupCategory o  set o.orderNo=1 where o.objectId='" + dataPointGroupCategory.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update DataPointGroupCategory o set o.orderNo=o.orderNo+1 where o.objectId<>'" + dataPointGroupCategory.getObjectId() + "'" + " and o.orderNo<" + dataPointGroupCategory.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    private void moveDataPointGroupCategoryRowLast(DataPointGroupCategory dataPointGroupCategory) throws Exception {


        String parentId = dataPointGroupCategory.getParent().getObjectId();
        String jpql = "select max(o.orderNo) from DataPointGroupCategory o where 1=1";

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        Integer maxOrderNo = entityDao.getObject(jpql);

        jpql = "update DataPointGroupCategory o set o.orderNo=" + maxOrderNo + " where o.objectId='" + dataPointGroupCategory.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        jpql = "update DataPointGroupCategory o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + dataPointGroupCategory.getObjectId() + "'"
                + " and o.orderNo>" + dataPointGroupCategory.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    private void moveDataPointGroupCategoryRowUp(DataPointGroupCategory dataPointGroupCategory) throws Exception {

        String parentId = dataPointGroupCategory.getParent().getObjectId();

        String jpql = "select o from DataPointGroupCategory o where o.orderNo<" + dataPointGroupCategory.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";
        }
        jpql += " order by o.orderNo desc";

        DataPointGroupCategory previousDataPointGroupCategory = entityDao.getObject(jpql);
        jpql = "update DataPointGroupCategory o set o.orderNo=" + previousDataPointGroupCategory.getOrderNo() + " where o.objectId='" + dataPointGroupCategory.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update DataPointGroupCategory o set o.orderNo=o.orderNo+1"
                + " where o.objectId<>'" + dataPointGroupCategory.getObjectId() + "'"
                + " and o.orderNo<" + dataPointGroupCategory.getOrderNo()
                + " and o.orderNo>=" + previousDataPointGroupCategory.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    private void moveDataPointGroupCategoryRowDown(DataPointGroupCategory dataPointGroupCategory) throws Exception {

        String parentId = dataPointGroupCategory.getParent().getObjectId();

        String jpql = "select o from DataPointGroupCategory o where o.orderNo>" + dataPointGroupCategory.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        jpql += " order by o.orderNo";

        DataPointGroupCategory nextDataPointGroupCategory = entityDao.getObject(jpql);

        jpql = "update DataPointGroupCategory o set o.orderNo=" + nextDataPointGroupCategory.getOrderNo() + " where o.objectId='" + dataPointGroupCategory.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update DataPointGroupCategory o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + dataPointGroupCategory.getObjectId() + "'"
                + " and o.orderNo<=" + nextDataPointGroupCategory.getOrderNo()
                + " and o.orderNo>" + dataPointGroupCategory.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);


    }

    private DataPointGroup getDataPointGroup(String dataPointGroupCategoryId, String dataPointId) throws Exception {

        String jpql = "select o from " + DataPointGroup.class.getName() + " o where 1=1"
                + " and o.objectStatus = 1 and o.dataPointGroupCategory.objectId = ?"
                + " and o.dataPoint.objectId = ?";
        DataPointGroup dataPointGroup = entityDao.getObject(jpql, dataPointGroupCategoryId, dataPointId);
        return dataPointGroup;
    }
}
