Ext.define('withub.ext.ea.page.widget.SingleDataPoint-MultiTimeSegment', {
    extend: 'Ext.container.Container',
    bodyPadding: 1,
    width: 640,
    height: 360,
    minHeight: 250,
    minWidth: 400,
    mixins: {
        base: 'withub.ext.ea.page.widget.Base',
        chart: 'withub.ext.ea.page.widget.Chart'
    },
    devMode: false,

    initComponent: function () {

        var me = this;
        this.dateRanges = [];   // 手动添加的时间段
        this.deletedDateRanges = []; //删除的时间段

        this.initWidgetConfig();

        this.initHeaderContainer({
            items: [
                {
                    itemId: 'headerText',
                    xtype: 'label',
                    height: 36,
                    style: 'margin: 0px 10px;',
                    cls: 'label'
                },
                { xtype: 'tbfill' },
                {
                    text: "日期",
                    cls: 'label',
                    height: 36,
                    style: 'margin: 0px 10px; font-size: 14px;',
                    xtype: 'label'
                },
                {
                    itemId: 'dateRange',
                    xtype: 'daterange',
                    width: 220,
                    height: 22
                } ,
                {
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-add',
                    scope: this,
                    handler: this.queryByDate
                } ,
                {
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-clear',
                    handler: function () {
                        ExtUtil.Msg.confirm('确认清空?', function (select) {
                            if (select == 'no') {
                                return;
                            }
                            while (me.chart.series.length > 0) {
                                me.chart.series[0].remove();
                            }
                            if (!me.devMode) {
                                me.getWidgetConfig()['dateLimit'] = undefined;
                                me.getWidgetConfig()['timeUnit'] = undefined;
                            }

                            me.getWidgetConfig()['offsets'] = undefined;
                            me.getWidgetConfig()['definiteTimes'] = undefined;
                            me.dateRanges = [];

                        });

                    },
                    scope: this
                }
            ]
        });

        this.initContentContainer();

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();
    },

    initChart: function () {
        var me = this;
        me.chart = new Highcharts.Chart({
            chart: {
                renderTo: me.contentContainer.getId(),
                type: 'line',
                events: {
                    tooltipRefresh: function (e) {
                        Ext.each(this.series, function (series) {
                            Ext.each(series.points, function (point) {
                                if (point.y != null) {
                                    point.firePointEvent('mouseOut');
                                }
                            })
                        });
                        this.hoverPoints[0].firePointEvent('mouseOver');
                    }
                }
            },
            plotOptions: {
                line: {
//                    lineWidth: 2,
                    marker: {
                        enabled: true
                    },
                    shadow: false,
                    states: {
                        hover: {
//                            lineWidth: 2
                        }
                    },
                    threshold: null
                },
                series: {
                    events: {
                        legendItemClick: function () {
                            this.chart.tooltip.hide();
                        }
                    },
                    point: {
                        events: {
                            mouseOver: function () {
                                me.mouseOverHandler(this);
                                this.series.xAxis.ticks[this.x].label.element.firstElementChild.style.backgroundSize = '100px  100% ';
                                this.series.xAxis.ticks[this.x].label.element.firstElementChild.style.paddingTop = 10 + $(this.series.xAxis.ticks[this.x].label.element.firstElementChild).height() / 17 * 2 + 'px'
                            },
                            mouseOut: function () {
                                me.mouseOutHandler(this);
                                this.series.xAxis.ticks[this.x].label.element.firstElementChild.style.paddingTop = '10px';
                            }
                        }
                    }
                }
            },
            title: {
                text: '',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: [
                {
                    min: 0,
                    lineWidth: 2,
                    gridLineWidth: 0,
                    labels: {
                        formatter: function () {
                            return "<div style='padding-top: 10px;width: 100px'>" + this.value + "</div>";
                        },
                        useHTML: true
                    },
                    lineColor: HighchartsConfig.xAxisLineColor
                }
            ],
            yAxis: {
                title: {
                    text: ''
                },
                minorTickInterval: null,
                minorTickLength: 0,
                tickColor: '#F2F2F2',
                lineColor: '#F2F2F2'
            },
            tooltip: {
                valueDecimals: 2,
                shared: true,
                formatter: function () {
                    var s = '';
                    if (this.points[0].x.split(':')[1] == '00') {
                        $.each(this.points, function (i, point) {
                            var date = '';
                            var startDate = point.series.name.split('~')[0];
                            var currentCategories = Ext.Date.add(new Date(startDate), Ext.Date.DAY, Math.ceil(point.point.x / 24) - 1);
                            date = Ext.Date.format(currentCategories, HighchartsConfig.dateFormatString.Day) + ' ';
                            if (this.x.split(':')[0] == '0') {
                                date = Ext.Date.format(Ext.Date.add(currentCategories, Ext.Date.DAY, 1), HighchartsConfig.dateFormatString.Day) + ' ';
                            }

                            if (i == 0) {
                                s += '<span style="color: ' + point.series.color + '">' + date + this.x + ': ' + '</span>' +
                                    point.y + ' ' + point.series.tooltipOptions.valueSuffix;
                            } else {
                                s += '<br/>' + '<span style="color: ' + point.series.color + '">' + date + this.x + ': ' + '</span>' +
                                    point.y + ' ' + point.series.tooltipOptions.valueSuffix;
                            }
                        });
                    } else {
                        $.each(this.points, function (i, point) {
                            if (i == 0) {
                                s += '<span style="color: ' + point.series.color + '">' + this.x.split('<br/>')[i] + ': ' + '</span>' +
                                    point.y + ' ' + point.series.tooltipOptions.valueSuffix;
                            } else {
                                s += '<br/>' + '<span style="color: ' + point.series.color + '">' + this.x.split('<br/>')[i] + ': ' + '</span>' +
                                    point.y + ' ' + point.series.tooltipOptions.valueSuffix;
                            }
                        });
                    }
                    return s;
                },
                crosshairs: true
            },
            series: [],
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0
            }
        });
    },

    drawChart: function () {
        var me = this;
        var dateRanges = me.getAllDateRanges();
        var timeUnit = me.timeUnit || me.getWidgetConfig()['dateLimit'].split('|')[1];
        var dateLimit = me.dateLimit || me.getWidgetConfig()['dateLimit'].split('|')[0];
        var dataPoint = Ext.decode(me.getWidgetConfig()['dataPoint']);
        var dataPointObjectId = dataPoint.dataPointId;

        me.chart ? '' : me.initChart();
        me.buildXAxis();
        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointMultiTimeSegmentActualValue',
            params: {
                dateRanges: Ext.encode(dateRanges),
                dataPointObjectId: dataPointObjectId,
                timeUnit: timeUnit
            },
            method: 'GET',
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    Ext.each(dateRanges, function (dataRange, index) {
                        var startTime = new Date(dataRange['startTime']);
                        var endTime = new Date(dataRange['endTime'] + 1000 * 60 * 60 * 24 - 1);
                        if (dateLimit <= 3) {
                            timeUnit = "Hour";
                        }

                        var dataPointInfo = result.items[index]['dataPointInfo'];
                        var actualValueList = result.items[index]['actualValueList'];

                        me.chart.series[index].update({
                            tooltip: {
                                valueSuffix: Ext.isEmpty(dataPointInfo['measureUnit']) ? '' : dataPointInfo['measureUnit']
                            }
                        });

                        var data = me.fillSeriesData(startTime, endTime, timeUnit, actualValueList, dataPointInfo['pointDataValueType']);
                        me.chart.series[index].setData(data.avgActualValueArray);
                    });
                    if (timeUnit === 'Hour') {
                        me.showTimeLabel();
                    }
                    if (me.getWidgetConfig()['enableDataGrid'] == 1) {
                        me.buildDataGrid();
                    }
                } else {
                    me.showError(result.message);
                }
            },
            failure: function (response) {
                me.hideLoading();
                me.showError(response.responseText);
            }

        });
    },

    buildXAxis: function () {

        var me = this;
        var chart = me.chart;
        var dateRanges = me.getAllDateRanges();
        var timeUnit = me.timeUnit || me.getWidgetConfig()['dateLimit'].split('|')[1];
        var dateLimit = me.dateLimit || me.getWidgetConfig()['dateLimit'].split('|')[0];
        while (chart.series.length > 0) {
            chart.series[0].remove();
        }

        var maxRange = 0;
        Ext.each(dateRanges, function (dateRange, index) {
            var startTime = new Date(dateRange.startTime);
            var endTime = new Date(dateRange.endTime);
            var color = Ext.isEmpty(dateRange.color) ? HighchartsConfig.defalutDataPointColor : dateRange.color;
            if (dateRange.endTime - dateRange.startTime > maxRange) {
                maxRange = dateRange.endTime - dateRange.startTime;
            }
            chart.addSeries({
                name: Ext.Date.format(startTime, HighchartsConfig.dateFormatString.Day) + (startTime.getTime() === endTime.getTime() ? '' : '~' + Ext.Date.format(endTime, HighchartsConfig.dateFormatString.Day)),
                color: color,
                marker: {
                    symbol: 'circle'
                }
            });
        });

        var days = maxRange / 1000 / 60 / 60 / 24 + 1;
        var categories = [];
        if (days <= 3) {
            for (var i = 0; i < days; i++) {
                for (var j = 0; j < 24; j++) {
                    categories.push(j + ':00');
                }
            }
            chart.xAxis[0].setCategories(categories);
            chart.xAxis[0].update({
                showLastLabel: true,
                endOnTick: true,
                labels: {
                    step: 24
                }
            });

        } else if (days <= 90000) {
            Ext.each(dateRanges, function (dateRange) {
                var startTime = new Date(dateRange.startTime);
                for (var i = 0; i < days; i++) {
                    if (!Ext.isEmpty(categories[i])) {
                        categories[i] = categories[i] + '<br/>' + Ext.Date.format(new Date(startTime), HighchartsConfig.dateFormatString.Day);
                    } else {
                        categories.push(Ext.Date.format(new Date(startTime), HighchartsConfig.dateFormatString.Day));
                    }
                    startTime = Ext.Date.add(new Date(startTime), Ext.Date.DAY, 1);
                }
            });
            chart.xAxis[0].setCategories(categories);
            chart.xAxis[0].update({
                showLastLabel: true,
                endOnTick: true,
                labels: {
                    step: Math.ceil(days / (me.width / 120))
                }
            });
        }
    },

    getAllDateRanges: function () {
        var me = this;
        var timeUnit = me.timeUnit || me.getWidgetConfig()['dateLimit'].split('|')[1];
        var dateLimit = me.dateLimit || me.getWidgetConfig()['dateLimit'].split('|')[0];
        var dateRanges = Ext.Array.clone(me.dateRanges);

        if (!Ext.isEmpty(dateRanges)) {
            return me.dateRanges;
        }

        var colors = Highcharts.getOptions().colors;
        if (timeUnit === 'Day') {
            var endTime = Ext.Date.clearTime(new Date());
            var startTime = Ext.Date.add(endTime, Ext.Date.DAY, -dateLimit + 1);
            dateRanges.push({
                startTime: startTime.getTime(),
                endTime: endTime.getTime(),
                color: colors[dateRanges.length]
            });
        } else if (timeUnit === 'Month') {
            var datetime = new Date();
            for (var i = 0; i < dateLimit; i++) {
                dateRanges.push({
                    startTime: Ext.Date.getFirstDateOfMonth(datetime).getTime(),
                    endTime: Ext.Date.getLastDateOfMonth(datetime).getTime(),
                    color: colors[dateRanges.length]
                });
                datetime = Ext.Date.add(datetime, Ext.Date.MONTH, -1);
            }
        }

        var offsetType = {
            Day: Ext.Date.DAY,
            Month: Ext.Date.MONTH
        }
        var offsets = Ext.isEmpty(me.getWidgetConfig()['offsets']) ? '' : Ext.decode(me.getWidgetConfig()['offsets']);
        if (!Ext.isEmpty(offsets)) {
            var endTime = new Date(dateRanges[0].endTime);
            var startTime = new Date(dateRanges[0].startTime);

            Ext.each(offsets, function (offset) {
                dateRanges.push({
                    startTime: Ext.Date.add(startTime, offsetType[timeUnit], -offset['offset'] * dateLimit).getTime(),
                    endTime: Ext.Date.add(endTime, offsetType[timeUnit], -offset['offset'] * dateLimit).getTime(),
                    color: '#' + offset['color']
                });
            }, this);

        }

        var definiteTimes = Ext.isEmpty(me.getWidgetConfig()['definiteTimes']) ? '' : Ext.decode(me.getWidgetConfig()['definiteTimes']);
        if (!Ext.isEmpty(definiteTimes)) {

            Ext.each(definiteTimes, function (definiteTime) {
                var startTime = definiteTime['definiteTime'].split("~")[0];
                var endTime = definiteTime['definiteTime'].split("~")[1];
                dateRanges.push({
                    startTime: Ext.Date.parse(startTime, 'Ymd').getTime(),
                    endTime: Ext.Date.parse(endTime, 'Ymd').getTime(),
                    color: '#' + definiteTime['color']
                });
            });
        }
        Ext.unique(dateRanges);
        if (!me.devMode) {
            dateRanges = Ext.Array.filter(dateRanges, function (dateRange) {
                for (var i = 0; i < me.deletedDateRanges.length; i++) {
                    if (dateRange.startTime === me.deletedDateRanges[i].startTime
                        && dateRange.endTime === me.deletedDateRanges[i].endTime) {
                        return false;
                    }
                }
                return true;
            });
        }
        return dateRanges;
    },

    queryByDate: function () {
        var me = this;
        var flag = true;
        var dateSegment = this.headerContainer.down('#dateRange');
        var startTime = Ext.Date.clearTime(new Date(dateSegment.getBeginDate()));
        var endTime = Ext.Date.clearTime(new Date(dateSegment.getEndDate()));
        var colors = Highcharts.getOptions().colors;

        if (Ext.isEmpty(me.getWidgetConfig()['dateLimit']) && Ext.isEmpty(me.dateRanges)) {

            me.timeUnit;
            var days = moment(endTime).diff(moment(startTime), 'days') + 1;
            if (days > 3) {
                me.timeUnit = 'Day'
            } else {
                me.timeUnit = 'Hour'
            }
            me.dateLimit = days;

            me.dateRanges.push({
                startTime: startTime.getTime(),
                endTime: endTime.getTime(),
                color: colors[me.dateRanges.length]
            });

            me.drawChart();
            return;
        }

        var dateRanges = me.getAllDateRanges();

        if (!Ext.isEmpty(dateRanges)) {
            var newDateLimit = moment(endTime).diff(moment(startTime), 'days');
            var oldDateLimit = moment(dateRanges[0].endTime).diff(moment(dateRanges[0].startTime), 'days');
            if (newDateLimit != oldDateLimit) {
                ExtUtil.Msg.info('时间间隔不相等');
                return false;
            }
        }

        Ext.each(me.getAllDateRanges(), function (dateRanges) {
            if (dateRanges.startTime === startTime.getTime()
                && dateRanges.endTime === endTime.getTime()) {
                ExtUtil.Msg.info('该时间段已经存在。');
                flag = false;
                return false;
            }
        });
        if (flag) {
            var dateRange = Ext.Array.findBy(me.deletedDateRanges, function (dateRange) {
                return (dateRange.startTime === startTime.getTime() && dateRange.endTime === endTime.getTime())
            });
            if (dateRange) {
                Ext.Array.remove(me.deletedDateRanges, dateRange);
            }

            me.dateRanges = me.getAllDateRanges();

            me.dateRanges.push({
                startTime: startTime.getTime(),
                endTime: endTime.getTime(),
                color: colors[me.dateRanges.length]
            });

            me.drawChart();
        }
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {
            Ext.defer(this.drawChart, 500, this);
        }
    },

    getDefaultWidgetConfig: function () {
        var me = this;
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPoint: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single',
                    enableColor: false
                }),
                renderer: this.propertyRender.singleDataPoint,
                value: ''
            },
            offsets: {
                displayName: '向前偏移量',
                editor: Ext.create('withub.ext.ea.page.common.SimpleDataPointLineColor', {
                    title: '添加向前偏移量',
                    columnName: '向前偏移量',
                    column: 'offset'
                }),
                renderer: function (v) {
                    var values = [];
                    if (v) {
                        var offsetsList = Ext.decode(v);
                        Ext.each(offsetsList, function (offsets) {
                            values.push(offsets['offset']);
                        }, this);
                    }
                    return values.join(',');
                },
                value: ''
            },
            definiteTimes: {
                displayName: '固定时间段',
                editor: Ext.create('withub.ext.ea.page.common.SimpleDataPointLineColor', {
                    title: '添加时间段',
                    columnName: '时间段',
                    column: 'definiteTime'
                }),
                renderer: function (v) {
                    var values = [];
                    if (v) {
                        var definiteTimes = Ext.decode(v);
                        Ext.each(definiteTimes, function (definiteTime) {
                            values.push(definiteTime['definiteTime']);
                        }, this);
                    }
                    return values.join(',');
                },
                value: ''
            },
            dateLimit: {
                displayName: '默认显示时间段',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Day', 'Month', 'Year']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: '3|Day'
            },
            refreshInterval: {
                displayName: '自动刷新间隔',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Second', 'Minute', 'Hour']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: HighchartsConfig.defalutRefreshInterval
            },
            enableDataGrid: {
                displayName: '显示/隐藏数据表',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '显示', 0: '隐藏'}}),
                renderer: function (v) {
                    return {1: '显示', 0: '隐藏'}[v];
                },
                value: 0
            }
        };
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);

        this.mixins.chart.applyWidgetConfig.call(this, property, value);

        if (property === 'dateLimit') {
            var dateRange = this.headerContainer.down('#dateRange');
            var beginDate = this.parseBeginDate(value.split('|')[1], value.split('|')[0]);
            dateRange.beginTimeField.setValue(beginDate);
            dateRange.endTimeField.setValue(new Date());

            this.dateRanges = [];
            this.deletedDateRanges = [];
        }
    },

    showTimeLabel: function () {

        var xAxis = this.chart.xAxis[0];

        if (!xAxis.hasData) {
            return;
        }
        var dateRange = this.headerContainer.down('#dateRange');

        var startTime = new Date(dateRange.getBeginDate());
        var endTime = new Date(dateRange.getEndDate());

        var days = moment(endTime).diff(moment(startTime), 'days') + 1;

        xAxis.ticks[(days - 1) * 24].label.xy.opacity = 1;
        xAxis.ticks[(days - 1) * 24].label.element.firstElementChild.style.opacity = 1;

    }
});