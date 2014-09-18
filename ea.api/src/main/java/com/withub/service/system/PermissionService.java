package com.withub.service.system;

import com.withub.model.system.po.Menu;
import com.withub.model.system.po.Role;
import com.withub.model.system.po.RoleMenu;
import com.withub.model.system.po.User;

import java.util.List;

public interface PermissionService {

    public void saveRole(Role role) throws Exception;

    public void deleteRole(Role role) throws Exception;

    public void assginRoleMenu(Role role, List<Menu> menusList) throws Exception;

    public List<Menu> listUserMenuByParentMenuId(final User user, final String parentMenuId) throws Exception;


    List<RoleMenu> findByRole(String roleId);

    List<RoleMenu> listRootMenuByRole(String roleId);

    List<RoleMenu> listLeafMenuByRoleAndParentMenu(String roleId, String parentId);

    void updateRoleMenu(RoleMenu roleMenu);


    void deleteRoleMenu(String id);

    void deleteRoleMenuByRole(String roleId);

    void saveRolePermission(String roleId, Integer permission, String[] menuIdArray);
}
