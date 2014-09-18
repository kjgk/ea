package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_DATAPOINTGROUPCATEGORY")
public class DataPointGroupCategory extends AbstractBaseEntity {

    //================================ 属性声明 ===========================================================

    private String name;

    private Integer orderNo;

    private String description;

    @ManyToOne(targetEntity = DataPointGroupCategory.class)
    @JoinColumn(name = "ParentId")
    private DataPointGroupCategory parent;

    @OneToMany(targetEntity = DataPointGroupCategory.class, mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy(value = "orderNo asc")
    @Where(clause = "objectStatus = 1")
    private List<DataPointGroupCategory> childList = new ArrayList<DataPointGroupCategory>();

    @Transient
    private List<DataPointGroup> dataPointGroupList;

    //================================ 属性方法 ===========================================================


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DataPointGroupCategory getParent() {
        return parent;
    }

    public void setParent(DataPointGroupCategory parent) {
        this.parent = parent;
    }

    public List<DataPointGroupCategory> getChildList() {
        return childList;
    }

    public void setChildList(List<DataPointGroupCategory> childList) {
        this.childList = childList;
    }

    public List<DataPointGroup> getDataPointGroupList() {
        return dataPointGroupList;
    }

    public void setDataPointGroupList(List<DataPointGroup> dataPointGroupList) {
        this.dataPointGroupList = dataPointGroupList;
    }

}