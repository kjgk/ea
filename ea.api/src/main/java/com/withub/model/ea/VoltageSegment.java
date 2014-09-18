package com.withub.model.ea;


import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Table(name = "EA_VOLTAGESEGMENT")
public class VoltageSegment extends AbstractEntity {

    private String name;

    private String beginValue;

    private String endValue;


    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getBeginValue() {

        return beginValue;
    }

    public void setBeginValue(String beginValue) {

        this.beginValue = beginValue;
    }

    public String getEndValue() {

        return endValue;
    }

    public void setEndValue(String endValue) {

        this.endValue = endValue;
    }
}
