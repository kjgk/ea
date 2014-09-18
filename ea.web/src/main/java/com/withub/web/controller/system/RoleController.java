package com.withub.web.controller.system;

import com.withub.common.util.StringUtil;
import com.withub.model.system.po.Role;
import com.withub.service.system.MenuService;
import com.withub.service.system.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/system/role")
public class RoleController {

    //============================ 属性声明 ==============================================================

    @Autowired
    private RoleService roleService;

    @Autowired
    private MenuService menuService;


    //============================ Controller 方法 =======================================================
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void saveRole(ModelMap modelMap, Role role) throws Exception {

        roleService.saveRole(role);
    }

    @RequestMapping(value = "/load/{objectId}", method = RequestMethod.GET)
    public void loadRole(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        Role role = roleService.getRoleById(objectId);
        Map data = new HashMap();
        data.put("objectId", role.getObjectId());
        data.put("name", role.getName());
        data.put("description", role.getDescription());

        modelMap.put("data", data);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createRole(ModelMap modelMap, Role role) throws Exception {

        role.setObjectId(StringUtil.getUuid());
        roleService.saveRole(role);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updateRole(ModelMap modelMap, Role role) throws Exception {

        roleService.updateRole(role);
    }

    @RequestMapping(value = "/delete/{objectId}", method = RequestMethod.GET)
    public void deleteRole(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        roleService.deleteRole(objectId);
    }

    @RequestMapping(value = "/query", method = RequestMethod.GET)
    public void findAll(HttpServletRequest request, ModelMap modelMap) throws Exception {

        List<Role> list = roleService.findAll();

        if (org.apache.commons.collections.CollectionUtils.isEmpty(list)) {
            return;
        }

        List items = new ArrayList();
        for (Role role : list) {
            HashMap item = new HashMap();
            item.put("objectId", role.getObjectId());
            item.put("name", role.getName());
            items.add(item);
        }
        modelMap.put("items", items);

    }

    @RequestMapping(value = "/listRoleUser", method = RequestMethod.GET)
    public void listRoleUser(ModelMap modelMap, String objectId) throws Exception {

        modelMap.put("items", roleService.listRoleUser(objectId));
    }

}
