package com.withub.service.system;


import com.withub.model.system.po.User;


public interface UserService {

    public User getUserById(final String userId) throws Exception;

    public User getUserByAccount(String account) throws Exception;

    public void createUser(User user) throws Exception;

    public void updateAccount(User user) throws Exception;

    public void updatePassword(User user) throws Exception;

    public void changePassword(String objectId, String oldPassword, String newPassword) throws Exception;

    public void deleteUser(String userId) throws Exception;

    public boolean checkAccountExists(String account) throws Exception;

    public String encryptPassword(final String salt, final String password) throws Exception;

}
