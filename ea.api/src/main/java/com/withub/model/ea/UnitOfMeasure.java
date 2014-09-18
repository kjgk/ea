package com.withub.model.ea;

import com.withub.model.entity.AbstractEntity;

import javax.persistence.Table;

@javax.persistence.Entity
@Table(name = "ea_measureunit")
public class UnitOfMeasure extends AbstractEntity {

    //=============================== 属性声明 ============================================================

    private String unitOfMeasureID;

    private String unitOfMeasureName;

    private String measureType;

    private String displayNameShort;

    private String displayNameSingular;

    private String displayNamePlural;

    private String databaseTag;

    //=============================== 属性方法 ============================================================

    public String getUnitOfMeasureName() {

        return unitOfMeasureName;
    }

    public void setUnitOfMeasureName(String unitOfMeasureName) {

        this.unitOfMeasureName = unitOfMeasureName;
    }

    public String getMeasureType() {

        return measureType;
    }

    public void setMeasureType(String measureType) {

        this.measureType = measureType;
    }

    public String getDisplayNameShort() {

        return displayNameShort;
    }

    public void setDisplayNameShort(String displayNameShort) {

        this.displayNameShort = displayNameShort;
    }

    public String getDisplayNameSingular() {

        return displayNameSingular;
    }

    public void setDisplayNameSingular(String displayNameSingular) {

        this.displayNameSingular = displayNameSingular;
    }

    public String getDisplayNamePlural() {

        return displayNamePlural;
    }

    public void setDisplayNamePlural(String displayNamePlural) {

        this.displayNamePlural = displayNamePlural;
    }

    public String getDatabaseTag() {

        return databaseTag;
    }

    public void setDatabaseTag(String databaseTag) {

        this.databaseTag = databaseTag;
    }

    public String getUnitOfMeasureID() {
        return unitOfMeasureID;
    }

    public void setUnitOfMeasureID(String unitOfMeasureID) {
        this.unitOfMeasureID = unitOfMeasureID;
    }
}
