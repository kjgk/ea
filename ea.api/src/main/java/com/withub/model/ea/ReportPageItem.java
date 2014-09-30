package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EA_REPORTPAGEWIDGET")
public class ReportPageItem extends AbstractEntity {

    @ManyToOne(targetEntity = ReportPage.class)
    @JoinColumn(name = "ReportPageId")
    private ReportPage reportPage;

    @ManyToOne(targetEntity = PageWidget.class)
    @JoinColumn(name = "PageWidgetId")
    private PageWidget pageWidget;

    public ReportPage getReportPage() {
        return reportPage;
    }

    public void setReportPage(ReportPage reportPage) {
        this.reportPage = reportPage;
    }

    public PageWidget getPageWidget() {
        return pageWidget;
    }

    public void setPageWidget(PageWidget pageWidget) {
        this.pageWidget = pageWidget;
    }
}
