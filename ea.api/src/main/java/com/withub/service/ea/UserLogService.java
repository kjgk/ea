package com.withub.service.ea;

import com.withub.model.ea.UserLog;
import com.withub.model.system.po.User;

import java.util.List;

public interface UserLogService {

    public void addUserLog(UserLog userLog) throws Exception;

    public void updateUserLog(UserLog userLog) throws Exception;

    public UserLog getUserLogById(final String objectId);

    public User getUserById(String objectId);

    public List<UserLog> listUserLog(String userId, Integer limit) throws Exception;
}
