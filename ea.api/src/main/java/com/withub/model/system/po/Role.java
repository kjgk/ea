package com.withub.model.system.po;


import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.Table;

@javax.persistence.Entity
@Table(name = "EA_ROLE")
public class Role extends AbstractBaseEntity {

    //======================= 属性声明 ===========================================

    private String name;

    private String roleTag;

    private Integer permission;

    private String description;

    private Integer orderNo;

    //======================= 属性方法 ===========================================

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getRoleTag() {

        return roleTag;
    }

    public void setRoleTag(String roleTag) {

        this.roleTag = roleTag;
    }


    public String getDescription() {

        return description;
    }

    public void setDescription(String description) {

        this.description = description;
    }

    public Integer getOrderNo() {

        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {

        this.orderNo = orderNo;
    }

    public Integer getPermission() {
        return permission;
    }

    public void setPermission(Integer permission) {
        this.permission = permission;
    }
}