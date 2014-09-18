package com.withub.service.ea;

import com.withub.model.ea.Widget;
import com.withub.model.ea.WidgetCategory;
import com.withub.model.entity.enumeration.EntityRowMoveType;

import java.util.List;

public interface WidgetService {

    public WidgetCategory getRootEntity() throws Exception;

    public WidgetCategory getWidgetCategoryByObjectId(String widgetCategoryId) throws Exception;

    public void updateWidgetCategory(WidgetCategory widgetCategory) throws Exception;

    public void saveWidgetCategory(WidgetCategory widgetCategory) throws Exception;

    public void deleteWidgetCategory(String widgetCategoryId) throws Exception;

    public void moveWidgetCategoryRow(String widgetCategoryId, final EntityRowMoveType moveType) throws Exception;


    public List<Widget> listByWidgetCatagoryId(String parentId) throws Exception;

    public Widget getWidgetByObjectId(String widgetId) throws Exception;

    public Widget getWidgetByTag(String widgetTag) throws Exception;

    public void updateWidget(Widget widget) throws Exception;

    public void saveWidget(Widget widget) throws Exception;

    public void deleteWidget(String widgetId) throws Exception;

    public void moveWidgetRow(String widgetId, final EntityRowMoveType moveType) throws Exception;

    public List<WidgetCategory> getAllValidWidget() throws Exception;

}
