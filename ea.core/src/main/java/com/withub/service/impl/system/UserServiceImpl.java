package com.withub.service.impl.system;

import com.withub.common.util.DateUtil;
import com.withub.common.util.Md5Util;
import com.withub.common.util.StringUtil;
import com.withub.dao.EntityDao;
import com.withub.model.ea.UserLog;
import com.withub.model.exception.BaseBusinessException;
import com.withub.model.system.enumeration.LogType;
import com.withub.model.system.po.User;
import com.withub.service.ea.UserLogService;
import com.withub.service.system.UserService;
import com.withub.util.SpringSecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private EntityDao entityDao;

    @Autowired
    private UserLogService userLogService;

    public User getUserById(String userId) throws Exception {

        return entityDao.getObject(User.class, userId);
    }

    public User getUserByAccount(String account) throws Exception {

        String jpql = "select o from " + User.class.getName() + " o where 1=1 and o.account = ? and o.objectStatus = 1";
        return entityDao.getObject(jpql, account.trim());
    }


    public void deleteUser(String userId) throws Exception {

        User user = entityDao.getObject(User.class, userId);
        entityDao.logicDelete(user);

        UserLog userLog = new UserLog();
        Date date = DateUtil.getCurrentTime();
        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setLogTime(date);
        userLog.setLogType(LogType.DeleteUser.toString());
        userLog.setDescription("删除了 " + user.getAccount());
        userLogService.addUserLog(userLog);
    }


    public boolean checkAccountExists(String account) throws Exception {

        String jpql = "select o from " + User.class.getName() + " o where 1=1 and o.account = ? and o.objectStatus = 1";
        User user = entityDao.getObject(jpql, account.trim().toLowerCase());
        return user != null;

    }

    public String encryptPassword(String salt, String password) throws Exception {

        String md5Password = Md5Util.getStringMD5(salt + password);
        return md5Password.toUpperCase();
    }

    public void createUser(User user) throws Exception {

        UserLog userLog = new UserLog();
        Date date = DateUtil.getCurrentTime();
        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setLogTime(date);
        userLog.setLogType(LogType.CreateUser.toString());

        if (checkAccountExists(user.getAccount())) {
            userLog.setDescription(user.getAccount() + " 已经存在，创建新用户失败!");
            userLogService.addUserLog(userLog);
            throw new BaseBusinessException("", "[" + user.getAccount() + "]已经存在.");
        }

        user.setObjectId(StringUtil.getUuid());
        user.setName(user.getAccount());
        user.setPassword("123456");
        user.setSalt(StringUtil.getUuid());
        user.setPassword(encryptPassword(user.getSalt(), user.getPassword()));
        user.setCreateTime(DateUtil.getCurrentTime());
        user.setLastUpdateTime(DateUtil.getCurrentTime());
        user.setObjectVersion(1);
        user.setObjectStatus(1);
        entityDao.save(user);

        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setDescription("创建了新用户:" + user.getAccount());
        userLogService.addUserLog(userLog);
    }

    public void updateAccount(User user) throws Exception {

        User old = entityDao.getObject(User.class, user.getObjectId());

        UserLog userLog = new UserLog();
        Date date = DateUtil.getCurrentTime();
        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setLogTime(date);
        userLog.setLogType(LogType.UpdateUser.toString());

        if (!StringUtil.compareValue(old.getAccount(), user.getAccount())) {
            if (checkAccountExists(user.getAccount())) {
                userLog.setDescription(user.getAccount() + " 已经存在，修改失败");
                userLogService.addUserLog(userLog);
                throw new BaseBusinessException("", "[" + user.getAccount() + "]已经存在.");
            }
        }

        old.setAccount(user.getAccount());

        entityDao.save(old);
        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setDescription("修改了" + user.getAccount());
        userLogService.addUserLog(userLog);
    }

    public void updatePassword(User user) throws Exception {

        User temp = entityDao.getObject(User.class, user.getObjectId());
        temp.setSalt(StringUtil.getUuid());
        temp.setPassword(encryptPassword(temp.getSalt(), user.getPassword()));
        entityDao.save(temp);

        UserLog userLog = new UserLog();
        Date date = DateUtil.getCurrentTime();
        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setLogTime(date);
        userLog.setLogType(LogType.UpdatePassword.toString());
        userLog.setDescription("设置了" + temp.getAccount() + "密码");
        userLogService.addUserLog(userLog);
    }

    public void changePassword(String objectId, String oldPassword, String newPassword) throws Exception {

        User temp = entityDao.getObject(User.class, objectId);

        UserLog userLog = new UserLog();
        Date date = DateUtil.getCurrentTime();
        userLog.setUser(SpringSecurityUtil.getCurrentUser());
        userLog.setLogTime(date);
        userLog.setLogType(LogType.UpdatePassword.toString());
        if (StringUtil.compareValue(encryptPassword(temp.getSalt(), oldPassword), temp.getPassword())) {
            temp.setPassword(encryptPassword(temp.getSalt(), newPassword));
            entityDao.save(temp);
            userLog.setDescription("设置了" + temp.getAccount() + "密码");
            userLogService.addUserLog(userLog);
        } else {
            userLog.setDescription(" 当前密码不正确!");
            userLogService.addUserLog(userLog);
            throw new BaseBusinessException("CurrentPasswordError", "当前密码不正确。");
        }
    }
}
