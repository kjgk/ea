package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EA_REPORTEXPORTSCHEDULEDETAIL")
public class ReportExportScheduleDetail extends AbstractEntity {

    //========================== 属性声明 ================================================================

    @ManyToOne(targetEntity = ReportExportSchedule.class)
    @JoinColumn(name = "reportExportScheduleId")
    private ReportExportSchedule reportExportSchedule;

    private Integer exportMeans;

    private Integer exportMax;

    private Integer exportMin;

    private Integer exportSectionOriginal;

    private Integer exportAddOriginal;

    private Integer exportIncrement;

    private Integer decimalCount;

    private Integer sortType;

    //========================== 属性方法 ================================================================

    public ReportExportSchedule getReportExportSchedule() {
        return reportExportSchedule;
    }

    public void setReportExportSchedule(ReportExportSchedule reportExportSchedule) {
        this.reportExportSchedule = reportExportSchedule;
    }

    public Integer getExportMeans() {
        return exportMeans;
    }

    public void setExportMeans(Integer exportMeans) {
        this.exportMeans = exportMeans;
    }

    public Integer getExportMax() {
        return exportMax;
    }

    public void setExportMax(Integer exportMax) {
        this.exportMax = exportMax;
    }

    public Integer getExportMin() {
        return exportMin;
    }

    public void setExportMin(Integer exportMin) {
        this.exportMin = exportMin;
    }

    public Integer getExportSectionOriginal() {
        return exportSectionOriginal;
    }

    public void setExportSectionOriginal(Integer exportSectionOriginal) {
        this.exportSectionOriginal = exportSectionOriginal;
    }

    public Integer getExportAddOriginal() {
        return exportAddOriginal;
    }

    public void setExportAddOriginal(Integer exportAddOriginal) {
        this.exportAddOriginal = exportAddOriginal;
    }

    public Integer getExportIncrement() {
        return exportIncrement;
    }

    public void setExportIncrement(Integer exportIncrement) {
        this.exportIncrement = exportIncrement;
    }

    public Integer getDecimalCount() {
        return decimalCount;
    }

    public void setDecimalCount(Integer decimalCount) {
        this.decimalCount = decimalCount;
    }

    public Integer getSortType() {
        return sortType;
    }

    public void setSortType(Integer sortType) {
        this.sortType = sortType;
    }
}
