package com.withub.service.system;


import com.withub.model.system.po.Role;
import com.withub.model.system.po.User;

import java.util.List;

public interface RoleService {

    public Role getRoleById(String id) throws Exception;

    public List<Role> findAll() throws Exception;

    public void updateRole(Role role) throws Exception;

    public void saveRole(Role role) throws Exception;

    public boolean checkRoleExists(String roleName) throws Exception;

    public void deleteRole(String id) throws Exception;

    public List<User> listRoleUser(String objectId) throws Exception;
}
