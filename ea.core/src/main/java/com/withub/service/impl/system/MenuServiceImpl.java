package com.withub.service.impl.system;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.model.system.po.Menu;
import com.withub.service.system.MenuService;
import com.withub.service.system.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("menuService")
@Transactional
public class MenuServiceImpl implements MenuService {

    //========================== 属性声明 =========================================================

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private PermissionService permissionService;

    //========================== 接口实现 =========================================================

    public Menu getRootEntity() throws Exception {

        String jpql = "select o from " + Menu.class.getName() + " o where o.parent is null";
        return entityDao.getObject(jpql);
    }

    public Integer getNextOrderNo(Menu menu) throws Exception {

        Integer nextOrderNo = 1;
        Integer maxOrderNo = null;
        try {
            String parentId = menu.getParent().getObjectId();
            String sql = "select max(o.orderNo) from Menu o where  o.parent.objectId='" + parentId + "'";
            maxOrderNo = entityDao.getObject(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (maxOrderNo != null) {
            nextOrderNo = maxOrderNo + 1;
        }
        return nextOrderNo;
    }

    public void moveEntityRow(String menuId, final EntityRowMoveType moveType) throws Exception {

        Menu menu = entityDao.getObject(Menu.class, menuId);


        if (moveType == EntityRowMoveType.First) {
            moveEntityRowFirst(menu);
        } else if (moveType == EntityRowMoveType.Last) {
            moveEntityRowLast(menu);
        } else if (moveType == EntityRowMoveType.Up) {
            moveEntityRowUp(menu);
        } else if (moveType == EntityRowMoveType.Down) {
            moveEntityRowDown(menu);
        }
    }

    public void moveEntityRowFirst(Menu menu) throws Exception {

        String parentId = menu.getParent().getObjectId();

        String jpql = "update Menu o  set o.orderNo=1 where o.objectId='" + menu.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        jpql = "update Menu o set o.orderNo=o.orderNo+1 where o.objectId<>'" + menu.getObjectId() + "'" + " and o.orderNo<" + menu.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    public void moveEntityRowLast(Menu menu) throws Exception {


        String parentId = menu.getParent().getObjectId();

        String jpql = "select max(o.orderNo) from Menu o where 1=1";

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }

        Integer maxOrderNo = entityDao.getObject(jpql);

        jpql = "update Menu o set o.orderNo=" + maxOrderNo + " where o.objectId='" + menu.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        jpql = "update Menu o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + menu.getObjectId() + "'"
                + " and o.orderNo>" + menu.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }

        entityDao.executeJpql(jpql);

    }

    public void moveEntityRowUp(Menu menu) throws Exception {

        String parentId = menu.getParent().getObjectId();

        String jpql = "select o from Menu o where o.orderNo<" + menu.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";
        }
        jpql += " order by o.orderNo desc";

        Menu previousMenu = entityDao.getObject(jpql);
        jpql = "update Menu o set o.orderNo=" + previousMenu.getOrderNo() + " where o.objectId='" + menu.getObjectId() + "'";

        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update Menu o set o.orderNo=o.orderNo+1"
                + " where o.objectId<>'" + menu.getObjectId() + "'"
                + " and o.orderNo<" + menu.getOrderNo()
                + " and o.orderNo>=" + previousMenu.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);

    }

    public void moveEntityRowDown(Menu menu) throws Exception {

        String parentId = menu.getParent().getObjectId();

        String jpql = "select o from Menu o where o.orderNo>" + menu.getOrderNo();

        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        jpql += " order by o.orderNo";

        Menu nextMenu = entityDao.getObject(jpql);

        jpql = "update Menu o set o.orderNo=" + nextMenu.getOrderNo() + " where o.objectId='" + menu.getObjectId() + "'";
        entityDao.executeJpql(jpql);

        // 同时调整 ObjectStatus=0 的记录
        jpql = "update Menu o set o.orderNo=o.orderNo-1"
                + " where o.objectId<>'" + menu.getObjectId() + "'"
                + " and o.orderNo<=" + nextMenu.getOrderNo()
                + " and o.orderNo>" + menu.getOrderNo();
        if (StringUtil.isNotEmpty(parentId)) {
            jpql += " and o.parent.objectId='" + parentId + "'";
        } else {
            jpql += " and o.parent.objectId is null";

        }
        entityDao.executeJpql(jpql);


    }

    public List<Menu> listByParentId(String parentId) throws Exception {

        String jpql = "select o from " + Menu.class.getName() + " o where o.parent.objectId = ? and o.menuType =2 and o.childList.size = 0 "
                + " and o.objectStatus=1 order by orderNo";
        return entityDao.listByJpql(jpql, parentId);
    }

    public List<Menu> listByParentIdAndMenuType(String parentId, int menuType) throws Exception {

        String jpql = "select o from " + Menu.class.getName() + " o where o.parent.objectId = ? and o.menuType =?  and o.objectStatus =1 order by orderNo";
        return entityDao.listByJpql(jpql, parentId, menuType);

    }


    public Menu getMenuByObjectId(String menuId) throws Exception {

        return entityDao.getObject(Menu.class, menuId);
    }


    public void updateMenu(Menu menu) throws Exception {

        Menu oldMenu = entityDao.getObject(Menu.class, menu.getObjectId());

        if (oldMenu != null) {
            menu.setCreateTime(oldMenu.getCreateTime());
            menu.setObjectVersion(1);
            menu.setObjectStatus(1);
            menu.setOrderNo(oldMenu.getOrderNo());
        }

        menu.setLastUpdateTime(DateUtil.getCurrentTime());
        entityDao.save(menu);
    }


    public void saveMenu(Menu menu) throws Exception {

        menu.setObjectId(StringUtil.getUuid());
        menu.setCreateTime(DateUtil.getCurrentTime());
        menu.setLastUpdateTime(DateUtil.getCurrentTime());
        menu.setObjectVersion(1);
        menu.setObjectStatus(1);
        menu.setOrderNo(getNextOrderNo(menu));

        entityDao.save(menu);

    }

    public void deleteMenu(String menuId) throws Exception {

        entityDao.logicDelete(Menu.class, menuId);
    }

    public void resetMenuOrderNo(final String parentId) throws Exception {

        String jpql;
        if (StringUtil.isEmpty(parentId)) {
            jpql = "select o from Menu o where o.parent.objectId is null order by o.orderNo";
        } else {
            jpql = "select o from Menu o where o.parent.objectId='" + parentId + "' order by o.orderNo";
        }

        List list = null;
        try {
            list = entityDao.listByJpql(jpql);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (CollectionUtil.isEmpty(list)) {
            return;
        }

        int i = 0;
        for (Menu menu : (List<Menu>) list) {
            String objectId = menu.getObjectId();
            menu.setOrderNo(++i);
            menu.setLastUpdateTime(DateUtil.getCurrentTime());
            entityDao.update(menu);
            resetMenuOrderNo(objectId);
        }
    }

    public List<Menu> getPermissionMenuList() {

        return entityDao.listByJpql("select o from " + Menu.class.getName()
                + " o where 1=1 and o.menuType != ? and o.visible = 1 and o.objectStatus = 1 order by o.orderNo", 0);
    }

    public void setHomePage(String pageId) throws Exception {

        Menu menu = getMenuByObjectId(pageId);
        String pageType = StringUtil.isEmpty(menu.getUrl()) ? "normal" : "BigScreen";
        String sql = "delete from ea_homepage where pagetype = ?";
        entityDao.executeSql(sql, pageType);
        sql = "insert into ea_homepage(pageid,pagetype) values(?,?)";
        entityDao.executeSql(sql, pageId, pageType);
    }

    public String getHomePageId(String pageType) throws Exception {

        if (StringUtil.isEmpty(pageType)) {
            pageType = "normal";
        }
        String pageId = "";
        List list = entityDao.listBySql("select pageid from ea_homepage where pagetype = ?", pageType);
        if (CollectionUtil.isNotEmpty(list)) {
            pageId = list.get(0).toString();
        }
        return pageId;
    }
}
