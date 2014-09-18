package com.withub.service.ea;

import com.withub.model.DataExportInfo;
import com.withub.model.ea.Page;

import java.util.List;

public interface PageService {


    Page getPageById(String id);

    Page getPageByMenu(String id);

    List<Page> listByParentMenuId(String parentMenuId);

    void updatePage(Page page);

    void savePage(Page page, String menuId);

    void deletePage(String id);

    DataExportInfo exportTemplate(String menuId) throws Exception;

    void importTemplate(String fileName, String menuId) throws Exception;
}
