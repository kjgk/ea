package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "EA_WIDGET")
public class Widget extends AbstractBaseEntity {

    private static final long serialVersionUID = 1L;

    //================================ 属性声明 ===========================================================
    @OneToOne(targetEntity = WidgetCategory.class)
    @JoinColumn(name = "widgetCategoryId")
    private WidgetCategory widgetCategory;

    private String name;

    private String widgetTag;

    private String widgetVersion;

    private Integer licenseWidget;

    private String license;

    private Date installTime;

    private Integer allowEvaluate;

    private Date evaluateExpiredTime;

    private String coverImage;

    private Integer status;

    private Integer orderNo;

    @Transient
    private String description;

    //=============================== 属性方法 ===========================================================

    public WidgetCategory getWidgetCategory() {

        return widgetCategory;
    }

    public void setWidgetCategory(WidgetCategory widgetCategory) {

        this.widgetCategory = widgetCategory;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getWidgetTag() {

        return widgetTag;
    }

    public void setWidgetTag(String widgetTag) {

        this.widgetTag = widgetTag;
    }

    public String getWidgetVersion() {

        return widgetVersion;
    }

    public void setWidgetVersion(String widgetVersion) {

        this.widgetVersion = widgetVersion;
    }

    public Integer getLicenseWidget() {

        return licenseWidget;
    }

    public void setLicenseWidget(Integer licenseWidget) {

        this.licenseWidget = licenseWidget;
    }

    public String getLicense() {

        return license;
    }

    public void setLicense(String license) {

        this.license = license;
    }

    public Date getInstallTime() {

        return installTime;
    }

    public void setInstallTime(Date installTime) {

        this.installTime = installTime;
    }

    public Integer getAllowEvaluate() {

        return allowEvaluate;
    }

    public void setAllowEvaluate(Integer allowEvaluate) {

        this.allowEvaluate = allowEvaluate;
    }

    public Date getEvaluateExpiredTime() {

        return evaluateExpiredTime;
    }

    public void setEvaluateExpiredTime(Date evaluateExpiredTime) {

        this.evaluateExpiredTime = evaluateExpiredTime;
    }

    public String getCoverImage() {

        return coverImage;
    }

    public void setCoverImage(String coverImage) {

        this.coverImage = coverImage;
    }

    public Integer getStatus() {

        return status;
    }

    public void setStatus(Integer status) {

        this.status = status;
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
}
