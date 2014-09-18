package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_WIDGETCATEGORY")
public class WidgetCategory extends AbstractBaseEntity {

    private static final long serialVersionUID = 1L;

    //================================ 属性声明 ===========================================================

    private String name;

    private Integer orderNo;

    @ManyToOne(targetEntity = WidgetCategory.class)
    @JoinColumn(name = "parentId")
    private WidgetCategory parent;

    @OneToMany(targetEntity = WidgetCategory.class, mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy(value = "orderNo asc")
    @Where(clause = "objectStatus = 1")
    private List<WidgetCategory> childList = new ArrayList<WidgetCategory>();

    @Transient
    private List<Widget> widgetList;

    //=============================== 属性方法 ===========================================================

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public Integer getOrderNo() {

        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {

        this.orderNo = orderNo;
    }

    public WidgetCategory getParent() {

        return parent;
    }

    public void setParent(WidgetCategory parent) {

        this.parent = parent;
    }

    public List<WidgetCategory> getChildList() {

        return childList;
    }

    public void setChildList(List<WidgetCategory> childList) {

        this.childList = childList;
    }

    public List<Widget> getWidgetList() {

        return widgetList;
    }

    public void setWidgetList(List<Widget> widgetList) {

        this.widgetList = widgetList;
    }
}
