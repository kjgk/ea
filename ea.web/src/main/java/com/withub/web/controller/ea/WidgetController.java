package com.withub.web.controller.ea;

import com.withub.common.util.CollectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.common.util.SystemUtil;
import com.withub.model.ea.Widget;
import com.withub.model.ea.WidgetCategory;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.service.ea.WidgetService;
import com.withub.util.ConfigUtil;
import com.withub.web.common.BaseController;
import com.withub.web.common.ext.StaticCheckedTreeNode;
import com.withub.web.common.ext.TreeNode;
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
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/ea")
public class WidgetController extends BaseController {

    //============================== 属性声明 =============================================================

    @Autowired
    private WidgetService widgetService;

    //============================== Controller 方法 ======================================================

    @RequestMapping(value = "/widgetCategory/loadManagerTree", method = RequestMethod.GET)
    public void loadManagerTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            WidgetCategory root = widgetService.getRootEntity();
            TreeNode node = new TreeNode();
            node.setObjectId(root.getObjectId());
            node.setText(root.getName());
            node.setLeaf(false);
            node.setType(WidgetCategory.class.getSimpleName());
            node.setExpanded(true);
            nodes.add(node);
            return;
        }

        String id = nodeId.split("_")[1];
        WidgetCategory widgetCategory = widgetService.getWidgetCategoryByObjectId(id);
        if (CollectionUtil.isEmpty(widgetCategory.getChildList())) {
            return;
        }
        for (WidgetCategory child : (widgetCategory.getChildList())) {
            TreeNode node = new TreeNode();
            node.setObjectId(child.getObjectId());
            node.setText(child.getName());
            node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
            node.setType(WidgetCategory.class.getSimpleName());
            node.setOrderNo(child.getOrderNo());
            nodes.add(node);
        }
    }

    @RequestMapping(value = "/widgetCategory/loadTree", method = RequestMethod.GET)
    public void loadTree(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "nodes") ArrayList<TreeNode> nodes,
                         @RequestParam(value = "check", required = false) Boolean check) throws Exception {

        if (StringUtil.compareValue(nodeId, TreeNode.ROOT)) {
            WidgetCategory root = widgetService.getRootEntity();
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
            WidgetCategory widgetCategory = widgetService.getWidgetCategoryByObjectId(nodeId);
            if (CollectionUtil.isEmpty(widgetCategory.getChildList())) {
                return;
            }
            for (WidgetCategory child : (widgetCategory.getChildList())) {
                TreeNode node = new TreeNode();
                if (check != null && check) {
                    node = new StaticCheckedTreeNode();
                }
                node.setObjectId(child.getObjectId());
                node.setText(child.getName());
                node.setLeaf(CollectionUtil.isEmpty(child.getChildList()));
//                node.getAttributes().put("page", child.getUrl());
//                node.getAttributes().put("openMode", 1);
                nodes.add(node);
            }
        }
    }

    @RequestMapping(value = "/widgetCategory/loadTreePath", method = RequestMethod.GET)
    public void loadTreePath(@RequestParam(value = "node") String nodeId, @ModelAttribute(value = "node") ArrayList<String> nodes) throws Exception {

        WidgetCategory widget = widgetService.getWidgetCategoryByObjectId(nodeId);
        if (widget.getParent() == null) {
            return;
        } else {
            nodes.add(widget.getParent().getObjectId());
            loadTreePath(widget.getParent().getObjectId(), nodes);
        }
    }

    @RequestMapping(value = "/widgetCategory/create", method = RequestMethod.POST)
    public void createWidgetCategory(ModelMap modelMap, WidgetCategory widgetCategory) throws Exception {

        widgetService.saveWidgetCategory(widgetCategory);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widgetCategory/update", method = RequestMethod.POST)
    public void updateWidgetCategory(ModelMap modelMap, WidgetCategory widgetCategory) throws Exception {

        widgetService.updateWidgetCategory(widgetCategory);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widgetCategory/load/{objectId}", method = RequestMethod.GET)
    public void loadWidgetCategory(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        WidgetCategory widgetCategory = widgetService.getWidgetCategoryByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", widgetCategory.getObjectId());
        model.put("name", widgetCategory.getName());
        model.put("parent.objectId", widgetCategory.getParent().getObjectId());

        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widgetCategory/delete/{objectId}", method = RequestMethod.GET)
    public void deleteWidgetCategory(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        widgetService.deleteWidgetCategory(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/query", method = RequestMethod.GET)
    public void listWidget(@RequestParam("id") String id, @ModelAttribute("items") ArrayList<HashMap> items) throws Exception {

        List<Widget> widgetList = widgetService.listByWidgetCatagoryId(id);
        if (CollectionUtil.isEmpty(widgetList)) {
            return;
        }

        for (Widget widget : widgetList) {
            HashMap<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", widget.getObjectId());
            item.put("name", widget.getName());
            item.put("widgetTag", widget.getWidgetTag());
            item.put("widgetVersion", widget.getWidgetTag());
            item.put("licenseWidget", widget.getLicenseWidget());
            item.put("license", SystemUtil.authorize(ConfigUtil.getSystemConfigInfo().getUniqueCode(), widget.getLicense(), widget.getWidgetTag()) ? "授权" : "");
            item.put("installTime", widget.getInstallTime());
            item.put("allowEvaluate", widget.getAllowEvaluate());
            item.put("evaluateExpiredTime", widget.getEvaluateExpiredTime());
            item.put("status", widget.getStatus());
            items.add(item);
        }
    }

    @RequestMapping(value = "/widget/create", method = RequestMethod.POST)
    public void createWidget(ModelMap modelMap, Widget widget) throws Exception {

        widgetService.saveWidget(widget);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/update", method = RequestMethod.POST)
    public void updateWidget(ModelMap modelMap, Widget widget) throws Exception {

        widgetService.updateWidget(widget);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/load/{objectId}", method = RequestMethod.GET)
    public void loadWidget(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        Widget widget = widgetService.getWidgetByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", widget.getObjectId());
        model.put("widgetCategory.objectId", widget.getWidgetCategory().getObjectId());
        model.put("name", widget.getName());
        model.put("widgetTag", widget.getWidgetTag());
        model.put("widgetVersion", widget.getWidgetVersion());
        model.put("licenseWidget", widget.getLicenseWidget());
        model.put("license", widget.getLicense());
        model.put("installTime", widget.getInstallTime());
        model.put("allowEvaluate", widget.getAllowEvaluate());
        model.put("evaluateExpiredTime", widget.getEvaluateExpiredTime());
        model.put("coverImage", widget.getCoverImage());
        model.put("status", widget.getStatus());
        model.put("description", widget.getDescription());

        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/delete/{objectId}", method = RequestMethod.GET)
    public void deleteWidget(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        widgetService.deleteWidget(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/authorize", method = RequestMethod.GET)
    public void authorize(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String objectId = request.getParameter("objectId");
        Widget widget = widgetService.getWidgetByObjectId(objectId);
        widget.setLicense(SystemUtil.getUniqueCodes(widget.getWidgetTag()));
        widgetService.updateWidget(widget);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/deauthorize", method = RequestMethod.GET)
    public void deauthorize(HttpServletRequest request, ModelMap modelMap) throws Exception {

        String objectId = request.getParameter("objectId");
        Widget widget = widgetService.getWidgetByObjectId(objectId);
        widget.setLicense("");
        widgetService.updateWidget(widget);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/widget/getAllValidWidget", method = RequestMethod.GET)
    public void getAllValidWidget(ModelMap modelMap) throws Exception {

        List<WidgetCategory> categoryList = widgetService.getAllValidWidget();
        List items = new ArrayList();

        for (WidgetCategory widgetCategory : categoryList) {
            Map item = new HashMap();
            List widgets = new ArrayList();
            for (Widget widget : widgetCategory.getWidgetList()) {
                Map subItem = new HashMap();
                Map attributes = new HashMap();
                attributes.put("widgetTag", widget.getWidgetTag());
                attributes.put("licenseWidget", widget.getLicenseWidget());
                attributes.put("licenseValid", SystemUtil.authorize(ConfigUtil.getSystemConfigInfo().getUniqueCode(), widget.getLicense(), widget.getWidgetTag()));
                subItem.put("id", widget.getObjectId());
                subItem.put("text", widget.getName());
                subItem.put("leaf", true);
                subItem.put("attributes", attributes);
                widgets.add(subItem);
            }
            item.put("name", widgetCategory.getName());
            item.put("widgets", widgets);
            items.add(item);
        }

        modelMap.put("items", items);
    }

    @RequestMapping(value = "/widget/coverImage/upload", method = RequestMethod.POST)
    public void uploadCoverImage(ModelMap modelMap, @RequestParam(value = "attachment") CommonsMultipartFile attachment) throws Exception {

        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        String tempFileName = StringUtil.getUuid();
        attachment.getFileItem().write(new File(systemConfigInfo.getPictureDirectory() + "/" + tempFileName));
        modelMap.put("tempFileName", tempFileName);
        modelMap.put("fileName", attachment.getOriginalFilename());
    }

    @RequestMapping(value = "/widget/coverImage/load", method = RequestMethod.GET)
    public void loadCoverImage(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String widgetTag = request.getParameter("widgetTag");
        Widget widget = widgetService.getWidgetByTag(widgetTag);
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        if (StringUtil.isNotEmpty(widget.getCoverImage())) {
            File file = new File(systemConfigInfo.getPictureDirectory() + "/" + widget.getCoverImage().split("[|]")[0]);
            InputStream inputStream = new FileInputStream(file);
            response.setHeader("Content-Length", file.length() + "");
            response.setContentType("image/jpg");
            FileCopyUtils.copy(inputStream, response.getOutputStream());
            inputStream.close();
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } else {
            response.sendRedirect(request.getContextPath() + "/images/default-widget-cover.png");
        }
    }

}
