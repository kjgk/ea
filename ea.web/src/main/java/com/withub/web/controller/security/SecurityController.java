package com.withub.web.controller.security;

import com.withub.common.util.StringUtil;
import com.withub.common.util.SystemUtil;
import com.withub.model.security.LoginInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.model.system.po.Menu;
import com.withub.model.system.po.RoleMenu;
import com.withub.model.system.po.User;
import com.withub.service.system.PermissionService;
import com.withub.util.ConfigUtil;
import com.withub.util.SpringSecurityUtil;
import com.withub.web.common.ext.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/security")
public class SecurityController {

    //============================= 属性声明 =============================================================

    @Autowired
    private PermissionService permissionService;

    //============================= Controller 方法 ======================================================

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String main(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "main";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "home";
    }

    @RequestMapping(value = "/bigScreen", method = RequestMethod.GET)
    public String bigScreen(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "bigScreen";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(HttpServletRequest request, HttpServletResponse response) throws Exception {

        ConfigUtil.getInstance().init();
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        if (!SystemUtil.authorize(systemConfigInfo.getUniqueCode(), systemConfigInfo.getAuthorizationCode(), "")) {
            request.getRequestDispatcher("/authorizationError.jsp").forward(request, response);
            return null;
        }
        return "login";
    }

    @RequestMapping(value = "/admin/login", method = RequestMethod.GET)
    public String adminLogin(HttpServletRequest request, HttpServletResponse response) throws Exception {

        ConfigUtil.getInstance().init();
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        if (!SystemUtil.authorize(systemConfigInfo.getUniqueCode(), systemConfigInfo.getAuthorizationCode(), "")) {
            request.getRequestDispatcher("/authorizationError.jsp").forward(request, response);
            return null;
        }
        return "adminLogin";
    }

    @RequestMapping(value = "/bigScreen/login", method = RequestMethod.GET)
    public String bigScreenLogin(HttpServletRequest request, HttpServletResponse response) throws Exception {

        ConfigUtil.getInstance().init();
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        if (!SystemUtil.authorize(systemConfigInfo.getUniqueCode(), systemConfigInfo.getAuthorizationCode(), "")) {
            request.getRequestDispatcher("/authorizationError.jsp").forward(request, response);
            return null;
        }
        return "bigScreenLogin";
    }


    @RequestMapping(value = "/sessionExpired", method = RequestMethod.GET)
    public String sessionExpired(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "sessionExpired";
    }

    @RequestMapping(value = "/sessionInvalid", method = RequestMethod.GET)
    public String sessionInvalid(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "sessionInvalid";
    }

    @RequestMapping(value = "/sessionAuthenticationError", method = RequestMethod.GET)
    public String sessionAuthenticationError(HttpServletRequest request, HttpServletResponse response) throws Exception {

        return "sessionAuthenticationError";
    }


    @RequestMapping(value = "/loadMenu", method = RequestMethod.GET)
    public void loadMenu(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {


        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            LoginInfo loginInfo = (LoginInfo) SecurityContextHolder.getContext().getAuthentication().getDetails();
            List<Menu> menuList = permissionService.listUserMenuByParentMenuId(SpringSecurityUtil.getCurrentUser(), null);
            for (Menu menu : menuList) {
                if (StringUtil.compareValue(menu.getUrl(), "BigScreen")) {
                    continue;
                }
                if (StringUtil.compareValue(loginInfo.getLoginType(), "Admin")) {
                    if (menu.getMenuType() != 0) {
                        continue;
                    }
                } else {
                    if (menu.getMenuType() == 0) {
                        continue;
                    }
                }
                TreeNode node = new TreeNode();
                node.setId(menu.getObjectId());
                node.setText(menu.getName());
                node.setIconCls(menu.getImage());
                node.setExpanded(menu.getExpand() == 1);
                node.setLeaf(false);
                node.setCls("menu-blue menu-bold");
                nodes.add(node);
            }
        } else {
            List<Menu> menuList = permissionService.listUserMenuByParentMenuId(SpringSecurityUtil.getCurrentUser(), nodeId);
            for (Menu menu : menuList) {
                if (StringUtil.compareValue(menu.getUrl(), "BigScreen")) {
                    continue;
                }
                TreeNode node = new TreeNode();
                node.setId(menu.getObjectId());
                node.setText(menu.getName());
                node.setIconCls(menu.getImage());
                //node.setExpanded(false);
                node.setExpanded(menu.getExpand() == 1);
                node.setCls("menu-blue");
                node.setLeaf(menu.getChildList().size() == 0);
                if (StringUtil.isNotEmpty(menu.getUrl())) {
                    node.getAttributes().put("url", menu.getUrl());
                    node.getAttributes().put("page", menu.getUrl().split("[?]")[0]);
                    node.getAttributes().put("pageParams", bindUrlArgs(menu.getUrl()));
                    node.getAttributes().put("openMode", menu.getOpenMode());
                }
                if (menu.getMenuType() == 2 && menu.getPage() != null) {
                    node.getAttributes().put("page", "withub.ext.ea.page.PageDisplay?pageId=" + menu.getPage().getObjectId());
                    node.getAttributes().put("openMode", menu.getOpenMode());
                }
                nodes.add(node);
            }
        }
    }

    @RequestMapping(value = "/getCurrentUserInfo", method = RequestMethod.GET)
    public void getCurrentUserInfo(HttpSession session, ModelMap modelMap) throws Exception {

        User currentUser = SpringSecurityUtil.getCurrentUser();
        if (currentUser != null) {
            Map<String, Object> userInfo = new HashMap<String, Object>();
            userInfo.put("objectId", currentUser.getObjectId());
            userInfo.put("name", currentUser.getName());
            userInfo.put("account", currentUser.getAccount());
            userInfo.put("role", currentUser.getRole());
            modelMap.put("userInfo", userInfo);
        } else {
            modelMap.put("userInfo", null);
        }

    }

    private Map bindUrlArgs(String url) {

        Map map = new HashMap();
        if (url.indexOf("?") == -1) {
            return map;
        }
        try {
            String argStr = url.split("[?]")[1];
            for (String arg : argStr.split("&")) {
                String key = arg.substring(0, arg.indexOf("="));
                String value = arg.replaceAll(key + "=", "");
                map.put(key, value);
            }
        } catch (Exception e) {
            return map;
        }
        return map;
    }

    public void addNode(List nodes, Map node, String userName, List<RoleMenu> list) {

        if (StringUtil.compareValue(userName, "admin")) {
            nodes.add(node);
        } else {
            for (RoleMenu roleMenu : list) {
                if (StringUtil.compareValue(roleMenu.getMenu().getObjectId(), node.get("id").toString())) {
                    nodes.add(node);
                    break;
                }
            }
        }

    }

}
