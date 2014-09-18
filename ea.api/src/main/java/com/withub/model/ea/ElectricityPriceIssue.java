package com.withub.model.ea;


import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Date;


@Entity
@Table(name = "EA_ELECTRICITYPRICEISSUE")
public class ElectricityPriceIssue extends AbstractBaseEntity {

    private String name;

    private Date startDate;

    private Date endDate;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public Date getStartDate() {

        return startDate;
    }

    public void setStartDate(Date startDate) {

        this.startDate = startDate;
    }

    public Date getEndDate() {

        return endDate;
    }

    public void setEndDate(Date endDate) {

        this.endDate = endDate;
    }
}
