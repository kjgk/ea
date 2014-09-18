package com.withub.service.ea;


import com.withub.model.ea.*;
import com.withub.model.entity.query.QueryInfo;
import com.withub.model.entity.query.RecordsetInfo;

import java.util.List;

public interface ElectricityService {

    public void saveVoltageSegment(VoltageSegment voltageSegment);

    public void updateVoltageSegment(VoltageSegment voltageSegment);

    public void deleteVoltageSegment(String objectId);

    public VoltageSegment getVoltageSegment(String objectId);

    public RecordsetInfo queryVoltageSegment(QueryInfo queryInfo) throws Exception;

    //电价发布
    public void saveElectricityPriceIssue(ElectricityPriceIssue electricityPriceIssue);

    public void updateElectricityPriceIssue(ElectricityPriceIssue electricityPriceIssue);

    public void deleteElectricityPriceIssue(String objectId);

    public ElectricityPriceIssue getElectricityPriceIssue(String objectId);

    public RecordsetInfo queryElectricityPriceIssue(QueryInfo queryInfo) throws Exception;

    public ElectricityPriceIssue getCurrentElectricityPriceIssue() throws Exception;

    public List<ElectricityPriceIssue> listElectricityPriceIssue() throws Exception;

    //月段电价
    public void saveElectricityPriceMonthSegment(ElectricityPriceMonthSegment electricityPriceMonthSegment);

    public void updateElectricityPriceMonthSegment(ElectricityPriceMonthSegment electricityPriceMonthSegment);

    public void deleteElectricityPriceMonthSegment(String objectId);

    public ElectricityPriceMonthSegment getElectricityPriceMonthSegment(String objectId);

    public RecordsetInfo queryElectricityPriceMonthSegment(QueryInfo queryInfo) throws Exception;

    // 时间段电价
    public void saveElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment);

    public void updateElectricityPriceTimeSegment(ElectricityPriceTimeSegment electricityPriceTimeSegment);

    public void deleteElectricityPriceTimeSegment(String objectId) throws Exception;

    public ElectricityPriceTimeSegment getElectricityPriceTimeSegment(String objectId);

    public List<ElectricityPriceTimeSegment> getAllElectricityPriceTimeSegment();

    public RecordsetInfo queryElectricityPriceTimeSegment(QueryInfo queryInfo) throws Exception;

    public RecordsetInfo queryElectricityPriceTimeSegmentDetail(QueryInfo queryInfo) throws Exception;

//    public ElectricityPrice getRootEntity() throws Exception;

    public String queryElectricityPriceRange(String electricityPriceIssueId) throws Exception;

    public List<ElectricityPrice> getElectricityPricesByElectricityPriceElementIds(String electricityPriceElementIds, String electricityPriceIssueId) throws Exception;

    public void saveElectricityPriceRange(String dateTimePriceArray, String electricityPriceElementIds, String electricityPriceIssueId) throws Exception;
}
