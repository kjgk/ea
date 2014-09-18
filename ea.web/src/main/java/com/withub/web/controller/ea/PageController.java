package com.withub.web.controller.ea;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.Page;
import com.withub.model.ea.PageWidget;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.model.system.po.Menu;
import com.withub.service.ea.PageService;
import com.withub.service.system.MenuService;
import com.withub.util.ConfigUtil;
import com.withub.web.common.ext.TreeNode;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea/page")
public class PageController {

    //============================ 属性声明 ==============================================================

    @Autowired
    private PageService pageService;

    @Autowired
    private MenuService menuService;

    //============================ Controller 方法 =======================================================

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void savePage(ModelMap modelMap, Page page, @RequestParam(value = "menu.objectId", required = false) String menuId) {

        pageService.savePage(page, menuId);
    }

    @RequestMapping(value = "/load", method = RequestMethod.GET)
    public void loadPage(ModelMap modelMap, @RequestParam(value = "objectId", required = false) String objectId
            , @RequestParam(value = "menuId", required = false) String menuId) {


        Page page = null;
        if (StringUtil.isNotEmpty(objectId)) {
            page = pageService.getPageById(objectId);
        } else if (StringUtil.isNotEmpty(menuId)) {
            page = pageService.getPageByMenu(menuId);
        }
        if (page == null) {
            return;
        }
        Map data = new HashMap();
        List items = new ArrayList();
        data.put("objectId", page.getObjectId());
        data.put("status", page.getStatus());
        data.put("width", page.getWidth());
        data.put("height", page.getHeight());
        data.put("backgroundImage", page.getBackgroundImage());

        List<PageWidget> pageWidgetList = page.getPageWidgetList();
        for (PageWidget pageWidget : pageWidgetList) {
            HashMap item = new HashMap();
            item.put("objectId", pageWidget.getObjectId());
            item.put("name", pageWidget.getName());
            item.put("widgetTag", pageWidget.getWidgetTag());
            item.put("widgetConfig", pageWidget.getWidgetConfig());
            item.put("height", pageWidget.getHeight());
            item.put("width", pageWidget.getWidth());
            item.put("left", pageWidget.getLeft());
            item.put("top", pageWidget.getTop());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("data", data);
    }

    @RequestMapping(value = "/loadPageName", method = RequestMethod.GET)
    public void loadPageName(ModelMap modelMap, String objectId) throws Exception {

        Page page = pageService.getPageById(objectId);
        if (page == null) {
            page = menuService.getMenuByObjectId(objectId).getPage();
        }
        modelMap.put("data", page.getMenu().getName());
    }


    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updatePage(ModelMap modelMap, Page page) {

        pageService.updatePage(page);
    }

    @RequestMapping(value = "/delete/{objectId}", method = RequestMethod.GET)
    public void deletePage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) {

        pageService.deletePage(objectId);
    }

    @RequestMapping(value = "/query", method = RequestMethod.GET)
    public void queryPage(ModelMap modelMap, @RequestParam(value = "objectId") String objectId) throws Exception {


        List<Menu> menuList = menuService.listByParentId(objectId);

        if (CollectionUtil.isEmpty(menuList)) {
            return;
        }
        List items = new ArrayList();

        for (Menu menu : menuList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", menu.getObjectId());
            item.put("name", menu.getName());
            items.add(item);
        }
        modelMap.put("items", items);

    }

    @RequestMapping(value = "/loadManagerTree", method = RequestMethod.GET)
    public void loadManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            Menu root = menuService.getRootEntity();
            TreeNode node = new TreeNode();
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setType(Menu.class.getSimpleName());
            node.setLeaf(false);
            node.setExpanded(true);
            nodes.add(node);
            return;
        }

        String id = TreeNode.splitNode(nodeId, 1);
        List<Menu> menuList = menuService.listByParentIdAndMenuType(id, 2);
        if (CollectionUtils.isEmpty(menuList)) {
            return;
        }

        for (Menu menu : menuList) {
            TreeNode node = new TreeNode();
            node.setObjectId(menu.getObjectId());
            node.setText(menu.getName());
            node.setType(Menu.class.getSimpleName());
            node.setLeaf(CollectionUtils.isEmpty(menu.getChildList()));
            node.setOrderNo(menu.getOrderNo());
            nodes.add(node);
        }
    }

    @RequestMapping(value = "/loadTree", method = RequestMethod.GET)
    public void loadTree(@RequestParam(value = "node") String nodeId
            , @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            Menu menu = menuService.getRootEntity();
            if (CollectionUtil.isNotEmpty(menu.getChildList())) {
                for (Menu child : menu.getChildList()) {
                    if (child.getMenuType() != 2) {
                        continue;
                    }
                    TreeNode node = new TreeNode();
                    node.setObjectId(child.getObjectId());
                    node.setText(child.getName());
                    node.setLeaf(false);
                    node.setExpanded(false);
                    nodes.add(node);
                }
            }
        } else {

            Menu parent = menuService.getMenuByObjectId(nodeId);
            for (Menu menu : parent.getChildList()) {
                TreeNode node = new TreeNode();
                if (menu.getMenuType() != 2) {
                    continue;
                }
                node.setObjectId(menu.getObjectId());
                node.setText(menu.getName());
                node.setLeaf(CollectionUtils.isEmpty(menu.getChildList()));
                nodes.add(node);
            }
        }
    }

    @RequestMapping(value = "/loadTreePath", method = RequestMethod.GET)
    public void loadTreePath(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "node") ArrayList<String> nodes) throws Exception {

        Menu menu = menuService.getMenuByObjectId(nodeId);
        if (menu == null || menu.getParent() == null) {
            return;
        } else {
            nodes.add(menu.getObjectId());
            loadTreePath(menu.getParent().getObjectId(), nodes);
        }
    }

    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public void uploadImage(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        String fileName = attachment.getFileItem().getName();
        String tempFileName = StringUtil.getUuid();

        attachment.getFileItem().write(new File(systemConfigInfo.getPictureDirectory() + "/" + tempFileName));

        modelMap.put("fileName", fileName);
        modelMap.put("tempFileName", tempFileName);
    }

    @RequestMapping(value = "/image/load", method = RequestMethod.GET)
    public void loadImage(HttpServletRequest request, HttpServletResponse response, String fileName) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        File file = new File(systemConfigInfo.getPictureDirectory() + "/" + fileName);
        InputStream inputStream = new FileInputStream(file);
        response.setHeader("Content-Length", file.length() + "");
        response.setContentType("image/jpg");
        FileCopyUtils.copy(inputStream, response.getOutputStream());
        inputStream.close();
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

    @RequestMapping(value = "/video/upload", method = RequestMethod.POST)
    public void uploadVideo(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        String fileName = attachment.getFileItem().getName();
        String tempFileName = StringUtil.getUuid();

        attachment.getFileItem().write(new File(systemConfigInfo.getVideoDirectory() + "/" + tempFileName + ".mp4"));

        modelMap.put("fileName", fileName);
        modelMap.put("tempFileName", tempFileName);
    }

    @RequestMapping(value = "/video/load", method = RequestMethod.GET)
    public void loadVideo(HttpServletRequest request, HttpServletResponse response, String fileName) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        String path = PageController.class.getResource("/").getPath().replaceAll("/WEB-INF/classes/", "");
        if (path.startsWith("/")) {
            path = path.replaceFirst("/", "");
        }
        path = systemConfigInfo.getVideoDirectory().replaceAll("\\\\", "/").replaceAll(path, "");

        FileInputStream fileInputStream = new FileInputStream(path + "/" + fileName + ".mp4");

        try {
            FileCopyUtils.copy(fileInputStream, response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileInputStream != null) {
                fileInputStream.close();
            }
            if (response.getOutputStream() != null) {
                response.getOutputStream().close();
            }
        }
    }

    @RequestMapping(value = "/backgroundImage/upload", method = RequestMethod.POST)
    public void uploadBackgroundImage(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        String fileName = StringUtil.getUuid();
        attachment.getFileItem().write(new File(systemConfigInfo.getPictureDirectory() + "/" + fileName));
        modelMap.put("fileName", fileName);

    }

    @RequestMapping(value = "/backgroundImage/load", method = RequestMethod.GET)
    public void loadBackgroundImage(HttpServletRequest request, HttpServletResponse response
            , @RequestParam(value = "customPageId", required = false) String customPageId
            , @RequestParam(value = "fileName", required = false) String fileName) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        if (StringUtils.isEmpty(fileName)) {
            Page page = pageService.getPageById(customPageId);
            fileName = page.getBackgroundImage();
        }

        File file = new File(systemConfigInfo.getPictureDirectory() + "/" + fileName);
        InputStream inputStream = new FileInputStream(file);
        response.setHeader("Content-Length", file.length() + "");
        response.setContentType("image/jpg");
        FileCopyUtils.copy(inputStream, response.getOutputStream());
        inputStream.close();
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

    @RequestMapping(value = "/exportTemplate", method = RequestMethod.GET)
    public void exportTemplate(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String menuId = request.getParameter("menuId");
//        String authorizationCodes = request.getParameter("authorizationCodes");
        if (StringUtil.isEmpty(menuId)) {
            return;
        }

        DataExportInfo dataExportInfo = pageService.exportTemplate(menuId);
        modelMap.put("data", dataExportInfo);
    }

    @RequestMapping(value = "/importTemplate/upload", method = RequestMethod.POST)
    public void uploadTemplate(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        String fileName = StringUtil.getUuid();
        attachment.getFileItem().write(new File(systemConfigInfo.getTempDirectory() + "/" + fileName));

        modelMap.put("fileName", fileName);
    }

    @RequestMapping(value = "/importTemplate", method = RequestMethod.GET)
    public void importTemplate(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String fileName = request.getParameter("fileName");
        String menuId = request.getParameter("menuId");
        if (StringUtil.isEmpty(menuId) || StringUtil.isEmpty(fileName)) {
            return;
        }

        pageService.importTemplate(fileName, menuId);
    }
}
