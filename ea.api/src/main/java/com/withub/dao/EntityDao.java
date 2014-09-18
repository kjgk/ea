package com.withub.dao;

import com.withub.model.entity.AbstractBaseEntity;
import com.withub.model.entity.AbstractEntity;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.util.List;

public interface EntityDao {

    void save(Object entity);

    void update(Object entity);

    void delete(Class<?> entityClass, Object pk);

    void delete(Object entity);

    void logicDelete(AbstractBaseEntity entity) throws Exception;

    void logicDelete(Class<? extends AbstractEntity> clazz, final String objectId) throws Exception;

    int executeJpql(final String jpql, Object... params);

    int executeSql(String sql, Object... params) throws Exception;

    List listBySql(String sql, Object... params) throws Exception;

    Double executeDoubleScalar(String sql, Object... params) throws Exception;

    <T> T getObject(Class<T> entityClass, Object pk);

    <T> T getByPropertyValue(Class<T> entityClass, String propertyName, Object propertyValue);

    <T> T getObject(String jpql, Object... params);

    <T> List<T> listByPropertyValue(Class<T> entityClass, String propertyName, Object propertyValue);

    <T> List<T> listByJpql(String jpql, Object... params);

    <T> List<T> listByJpql(int firstResult, int maxResult, String jpql, Object... params);

    RecordsetInfo query(QueryInfo queryInfo) throws Exception;
}
