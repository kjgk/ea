package com.withub.web.controller.system;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.model.system.po.Menu;
import com.withub.service.ea.BigScreenScrollPageService;
import com.withub.service.ea.DataPointGroupService;
import com.withub.service.ea.WidgetService;
import com.withub.service.system.MenuService;
import com.withub.web.common.ext.StaticCheckedTreeNode;
import com.withub.web.common.ext.TreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/system")
public class MenuController {

    //============================== 属性声明 =============================================================

    @Autowired
    private MenuService menuService;

    @Autowired
    private WidgetService widgetService;

    @Autowired
    private DataPointGroupService dataPointGroupService;

    @Autowired
    private BigScreenScrollPageService bigScreenScrollPageService;

    //============================== Controller 方法 ======================================================

    @RequestMapping(value = "/menu/loadManagerTree", method = RequestMethod.GET)
    public void loadManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes, @RequestParam(value = "menuType", required = false) Integer menuType) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            Menu root = menuService.getRootEntity();
            TreeNode node = new TreeNode();
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setLeaf(false);
            node.setType(Menu.class.getSimpleName());
            node.setExpanded(true);
            node.getAttributes().put("url", root.getUrl());
            nodes.add(node);
            return;
        }

        String id = nodeId.split("_")[1];
        Menu menu = menuService.getMenuByObjectId(id);
        if (CollectionUtil.isEmpty(menu.getChildList())) {
            return;
        }

        for (Menu child : (menu.getChildList())) {
            if (child.getMenuType().equals(menuType)) {
                TreeNode node = new TreeNode();
                node.setObjectId(child.getObjectId());
                node.setText(child.getName());
                node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
                node.setType(Menu.class.getSimpleName());
                node.setOrderNo(child.getOrderNo());
                node.getAttributes().put("url", menu.getUrl());
                nodes.add(node);
            }
        }


    }

    @RequestMapping(value = "/menu/loadTree", method = RequestMethod.GET)
    public void loadTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes,
                         @RequestParam(value = "check", required = false) Boolean check,
                         @RequestParam(value = "menuType", required = false) Integer menuType,
                         @RequestParam(value = "pageType", required = false) String pageType) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            Menu root = menuService.getRootEntity();
            TreeNode node = new TreeNode();
            if (check != null && check) {
                node = new StaticCheckedTreeNode();
            }
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setLeaf(false);
            node.setExpanded(true);
            nodes.add(node);
        } else {
            Menu menu = menuService.getMenuByObjectId(nodeId);
            if (CollectionUtil.isEmpty(menu.getChildList())) {
                return;
            }
            for (Menu child : (menu.getChildList())) {
                if ((StringUtil.isEmpty(pageType) && child.getMenuType().equals(menuType)) || (StringUtil.isNotEmpty(pageType) && child.getMenuType().equals(menuType) && StringUtil.compareValue(child.getUrl(), pageType))) {
                    TreeNode node = new TreeNode();
                    if (check != null && check) {
                        node = new StaticCheckedTreeNode();
                    }
                    node.setObjectId(child.getObjectId());
                    node.setText(child.getName());
                    node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
                    node.getAttributes().put("page", child.getUrl());
                    node.getAttributes().put("openMode", 1);
                    nodes.add(node);
                }
            }
        }
    }

    @RequestMapping(value = "/menu/loadTreePath", method = RequestMethod.GET)
    public void loadTreePath(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "node") ArrayList<String> nodes) throws Exception {

        Menu menu = menuService.getMenuByObjectId(nodeId);
        if (menu.getParent() == null) {
            return;
        } else {
            nodes.add(menu.getParent().getObjectId());
            loadTreePath(menu.getParent().getObjectId(), nodes);
        }
    }

    @RequestMapping(value = "/menu/create", method = RequestMethod.POST)
    public void createMenu(ModelMap modelMap, Menu menu) throws Exception {

        menuService.saveMenu(menu);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/menu/update", method = RequestMethod.POST)
    public void updateMenu(ModelMap modelMap, Menu menu) throws Exception {

        menuService.updateMenu(menu);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/menu/load/{objectId}", method = RequestMethod.GET)
    public void loadMenu(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        Menu menu = menuService.getMenuByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", menu.getObjectId());
        model.put("name", menu.getName());
        model.put("url", menu.getUrl());
        model.put("menuStyle", menu.getMenuStyle());
        model.put("image", menu.getImage());
        model.put("expand", menu.getExpand());
        model.put("orderNo", menu.getOrderNo());
        model.put("menuType", menu.getMenuType());
        model.put("openMode", menu.getOpenMode());
        model.put("visible", menu.getVisible());
        model.put("parent.objectId", menu.getParent().getObjectId());

        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/menu/delete/{objectId}", method = RequestMethod.GET)
    public void deleteMenu(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        menuService.deleteMenu(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/menu/query", method = RequestMethod.GET)
    public void listByParentId(@RequestParam("id") String id, @ModelAttribute("items") ArrayList<HashMap> items) throws Exception {

        List<Menu> menuList;
        if (StringUtil.isEmpty(id)) {
            List list = menuService.listByParentId(null);
            menuList = (List<Menu>) list;
        } else {
            Menu menu = menuService.getMenuByObjectId(id);
            menuList = menu.getChildList();
        }
        if (CollectionUtil.isEmpty(menuList)) {
            return;
        }

        for (Menu menu : menuList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", menu.getObjectId());
            item.put("name", menu.getName());
            item.put("url", menu.getUrl());
            items.add(item);
        }
    }

    @RequestMapping(value = "/menu/orderEntity", method = RequestMethod.POST)
    public void orderEntity(@RequestParam(value = "move", required = false) EntityRowMoveType entityRowMoveType,
                            @RequestParam("objectId") String objectId, @RequestParam("entity") String entity, ModelMap modelMap) throws Exception {

        if (entity.equals("Menu")) {
            menuService.moveEntityRow(objectId, entityRowMoveType);
        } else if (entity.equals("WidgetCategory")) {
            widgetService.moveWidgetCategoryRow(objectId, entityRowMoveType);
        } else if (entity.equals("Widget")) {
            widgetService.moveWidgetRow(objectId, entityRowMoveType);
        } else if (entity.equals("DataPointGroup")) {
            dataPointGroupService.moveDataPointGroupRow(objectId, entityRowMoveType);
        } else if (entity.equals("DataPointGroupCategory")) {
            dataPointGroupService.moveDataPointGroupCategoryRow(objectId, entityRowMoveType);
        } else if (entity.equals("BigScreenScrollPage")) {
            bigScreenScrollPageService.moveBigScreenScrollPageRow(objectId, entityRowMoveType);
        }
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/menu/resetMenuOrderNo", method = RequestMethod.POST)
    public void resetEntityOrderNo(ModelMap modelMap) throws Exception {

        menuService.resetMenuOrderNo(null);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/menu/getPermissionMenuList", method = RequestMethod.GET)
    public void getPermissionMenuList(ModelMap modelMap) throws Exception {

        List items = new ArrayList();
        List<Menu> list = menuService.getPermissionMenuList();
        for (Menu menu : list) {
            if (menu.getParent() == null || menu.getParent().getObjectStatus().intValue() == 0) {
                continue;
            }
            Map item = new HashMap();
            item.put("id", menu.getObjectId());
            item.put("pId", menu.getParent().getParent() == null ? "0" : menu.getParent().getObjectId());
            item.put("name", menu.getName());
            item.put("open", true);
            items.add(item);
        }
        modelMap.put("items", items);
    }

    @RequestMapping(value = "/menu/setHomePage/{objectId}", method = RequestMethod.GET)
    public void setHomePage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        menuService.setHomePage(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/loadHomePage", method = RequestMethod.GET)
    public void loadHomePage(ModelMap modelMap, String pageType) throws Exception {

        String homePageId = menuService.getHomePageId(pageType);
        modelMap.put("homePageId", homePageId);
        Menu menu = menuService.getMenuByObjectId(homePageId);
        if (menu != null) {
            Map attributes = new HashMap();
            if (menu.getPage() != null) {
                attributes.put("page", "withub.ext.ea.page.PageDisplay?pageId=" + menu.getPage().getObjectId());
                attributes.put("openMode", menu.getOpenMode());
            }
            modelMap.put("homeText", menu.getName());
            modelMap.put("homeAttributes", attributes);
        }
    }
}
