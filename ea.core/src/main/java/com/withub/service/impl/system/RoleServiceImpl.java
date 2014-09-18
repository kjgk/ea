package com.withub.service.impl.system;

import com.withub.common.util.DateUtil;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.exception.BaseBusinessException;
import com.withub.model.system.enumeration.SystemConstant;
import com.withub.model.system.po.Role;
import com.withub.model.system.po.User;
import com.withub.service.system.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("roleService")
@Transactional
public class RoleServiceImpl implements RoleService {

    @Autowired
    private EntityDao entityDao;

    public Role getRoleById(String id) throws Exception {

        return entityDao.getObject(Role.class, id);
    }

    public List<Role> findAll() throws Exception {

        String jpql = "select o from " + Role.class.getName() + " o"
                + " where o.objectStatus=1 order by o.orderNo";
        return entityDao.listByJpql(jpql);
    }

    public void updateRole(Role role) throws Exception {

        Role old = getRoleById(role.getObjectId());
        if (!StringUtil.compareValue(old.getName(), role.getName())) {
            if (checkRoleExists(role.getName())) {
                throw new BaseBusinessException("", "用户级别[" + role.getName() + "]已经存在.");
            }
        }
        role.setCreateTime(old.getCreateTime());
        role.setLastUpdateTime(DateUtil.getCurrentTime());
        role.setObjectVersion(1);
        role.setObjectStatus(1);

        entityDao.update(role);
    }

    public void saveRole(Role role) throws Exception {

        if (checkRoleExists(role.getName())) {
            throw new BaseBusinessException("", "用户级别[" + role.getName() + "]已经存在.");
        }
        role.setCreateTime(DateUtil.getCurrentTime());
        role.setLastUpdateTime(DateUtil.getCurrentTime());
        role.setObjectVersion(1);
        role.setObjectStatus(1);
        entityDao.save(role);
    }

    public boolean checkRoleExists(String roleName) throws Exception {

        Role role = entityDao.getByPropertyValue(Role.class, "name", roleName.trim().toLowerCase());
        return role != null;

    }

    public void deleteRole(String id) throws Exception {

        entityDao.logicDelete(Role.class, id);
    }

    public List<User> listRoleUser(String objectId) throws Exception {

        String jpql = "select o from " + User.class.getName() + " o where o.role.objectId = ?  and o.objectStatus = 1"
                + " and o.objectId <>'" + SystemConstant.USER_ADMINISTOR + "' "
                + " order by o.orderNo";
        return entityDao.listByJpql(jpql, objectId);
    }
}
