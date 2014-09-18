package com.withub.util;

import com.withub.common.util.DateUtil;

import java.util.Date;

public class PartitionTableUtil {

    public static void main(String[] args) {

        Date beginDate = DateUtil.convertStringToDate("2000-01-01", DateUtil.STANDARD_DATE_FORMAT);
        Date endDate = DateUtil.convertStringToDate("2100-12-30", DateUtil.STANDARD_DATE_FORMAT);

        StringBuffer tablesb = new StringBuffer();
        StringBuffer trigersb = new StringBuffer();
        trigersb.append("create or replace function ea_pointactualvalue_insert_trigger() \n"
                + "returns trigger as  $$\n"
                + "begin \n");
        int index = 0;
        while (DateUtil.getDiffMonths(beginDate, endDate) >= 0) {
            String suffix = DateUtil.getDateFormatString(beginDate, "yyyyMM");
            String tableName = "pav.ea_pointactualvalue" + suffix;
            Date date = DateUtil.convertStringToDate(suffix + "01", "yyyyMMdd");

            tablesb.append("create Table " + tableName + "("
                    + " CHECK (utcdatetime >= timestamp '" + DateUtil.getDateFormatString(DateUtil.getBeginDate(date), DateUtil.STANDARD_DATETIME_FORMAT)
                    + "' AND utcdatetime < timestamp '" + DateUtil.getDateFormatString(DateUtil.getBeginDate(DateUtil.addMonths(date, 1)), DateUtil.STANDARD_DATETIME_FORMAT)
                    + "' )) INHERITS (ea_pointactualvalue);\n");
//            tablesb.append("drop index pav.i_pointactualvalue" + suffix +";\n");
            tablesb.append("create unique index i_pointactualvalue" + suffix + " on " + tableName + "(pointid,utcdatetime,databasetag);\n\n");
            if (index > 0) {
                trigersb.append("els");
            }
            trigersb.append("if ( new.utcdatetime >= timestamp '" + DateUtil.getDateFormatString(DateUtil.getBeginDate(date), DateUtil.STANDARD_DATETIME_FORMAT) + "' and \n" +
                    " new.utcdatetime < timestamp '" + DateUtil.getDateFormatString(DateUtil.getBeginDate(DateUtil.addMonths(date, 1)), DateUtil.STANDARD_DATETIME_FORMAT) + "') then \n" +
                    " insert into " + tableName + " values (new.*);\n");

            beginDate = DateUtil.addMonths(beginDate, 1);
            index++;
        }
        trigersb.append("else \n raise exception 'utcdatetime out of range!'; \n" +
                "end if;  \nreturn null;  \nend;  \n$$  \nlanguage plpgsql;");

        System.out.println("--分区表200001~210012\n");
        System.out.println(tablesb.toString());
        System.out.println("\n\n--触发器函数\n");
        System.out.println(trigersb.toString());
    }
}
