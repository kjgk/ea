package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "EA_WIDGETINFO")
public class WidgetInfo extends AbstractEntity {

    private static final long serialVersionUID = 1L;

    //================================ 属性声明 ===========================================================
    @OneToOne(targetEntity = Widget.class)
    @JoinColumn(name = "widgetId")
    private Widget widget;

    private String location;

    private String description;

    private String sourceCode;

    //=============================== 属性方法 ===========================================================

    public Widget getWidget() {

        return widget;
    }

    public void setWidget(Widget widget) {

        this.widget = widget;
    }

    public String getLocation() {

        return location;
    }

    public void setLocation(String location) {

        this.location = location;
    }

    public String getDescription() {

        return description;
    }

    public void setDescription(String description) {

        this.description = description;
    }

    public String getSourceCode() {

        return sourceCode;
    }

    public void setSourceCode(String sourceCode) {

        this.sourceCode = sourceCode;
    }
}
