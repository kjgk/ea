package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.*;

@Entity
@Table(name = "EA_PAGEWIDGET")
public class PageWidget extends AbstractEntity {

    private static final long serialVersionUID = 1L;

    //========================= 属性声明 ================================================================

    @ManyToOne(targetEntity = Page.class)
    @JoinColumn(name = "pageId")
    private Page page;

    private String name;

    private String widgetTag;

    private Integer width;

    private Integer height;

    @Column(name = "positiontop")
    private Integer top;

    @Column(name = "positionleft")
    private Integer left;

    private String widgetConfig;

    //========================= 属性方法 ================================================================

    public Page getPage() {

        return page;
    }

    public void setPage(Page page) {

        this.page = page;
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

    public Integer getWidth() {

        return width;
    }

    public void setWidth(Integer width) {

        this.width = width;
    }

    public Integer getHeight() {

        return height;
    }

    public void setHeight(Integer height) {

        this.height = height;
    }

    public Integer getTop() {

        return top;
    }

    public void setTop(Integer top) {

        this.top = top;
    }

    public Integer getLeft() {

        return left;
    }

    public void setLeft(Integer left) {

        this.left = left;
    }

    public String getWidgetConfig() {

        return widgetConfig;
    }

    public void setWidgetConfig(String widgetConfig) {

        this.widgetConfig = widgetConfig;
    }
}
