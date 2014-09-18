package com.withub.web.controller.system;


import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.ea.UserLog;
import com.withub.model.system.po.User;
import com.withub.service.ea.UserLogService;
import com.withub.service.system.UserService;
import com.withub.util.SpringSecurityUtil;
import com.withub.web.common.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping(value = "/system/user")
public class UserController extends BaseController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserLogService userLogService;


    //============================ Controller 方法 =======================================================

    @RequestMapping(value = "/load/{objectId}", method = RequestMethod.GET)
    public void loadUser(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        User user = userService.getUserById(objectId);
        Map data = new HashMap();
        data.put("objectId", user.getObjectId());
        data.put("name", user.getName());
        data.put("mobile", user.getMobile());
        data.put("phone", user.getPhone());
        data.put("password", "password");
        data.put("confirmPassword", "password");
        data.put("sex", user.getSex());
        if (user.getRole() != null) {
            data.put("role.objectId", user.getRole().getObjectId());
        }
        data.put("account", user.getAccount());

        modelMap.put("data", data);
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void createUser(ModelMap modelMap, User user) throws Exception {

        userService.createUser(user);
    }

    @RequestMapping(value = "/update/account", method = RequestMethod.POST)
    public void updateAccount(ModelMap modelMap, User user) throws Exception {

        userService.updateAccount(user);
    }

    @RequestMapping(value = "/update/password", method = RequestMethod.POST)
    public void updatePassword(ModelMap modelMap, User user) throws Exception {

        userService.updatePassword(user);
    }

    @RequestMapping(value = "/change/password", method = RequestMethod.POST)
    public void changePassword(ModelMap modelMap, String objectId, String oldPassword, String newPassword) throws Exception {

        userService.changePassword(objectId, oldPassword, newPassword);
    }

    @RequestMapping(value = "/delete/{objectId}", method = RequestMethod.GET)
    public void deleteUser(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        userService.deleteUser(objectId);
    }

    @RequestMapping(value = "/checkAccountExists", method = RequestMethod.GET)
    public void checkPropertyValueExists(@RequestParam("value") String propertyValue, ModelMap modelMap) throws Exception {

        boolean exists = userService.checkAccountExists(propertyValue);
        modelMap.put("data", exists);
    }

    @RequestMapping(value = "/listUserLog", method = RequestMethod.GET)
    public void listUserLog(ModelMap modelMap, String userId, Integer limit) throws Exception {

        if (StringUtil.isEmpty(userId)) {
            userId = SpringSecurityUtil.getUserId();
        }
        if (limit == null) {
            limit = 10;
        }
        List<UserLog> list = userLogService.listUserLog(userId, limit);
        List items = new ArrayList();
        for (UserLog userLog : list) {
            Map item = new HashMap();
            item.put("logType", userLog.getLogType());
            item.put("description", userLog.getDescription());
            item.put("logTime", DateUtil.getStandardSecondString(userLog.getLogTime()));
            items.add(item);
        }
        modelMap.put("items", items);
    }
}
