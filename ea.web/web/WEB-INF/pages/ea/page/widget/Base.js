Ext.define('withub.ext.ea.page.widget.Base', {

    config: {
        devMode: false
    },

    propertyRender: {
        color: function (v, md) {
            md.style = " background-color: #" + v + ";";
            return v;
        },
        dateTimeUnit: function (v) {
            return v.split('|')[0] + TimeNames[v.split('|')[1]]
        },
        swfUpload: function (v) {
            var fileNames = [];
            if (v) {
                var files = Ext.decode(v);
                Ext.each(files, function (file) {
                    fileNames.push(file['fileName']);
                });
            }
            return fileNames.join(',');
        },
        singleDataPoint: function (v) {
            var value = '';
            if (v) {
                var dataPoint = Ext.decode(v);
                ExtUtil.request({
                    async: false,
                    url: PageContext.contextPath + '/ea/dataPoint/load/' + dataPoint['dataPointId'],
                    success: function (result) {
                        value = result.data['name'];
                    }
                });
            }
            return value;
        },
        multiDataPoint: function (v) {
            var values = [];
            if (v) {
                var result = Ext.decode(v);
                var dataPointList;
                if (Ext.isArray(result)) {
                    dataPointList = result;
                } else {
                    dataPointList = result['dataPointList'];
                }
                Ext.each(dataPointList, function (dataPoint) {
                    ExtUtil.request({
                        async: false,
                        url: PageContext.contextPath + '/ea/dataPoint/load/' + dataPoint['dataPointId'],
                        success: function (result) {
                            values.push(result.data['name']);
                        }
                    });
                }, this);
            }
            return values.join(',');
        }
    },

    initWidgetConfig: function () {

        var defaultWidgetConfigValue = {};
        for (var key in this.getDefaultWidgetConfig()) {
            var widgetConfig = this.getDefaultWidgetConfig()[key];
            defaultWidgetConfigValue[key] = widgetConfig.value;
        }

        Ext.applyIf(this.getWidgetConfig(), defaultWidgetConfigValue);

        this.on('afterrender', function () {
            for (var key in this.getWidgetConfig()) {
                this.applyWidgetConfig(key, this.getWidgetConfig()[key]);
            }
        }, this);

        this.on('widgetconfigchange', function (property, value) {
            this.applyWidgetConfig(property, value);
        }, this);
    },

    getDefaultWidgetConfig: function () {
        return {};
    },

    getWidgetConfig: function () {

        this.widgetConfig = this.widgetConfig || {};
        return this.widgetConfig;
    },

    putWidgetConfig: function (config) {

        Ext.apply(this.getWidgetConfig(), config);
    },

    applyWidgetConfig: function (property, value) {

        if (property === 'refreshInterval') {
            this.attachRefreshTask(value);
        }
    },

    setTitle: function () {

    },

    attachRefreshTask: function (refreshInterval) {

        var interval = parseInt(refreshInterval.split('|')[0], 10);
        var intervalUnit = refreshInterval.split('|')[1];

        if (intervalUnit === 'Minute') {
            interval = interval * 60
        }

        if (intervalUnit === 'Hour') {
            interval = interval * 60 * 60;
        }

        if (intervalUnit === 'Day') {
            interval = interval * 60 * 60 * 24
        }

        if (this.refreshTask) {
            this.refreshTask.destroy();
        }

        this.refreshTask = Ext.TaskManager.start(Ext.TaskManager.newTask({
            run: function () {
                if (window.isActive === true) {
                    this.refreshTaskHandler();
                }
            },
            scope: this,
            fireOnStart: true,
            interval: interval * 1000
        }));
    },

    refreshTaskHandler: function () {
    },

    parseBeginDate: function (timeUnit, dateLimit) {

        var currentTime = new Date();
        var beginDate;
        if (timeUnit == "Year") {
            beginDate = moment(currentTime).add('years', -dateLimit);
        } else if (timeUnit == "Month") {
            beginDate = moment(currentTime).add('months', -dateLimit);
        } else if (timeUnit == "Day") {
            beginDate = moment(currentTime).add('days', -dateLimit + 1);
        } else if (timeUnit == "Hour") {
            beginDate = moment(currentTime).add('hours', -dateLimit);
        } else {
            beginDate = moment(currentTime).add('days', -2);
        }

        return new Date(beginDate);
    },

    mouseOverHandler: function (point, direction) {
        if (!point.series.xAxis.ticks[point.x] || !point.series.xAxis.ticks[point.x].label) {
            return
        }
        if (Ext.isDefined(direction) && direction == 'vertical') {
            point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.backgroundImage = 'url(' + PageContext.contextPath +
                '/images/widget/chart/verticalLabelBuoy.png)';
        } else {
            point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.backgroundImage = 'url(' + PageContext.contextPath +
                '/images/widget/chart/horizontalLabelBuoy.png)';
        }
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.backgroundSize = 'cover';
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.position = 'absolute';
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.zIndex = 99999;
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.opacity = 1;
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.color = '#fff';
    },

    mouseOutHandler: function (point) {
        if (!point.series.xAxis.ticks[point.x] || !point.series.xAxis.ticks[point.x].label) {
            return
        }
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.backgroundSize = '';
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.backgroundImage = '';
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.position = '';
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.zIndex = 0;
        if (point.series.xAxis.ticks[point.x].label.xy && !Ext.isDefined(point.series.xAxis.ticks[point.x].label.xy.opacity)) {
            point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.opacity = 0;
        }
        point.series.xAxis.ticks[point.x].label.element.firstElementChild.style.color = '';
    },

    fillSeriesData: function (beginDate, endDate, timeUnit, actualValueList, pointDataValueType) {

        var maxActualValueArray = [];
        var minActualValueArray = [];
        var avgActualValueArray = [];
        var sumActualValueArray = [];
        var datetimeStringArray = [];
        var pointIdArray = [];
        var format = {
            Year: 'Y',
            Month: 'Y-m',
            Week: 'Y-m-d',
            Day: 'Y-m-d',
            Hour: 'Y-m-d H'
        };

        if (timeUnit === 'Week') {
            beginDate = new Date(moment(beginDate).isoWeekday(1));
            endDate = new Date(moment(new Date(endDate)).isoWeekday(7));
        }

        while (beginDate.getTime() <= endDate.getTime()) {

            var maxActualValue = 0;
            var minActualValue = 0;
            var avgActualValue = 0;
            var sumActualValue = 0;
            var pointId = 0;

            var datetimeString = Ext.Date.format(beginDate, format[timeUnit]);

            if (timeUnit === 'Week') {
                datetimeString = moment(new Date(beginDate)).isoWeek().toString();
            }

            if (timeUnit === 'Hour' && pointDataValueType === 1) {
//                datetimeString = Ext.Date.format(Ext.Date.add(beginDate, Ext.Date.HOUR, -1), format[timeUnit]);
            }

            Ext.each(actualValueList, function (actualValue) {

                if (datetimeString === actualValue['datetimeString']) {
                    maxActualValue = actualValue['maxActualValue'] == null ? actualValue['maxActualValue'] : eval(actualValue['maxActualValue'].toFixed(2));
                    minActualValue = actualValue['minActualValue'] == null ? actualValue['minActualValue'] : eval(actualValue['minActualValue'].toFixed(2));
                    avgActualValue = actualValue['avgActualValue'] == null ? actualValue['avgActualValue'] : eval(actualValue['avgActualValue'].toFixed(2));
                    sumActualValue = actualValue['sumActualValue'] == null ? actualValue['sumActualValue'] : eval(actualValue['sumActualValue'].toFixed(2));
                    datetimeString = actualValue['datetimeString'];
                    pointId = Math.round(actualValue['pointId']);
                    return false;
                }
            });

            if (beginDate.getTime() > Ext.Date.add(new Date(), Ext.Date.HOUR, -1)) {
                maxActualValue = null;
                minActualValue = null;
                avgActualValue = null;
                sumActualValue = null;
            }

            pointIdArray.push(pointId);
            datetimeStringArray.push(datetimeString);
            maxActualValueArray.push(maxActualValue);
            minActualValueArray.push(minActualValue);
            avgActualValueArray.push(avgActualValue);
            sumActualValueArray.push(sumActualValue);

            if (timeUnit === 'Year') {
                beginDate = Ext.Date.add(beginDate, Ext.Date.YEAR, 1);
            }
            if (timeUnit === 'Month') {
                beginDate = Ext.Date.add(beginDate, Ext.Date.MONTH, 1);
            }
            if (timeUnit === 'Week') {
                beginDate = Ext.Date.add(beginDate, Ext.Date.DAY, 7);
            }
            if (timeUnit === 'Day') {
                beginDate = Ext.Date.add(beginDate, Ext.Date.DAY, 1);
            }
            if (timeUnit === 'Hour') {
                beginDate = Ext.Date.add(beginDate, Ext.Date.HOUR, 1);
            }
        }

        var dataArray = {
            pointIdArray: pointIdArray,
            datetimeStringArray: datetimeStringArray,
            maxActualValueArray: maxActualValueArray,
            minActualValueArray: minActualValueArray,
            avgActualValueArray: avgActualValueArray,
            sumActualValueArray: sumActualValueArray
        };

        return dataArray;
    },

    getXAxisCategories: function (timeUnit, startTime, endTime) {

        if (timeUnit === null) {
            var dateRangeText;
            if (moment(new Date(startTime)).isSame(new Date(endTime), 'year')) {
                if (moment(new Date(startTime)).isSame(new Date(endTime), 'month')) {
                    dateRangeText = Ext.Date.format(startTime, 'Y/m/d') + "~" + Ext.Date.format(endTime, 'd');
                } else {
                    dateRangeText = Ext.Date.format(startTime, 'Y/m/d') + "~" + Ext.Date.format(endTime, 'm/d');
                }
            } else {
                dateRangeText = Ext.Date.format(startTime, 'Y/m/d') + "~" + Ext.Date.format(endTime, 'Y/m/d');
            }
            return dateRangeText;
        }

        var categories = [];
        var xAxisCategoriesCount = this.getXAxisCategoriesCount(timeUnit, startTime, endTime);

        for (var i = 0; i < xAxisCategoriesCount; i++) {
            if (timeUnit === 'Year') {
                categories.push(Ext.Date.format(new Date(startTime), 'Y'));
                startTime = Ext.Date.add(new Date(startTime), Ext.Date.YEAR, 1);
            } else if (timeUnit === 'Month') {
                categories.push(Ext.Date.format(new Date(startTime), HighchartsConfig.dateFormatString.Month));
                startTime = Ext.Date.add(new Date(startTime), Ext.Date.MONTH, 1);
            } else if (timeUnit === 'Week') {
                var beginWeekDay = new Date(startTime), endWeekDay;
                if (i == 0) {
                    startTime = new Date(moment(new Date(startTime)).isoWeekday(1));
                }
                endWeekDay = Ext.Date.add(startTime, Ext.Date.DAY, 6);
                if (new Date(endWeekDay) > new Date(endTime)) {
                    endWeekDay = new Date(endTime);
                }
                var format = HighchartsConfig.dateFormatString;
                if (moment(new Date(beginWeekDay)).isSame(new Date(endWeekDay), 'year')) {
                    if (moment(new Date(beginWeekDay)).isSame(new Date(endWeekDay), 'month')) {
                        categories.push(Ext.Date.format(beginWeekDay, format[timeUnit]) + "~" + Ext.Date.format(endWeekDay, 'd'));
                    } else {
                        categories.push(Ext.Date.format(beginWeekDay, format[timeUnit]) + "~" + Ext.Date.format(endWeekDay, 'm/d'));
                    }
                } else {
                    categories.push(Ext.Date.format(beginWeekDay, format[timeUnit]) + "~" + Ext.Date.format(endWeekDay, format[timeUnit]));
                }
                startTime = Ext.Date.add(startTime, Ext.Date.DAY, 7);
            } else if (timeUnit === 'Day') {
                categories.push(Ext.Date.format(new Date(startTime), HighchartsConfig.dateFormatString.Day));
                startTime = Ext.Date.add(new Date(startTime), Ext.Date.DAY, 1);
            }
        }

        return  categories;
    },

    getXAxisCategoriesCount: function (timeUnit, startTime, endTime) {

        var xAxisCategoriesCount;
        if (timeUnit === 'Year') {
            xAxisCategoriesCount = moment(endTime).diff(moment(startTime), 'years') + 1;
        } else if (timeUnit === 'Month') {
            xAxisCategoriesCount = moment(endTime).diff(moment(startTime), 'months') + 1;
        } else if (timeUnit === 'Week') {
            xAxisCategoriesCount = moment(endTime).isoWeeks() - moment(startTime).isoWeeks() + 1;
        } else if (timeUnit === 'Day') {
            xAxisCategoriesCount = moment(endTime).diff(moment(startTime), 'days') + 1;
        }

        return xAxisCategoriesCount;
    }
});