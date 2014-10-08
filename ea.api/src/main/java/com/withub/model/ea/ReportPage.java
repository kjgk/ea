package com.withub.model.ea;

import com.withub.model.entity.AbstractBaseEntity;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "EA_REPORTPAGE")
public class ReportPage extends AbstractBaseEntity {

    //========================== 属性声明 ================================================================

    private String name;

    private String jsonContent;

    //========================== 属性方法 ================================================================

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJsonContent() {
        return jsonContent;
    }

    public void setJsonContent(String jsonContent) {
        this.jsonContent = jsonContent;
    }
}
