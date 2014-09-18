package com.withub.service.system;


import com.withub.model.entity.enumeration.EntityRowMoveType;
import com.withub.model.system.po.Menu;

import java.util.List;

public interface MenuService {

    public Menu getRootEntity() throws Exception;

    public Integer getNextOrderNo(Menu menu) throws Exception;

    public void moveEntityRow(String menuId, final EntityRowMoveType moveType) throws Exception;

    public void moveEntityRowFirst(Menu menu) throws Exception;

    public void moveEntityRowLast(Menu menu) throws Exception;

    public void moveEntityRowUp(Menu menu) throws Exception;

    public void moveEntityRowDown(Menu menu) throws Exception;

    public List<Menu> listByParentId(String parentId) throws Exception;

    public List<Menu> listByParentIdAndMenuType(String parentId, int menuType) throws Exception;

    public Menu getMenuByObjectId(String menuId) throws Exception;

    public void updateMenu(Menu menu) throws Exception;

    public void saveMenu(Menu menu) throws Exception;

    public void deleteMenu(String menuId) throws Exception;

    public void resetMenuOrderNo(final String parentId) throws Exception;

    public List<Menu> getPermissionMenuList();

    public void setHomePage(String pageId) throws Exception;

    public String getHomePageId(String pageType) throws Exception;
}
