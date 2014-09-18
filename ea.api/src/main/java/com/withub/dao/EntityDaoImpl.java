package com.withub.dao;


import com.withub.common.util.CollectionUtil;
import com.withub.common.util.DateUtil;
import com.withub.model.entity.AbstractBaseEntity;
import com.withub.model.entity.AbstractEntity;
import com.withub.model.entity.query.QueryArgs;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;


public class EntityDaoImpl implements EntityDao {

    @PersistenceContext
    private EntityManager em;


    public void save(Object entity) {

        //em.persist(entity);
        em.merge(entity);
    }

    public <T> T getObject(Class<T> entityClass, Object pk) {

        return em.find(entityClass, pk);
    }

    public <T> T getObject(String jpql, Object... params) {

        T object = null;
        Query query = em.createQuery(jpql);
        if (CollectionUtil.isNotEmpty(params)) {
            for (int i = 0, j = params.length; i < j; i++) {
                query.setParameter(i + 1, params[i]);
            }
        }
        List list = query.getResultList();
        if (CollectionUtil.isNotEmpty(list)) {
            object = (T) list.get(0);
        }
        return object;
    }

    public <T> T getByPropertyValue(Class<T> entityClass, String propertyName, Object propertyValue) {

//        String jpql = "select o from " + entityClass.getName() + " o where 1=1 and lower(o." + propertyName + ")=?";
        String jpql = "select o from " + entityClass.getName() + " o where 1=1 and o." + propertyName + "=?";
        T object = (T) getObject(jpql, propertyValue);
        return object;
    }


    public void update(Object entity) {

        em.merge(entity);
    }


    public void delete(Class entityClass, Object primaryKey) {

        em.remove(em.getReference(entityClass, primaryKey));
    }


    public void delete(Object entity) {

        em.remove(entity);
    }


    public void logicDelete(AbstractBaseEntity entity) throws Exception {

        entity = getObject(entity.getClass(), entity.getObjectId());
        entity.setLastUpdateTime(DateUtil.getCurrentTime());
        entity.setObjectStatus(0);
        em.merge(entity);
    }


    public void logicDelete(Class<? extends AbstractEntity> clazz, final String objectId) throws Exception {

        AbstractBaseEntity entity = (AbstractBaseEntity) getObject(clazz, objectId);
        logicDelete(entity);
    }


    public <T> List<T> listByJpql(String jpql, Object... params) {

        Query query = em.createQuery(jpql);
        if (CollectionUtil.isNotEmpty(params)) {
            for (int i = 0, j = params.length; i < j; i++) {
                query.setParameter(i + 1, params[i]);
            }
        }
        List<T> list = query.getResultList();
        return list;
    }


    public <T> List<T> listByJpql(final int firstResult, final int maxResult, String jpql, Object... params) {

        Query query = em.createQuery(jpql);
        if (CollectionUtil.isNotEmpty(params)) {
            for (int i = 0, j = params.length; i < j; i++) {
                query.setParameter(i + 1, params[i]);
            }
        }
        query.setFirstResult(firstResult);
        query.setMaxResults(maxResult);
        List<T> list = query.getResultList();
        return list;
    }


    public <T> List<T> listByPropertyValue(Class<T> entityClass, String propertyName, Object propertyValue) {

        String jpql = "select o from " + entityClass.getName() + " o where 1=1 and lower(o." + propertyName + ")=?";
        List<T> list = listByJpql(jpql, propertyValue);
        return list;
    }


    public int executeJpql(String jpql, Object... params) {

        Query query = em.createQuery(jpql);
        if (CollectionUtil.isNotEmpty(params)) {
            for (int i = 0, j = params.length; i < j; i++) {
                query.setParameter(i + 1, params[i]);
            }
        }
        return query.executeUpdate();
    }

    public int executeSql(String sql, Object... params) throws Exception {

        Query query = em.createNativeQuery(sql);
        if (CollectionUtil.isNotEmpty(params)) {
            for (int i = 0, j = params.length; i < j; i++) {
                query.setParameter(i + 1, params[i]);
            }
        }
        return query.executeUpdate();
    }


    public List listBySql(String sql, Object... params) throws Exception {

        Query query = em.createNativeQuery(sql);
        if (CollectionUtil.isNotEmpty(params)) {
            for (int i = 0, j = params.length; i < j; i++) {
                query.setParameter(i + 1, params[i]);
            }
        }
        List list = query.getResultList();
        return list;
    }

    public Double executeDoubleScalar(String sql, Object... params) throws Exception {

        Double retValue = null;
        List list = listBySql(sql, params);
        if (list.size() > 0) {
            retValue = Double.parseDouble((list.get(0)).toString());
        }
        return retValue;
    }

    public RecordsetInfo query(QueryInfo queryInfo) throws Exception {

        RecordsetInfo recordsetInfo = new RecordsetInfo();
        recordsetInfo.setRecordsetSize(queryInfo.getRecordsetSize());
        recordsetInfo.setRecordsetIndex(queryInfo.getRecordsetIndex());

        QueryArgs queryArgs = HqlUtil.generateQueryArgs(queryInfo);

        // 查询记录总数
        Query countQuery = em.createQuery(queryArgs.getCountHql());
        queryArgs.getHqlParameterBinder().bindParameters(countQuery);
        int totalCount = Integer.parseInt(countQuery.getSingleResult().toString());
        recordsetInfo.setTotalRecordCount(totalCount);

        String hql = queryArgs.getHql();

        if (totalCount > 0) {
            Query query = em.createQuery(hql);
            queryArgs.getHqlParameterBinder().bindParameters(query);
            query.setFirstResult(recordsetInfo.getRecordsetIndex() * recordsetInfo.getRecordsetSize());
            query.setMaxResults(recordsetInfo.getRecordsetSize());
            List entityList = query.getResultList();

            recordsetInfo.setTotalRecordsetCount((int) Math.ceil((totalCount + 0.0) / recordsetInfo.getRecordsetSize()));
            recordsetInfo.setEntityList(entityList);
        }

        return recordsetInfo;

    }

}
