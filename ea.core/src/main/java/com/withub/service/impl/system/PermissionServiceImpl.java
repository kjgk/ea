package com.withub.service.impl.system;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.system.po.Menu;
import com.withub.model.system.po.Role;
import com.withub.model.system.po.RoleMenu;
import com.withub.model.system.po.User;
import com.withub.service.system.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("permissionService")
@Transactional
public class PermissionServiceImpl implements PermissionService {

    //========================== 属性声明 =========================================================

    @Autowired
    private EntityDao entityDao;

    //========================== 接口实现 =========================================================

    public void saveRole(Role role) throws Exception {

        entityDao.save(role);
    }

    public void deleteRole(Role role) throws Exception {

        String jpql = "delete from " + RoleMenu.class.getName() + " o where o.role.objectId=?";
        entityDao.executeJpql(jpql, role.getObjectId());

        entityDao.logicDelete(role);
    }

    public void assginRoleMenu(Role role, List<Menu> menusList) throws Exception {

        String jpql = "delete from " + RoleMenu.class.getName() + " o where o.role.objectId=?";
        entityDao.executeJpql(jpql, role.getObjectId());

        if (CollectionUtil.isNotEmpty(menusList)) {
            for (Menu menu : menusList) {
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setObjectId(StringUtil.getUuid());
                roleMenu.setMenu(menu);
                roleMenu.setRole(role);
                entityDao.save(roleMenu);
            }
        }

    }

    public List<Menu> listUserMenuByParentMenuId(User user, String parentMenuId) throws Exception {

        String jpql;

        String administrator = "E77AF63E-CE65-4C91-8045-F8EB4F02EEB8";
        if (user.getObjectId().equals(administrator)) {
            if (StringUtil.isEmpty(parentMenuId)) {
                jpql = "select o from " + Menu.class.getName() + " o where o.parent is null";
                Menu menu = entityDao.getObject(jpql);
                return menu.getChildList();
            } else {
                Menu menu = entityDao.getObject(Menu.class, parentMenuId);
                return menu.getChildList();
            }
        }

        List<RoleMenu> roleMenuList;
        jpql = "select o from " + RoleMenu.class.getName() + " o where o.role.objectId = ?";
        if (StringUtil.isEmpty(parentMenuId)) {
            jpql += " and o.menu.parent.parent.objectId is null order by o.menu.orderNo";
            roleMenuList = entityDao.listByJpql(jpql, user.getRole().getObjectId());
        } else {
            jpql += " and o.menu.parent.objectId = ? order by o.menu.orderNo";
            roleMenuList = entityDao.listByJpql(jpql, user.getRole().getObjectId(), parentMenuId);
        }

        List<Menu> menuList = new ArrayList<Menu>();
        for (RoleMenu roleMenu : roleMenuList) {
            if (roleMenu.getMenu().getObjectStatus().intValue() == 1) {
                menuList.add(roleMenu.getMenu());
            }
        }

        return menuList;
    }

    public List<RoleMenu> findByRole(String roleId) {

        String jpql = "select o from " + RoleMenu.class.getName() + " o where o.role.objectId = ? and o.menu.objectStatus=1 order by o.menu.orderNo asc";
        List<RoleMenu> roleMenuList = entityDao.listByJpql(jpql, roleId);
        return roleMenuList;
    }


    public List<RoleMenu> listRootMenuByRole(String roleId) {

        String jpql = "select o from " + RoleMenu.class.getName() + " o where o.role.objectId = ? and o.menu.parent.objectId is null " +
                " and o.menu.parent is not null order by o.menu.orderNo asc";
        return entityDao.listByJpql(jpql, roleId);
    }


    public List<RoleMenu> listLeafMenuByRoleAndParentMenu(String roleId, String parentId) {

        String jpql = "select o from " + RoleMenu.class.getName() + " o where o.role.objectId = ? and o.menu.parent.objectId = ? order by o.menu.orderNo asc";
        return entityDao.listByJpql(jpql, roleId, parentId);
    }


    public void updateRoleMenu(RoleMenu roleMenu) {

        entityDao.update(roleMenu);
    }


    public void saveRoleMenu(RoleMenu roleMenu) {

        entityDao.save(roleMenu);
    }


    public void deleteRoleMenu(String id) {

        entityDao.delete(RoleMenu.class, id);
    }


    public void deleteRoleMenuByRole(String roleId) {

        String jpql = "from " + RoleMenu.class.getName() + " where 1=1 and role.objectId=?";
        List<RoleMenu> roleMenuList = entityDao.listByJpql(jpql, roleId);
        if (CollectionUtil.isNotEmpty(roleMenuList)) {
            for (RoleMenu roleMenu : roleMenuList) {
                entityDao.delete(roleMenu);
            }
        }
    }


    @Override
    public void saveRolePermission(String roleId, Integer permission, String[] menuIdArray) {

        Role role = entityDao.getObject(Role.class, roleId);
        role.setPermission(permission);
        entityDao.save(role);

        deleteRoleMenuByRole(roleId);
        if (CollectionUtil.isNotEmpty(menuIdArray)) {
            for (String menuId : menuIdArray) {
                Menu menu = entityDao.getObject(Menu.class, menuId);
                RoleMenu roleMenu = new RoleMenu();
                roleMenu.setObjectId(StringUtil.getUuid());
                roleMenu.setMenu(menu);
                roleMenu.setRole(role);
                entityDao.save(roleMenu);
            }
        }
    }


    public EntityDao getEntityDao() {

        return entityDao;
    }

    public void setEntityDao(EntityDao entityDao) {

        this.entityDao = entityDao;
    }
}
