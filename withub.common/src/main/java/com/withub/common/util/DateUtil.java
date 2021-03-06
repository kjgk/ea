package com.withub.common.util;

import com.withub.common.enumeration.TimeUnit;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * 日期工具类.
 */
public final class DateUtil {

    //==================================== 常量定义 ======================================================

    /**
     * 精简的日期字符串格式,只显示到月份
     */
    public static final String SIMPLIFY_DATE_FORMAT = "yyyy-MM";

    /**
     * 标准的日期字符串格式
     */
    public static final String STANDARD_DATE_FORMAT = "yyyy-MM-dd";

    /**
     * 标准的日期分钟字符串格式
     */
    public static final String STANDARD_DATEMINUTE_FORMAT = "yyyy-MM-dd HH:mm";

    /**
     * 标准的日期时间字符串格式
     */
    public static final String STANDARD_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    //==================================== 判断方法 ======================================================

    /**
     * 判断字符串是否是日期
     *
     * @param text 字符串
     * @return boolean
     */
    public static boolean isDate(final String text) {

        boolean result = true;
        SimpleDateFormat format = new SimpleDateFormat(STANDARD_DATE_FORMAT);

        try {
            format.parse(text);
        } catch (ParseException e) {
            result = false;
        }

        return result;
    }

    /**
     * 判断字符串是否是日期
     *
     * @param formatText 日期格式
     * @param text       字符串
     * @return boolean
     */
    public static boolean isDate(final String formatText, final String text) {

        boolean result = true;
        SimpleDateFormat format = new SimpleDateFormat(formatText);

        try {
            format.parse(text);
        } catch (ParseException e) {
            result = false;
        }

        return result;
    }

    //===================================== 格式化方法 ===================================================

    /**
     * 将日期对象格式化成指定的字符串格式
     *
     * @param date         日期对象
     * @param formatString 格式化字符串
     * @return String
     */
    public static String getDateFormatString(final Date date, final String formatString) {

        String dateString = "";
        SimpleDateFormat format = new SimpleDateFormat(formatString);
        if (date != null) {
            dateString = format.format(date);
        }
        return dateString;
    }

    /**
     * 将日期对象格式化成标准的日期格式
     *
     * @param date 日期对象
     * @return String
     */
    public static String getStandardDateString(final Date date) {

        return getDateFormatString(date, STANDARD_DATE_FORMAT);
    }

    /**
     * 将当前日期格式化成标准的日期格式
     *
     * @return String
     */
    public static String getNowStandardDateString() {

        return getStandardDateString(new Date());
    }

    /**
     * 将当前日期格式化成标准的日期分钟格式
     *
     * @return String
     */
    public static String getNowStandardMinuteString() {

        return getStandardMinuteString(new Date());
    }

    /**
     * 将当前日期格式化成标准的时间格式
     *
     * @return String
     */
    public static String getNowStandardSecondString() {

        return getStandardSecondString(new Date());
    }

    /**
     * 将日期对象格式化成标准的日期分钟格式
     *
     * @param date 日期对象
     * @return String
     */
    public static String getStandardMinuteString(final Date date) {

        return getDateFormatString(date, STANDARD_DATEMINUTE_FORMAT);
    }

    /**
     * 将日期对象格式化成标准的日期时间格式
     *
     * @param date 日期对象
     * @return String
     */
    public static String getStandardSecondString(final Date date) {

        return getDateFormatString(date, STANDARD_DATETIME_FORMAT);
    }

    /**
     * 获取当前时间
     *
     * @return Date
     */
    public static Date getCurrentTime() {

        return new Date();
    }

    /**
     * 获取当前年份
     *
     * @return int
     */
    public static int getCurrentYear() {

        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.YEAR);
    }

    /**
     * 判断闰年
     *
     * @param year 年份
     * @return boolean
     */
    public static boolean isLeapYear(final int year) {

        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    /**
     * 判断是否周末
     *
     * @param date 日期
     * @return boolean
     */
    public static boolean isWeekend(final Date date) {

        int dayIndex = getDayIndexOfWeek(date);

        return dayIndex == 5 || dayIndex == 6;
    }

    /**
     * 获取指定日期在一周内的位置
     *
     * @param date 日期
     * @return int
     */
    public static int getDayIndexOfWeek(final Date date) {

        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(date);
        int dayIndex = calendar.get(Calendar.DAY_OF_WEEK) - 2;

        return dayIndex < 0 ? 6 : dayIndex;
    }

    /**
     * 获取指定日期在一年的第几周
     *
     * @param date 日期
     * @return int
     */
    public static int getDayOfWeek(final Date date) {

        Calendar calendar = Calendar.getInstance();
        calendar.setFirstDayOfWeek(Calendar.MONDAY);
        calendar.setTime(date);
        int weekIndex = calendar.get(Calendar.WEEK_OF_YEAR);

        return weekIndex;
    }

    //====================================== 转化方法 ====================================================

    /**
     * 将字符串转化成日期,转化失败则返回指定的日期
     *
     * @param dateString  日期字符串
     * @param format      待转化的日期字符串的格式
     * @param defaultDate 转化失败后的返回值
     * @return Date
     */
    public static Date convertStringToDate(final String dateString, final String format, Date... defaultDate) {

        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        Date date = null;

        try {
            date = dateFormat.parse(dateString);
        } catch (ParseException e) {
            if (CollectionUtil.isNotEmpty(defaultDate)) {
                date = defaultDate[0];
            }
        }

        return date;
    }

    /**
     * 将字符串转化成日期,转化失败则返回指定的日期
     *
     * @param dateString 日期字符串
     * @param format     待转化的日期字符串的格式
     * @return Date
     */
    public static Date convertStringToDate(final String dateString, final String format) {

        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        Date date = null;

        try {
            date = dateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * 对日期对象进行年数加减
     *
     * @param date  日期对象
     * @param years 年数,如果要将日期向前推算则使用负数
     * @return Date
     */
    public static Date addYears(final Date date, final int years) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(cal.MONTH, years * 12);

        Date newDate = cal.getTime();
        return newDate;
    }


    /**
     * 对日期对象进行月数加减
     *
     * @param date   日期对象
     * @param months 月数,如果要将日期向前推算则使用负数
     * @return Date
     */
    public static Date addMonths(final Date date, final int months) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(cal.MONTH, months);

        Date newDate = cal.getTime();
        return newDate;
    }


    /**
     * 对日期对象进行天数加减
     *
     * @param date 日期对象
     * @param days 天数,如果要将日期向前推算则使用负数
     * @return Date
     */
    public static Date addDays(final Date date, final int days) {

        Date newDate = new Date(date.getTime() + (long) days * 24 * 60 * 60 * 1000);
        return newDate;
    }

    /**
     * 对日期对象进行小时加减
     *
     * @param date  日期对象
     * @param hours 小时,如果要将日期向前推算则使用负数
     * @return Date
     */
    public static Date addHours(final Date date, final int hours) {

        Date newDate = new Date(date.getTime() + (long) hours * 60 * 60 * 1000);
        return newDate;
    }

    /**
     * 对日期对象进行分钟加减
     *
     * @param date    日期对象
     * @param minutes 分钟,如果要将日期向前推算则使用负数
     * @return Date
     */
    public static Date addMinutes(final Date date, final int minutes) {

        Date newDate = new Date(date.getTime() + (long) minutes * 60 * 1000);
        return newDate;
    }

    /**
     * 对日期对象进行年月周日时分加减,如果要将日期向前推算则使用负数
     *
     * @param date 日期对象
     * @return Date
     */
    public static Date addTimes(final Date date, final int years, final int months, final int weeks, final int days, final int hours, final int minutes) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(cal.MONTH, years * 12 + months);

        Date newDate = cal.getTime();
        newDate = new Date(newDate.getTime() + (long) (((7 * weeks + days) * 24 + hours) * 60 + minutes) * 60 * 1000);
        return newDate;
    }

    /**
     * 获取两个日期间隔的月数
     *
     * @param begin 开始时间
     * @param end   结束时间
     * @return long
     */
    public static int getDiffMonths(final Date begin, final Date end) {

        Calendar beginCal = Calendar.getInstance();
        beginCal.setTime(begin);
        Calendar endCal = Calendar.getInstance();
        endCal.setTime(end);

        int months = endCal.get(Calendar.YEAR) * 12 + endCal.get(Calendar.MONTH) - beginCal.get(Calendar.YEAR) * 12 - beginCal.get(Calendar.MONTH);
        return months;
    }


    /**
     * 获取两个日期间隔的天数
     *
     * @param begin 开始时间
     * @param end   结束时间
     * @return long
     */
    public static long getDiffDays(final Date begin, final Date end) {

        long days = (end.getTime() - begin.getTime()) / (1000 * 60 * 60 * 24);
        return days;
    }

    /**
     * 获取两个日期间隔的小时数
     *
     * @param begin 开始时间
     * @param end   结束时间
     * @return long
     */
    public static long getDiffHours(final Date begin, final Date end) {

        long hours = (end.getTime() - begin.getTime()) / (1000 * 60 * 60);
        return hours;
    }

    /**
     * 获取两个日期间隔的分钟数
     *
     * @param begin 开始时间
     * @param end   结束时间
     * @return long
     */
    public static long getDiffMinutes(final Date begin, final Date end) {

        long minutes = (end.getTime() - begin.getTime()) / (1000 * 60);
        return minutes;
    }

    public static Date getEndDate(final Date date) {

        return DateUtil.convertStringToDate(DateUtil.getStandardDateString(date) + " 23:59:59", "yyyy-MM-dd HH:mm:ss", DateUtil.getCurrentTime());
    }

    public static Date getBeginDate(final Date date) {

        return DateUtil.convertStringToDate(DateUtil.getStandardDateString(date) + " 00:00:00", "yyyy-MM-dd HH:mm:ss", DateUtil.getCurrentTime());
    }

    /**
     * 根据时间单位获取两个日期之间的时间点
     *
     * @param startTime
     * @param endTime
     * @param timeUnit
     * @return
     */
    public static List<String> getDatetimePointList(Date startTime, Date endTime, TimeUnit timeUnit) {

        ArrayList<String> datetimeList = new ArrayList();
        if (timeUnit == TimeUnit.Year) {
            int year = Integer.parseInt(DateUtil.getDateFormatString(endTime, "yyyy")) - Integer.parseInt(DateUtil.getDateFormatString(startTime, "yyyy"));
            for (int i = 0; i <= year; i++) {
                datetimeList.add(String.valueOf(Integer.parseInt(DateUtil.getDateFormatString(startTime, "yyyy")) + i));
            }
        } else if (timeUnit == TimeUnit.Month) {
            int month = DateUtil.getDiffMonths(startTime, endTime);
            for (int i = 0; i <= month; i++) {
                datetimeList.add(DateUtil.getDateFormatString(DateUtil.addMonths(startTime, i), "yyyy-MM"));
            }
        } else if (timeUnit == TimeUnit.Week) {
            int week = DateUtil.getDayOfWeek(endTime) - DateUtil.getDayOfWeek(startTime);
            for (int i = 0; i <= week; i++) {
                datetimeList.add(String.valueOf(DateUtil.getDayOfWeek(startTime) + i));
            }
        } else if (timeUnit == TimeUnit.Day) {
            long day = DateUtil.getDiffDays(startTime, endTime);
            for (long i = 0; i <= day; i++) {
                datetimeList.add(DateUtil.getDateFormatString(DateUtil.addDays(startTime, Integer.parseInt(String.valueOf(i))), "yyyy-MM-dd"));
            }
        } else if (timeUnit == TimeUnit.Hour) {
            long hour = DateUtil.getDiffHours(startTime, endTime);
            for (long i = 0; i <= hour; i++) {
                datetimeList.add(DateUtil.getDateFormatString(DateUtil.addHours(startTime, Integer.parseInt(String.valueOf(i))), "yyyy-MM-dd HH"));
            }
        }

        return datetimeList;
    }

    /**
     * 获取两个日期之间的周时间段
     *
     * @param startTime
     * @param endTime
     * @return
     */
    public static List<String> getWeekList(Date startTime, Date endTime) {

        List<String> weekList = new ArrayList<String>();
        startTime = DateUtil.getBeginDate(startTime);
        endTime = DateUtil.getBeginDate(endTime);
        while (DateUtil.getDiffDays(startTime, endTime) >= 0) {
            Date beginWeekDay = startTime;
            Date endWeekDay = DateUtil.addDays(startTime, 6 - DateUtil.getDayIndexOfWeek(startTime));

            if (endWeekDay.after(endTime)) {
                endWeekDay = endTime;
            }
            if (DateUtil.getDateFormatString(beginWeekDay, "yyyy").equals(DateUtil.getDateFormatString(endWeekDay, "yyyy"))) {
                if (DateUtil.getDateFormatString(beginWeekDay, "yyyy-MM").equals(DateUtil.getDateFormatString(endWeekDay, "yyyy-MM"))) {
                    weekList.add(DateUtil.getDateFormatString(beginWeekDay, "yyyy/MM/dd") + "~" + DateUtil.getDateFormatString(endWeekDay, "dd"));
                } else {
                    weekList.add(DateUtil.getDateFormatString(beginWeekDay, "yyyy/MM/dd") + "~" + DateUtil.getDateFormatString(endWeekDay, "MM/dd"));
                }
            } else {
                weekList.add(DateUtil.getDateFormatString(beginWeekDay, "yyyy/MM/dd") + "~" + DateUtil.getDateFormatString(endWeekDay, "yyyy/MM/dd"));
            }
            startTime = DateUtil.addDays(endWeekDay, 1);
        }
        return weekList;
    }
}