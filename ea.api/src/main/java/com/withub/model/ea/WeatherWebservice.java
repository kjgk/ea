package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "EA_WEATHERWEBSERVICE")
public class WeatherWebservice extends AbstractEntity{

    private String name;

    private String webserviceTag;

    private String webserviceUrl;

    private String methodName;

    private Integer orderNo;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getWebserviceTag() {

        return webserviceTag;
    }

    public void setWebserviceTag(String webserviceTag) {

        this.webserviceTag = webserviceTag;
    }

    public String getWebserviceUrl() {

        return webserviceUrl;
    }

    public void setWebserviceUrl(String webserviceUrl) {

        this.webserviceUrl = webserviceUrl;
    }

    public String getMethodName() {

        return methodName;
    }

    public void setMethodName(String methodName) {

        this.methodName = methodName;
    }

    public Integer getOrderNo() {

        return orderNo;
    }

    public void setOrderNo(Integer orderNo) {

        this.orderNo = orderNo;
    }
}
