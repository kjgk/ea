package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;
import com.withub.model.system.po.Menu;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ea_bigscreenscrollpage")
public class BigScreenScrollPage extends AbstractEntity {

    @OneToOne(targetEntity = Menu.class)
    @JoinColumn(name = "menuId")
    private Menu menu;

    private Integer displayMinutes;

    private Integer orderNo;

    public Menu getMenu() {

        return menu;
    }

    public void setMenu(Menu menu) {

        this.menu = menu;
    }

    public Integer getDisplayMinutes() {

        return displayMinutes;
    }

    public void setDisplayMinutes(Integer displayMinutes) {

        this.displayMinutes = displayMinutes;
    }

    public Integer getOrderNo() {

        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {

        this.orderNo = orderNo;
    }
}
