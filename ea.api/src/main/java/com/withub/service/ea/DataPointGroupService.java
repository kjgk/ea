package com.withub.service.ea;

import com.withub.model.ea.DataPointGroup;
import com.withub.model.ea.DataPointGroupCategory;
import com.withub.model.entity.enumeration.EntityRowMoveType;

import java.util.List;

public interface DataPointGroupService {

    public DataPointGroupCategory getRootEntity() throws Exception;

    public DataPointGroupCategory getDataPointGroupCategoryByObjectId(String dataPointGroupCategoryId) throws Exception;

    public void updateDataPointGroupCategory(DataPointGroupCategory dataPointGroupCategory) throws Exception;

    public void saveDataPointGroupCategory(DataPointGroupCategory dataPointGroupCategory) throws Exception;

    public void deleteDataPointGroupCategory(String dataPointGroupCategoryId) throws Exception;

    public List<DataPointGroup> listByDataPointGroupCategoryId(String parentId) throws Exception;

    public List<DataPointGroup> listByDataPointGroupCategorys(List<DataPointGroupCategory> dataPointGroupCategoryList) throws Exception;

    public DataPointGroup getDataPointGroupByObjectId(String dataPointGroupId) throws Exception;

    public void updateDataPointGroup(DataPointGroup dataPointGroup) throws Exception;

    public void saveDataPointGroup(DataPointGroup dataPointGroup) throws Exception;

    public void saveDataPointGroups(String dataPointGroupCategoryId, String dataPointIds) throws Exception;

    public void deleteDataPointGroup(String dataPointGroupId) throws Exception;

    public void moveDataPointGroupRow(String dataPointGroupId, final EntityRowMoveType moveType) throws Exception;

    public void moveDataPointGroupCategoryRow(String dataPointGroupCategoryId, final EntityRowMoveType moveType) throws Exception;

    public List<DataPointGroupCategory> getAllValidDataPointGroupCategory() throws Exception;

    public void getAllDataPointGroupCategoryById(DataPointGroupCategory dataPointGroupCategory, List<DataPointGroupCategory> dataPointGroupCategoryList) throws Exception;
}
