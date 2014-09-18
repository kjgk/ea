package com.withub.web.controller.system;

import com.withub.common.util.StringUtil;
import com.withub.model.system.po.Role;
import com.withub.model.system.po.RoleMenu;
import com.withub.service.system.PermissionService;
import com.withub.service.system.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(value = "/system/roleMenu")
public class RoleMenuController {

    //============================ 属性声明 ==============================================================
    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionService permissionService;

    //============================ Controller 方法 =======================================================
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void save(ModelMap modelMap, @RequestParam(value = "roleId") String roleId
            , @RequestParam(value = "permission") Integer permission, @RequestParam(value = "menuIds") String menuIds) {

        String[] menuIdArray = new String[0];
        if (StringUtil.isNotEmpty(menuIds)) {
            menuIdArray = StringUtil.split(menuIds, ",", false);
        }
        permissionService.saveRolePermission(roleId, permission, menuIdArray);

    }

    @RequestMapping(value = "/load", method = RequestMethod.GET)
    public void load(ModelMap modelMap, @RequestParam(value = "roleId") String roleId) throws Exception {

        Role role = roleService.getRoleById(roleId);
        List list = permissionService.findByRole(roleId);
        List nodeIdList = new ArrayList();
        for (RoleMenu roleMenu : (List<RoleMenu>) list) {
            nodeIdList.add(roleMenu.getMenu().getObjectId());
        }

        modelMap.put("role", role);
        modelMap.put("nodeIdList", nodeIdList);
    }
}
