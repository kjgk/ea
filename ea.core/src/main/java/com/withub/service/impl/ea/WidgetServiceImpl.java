package com.withub.service.impl.ea;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.Widget;
import com.withub.model.ea.WidgetCategory;
import com.withub.model.ea.WidgetInfo;
import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.service.ea.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("widgetService")
@Transactional
public class WidgetServiceImpl implements WidgetService {

    //================================属性声明==================================
    @Autowired
    private EntityDao entityDao;

    //================================接口方法=================================
    public WidgetCategory getRootEntity() throws Exception {

        String jpql = "select o from " + WidgetCategory.class.getName() + " o where o.parent is null";
        return entityDao.getObject(jpql);
    }

    public WidgetCategory getWidgetCategoryByObjectId(String widgetCategoryId) throws Exception {

        return entityDao.getObject(WidgetCategory.class, widgetCategoryId);
    }

    public void updateWidgetCategory(WidgetCategory widgetCategory) throws Exception {

        WidgetCategory oldWidgetCategory = entityDao.getObject(WidgetCategory.class, widgetCategory.getObjectId());

        if (oldWidgetCategory != null) {
            widgetCategory.setCreateTime(oldWidgetCategory.getCreateTime());
            widgetCategory.setObjectVersion(1);
            widgetCategory.setObjectStatus(1);
            widgetCategory.setOrderNo(oldWidgetCategory.getOrderNo());
        }

        widgetCategory.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.save(widgetCategory);
    }

    public void saveWidgetCategory(WidgetCategory widgetCategory) throws Exception {

        widgetCategory.setObjectId(StringUtil.getUuid());
        widgetCategory.setCreateTime(DateUtil.getCurrentTime());
        widgetCategory.setLastUpdateTime(DateUtil.getCurrentTime());
        widgetCategory.setObjectVersion(1);
        widgetCategory.setObjectStatus(1);
        widgetCategory.setOrderNo(getNextOrderNo(widgetCategory));

        entityDao.save(widgetCategory);
    }

    public void deleteWidgetCategory(String widgetCategoryId) throws Exception {

        entityDao.logicDelete(WidgetCategory.class, widgetCategoryId);
    }

    public void moveWidgetCategoryRow(String widgetCategoryId, final EntityRowMoveType moveType) throws Exception {

        WidgetCategory widgetCategory = entityDao.getObject(WidgetCategory.class, widgetCategoryId);
        if (moveType == EntityRowMoveType.First) {
            moveWidgetCategoryRowFirst(widgetCategory);
        } else if (moveType == EntityRowMoveType.Last) {
            moveWidgetCategoryRowLast(widgetCategory);
        } else if (moveType == EntityRowMoveType.Up) {
            moveWidgetCategoryRowUp(widgetCategory);
        } else if (moveType == EntityRowMoveType.Down) {
            moveWidgetCategoryRowDown(widgetCategory);
        }
    }

    private void moveWidgetCategoryRowFirst(WidgetCategory widgetCategory) throws Exception {

        String parentId = widgetCategory.getParent().getObjectId();

        String jpql = "update WidgetCategory o  set o.orderNo=1 where o.objectId='" + widgetCategory.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update WidgetCategory o set o.orderNo=o.orderNo+1 where o.objectId<>'" + widgetCategory.getObjectId() + "'" + " and o.orderNo<" + widgetCategory.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    private void moveWidgetCategoryRowLast(WidgetCategory widgetCategory) throws Exception {


        String parentId = widgetCategory.getParent().getObjectId();
        String jpql = "select max(o.orderNo) from WidgetCategory o where 1=1";

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        Integer maxOrderNo = entityDao.getObject(jpql);

        jpql = "update WidgetCategory o set o.orderNo=" + maxOrderNo + " where o.objectId='" + widgetCategory.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        jpql = "update WidgetCategory o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + widgetCategory.getObjectId() + "'"
                + " and o.orderNo>" + widgetCategory.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    private void moveWidgetCategoryRowUp(WidgetCategory widgetCategory) throws Exception {

        String parentId = widgetCategory.getParent().getObjectId();

        String jpql = "select o from WidgetCategory o where o.orderNo<" + widgetCategory.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";
        }
        jpql += " order by o.orderNo desc";

        WidgetCategory previousWidgetCategory = entityDao.getObject(jpql);
        jpql = "update WidgetCategory o set o.orderNo=" + previousWidgetCategory.getOrderNo() + " where o.objectId='" + widgetCategory.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update WidgetCategory o set o.orderNo=o.orderNo+1"
                + " where o.objectId<>'" + widgetCategory.getObjectId() + "'"
                + " and o.orderNo<" + widgetCategory.getOrderNo()
                + " and o.orderNo>=" + previousWidgetCategory.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    private void moveWidgetCategoryRowDown(WidgetCategory widgetCategory) throws Exception {

        String parentId = widgetCategory.getParent().getObjectId();

        String jpql = "select o from WidgetCategory o where o.orderNo>" + widgetCategory.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        jpql += " order by o.orderNo";

        WidgetCategory nextWidgetCategory = entityDao.getObject(jpql);

        jpql = "update WidgetCategory o set o.orderNo=" + nextWidgetCategory.getOrderNo() + " where o.objectId='" + widgetCategory.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update WidgetCategory o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + widgetCategory.getObjectId() + "'"
                + " and o.orderNo<=" + nextWidgetCategory.getOrderNo()
                + " and o.orderNo>" + widgetCategory.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);


    }


    public List<Widget> listByWidgetCatagoryId(String parentId) throws Exception {

        String jpql = "select o from " + Widget.class.getName() + " o where o.widgetCategory.objectId = ? and o.objectStatus =1 order by orderNo";
        return entityDao.listByJpql(jpql, parentId);
    }

    public Widget getWidgetByObjectId(String widgetId) throws Exception {

        Widget widget = entityDao.getObject(Widget.class, widgetId);
        WidgetInfo widgetInfo = entityDao.getByPropertyValue(WidgetInfo.class, "widget.objectId", widgetId);
        widget.setDescription(widgetInfo.getDescription());
        return widget;
    }

    public Widget getWidgetByTag(String widgetTag) throws Exception {

        Widget widget = entityDao.getByPropertyValue(Widget.class, "widgetTag", widgetTag);
        return widget;
    }

    public void updateWidget(Widget widget) throws Exception {

        Widget oldWidget = entityDao.getObject(Widget.class, widget.getObjectId());
        if (oldWidget != null) {
            widget.setCreateTime(oldWidget.getCreateTime());
            widget.setObjectVersion(1);
            widget.setObjectStatus(1);
            widget.setOrderNo(oldWidget.getOrderNo());
        }

        widget.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.save(widget);

        WidgetInfo oldWidgetInfo = entityDao.getByPropertyValue(WidgetInfo.class, "widget.objectId", widget.getObjectId());
        if (oldWidgetInfo != null) {
            oldWidgetInfo.setDescription(widget.getDescription());
            entityDao.save(oldWidgetInfo);
        }
    }

    public void saveWidget(Widget widget) throws Exception {

        widget.setObjectId(StringUtil.getUuid());
        widget.setCreateTime(DateUtil.getCurrentTime());
        widget.setLastUpdateTime(DateUtil.getCurrentTime());
        widget.setObjectVersion(1);
        widget.setObjectStatus(1);
        widget.setOrderNo(getNextOrderNo(widget));

        entityDao.save(widget);

        WidgetInfo widgetInfo = new WidgetInfo();
        widgetInfo.setObjectId(StringUtil.getUuid());
        widgetInfo.setWidget(widget);
        widgetInfo.setDescription(widget.getDescription());
        entityDao.save(widgetInfo);
    }

    public void deleteWidget(String widgetId) throws Exception {

        entityDao.logicDelete(Widget.class, widgetId);
        WidgetInfo widgetInfo = entityDao.getByPropertyValue(WidgetInfo.class, "widget.objectId", widgetId);
        entityDao.delete(widgetInfo);
    }

    public void moveWidgetRow(String widgetId, final EntityRowMoveType moveType) throws Exception {

        Widget widget = entityDao.getObject(Widget.class, widgetId);
        if (moveType == EntityRowMoveType.First) {
            moveWidgetRowFirst(widget);
        } else if (moveType == EntityRowMoveType.Last) {
            moveWidgetRowLast(widget);
        } else if (moveType == EntityRowMoveType.Up) {
            moveWidgetRowUp(widget);
        } else if (moveType == EntityRowMoveType.Down) {
            moveWidgetRowDown(widget);
        }
    }

    private void moveWidgetRowFirst(Widget widget) throws Exception {

        String widgetCategoryId = widget.getWidgetCategory().getObjectId();

        String jpql = "update Widget o  set o.orderNo=1 where o.objectId='" + widget.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update Widget o set o.orderNo=o.orderNo+1 where o.objectId<>'" + widget.getObjectId() + "'" + " and o.orderNo<" + widget.getOrderNo()
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "'";
        entityDao.executeJpql(jpql);

    }

    private void moveWidgetRowLast(Widget widget) throws Exception {


        String widgetCategoryId = widget.getWidgetCategory().getObjectId();
        String jpql = "select max(o.orderNo) from Widget o where 1=1"
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "'";

        Integer maxOrderNo = entityDao.getObject(jpql);

        jpql = "update Widget o set o.orderNo=" + maxOrderNo + " where o.objectId='" + widget.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        jpql = "update Widget o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + widget.getObjectId() + "'"
                + " and o.orderNo>" + widget.getOrderNo()
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "'";

        entityDao.executeJpql(jpql);

    }

    private void moveWidgetRowUp(Widget widget) throws Exception {

        String widgetCategoryId = widget.getWidgetCategory().getObjectId();

        String jpql = "select o from Widget o where o.orderNo<" + widget.getOrderNo()
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "'order by o.orderNo desc";

        Widget previousWidget = entityDao.getObject(jpql);
        jpql = "update Widget o set o.orderNo=" + previousWidget.getOrderNo() + " where o.objectId='" + widget.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update Widget o set o.orderNo=o.orderNo+1"
                + " where o.objectId<>'" + widget.getObjectId() + "'"
                + " and o.orderNo<" + widget.getOrderNo()
                + " and o.orderNo>=" + previousWidget.getOrderNo()
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "'";
        entityDao.executeJpql(jpql);

    }

    private void moveWidgetRowDown(Widget widget) throws Exception {

        String widgetCategoryId = widget.getWidgetCategory().getObjectId();

        String jpql = "select o from Widget o where o.orderNo>" + widget.getOrderNo()
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "' order by o.orderNo";

        Widget nextWidget = entityDao.getObject(jpql);

        jpql = "update Widget o set o.orderNo=" + nextWidget.getOrderNo() + " where o.objectId='" + widget.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update Widget o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + widget.getObjectId() + "'"
                + " and o.orderNo<=" + nextWidget.getOrderNo()
                + " and o.orderNo>" + widget.getOrderNo()
                + " and o.widgetCategory.objectId='" + widgetCategoryId + "'";

        entityDao.executeJpql(jpql);
    }


    //================================私有方法=================================

    private Integer getNextOrderNo(WidgetCategory widgetCategory) throws Exception {

        Integer nextOrderNo = 1;
        Integer maxOrderNo = null;
        try {
            String parentId = widgetCategory.getParent().getObjectId();
            String sql = "select max(o.orderNo) from WidgetCategory o where  o.parent.objectId='" + parentId + "'";
            maxOrderNo = entityDao.getObject(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }
        return nextOrderNo;
    }

    private Integer getNextOrderNo(Widget widget) {

        Integer nextOrderNo = 1;
        String sql = "select max(o.orderNo) from Widget o";
        List<Integer> list = entityDao.listByJpql(sql);
        Integer maxOrderNo = list.get(0);

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }

        return nextOrderNo;
    }

    public List<WidgetCategory> getAllValidWidget() throws Exception {

        WidgetCategory root = getRootEntity();
        List<WidgetCategory> categoryList = root.getChildList();
        for (WidgetCategory widgetCategory : categoryList) {
            widgetCategory.setWidgetList(new ArrayList<Widget>());
            List<Widget> widgetList = listByWidgetCatagoryId(widgetCategory.getObjectId());
            for (Widget widget : widgetList) {
                if (widget.getStatus() == 1) {
                    widgetCategory.getWidgetList().add(widget);
                }
            }
        }
        return categoryList;
    }

    //================================属性方法=================================

    public EntityDao getEntityDao() {

        return entityDao;
    }

    public void setEntityDao(EntityDao entityDao) {

        this.entityDao = entityDao;
    }
}
