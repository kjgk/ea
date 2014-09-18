package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "EA_REPORTEXPORTLOG")
public class ReportExportLog extends AbstractEntity {

    //========================== 属性声明 ================================================================

    private String name;

    private String path;

    private String fileName;

    private Date exportTime;

    @OneToOne(targetEntity = ReportExportSchedule.class)
    @JoinColumn(name = "reportExportScheduleId")
    private ReportExportSchedule reportExportSchedule;

    //========================== 属性方法 ================================================================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Date getExportTime() {
        return exportTime;
    }

    public void setExportTime(Date exportTime) {
        this.exportTime = exportTime;
    }

    public ReportExportSchedule getReportExportSchedule() {
        return reportExportSchedule;
    }

    public void setReportExportSchedule(ReportExportSchedule reportExportSchedule) {
        this.reportExportSchedule = reportExportSchedule;
    }
}
