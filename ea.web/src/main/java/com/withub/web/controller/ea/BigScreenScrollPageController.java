package com.withub.web.controller.ea;

import com.withub.model.ea.BigScreenScrollPage;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;
import com.withub.service.ea.BigScreenScrollPageService;
import com.withub.web.common.BaseController;
import org.apache.commons.collections.CollectionUtils;
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
@RequestMapping(value = "/ea")
public class BigScreenScrollPageController extends BaseController {

    //===================== 属性声明 ==========================================================

    @Autowired
    private BigScreenScrollPageService bigScreenScrollPageService;

    //===================== Controller方法 ====================================================
    @RequestMapping(value = "/bigScreenScrollPage/query", method = RequestMethod.GET)
    public void queryrBigScreenScrollPage(HttpServletRequest request, ModelMap modelMap) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(BigScreenScrollPage.class);
        this.setPageInfoQueryCondition(request, queryInfo);
        this.setAscOrderBy(queryInfo, "orderNo");

        RecordsetInfo recordsetInfo = bigScreenScrollPageService.queryBigScreenScrollPage(queryInfo);
        List<BigScreenScrollPage> bigScreenScrollPageList = recordsetInfo.getEntityList();
        if (CollectionUtils.isEmpty(bigScreenScrollPageList)) {
            return;
        }

        List items = new ArrayList();
        for (BigScreenScrollPage bigScreenScrollPage : bigScreenScrollPageList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", bigScreenScrollPage.getObjectId());
            item.put("menuName", bigScreenScrollPage.getMenu().getName());
            item.put("displayMinutes", bigScreenScrollPage.getDisplayMinutes());
            item.put("orderNo", bigScreenScrollPage.getOrderNo());
            items.add(item);
        }

        modelMap.put("items", items);
        modelMap.put("total", recordsetInfo.getTotalRecordCount());
    }

    @RequestMapping(value = "/bigScreenScrollPage/create", method = RequestMethod.POST)
    public void createBigScreenScrollPage(ModelMap modelMap, BigScreenScrollPage bigScreenScrollPage) throws Exception {

        bigScreenScrollPageService.saveBigScreenScrollPage(bigScreenScrollPage);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/bigScreenScrollPage/update", method = RequestMethod.POST)
    public void updateBigScreenScrollPage(ModelMap modelMap, BigScreenScrollPage bigScreenScrollPage) throws Exception {

        bigScreenScrollPageService.updateBigScreenScrollPage(bigScreenScrollPage);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/bigScreenScrollPage/load/{objectId}", method = RequestMethod.GET)
    public void loadBigScreenScrollPage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        BigScreenScrollPage bigScreenScrollPage = bigScreenScrollPageService.getBigScreenScrollPageByObjectId(objectId);
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("objectId", bigScreenScrollPage.getObjectId());
        model.put("menu.objectId", bigScreenScrollPage.getMenu().getObjectId());
        model.put("displayMinutes", bigScreenScrollPage.getDisplayMinutes());
        model.put("orderNo", bigScreenScrollPage.getOrderNo());

        modelMap.put("data", model);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/bigScreenScrollPage/delete/{objectId}", method = RequestMethod.GET)
    public void deleteBigScreenScrollPage(ModelMap modelMap, @PathVariable(value = "objectId") String objectId) throws Exception {

        bigScreenScrollPageService.deleteBigScreenScrollPage(objectId);
        modelMap.put("success", true);
    }

    @RequestMapping(value = "/bigScreenScrollPage/list", method = RequestMethod.GET)
    public void listBigScreenScrollPage(ModelMap modelMap) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(BigScreenScrollPage.class);
        queryInfo.setRecordsetIndex(0);
        queryInfo.setRecordsetSize(10);
        this.setAscOrderBy(queryInfo, "orderNo");

        RecordsetInfo recordsetInfo = bigScreenScrollPageService.queryBigScreenScrollPage(queryInfo);
        List<BigScreenScrollPage> bigScreenScrollPageList = recordsetInfo.getEntityList();
        if (CollectionUtils.isEmpty(bigScreenScrollPageList)) {
            return;
        }

        List items = new ArrayList();
        for (BigScreenScrollPage bigScreenScrollPage : bigScreenScrollPageList) {
            Map<String, Object> item = new HashMap<String, Object>();
            item.put("objectId", bigScreenScrollPage.getObjectId());
            item.put("menuId", bigScreenScrollPage.getMenu().getObjectId());
            item.put("displayMinutes", bigScreenScrollPage.getDisplayMinutes());
            item.put("orderNo", bigScreenScrollPage.getOrderNo());
            items.add(item);
        }

        modelMap.put("items", items);
    }


    //===================== 属性方法 ====================================================

}
