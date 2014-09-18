package com.withub.model.system.po;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EA_ROLEMENU")
public class RoleMenu extends AbstractEntity {

    @ManyToOne(targetEntity = Role.class)
    @JoinColumn(name = "roleId")
    private Role role;

    @ManyToOne(targetEntity = Menu.class)
    @JoinColumn(name = "menuId")
    private Menu menu;

    public Role getRole() {

        return role;
    }

    public void setRole(Role role) {

        this.role = role;
    }

    public Menu getMenu() {

        return menu;
    }

    public void setMenu(Menu menu) {

        this.menu = menu;
    }
}
