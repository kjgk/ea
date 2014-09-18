Ext.define('withub.ext.ea.page.widget.MultiDataPoint-CurvedSurface-Histogram', {
    extend: 'Ext.container.Container',
    bodyPadding: 1,
    width: 640,
    height: 530,
    minHeight: 530,
    minWidth: 800,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    mixins: ['withub.ext.ea.page.widget.Base'],
    devMode: false,
    initComponent: function () {
        var me = this;
        this.initHeaderContainer();

        var componentId = Ext.id();
        this.chartContainer = Ext.create('Ext.container.Container', {
            flex: 1,
            html: '<div style="height: 500px; min-width: 500px" id="' + componentId + '"></div>'
        });
        this.items = [this.headerContainer, this.chartContainer];

        this.dateRanges = [];   // 手动添加的时间段
        this.deletedDateRanges = []; //删除的时间段

        this.callParent();

        this.on('resize', function (component, width, height) {
            this.chart.setSize(width + 1, height - 36, true);
        }, this);

        this.on('afterrender', function () {
            this.initChart(componentId);
            if (!Ext.isEmpty(this.getWidgetConfig()['dataPoints'])) {

                this.initDateRange();
                Ext.defer(this.buildChart, 500, this);
            }
            this.updateChartTitle();
            this.getEl().on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        }, this);
    },

    initHeaderContainer: function () {
        var me = this;
        this.headerContainer = Ext.create('Ext.container.Container', {
            cls: 'chart-header',
            height: 36,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaultType: 'button',
            defaults: {
                height: 28,
                style: 'margin: 0px 5px 0px 0px;'
            },
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
                    itemId: 'date',
                    xtype: 'daterange',
                    width: 240,
                    height: 22,
                    range: '-7d'
                } ,
                {
                    text: "维度",
                    cls: 'label',
                    height: 36,
                    style: 'margin: 0px 10px; font-size: 14px;',
                    xtype: 'label'
                },
                {
                    xtype: 'combo',
                    width: 50,
                    height: 22,
                    itemId: 'defaultLatitude',
                    store: [
                        ['Day', '月'],
                        ['Month', '年']
                    ],
                    value: 'Day'
                } ,
                {
                    xtype: 'button',
                    text: '确定',
                    scope: this,
                    handler: me.queryByDateAndLatitude
                } ,
                {
                    text: '设置数据点',
                    hidden: !me.devMode,
                    handler: function () {
                        Ext.create('withub.ext.ea.chart.common.DoubleDataPointCurvedSurfaceHistogram', {
                            curvedSurfaceDataPointId: me.getWidgetConfig()['curvedSurfaceDataPointId'],
                            histogramDataPointId: me.getWidgetConfig()['histogramDataPointId'],
                            dateLimit: me.getWidgetConfig()['dateLimit'],
                            timeUnit: me.getWidgetConfig()['timeUnit'],
                            defaultLatitude: me.getWidgetConfig()['defaultLatitude'],
                            intervalUnit: me.getWidgetConfig()['intervalUnit'],
                            interval: me.getWidgetConfig()['interval'],
                            listeners: {
                                select: function (data) {
                                    var dataPoints = [];
                                    me.getWidgetConfig()['dataPoints'] = [];
                                    dataPoints.push(data.curvedSurfaceDataPointId);
                                    dataPoints.push(data.histogramDataPointId);
                                    data.dataPoints = dataPoints;
                                    Ext.apply(me.getWidgetConfig(), data);
                                    me.buildChart();
                                }
                            }
                        }).show();
                    },
                    scope: this
                },
                {
                    text: '删除',
                    hidden: !me.devMode,
                    handler: function () {
                        ExtUtil.Msg.confirm('确认删除?', function (select) {
                            if (select == 'no') {
                                return;
                            }
                            me.destroy()
                        });
                    },
                    scope: this
                }
            ]
        });
    },

    initChart: function (componentId) {

        var me = this;
        me.chart = new Highcharts.StockChart({
            chart: {
                spacingLeft: 15,
                spacingRight: 15,
                spacingBottom: 20,
                renderTo: componentId,
                backgroundColor: '#F2F2F2',
                borderColor: '#C4C4C4',
                borderWidth: 1,
                borderRadius: 0
            },
            credits: {
                text: ''
            },
            rangeSelector: {
                enabled: false,
                selected: 1
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            navigator: {
                enabled: true,
                xAxis: {
                    gridLineWidth: 0,
                    dateTimeLabelFormats: {
                        day: '%Y%m%d',
                        week: '%Y%m%d',
                        month: '%Y%m',
                        year: '%Y'
                    }
                }
            },
            title: {
                text: ''
            },
            legend: {
                enabled: true,
//                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0
            },
            xAxis: {
                lineWidth: 2,
                gridLineWidth: 0,
                type: 'datetime',
                lineColor: HighchartsConfig.xAxisLineColor,
                tickPixelInterval: 150,
                minTickInterval: 3600 * 1000 * 24,
                dateTimeLabelFormats: {
                    day: '%Y/%m/%d',
                    week: '%Y/%m/%d',
                    month: '%Y/%m',
                    year: '%Y'
                }
            },
            yAxis: [
                {
                    title: {
                        text: ''
                    },
                    height: 238,
                    tickColor: '#F2F2F2',
                    lineColor: '#F2F2F2',
                    minorTickInterval: null,
                    lineWidth: 2
                },
                {
                    title: {
                        text: ''
                    },
                    top: 300,
                    height: 62,
                    tickColor: '#F2F2F2',
                    lineColor: '#F2F2F2',
                    minorTickInterval: null,
                    offset: 0,
                    lineWidth: 2
                }
            ],
            series: [
                {
                    type: 'area',
                    data: []
                },
                {
                    type: 'column',
                    data: [],
                    yAxis: 1
                }
            ]

        });
    },

    buildChart: function () {

        this.bindChartSeries();

        var interval = this.getWidgetConfig()['interval'];
        var intervalUnit = this.getWidgetConfig()['intervalUnit'];

        if (intervalUnit === 'minute') {
            interval = interval * 60
        }

        if (intervalUnit === 'hour') {
            interval = interval * 60 * 60;
        }

        if (intervalUnit === 'day') {
            interval = interval * 60 * 60 * 24
        }

        if (this.refreshTask) {
            this.refreshTask.destroy();
        }

        this.refreshTask = Ext.TaskManager.start(Ext.TaskManager.newTask({
            run: this.loadChartData,
            scope: this,
            fireOnStart: true,
            interval: interval * 1000
        }));
    },

    loadChartData: function () {

        var me = this;
        var chart = me.chart;
        var dateRanges = me.generateDateRanges();
        var dataPoints = me.getWidgetConfig()['dataPoints'];
        var defaultLatitude = me.getWidgetConfig()['defaultLatitude'];
        var dateLimit = me.getWidgetConfig()['dateLimit'];
        var curvedSurfaceDataPointId = me.getWidgetConfig()['curvedSurfaceDataPointId'];
        var histogramDataPointId = me.getWidgetConfig()['histogramDataPointId'];
        var headerTitle = me.getWidgetConfig()['headerTitle'];
        if (!Ext.isEmpty(headerTitle)) {
            this.headerContainer.down('#headerText').setText(headerTitle);
        }
        if (defaultLatitude === 'Day') {
            chart.xAxis[0].update({
                tickInterval: null,
                pointStart: dateRanges[0].startTime,
                pointInterval: 3600 * 1000 * 24 // hourly data
            }, false);
        }
        if (defaultLatitude === 'Month') {
            chart.xAxis[0].update({
                tickInterval: 3600 * 1000 * 24 * 30,
                pointStart: dateRanges[0].startTime,
                pointInterval: 3600 * 1000 * 24 * 30 // monthly data
            }, false);
        }

        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
            params: {
                beginDate: new Date(dateRanges[0].startTime),
                endDate: new Date(dateRanges[0].endTime),
                dataPointObjectIds: dataPoints,
                timeUnit: defaultLatitude
            },
            method: 'GET',
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);

                if (result.success) {
                    var format = {
                        Day: 'Ymd',
                        Month: 'Ym',
                        Year: 'Y'
                    };

                    Ext.each(result.items, function (item, index) {
                        var data = [];
                        var dateRange = dateRanges[0];
                        var startTime = new Date(dateRange.startTime);
                        var endTime = new Date(dateRange.endTime);
                        while (Ext.Date.format(startTime, format[defaultLatitude]) !== Ext.Date.format(endTime, format[defaultLatitude])) {
                            var sumActualValue = 0;
                            var datetimeString = startTime.getTime();

                            Ext.each(item, function (it) {
                                if (Ext.Date.format(startTime, format[defaultLatitude]) === it['datetimeString']) {
                                    datetimeString = Ext.Date.parse(it['datetimeString'], format[defaultLatitude]).getTime();
                                    sumActualValue = it['sumActualValue'];
                                    return false;
                                }
                            });
                            data.push([datetimeString, sumActualValue]);


                            if (defaultLatitude === 'Day') {
                                startTime = Ext.Date.add(startTime, Ext.Date.DAY, 1);
                            }
                            if (defaultLatitude === 'Month') {
                                startTime = Ext.Date.add(startTime, Ext.Date.MONTH, 1);
                            }
                            if (defaultLatitude === 'Year') {
                                startTime = Ext.Date.add(startTime, Ext.Date.YEAR, 1);
                            }
                        }

                        me.chart.series[index].setData(data);
                    });


                } else {
                    me.showError(result.message);
                }
            },
            failure: function (response) {
                me.hideLoading();
                me.showError(response.responseText);
            }
        });

//        chart.xAxis[0].setExtremes( dateRanges[0].startTime, dateRanges[0].endTime);
    },

    bindChartSeries: function () {

        var colors = Highcharts.getOptions().colors;
        var me = this;
        var chart = me.chart;
        var dataPoints = me.getWidgetConfig()['dataPoints'];
        var mask = new Ext.LoadMask(me.getId(), {msg: '正在添加...'});
        mask.show();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/fetchMultiDataPointList',
            method: 'GET',
            params: {
                dataPoints: Ext.encode(dataPoints)
            },
            success: function (response) {
                mask.hide();
                var result = Ext.decode(response.responseText);
                if (result.success) {

                    Ext.each(result.items, function (item, index) {

                        if (Ext.isDefined(result.data)) {

                            chart.series[index].update({
                                name: (Ext.isEmpty(item['name']) ? item['dataPointTag'] : item['name']) + item['displayNameShort'],
                                color: colors[index],
                                tooltip: {
                                    valueSuffix: item['displayNameShort']
                                }
                            });

                        } else {

                            chart.series[index].update({
                                name: (Ext.isEmpty(item['name']) ? item['dataPointTag'] : item['name']),
                                color: colors[index]
                            });
                        }

                    });
                } else {
                    ExtUtil.Msg.error(result.message);
                }
            },
            scope: this
        });
    },

    generateDateRanges: function () {
        var me = this;
        var timeUnit = me.getWidgetConfig()['timeUnit'];
        var dateLimit = me.getWidgetConfig()['dateLimit'];
        var defaultLatitude = me.getWidgetConfig()['defaultLatitude'];
        var dateRanges = [];
        if (!Ext.isEmpty(me.dateRanges)) {
            return me.dateRanges;
        }

        var startTime;
        if (defaultLatitude === 'Day') {
            if (timeUnit === 'Week') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit * 7 + 1));
            } else if (timeUnit === 'Month') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.MONTH, -dateLimit));
            } else if (timeUnit === 'Year') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.YEAR, -dateLimit));
            } else {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit + 1));
            }
            dateRanges.push({
                startTime: startTime.getTime(),
                endTime: Ext.Date.clearTime(new Date()).getTime()
            });
        } else if (defaultLatitude === 'Week') {
            if (timeUnit === 'Day') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit + 1));
            } else if (timeUnit === 'Month') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.MONTH, -dateLimit));
            } else if (timeUnit === 'Year') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.YEAR, -dateLimit));
            } else {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit * 7 + 1));
            }
            dateRanges.push({
                startTime: startTime.getTime(),
                endTime: Ext.Date.clearTime(new Date()).getTime()
            });
        } else if (defaultLatitude === 'Month') {
            if (timeUnit === 'Day') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit + 1));
            } else if (timeUnit === 'Week') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit * 7 + 1));
            } else if (timeUnit === 'Year') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.YEAR, -dateLimit));
            } else {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.MONTH, -dateLimit + 1));
            }
            dateRanges.push({
                startTime: Ext.Date.getFirstDateOfMonth(startTime).getTime(),
                endTime: Ext.Date.getLastDateOfMonth(new Date()).getTime()
            });
            //alert("Month:"+Ext.Date.format(Ext.Date.getFirstDateOfMonth(startTime),'Y-m-d H:i:s')+"end=:"+Ext.Date.format(Ext.Date.getLastDateOfMonth(new Date()),'Y-m-d H:i:s'));
        } else if (defaultLatitude === 'Year') {
            if (timeUnit === 'Day') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit + 1));
            } else if (timeUnit === 'Week') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.DAY, -dateLimit * 7 + 1));
            } else if (timeUnit === 'Month') {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.MONTH, -dateLimit + 1));
            } else {
                startTime = (Ext.Date.add(Ext.Date.clearTime(new Date()), Ext.Date.YEAR, -dateLimit + 1));
            }
            dateRanges.push({
                startTime: Ext.Date.parse(new Date(startTime).getFullYear() + '-01-01 00:00:00', 'Y-m-d H:i:s').getTime(),
                endTime: Ext.Date.parse(new Date().getFullYear() + '-12-31 23:59:59', 'Y-m-d H:i:s').getTime()
            });
//            startTime= Ext.Date.parse(new Date(startTime).getFullYear() + '-01-01 00:00:00', 'Y-m-d H:i:s');
//            var endTime = Ext.Date.parse(new Date().getFullYear() + '-12-31 23:59:59', 'Y-m-d H:i:s');
//            alert("Year:"+startTime+"==="+endTime);
        }
        return dateRanges;
    },

    updateChartTitle: function () {
        var mainTitle = this.getWidgetConfig()['mainTitle'];
        var subTitle = this.getWidgetConfig()['subTitle'];
        if (mainTitle) {
            this.chart.setTitle(
                {
                    text: mainTitle.text,
                    style: {
                        font: "",
                        fontFamily: mainTitle.fontFamily,
                        fontSize: mainTitle.fontSize,
                        color: mainTitle.color
                    }
                }
            );
        }

        if (subTitle) {
            this.chart.setTitle(
                null
                ,
                {
                    text: subTitle.text,
                    style: {
                        font: "",
                        fontFamily: subTitle.fontFamily,
                        fontSize: subTitle.fontSize,
                        color: subTitle.color
                    }
                }
            );
        }

    },

    queryByDateAndLatitude: function () {

        var me = this;
        var dateSegment = this.headerContainer.down('#date');

        var startTime = Ext.Date.clearTime(new Date(dateSegment.getBeginDate()));
        var endTime = Ext.Date.clearTime(new Date(dateSegment.getEndDate()));

        this.dateRanges = [];
        if (defaultLatitude === 'Month') {
            this.dateRanges.push({
                startTime: Ext.Date.getFirstDateOfMonth(startTime).getTime(),
                endTime: Ext.Date.getLastDateOfMonth(endTime).getTime()
            });
        } else {
            this.dateRanges.push({
                startTime: startTime.getTime(),
                endTime: endTime.getTime()
            });
        }

        var defaultLatitude = this.headerContainer.down('#defaultLatitude').getValue();
        Ext.apply(me.getWidgetConfig(), {'defaultLatitude': defaultLatitude});

        this.buildChart();
    },

    setTitle: function (title) {
        this.headerContainer.down('#headerText').setText(title);
    },

    initDateRange: function () {
        var me = this;
        var date = this.headerContainer.down('#date');
        var latitude = this.headerContainer.down('#defaultLatitude');

        var defaultLatitude = me.getWidgetConfig()['defaultLatitude'];
        var dateRanges = me.generateDateRanges();
        var dateRange = dateRanges[0];

        date.beginTimeField.setValue(new Date(dateRange.startTime));
        date.endTimeField.setValue(new Date(dateRange.endTime));

        latitude.setValue(defaultLatitude);
    }
});