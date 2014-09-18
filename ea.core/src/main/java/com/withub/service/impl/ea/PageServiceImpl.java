package com.withub.service.impl.ea;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.withub.common.util.CompressUtil;
import com.withub.common.util.FileUtil;
import com.withub.common.util.ReflectionUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.*;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.model.system.po.Menu;
import com.withub.service.ea.ConfigurationService;
import com.withub.service.ea.PageService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileWriter;
import java.util.*;


@Service("pageService")
@Transactional
public class PageServiceImpl implements PageService {

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private ConfigurationService configurationService;

    @Override
    public Page getPageById(String objectId) {

        return entityDao.getObject(Page.class, objectId);
    }

    @Override
    public Page getPageByMenu(String id) {

        return entityDao.getByPropertyValue(Page.class, "menu.objectId", id);
    }


    @Override
    public void updatePage(Page page) {

        entityDao.save(page);
    }

    @Override
    public void deletePage(String objectId) {

        entityDao.delete(objectId);
    }

    @Override
    public void savePage(Page page, String menuId) {

        Page pageParam = entityDao.getByPropertyValue(Page.class, "menu.objectId", menuId);

        if (pageParam == null) {
            page.setObjectId(StringUtil.getUuid());
            page.setStatus(1);
            entityDao.save(page);
        } else {
            pageParam.setWidth(page.getWidth());
            pageParam.setHeight(page.getHeight());
            if (StringUtil.isNotEmpty(page.getBackgroundImage())) {
                pageParam.setBackgroundImage(page.getBackgroundImage());
            }
            entityDao.save(pageParam);
            if (CollectionUtils.isNotEmpty(pageParam.getPageWidgetList())) {
                for (PageWidget pageWidget : pageParam.getPageWidgetList()) {
                    entityDao.delete(pageWidget);
                }
            }

        }
        if (CollectionUtils.isNotEmpty(page.getPageWidgetList())) {
            for (PageWidget pageWidget : page.getPageWidgetList()) {
                pageWidget.setObjectId(StringUtil.getUuid());
                if (pageParam == null) {
                    pageWidget.setPage(page);
                } else {
                    pageWidget.setPage(pageParam);
                }
                entityDao.save(pageWidget);
            }
        }

    }


    public RecordsetInfo queryPage(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = entityDao.query(queryInfo);

        return recordsetInfo;
    }


    @Override
    public List<Page> listByParentMenuId(String parentMenuId) {

        String jpql = "select o from Page o where o.menu.parent.objectId = ?  ";

        return entityDao.listByJpql(jpql, parentMenuId);

    }

    @Override
    public DataExportInfo exportTemplate(String menuId) throws Exception {

        //临时guid文件夹
        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");
        String tempDir = systemConfigInfo.getTempDirectory() + "/" + StringUtil.getUuid();
        if (!FileUtil.directoryExists(tempDir)) {
            FileUtil.createDirectory(tempDir);
        }
        String sourceDir = PageServiceImpl.class.getClassLoader().getResource("").getPath().substring(1).replace("/WEB-INF/classes", "");   //项目目录
        String imagesDir = sourceDir + "images/widget";
        String cssFileName = sourceDir + "css/chart.css";
        String jsDir = sourceDir + "WEB-INF/pages/ea/page/widget/";

        //页面数据
        Page page = entityDao.getByPropertyValue(Page.class, "menu.objectId", menuId);
        List<PageWidget> pageWidgetList = page.getPageWidgetList();
        Map<String, Widget> widgetMap = new HashMap<String, Widget>();
        Map<String, WidgetCategory> widgetCategoryMap = new HashMap<String, WidgetCategory>();
        Map<String, WidgetInfo> widgetInfoMap = new HashMap<String, WidgetInfo>();

        // 创建XML文件 根节点 pageConfig
        Document doc = DocumentHelper.createDocument();
        Element root = doc.addElement("pageConfig");
        Element widgetCategorys = root.addElement("widgetCategorys");
        Element widgets = root.addElement("widgets");
        Element widgetInfos = root.addElement("widgetInfos");
        Element pageWidgets = root.addElement("pageWidgets");
        root.addElement("page").setText(ReflectionUtil.serializeObjectToString(page));

        //得到不重复组件记录
        for (PageWidget pageWidget : pageWidgetList) {
            String[] widgetTags = pageWidget.getWidgetTag().split("\\.");
            Widget widget = entityDao.getByPropertyValue(Widget.class, "widgetTag", widgetTags[widgetTags.length - 1]);
            WidgetInfo widgetInfo = entityDao.getByPropertyValue(WidgetInfo.class, "widget.objectId", widget.getObjectId());
            WidgetCategory widgetCategory = widget.getWidgetCategory();
            widgetMap.put(widget.getObjectId(), widget);
            widgetInfoMap.put(widgetInfo.getObjectId(), widgetInfo);
            widgetCategoryMap.put(widgetCategory.getObjectId(), widgetCategory);

            pageWidgets.addElement("pageWidget").addAttribute("id", pageWidget.getObjectId()).setText(ReflectionUtil.serializeObjectToString(pageWidget));
            if (widgetTags[widgetTags.length - 1].contains("Image")) {   //如果是图片组件，先导出图片
                JSONObject widgetConfig = JSON.parseObject(pageWidget.getWidgetConfig());
                String picName = widgetConfig.get("src").toString().split("\\|")[0];
                FileUtil.copyFile(systemConfigInfo.getPictureDirectory() + "/" + picName, tempDir + "/" + picName);
            }
        }

        Set set = widgetCategoryMap.entrySet();
        Iterator it = set.iterator();
        while (it.hasNext()) {
            Map.Entry<String, WidgetCategory> entry = (Map.Entry<String, WidgetCategory>) it.next();
            widgetCategorys.addElement("widgetCategory").addAttribute("id", entry.getKey()).setText(ReflectionUtil.serializeObjectToString(entry.getValue()));
        }
        set = widgetMap.entrySet();
        it = set.iterator();
        while (it.hasNext()) {
            Map.Entry<String, Widget> entry = (Map.Entry<String, Widget>) it.next();
            widgets.addElement("widget").addAttribute("id", entry.getKey()).setText(ReflectionUtil.serializeObjectToString(entry.getValue()));
            //复制js文件
            String srcJsFileName = jsDir + entry.getValue().getWidgetTag() + ".js";
            String destJsFileName = tempDir + "/" + entry.getValue().getWidgetTag() + ".js";
            FileUtil.copyFile(srcJsFileName, destJsFileName);
        }
        set = widgetInfoMap.entrySet();
        it = set.iterator();
        while (it.hasNext()) {
            Map.Entry<String, WidgetInfo> entry = (Map.Entry<String, WidgetInfo>) it.next();
            widgetInfos.addElement("widgetInfo").addAttribute("id", entry.getKey()).setText(ReflectionUtil.serializeObjectToString(entry.getValue()));
        }

        // 输出 pageConfig.xml 文件
        OutputFormat format = OutputFormat.createPrettyPrint();
        XMLWriter output = new XMLWriter(new FileWriter(new File(tempDir + "/pageConfig.xml")), format);
        output.write(doc);
        output.close();

        //复制css和image
        FileUtil.copyFile(cssFileName, tempDir + "/chart.css");
        FileUtils.copyDirectory(new File(imagesDir), new File(tempDir + "/widget"));

        //打包
        String tempFileName = StringUtil.getUuid();
        CompressUtil.getInstance().zip(tempDir, systemConfigInfo.getTempDirectory() + "/" + tempFileName);

        DataExportInfo dataExportInfo = new DataExportInfo();
        dataExportInfo.setTempFileName(tempFileName);
        dataExportInfo.setType(Page.class.getSimpleName());
        dataExportInfo.setFileName(page.getMenu().getName().replace('#', '＃') + "模版.jci");
        return dataExportInfo;
    }

    @Override
    public void importTemplate(String fileName, String menuId) throws Exception {

        SystemConfigInfo systemConfigInfo = (SystemConfigInfo) configurationService.getConfigInfo(SystemConfigInfo.class.getName(), "SYSTEM");
        String tempDir = systemConfigInfo.getTempDirectory() + "/" + StringUtil.getUuid();
        //解压到临时目录
        CompressUtil.getInstance().unzip(systemConfigInfo.getTempDirectory() + "/" + fileName, tempDir);

        if (!FileUtil.fileExists(tempDir + "/pageConfig.xml") || !FileUtil.fileExists(tempDir + "/chart.css") || !FileUtil.directoryExists(tempDir + "/widget")) {
            return;
        }

        String sourceDir = PageServiceImpl.class.getClassLoader().getResource("").getPath().substring(1).replace("/WEB-INF/classes", "");   //项目目录
        String imagesDir = sourceDir + "images/widget";
        String cssFileName = sourceDir + "css/chart.css";
        String jsDir = sourceDir + "WEB-INF/pages/ea/page/widget/";

        //解析pageConfig.xml
        SAXReader saxReader = new SAXReader();
        Document doc = saxReader.read(new File(tempDir + "/pageConfig.xml"));
        Element root = doc.getRootElement();

//        String authorizationCodes = root.element("authorizationCodes").getText();
//        String localauthorizationCode = SystemUtil.getUniqueCode();
//        String jpql = "select o from " + AuthorizationCode.class.getName() + " o where 1=1 and o.authorizationCode = ? and o.objectStatus = 1";
//        AuthorizationCode authorizationCode = entityDao.getObject(jpql, localauthorizationCode);
//        if (StringUtil.isNotEmpty(authorizationCodes)) {
//            if (!authorizationCodes.contains(localauthorizationCode) || authorizationCode == null) {
//                throw new BaseBusinessException("", "您未被授权导入该模版!");
//            }
//        }

        Page pageTemplate = (Page) ReflectionUtil.deserializeObjectFromString(root.element("page").getText());
        Page page = entityDao.getByPropertyValue(Page.class, "menu.objectId", menuId);
        if (page != null) {
            if (CollectionUtils.isNotEmpty(page.getPageWidgetList())) {
                for (PageWidget pageWidget : page.getPageWidgetList()) {
                    entityDao.delete(pageWidget);
                }
            }
            pageTemplate.setObjectId(page.getObjectId());
            pageTemplate.setMenu(page.getMenu());
        } else {
            pageTemplate.setObjectId(StringUtil.getUuid());
            pageTemplate.setMenu(entityDao.getObject(Menu.class, menuId));
        }
        entityDao.save(pageTemplate);

        List<Element> pageWidgets = root.selectNodes("//pageConfig/pageWidgets//pageWidget");
        for (Element element : pageWidgets) {
            PageWidget pageWidget = (PageWidget) ReflectionUtil.deserializeObjectFromString(element.getText());
            String[] widgetTags = pageWidget.getWidgetTag().split("\\.");
            if (widgetTags[widgetTags.length - 1].contains("Image")) {   //如果是图片组件，先导入图片
                JSONObject widgetConfig = JSON.parseObject(pageWidget.getWidgetConfig());
                String picName = widgetConfig.get("src").toString().split("\\|")[0];
                FileUtil.copyFile(tempDir + "/" + picName, systemConfigInfo.getPictureDirectory() + "/" + picName);
            }
            pageWidget.setObjectId(StringUtil.getUuid());
            pageWidget.setPage(pageTemplate);
            entityDao.save(pageWidget);
        }
        List<Element> widgetCategorys = root.selectNodes("//pageConfig/widgetCategorys//widgetCategory");
        for (Element element : widgetCategorys) {
            WidgetCategory widgetCategory = (WidgetCategory) ReflectionUtil.deserializeObjectFromString(element.getText());
            entityDao.save(widgetCategory);
        }
        List<Element> widgets = root.selectNodes("//pageConfig/widgets//widget");
        for (Element element : widgets) {
            Widget widget = (Widget) ReflectionUtil.deserializeObjectFromString(element.getText());
            //复制js文件
            String srcJsFileName = tempDir + "/" + widget.getWidgetTag() + ".js";
            String destJsFileName = jsDir + widget.getWidgetTag() + ".js";
            if (!FileUtil.fileExists(destJsFileName)) {
                FileUtil.copyFile(srcJsFileName, destJsFileName);
            }
            entityDao.save(widget);
        }
        List<Element> widgetInfos = root.selectNodes("//pageConfig/widgetInfos//widgetInfo");
        for (Element element : widgetInfos) {
            WidgetInfo widgetInfo = (WidgetInfo) ReflectionUtil.deserializeObjectFromString(element.getText());
            entityDao.save(widgetInfo);
        }

        //导入css和image，直接覆盖        ？考虑老版本
        FileUtil.copyFile(tempDir + "/chart.css", cssFileName);
        FileUtils.copyDirectory(new File(tempDir + "/widget"), new File(imagesDir));
    }

}
