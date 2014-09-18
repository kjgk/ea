package com.withub.service.impl.ea;

import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.UserLog;
import com.withub.model.entity.enumeration.OrderByType;
import com.withub.model.entity.query.*;
import com.withub.model.system.po.User;
import com.withub.service.ea.UserLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("userLogService")
@Transactional
public class UserLogServiceImpl implements UserLogService {

    @Autowired
    private EntityDao entityDao;


    public void addUserLog(UserLog userLog) throws Exception {

        userLog.setObjectId(StringUtil.getUuid());
        entityDao.save(userLog);
    }

    public void updateUserLog(UserLog userLog) throws Exception {

        entityDao.save(userLog);
    }

    public UserLog getUserLogById(String objectId) {

        return entityDao.getObject(UserLog.class, objectId);
    }

    public User getUserById(String objectId) {

        return entityDao.getObject(User.class, objectId);
    }

    public List<UserLog> listUserLog(String userId, Integer limit) throws Exception {

        QueryInfo queryInfo = new QueryInfo();
        queryInfo.setTargetEntity(UserLog.class);
        queryInfo.setRecordsetSize(limit);
        queryInfo.setRecordsetIndex(0);

        SqlExpressionConfig sqlExpressionConfig = new SqlExpressionConfig();
        sqlExpressionConfig.setPropertyName("user.objectId");
        sqlExpressionConfig.setPropertyValue(userId);
        sqlExpressionConfig.setSqlExpressionOperation(ExpressionOperation.Equals);
        QueryConditionNode queryConditionNode = new QueryConditionNode();
        queryConditionNode.setSqlExpressionConfig(sqlExpressionConfig);
        queryInfo.getQueryConditionTree().getUserConditionNode().appendNode(queryConditionNode);

        OrderByProperty orderByProperty = new OrderByProperty();
        orderByProperty.setPropertyName("logTime");
        orderByProperty.setOrderByType(OrderByType.Desc);
        queryInfo.getOrderByPropertyList().add(orderByProperty);

        RecordsetInfo<UserLog> recordsetInfo = entityDao.query(queryInfo);
        return recordsetInfo.getEntityList();
    }
}
