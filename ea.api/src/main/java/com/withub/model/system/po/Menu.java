package com.withub.model.system.po;

import com.withub.model.ea.Page;
import com.withub.model.entity.AbstractBaseEntity;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_MENU")
public class Menu extends AbstractBaseEntity {

    //================================ 属性声明 ===========================================================

    private String name;

    private String url;

    private Integer menuStyle;

    private String image;

    private Integer expand;

    private Integer openMode;

    private Integer visible;

    private Integer menuType;

    private Integer orderNo;

    @ManyToOne(targetEntity = Menu.class)
    @JoinColumn(name = "parentId")
    private Menu parent;

    @OneToMany(targetEntity = Menu.class, mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy(value = "orderNo asc")
    @Where(clause = "objectStatus = 1")
    private List<Menu> childList = new ArrayList<Menu>();

    @OneToOne(targetEntity = Page.class, mappedBy = "menu", fetch = FetchType.LAZY)
    private Page page;

    //=============================== 属性方法 ===========================================================

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getUrl() {

        return url;
    }

    public void setUrl(String url) {

        this.url = url;
    }

    public Integer getMenuStyle() {

        return menuStyle;
    }

    public void setMenuStyle(Integer menuStyle) {

        this.menuStyle = menuStyle;
    }

    public String getImage() {

        return image;
    }

    public void setImage(String image) {

        this.image = image;
    }

    public Integer getExpand() {

        return expand;
    }

    public void setExpand(Integer expand) {

        this.expand = expand;
    }

    public Integer getOpenMode() {

        return openMode;
    }

    public void setOpenMode(Integer openMode) {

        this.openMode = openMode;
    }

    public Integer getVisible() {

        return visible;
    }

    public void setVisible(Integer visible) {

        this.visible = visible;
    }

    public Integer getMenuType() {

        return menuType;
    }

    public void setMenuType(Integer menuType) {

        this.menuType = menuType;
    }

    public Integer getOrderNo() {

        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {

        this.orderNo = orderNo;
    }

    public Menu getParent() {

        return parent;
    }

    public void setParent(Menu parent) {

        this.parent = parent;
    }

    public List<Menu> getChildList() {

        return childList;
    }

    public void setChildList(List<Menu> childList) {

        this.childList = childList;
    }

    public Page getPage() {

        return page;
    }

    public void setPage(Page page) {

        this.page = page;
    }
}
