package com.withub.web.common;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.model.entity.AbstractRecursionEntity;
import com.withub.model.entity.enumeration.OrderByType;
import com.withub.model.entity.enumeration.PropertyDataType;
import com.withub.model.entity.query.*;
import com.withub.web.common.propertyeditor.DateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BaseController {

    @InitBinder
    public void initBinder(WebDataBinder binder) {

        binder.registerCustomEditor(Date.class, new DateEditor());
    }

    public void setPageInfoQueryCondition(HttpServletRequest request, QueryInfo queryInfo) {

        queryInfo.setRecordsetIndex(Integer.parseInt(request.getParameter("pageNo")) - 1);
        queryInfo.setRecordsetSize(Integer.parseInt(request.getParameter("pageSize")));
    }

    public void setDateRangeQueryCondition(HttpServletRequest request, QueryInfo queryInfo, String property) {

        String beginDate = request.getParameter("beginDate");
        String endDate = request.getParameter("endDate");

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyDataType(PropertyDataType.Date);
        List<Date> dateList = new ArrayList<Date>();
        int year = 2013;

        // TODO: 解决从 Ext 上获取初始查询条件
        if (StringUtil.isEmpty(beginDate)) {
            dateList.add(DateUtil.convertStringToDate(year + "-01-01", "yyyy-MM-dd"));
        } else {
            dateList.add(DateUtil.convertStringToDate(beginDate, "yyyy-MM-dd", DateUtil.convertStringToDate(year + "-01-01", "yyyy-MM-dd")));
        }
        if (StringUtil.isEmpty(endDate)) {
            dateList.add(DateUtil.getCurrentTime());
        } else {
            dateList.add(DateUtil.convertStringToDate(endDate, "yyyy-MM-dd", DateUtil.getCurrentTime()));
        }
        sqlExpressionConfig.setPropertyValue(dateList);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.Between);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setStringValueEqualsQueryCondition(HttpServletRequest request, QueryInfo queryInfo, String property, String parameterName) {

        String value = request.getParameter(parameterName);
        if (StringUtil.isEmpty(value)) {
            return;
        }

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyValue(value);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.Equals);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setIntegerValueEqualsQueryCondition(QueryInfo queryInfo, String property, Integer value) {

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyValue(value);
        sqlExpressionConfig.setPropertyDataType(PropertyDataType.Number);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.Equals);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setStringValueEqualsQueryCondition(QueryInfo queryInfo, String property, String value) {

        if (StringUtil.isEmpty(value)) {
            return;
        }
        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyValue(value);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.Equals);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setStringValueNotEqualsQueryCondition(QueryInfo queryInfo, String property, String value) {

        if (StringUtil.isEmpty(value)) {
            return;
        }
        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyValue(value);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.NotEquals);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setInputFieldQueryCondition(HttpServletRequest request, QueryInfo queryInfo, String property, String... parameterName) {

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);

        String propertyValue;
        if (CollectionUtil.isNotEmpty(parameterName)) {
            propertyValue = request.getParameter(parameterName[0]);
        } else {
            propertyValue = request.getParameter(property);
        }

        if (StringUtil.isEmpty(propertyValue)) {
            return;
        }
        sqlExpressionConfig.setPropertyValue(propertyValue);
        sqlExpressionConfig.setCaseSensitive(false);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.MatchMiddle);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setNodeLevelCodeQueryCondition(QueryInfo queryInfo, String property, AbstractRecursionEntity entityInstance) throws Exception {

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyValue(entityInstance.getNodeLevelCode());
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.MatchBegin);
        sqlExpressionConfig.setNodeLevelCodeQuery(true);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setNodeLevelCodeQueryCondition(QueryInfo queryInfo, String property, AbstractRecursionEntity entityInstance, int childDepth) throws Exception {

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(property);
        sqlExpressionConfig.setPropertyValue(entityInstance.getNodeLevelCode());
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.MatchBegin);
        sqlExpressionConfig.setNodeLevelCodeQuery(true);
        sqlExpressionConfig.setChildDepth(childDepth);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }

    public void setAscOrderBy(QueryInfo queryInfo, String property) {

        OrderByProperty orderByProperty = new OrderByProperty();
        orderByProperty.setPropertyName(property);
        orderByProperty.setOrderByType(OrderByType.Asc);
        queryInfo.getOrderByPropertyList().add(orderByProperty);
    }

    public void setDescOrderBy(QueryInfo queryInfo, String property) {

        OrderByProperty orderByProperty = new OrderByProperty();
        orderByProperty.setPropertyName(property);
        orderByProperty.setOrderByType(OrderByType.Desc);
        queryInfo.getOrderByPropertyList().add(orderByProperty);
    }

    public void setQueryInfoCondition(QueryInfo queryInfo, String propertyName, Object propertyValue, ExpressionOperation operation) {

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName(propertyName);
        sqlExpressionConfig.setPropertyValue(propertyValue);
        sqlExpressionConfig.setSqlExpressionOperation(operation);
        if (propertyValue instanceof Integer) {
            sqlExpressionConfig.setPropertyDataType(PropertyDataType.Number);
        }
        if (propertyValue instanceof Date) {
            sqlExpressionConfig.setPropertyDataType(PropertyDataType.Date);
        }
        if (propertyValue instanceof List) {
            List list = (List) propertyValue;
            Object objectValue = list.get(0);
            if (objectValue instanceof Integer) {
                sqlExpressionConfig.setPropertyDataType(PropertyDataType.Number);
            }
            if (objectValue instanceof Date) {
                sqlExpressionConfig.setPropertyDataType(PropertyDataType.Date);
            }
        }
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);
    }


}
