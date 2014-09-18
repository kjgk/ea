package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "EA_REPORTEXPORTSCHEDULE")
public class ReportExportSchedule extends AbstractBaseEntity {

    //========================== 属性声明 ================================================================

    private String name;

    private String reCurrenceTimeUnit;

    private Integer reCurrenceValue;

    private Date startDate;

    private String reCurringTime;

    private String rePortNameTemplate;

    private Date nextTime;

    @JsonIgnore
    @OneToMany(targetEntity = ReportExportScheduleDetail.class, mappedBy = "reportExportSchedule", fetch = FetchType.LAZY)
    private List<ReportExportScheduleDetail> detailList = new ArrayList<ReportExportScheduleDetail>();

    @ManyToOne(targetEntity = DataPointGroupCategory.class)
    @JoinColumn(name = "dataPointGroupCategoryId")
    private DataPointGroupCategory dataPointGroupCategory;

    private String timeUnit;

    private String sortType;

    private String sectionTypes;

    private String incrementTypes;

    private Integer precision;

    private String collectLabel;

    //========================== 属性方法 ================================================================


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReCurrenceTimeUnit() {
        return reCurrenceTimeUnit;
    }

    public void setReCurrenceTimeUnit(String reCurrenceTimeUnit) {
        this.reCurrenceTimeUnit = reCurrenceTimeUnit;
    }

    public Integer getReCurrenceValue() {
        return reCurrenceValue;
    }

    public void setReCurrenceValue(Integer reCurrenceValue) {
        this.reCurrenceValue = reCurrenceValue;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getReCurringTime() {
        return reCurringTime;
    }

    public void setReCurringTime(String reCurringTime) {
        this.reCurringTime = reCurringTime;
    }

    public String getRePortNameTemplate() {
        return rePortNameTemplate;
    }

    public void setRePortNameTemplate(String rePortNameTemplate) {
        this.rePortNameTemplate = rePortNameTemplate;
    }

    public List<ReportExportScheduleDetail> getDetailList() {
        return detailList;
    }

    public void setDetailList(List<ReportExportScheduleDetail> detailList) {
        this.detailList = detailList;
    }

    public Date getNextTime() {
        return nextTime;
    }

    public void setNextTime(Date nextTime) {
        this.nextTime = nextTime;
    }

    public DataPointGroupCategory getDataPointGroupCategory() {
        return dataPointGroupCategory;
    }

    public void setDataPointGroupCategory(DataPointGroupCategory dataPointGroupCategory) {
        this.dataPointGroupCategory = dataPointGroupCategory;
    }

    public String getTimeUnit() {
        return timeUnit;
    }

    public void setTimeUnit(String timeUnit) {
        this.timeUnit = timeUnit;
    }

    public String getSortType() {
        return sortType;
    }

    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    public String getSectionTypes() {
        return sectionTypes;
    }

    public void setSectionTypes(String sectionTypes) {
        this.sectionTypes = sectionTypes;
    }

    public Integer getPrecision() {
        return precision;
    }

    public void setPrecision(Integer precision) {
        this.precision = precision;
    }

    public String getIncrementTypes() {
        return incrementTypes;
    }

    public void setIncrementTypes(String incrementTypes) {
        this.incrementTypes = incrementTypes;
    }

    public String getCollectLabel() {
        return collectLabel;
    }

    public void setCollectLabel(String collectLabel) {
        this.collectLabel = collectLabel;
    }
}
