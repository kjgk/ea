package com.withub.model.entity.query;


import javax.persistence.Query;
import java.util.LinkedList;
import java.util.List;

public final class HqlParameterBinder {

    /**
     * 查询参数值
     */
    private List<Object> objectValueList = new LinkedList<Object>();

    /**
     * 添加查询参数
     *
     * @param objectValue
     */
    public void appendParameter(Object objectValue) {

        objectValueList.add(objectValue);
    }

    /**
     * 将查询参数列表绑定到 Query 对象
     *
     * @param query
     */
    public void bindParameters(Query query) {

        for (int i = 0; i < objectValueList.size(); i++) {
            query.setParameter(i + 1, objectValueList.get(i));

        }
    }

    public List<Object> getObjectValueList() {

        return objectValueList;
    }
}
