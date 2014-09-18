package com.withub.model.ea;

import com.withub.model.system.po.Menu;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "EA_PAGE")
public class Page implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String objectId;

    @OneToOne(targetEntity = Menu.class)
    @JoinColumn(name = "menuId")
    private Menu menu;

    private Integer width;

    private Integer height;

    private String backgroundImage;

    private Integer status;

    @OneToMany(targetEntity = PageWidget.class, mappedBy = "page", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PageWidget> pageWidgetList;


    public String getObjectId() {

        return objectId;
    }

    public void setObjectId(String id) {

        this.objectId = id;
    }

    public List<PageWidget> getPageWidgetList() {

        return pageWidgetList;
    }

    public void setPageWidgetList(List<PageWidget> pageWidgetList) {

        this.pageWidgetList = pageWidgetList;
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

    public String getBackgroundImage() {

        return backgroundImage;
    }

    public void setBackgroundImage(String backgroundImage) {

        this.backgroundImage = backgroundImage;
    }

    public Menu getMenu() {

        return menu;
    }

    public void setMenu(Menu menu) {

        this.menu = menu;
    }

    public Integer getStatus() {

        return status;
    }

    public void setStatus(Integer status) {

        this.status = status;
    }
}
