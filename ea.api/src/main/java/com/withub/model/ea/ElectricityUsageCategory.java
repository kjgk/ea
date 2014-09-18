package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_ELECTRICITYUSAGECATEGORY")
public class ElectricityUsageCategory extends AbstractEntity {

    private String name;

    @ManyToOne(targetEntity = ElectricityUsageCategory.class)
    @JoinColumn(name = "parentId")
    private ElectricityUsageCategory parent;

    private String description;

    private Integer orderNo;

    @OneToMany(targetEntity = ElectricityUsageCategory.class, mappedBy = "parent", fetch = FetchType.LAZY)
    @OrderBy(value = "orderNo asc")
    @JsonIgnore
    private List<ElectricityUsageCategory> childList = new ArrayList<ElectricityUsageCategory>();

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public ElectricityUsageCategory getParent() {

        return parent;
    }

    public void setParent(ElectricityUsageCategory parent) {

        this.parent = parent;
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

    public List<ElectricityUsageCategory> getChildList() {

        return childList;
    }

    public void setChildList(List<ElectricityUsageCategory> childList) {

        this.childList = childList;
    }
}
