package com.withub.service.ea;


import com.withub.common.enumeration.TimeUnit;
import com.withub.model.DataExportInfo;
import com.withub.model.ea.PointActualValue;
import com.withub.model.ea.UnitOfMeasure;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.io.File;
import java.util.Date;
import java.util.List;

public interface UserPointDataService {

    public List<PointActualValue> queryUserPointData(String[] dataPoints, Date startTime, Date endTime, int pageNo, int pageSize) throws Exception;

    public String[] importUserPointData(String dataPointId, File file, String fileName) throws Exception;

    public int getCountUserPointData(String[] dataPoints, Date startTime, Date endTime) throws Exception;

    public List<UnitOfMeasure> listMeasureUnit();

    public RecordsetInfo queryUserDataPoint(QueryInfo queryInfo) throws Exception;

    public List queryUserPointDataReport(String[] dataPoints, Date startTime, Date endTime, final TimeUnit timeUnit, Integer precision, String sortType, String[] sectionTypes, String[] incrementTypes) throws Exception;

    public DataExportInfo exportUserPointDataReport(String[] dataPoints, Date startTime, Date endTime, TimeUnit timeUnit, Integer precision, String sortType, String[] sectionTypes, String[] incrementTypes, String collectLabel) throws Exception;

}
