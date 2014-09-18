Ext.define('withub.ext.ea.page.widget.Line-Pie-Histogram', {
    extend: 'Ext.container.Container',
    bodyPadding: 1,
    width: 640,
    height: 360,
    minHeight: 250,
    minWidth: 400,
    mixins: ['withub.ext.ea.page.widget.Base', 'withub.ext.ea.page.widget.Chart'],

    initComponent: function () {

        var me = this;
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
                    text: '设置默认时间段',
                    hidden: !me.devMode,
                    handler: function () {
                        Ext.create('withub.ext.ea.chart.common.DataPointAndDateRange', Ext.apply({
                            dateRanges: [
                                ['Year', '年']
                            ],
                            listeners: {
                                select: function (data) {
                                    me.putWidgetConfig(data);
                                    me.buildChart();
                                },
                                scope: this
                            }
                        }, me.getWidgetConfig())).show();
                    },
                    scope: this
                },
                {
                    text: "日期",
                    cls: 'label',
                    height: 36,
                    hidden: me.devMode,
                    style: 'margin: 0px 10px; font-size: 14px;',
                    xtype: 'label'
                },
                {
                    xtype: 'daterange',
                    height: 22,
                    hidden: me.devMode,
                    itemId: 'daterange'
                },
                {
                    xtype: 'button',
                    text: '确定',
                    margins: '0 5 0 0',
                    style: 'font-family: "Microsoft YaHei";',
                    scope: this,
                    hidden: me.devMode,
                    handler: function () {
                        me.buildChart();
                    }
                },
                {
                    text: '添加数据点',
                    handler: function () {
                        Ext.create('withub.ext.ea.chart.common.DataPoint', {
                            multiDataPoint: true,
                            dataPoints: me.getWidgetConfig()['dataPoints'],
                            listeners: {
                                select: function (dataPoints) {
                                    me.putWidgetConfig(dataPoints);
                                    me.buildChart();
                                    me.loadDataPointsInfo();
                                },
                                scope: this
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
                            me.destroy();
                        });
                    },
                    scope: this
                }
            ]
        });

        this.initContentContainer({
            layout: 'border',
            items: [
                {
                    itemId: 'lineChart',
                    region: 'center',
                    border: false
                },
                {
                    region: 'east',
                    border: false,
                    split: true,
                    width: this.width / 5 * 2,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            itemId: 'pieChart',
                            flex: 1,
                            border: false
                        },
                        {
                            xtype: 'splitter'
                        },
                        {
                            itemId: 'columnChart',
                            flex: 1,
                            border: false
                        }
                    ]
                }
            ]
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent(this);

        this.on('afterrender', function () {
            var lineChart = me.contentContainer.down('#lineChart');
            var pieChart = me.contentContainer.down('#pieChart');
            var columnChart = me.contentContainer.down('#columnChart');

            me.lineChart = new Highcharts.Chart({
                title: {
                    text: '总和曲线'
                },
                chart: {
                    renderTo: lineChart.getId(),
                    type: 'line'
                },
                tooltip: {
                    valueDecimals: 2
                },
                plotOptions: {
                    line: {
                        point: {
                            events: {
                                click: function () {
                                    me.refreshPieChart(this.category);
                                }
                            }
                        }
                    }
                },
                xAxis: {},
                yAxis: {
                    min: 0,
                    title: null
                },
                series: [
                    {
                        showInLegend: false
                    }
                ]
            });

            me.pieChart = new Highcharts.Chart({
                title: {text: '', margin: 50},
                chart: {
                    renderTo: pieChart.getId()
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                    valueDecimals: 2
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        },
                        point: {
                            events: {
                                click: function () {
                                    me.refreshColumnChart(this.x.split('|')[0], this.x.split('|')[1], this.x.split('|')[2]);
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: '所占比例'
                    }
                ]
            });

            me.columnChart = new Highcharts.Chart({
                title: {text: '', margin: 50},
                chart: {
                    renderTo: columnChart.getId()
                },
                xAxis: [
                    {}
                ],
                yAxis: [
                    {
                        title: null,
                        min: 0
                    }
                ],
                tooltip: {
                    valueDecimals: 2,
                    shared: true
                },
                series: [
                    {
                        color: '#4572A7',
                        showInLegend: false,
                        type: 'column'
                    },
                    {
                        color: '#89A54E',
                        showInLegend: false,
                        type: 'spline'
                    }
                ]
            });

            lineChart.on('resize', function (component, width, height) {
                me.lineChart.setSize(width, height, true);
            });
            pieChart.on('resize', function (component, width, height) {
                me.pieChart.setSize(width, height, true);
            });
            columnChart.on('resize', function (component, width, height) {
                me.columnChart.setSize(width, height, true);
            });

            if (!me.devMode) {
                var dateLimit = me.getWidgetConfig()['dateLimit'];
                var months = (dateLimit - 1) * 12 + parseInt(Ext.Date.format(new Date(), 'm'), 10);
                me.down('#daterange').beginTimeField.setValue(Ext.Date.getFirstDateOfMonth(Ext.Date.add(new Date(), Ext.Date.MONTH, -months + 1)));
                me.down('#daterange').endTimeField.setValue(Ext.Date.getLastDateOfMonth(new Date()));
            }

            if (!Ext.isEmpty(this.getWidgetConfig()['dataPoints'])) {
                me.loadDataPointsInfo();
                Ext.defer(me.buildChart, 500, this);
            }


        }, this);

    },

    loadChartData: function () {
        var me = this;

        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/actualValue/fetch',
            params: {
                dateRanges: Ext.encode([
                    {
                        startTime: me.startTime.getTime(),
                        endTime: me.endTime.getTime()
                    }
                ]),
                dataPoints: me.getWidgetConfig()['dataPoints'].join(','),
                timeUnit: 'Month'
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                var data = [];
                if (result.success) {
                    me.lastRequestData = result.items;
                    var dateTime = me.startTime;
                    while (dateTime.getTime() <= me.endTime.getTime()) {
                        var value = 0;
                        var dateTimeString = Ext.Date.format(dateTime, 'Ym');
                        Ext.each(result.items, function (actualValueList) {
                            Ext.each(actualValueList, function (actualValue) {
                                if (dateTimeString === actualValue['datetimeString']) {
                                    value += actualValue['sumActualValue'];
                                    return false;
                                }
                            })
                        });
                        data.push(value);
                        dateTime = Ext.Date.add(dateTime, Ext.Date.MONTH, 1);
                    }
                    me.lineChart.series[0].setData(data);
                    me.refreshPieChart(Ext.Date.format(me.startTime, 'Ym'));
                    me.refreshColumnChart(Ext.Date.format(me.startTime, 'Ym'), me.dataPointsInfo[0]['dataPointId'], me.dataPointsInfo[0]['name']);
                } else {
                    ExtUtil.Msg.error(result.message);
                }
            }
        });
    },

    refreshPieChart: function (dateTimeString) {

        var me = this;
        var data = [];
        Ext.each(me.dataPointsInfo, function (dataPointInfo) {
            var value = 0;
            Ext.each(me.lastRequestData, function (actualValueList) {
                Ext.each(actualValueList, function (actualValue) {
                    if (dateTimeString === actualValue['datetimeString'] && dataPointInfo['dataPointId'] === actualValue['pointSliceId']) {
                        value += actualValue['sumActualValue'];
                        return false;
                    }
                })
            });
            data.push({
                y: value,
                x: dateTimeString + '|' + dataPointInfo['dataPointId'] + '|' + dataPointInfo['name'],
                name: dataPointInfo['name']
            });
        });

        me.pieChart.series[0].setData(data);
        me.pieChart.setTitle({
            text: '选择年月' + '【' + dateTimeString + '】',
            align: 'left',
            margin: 50
        });
    },

    refreshColumnChart: function (dateTimeString, dataPointId, dataPointName) {

        var me = this;
        var columnChart = me.columnChart;
        var sumData = [], avgData = [];

        var dateTime = me.startTime;
        while (dateTime.getTime() <= me.endTime.getTime()) {
            var dateTimeString = Ext.Date.format(dateTime, 'Ym');
            var isBreak = false;
            var sumActualValue = 0;
            var avgActualValue = 0;
            for (var i = 0; i < me.lastRequestData.length; i++) {
                for (var j = 0; j < me.lastRequestData[i].length; j++) {
                    var actualValue = me.lastRequestData[i][j];
                    if (dateTimeString === actualValue['datetimeString'] && parseInt(dataPointId, 10) === actualValue['pointSliceId']) {
                        sumActualValue = actualValue['sumActualValue'];
                        avgActualValue = actualValue['avgActualValue'];
                        isBreak = true;
                        break;
                    }
                }
                if (isBreak) {
                    break;
                }
            }
            sumData.push(sumActualValue);
            avgData.push(avgActualValue);
            dateTime = Ext.Date.add(dateTime, Ext.Date.MONTH, 1);
        }

        columnChart.series[0].setData(sumData);
        columnChart.series[1].setData(avgData);

        columnChart.setTitle({
            text: dataPointName,
            margin: 20
        });
    },

    buildChart: function () {

        var me = this;
        var lineChart = me.lineChart;
        var columnChart = me.columnChart;

        var timeUnit = me.getWidgetConfig()['timeUnit'];
        var dateLimit = me.getWidgetConfig()['dateLimit'];

        var categories = [], now = new Date();
        if (timeUnit !== 'Year') {
            return;
        }
        var months = 0;
        if (me.devMode) {
            months = (dateLimit - 1) * 12 + parseInt(Ext.Date.format(now, 'm'), 10);
            me.startTime = Ext.Date.getFirstDateOfMonth(Ext.Date.add(now, Ext.Date.MONTH, -months + 1));
            me.endTime = Ext.Date.getLastDateOfMonth(now);
        } else {
            me.startTime = me.down('#daterange').getBeginDate(true);
            me.endTime = me.down('#daterange').getEndDate(true);
            var datetime = Ext.Date.getFirstDateOfMonth(me.startTime);
            months++;
            while (Ext.Date.format(datetime, 'Ym') !== Ext.Date.format(me.endTime, 'Ym')) {
                months++;
                datetime = Ext.Date.add(datetime, Ext.Date.MONTH, 1);
            }
        }
        for (var i = months; i > 0; i--) {
            categories.push(Ext.Date.format(Ext.Date.add(me.endTime, Ext.Date.MONTH, -i + 1), 'Ym'));
        }


        lineChart.xAxis[0].setCategories(categories);
        lineChart.xAxis[0].update({
            tickInterval: null,
            labels: {
                rotation: 0,
                y: 15,
                staggerLines: Math.ceil(months / (me.contentContainer.down('#lineChart').getWidth() / 70))
            }
        });

        columnChart.xAxis[0].setCategories(categories);
        columnChart.xAxis[0].update({
            tickInterval: null,
            labels: {
                rotation: 0,
                y: 15,
                staggerLines: Math.ceil(months / (me.contentContainer.down('#columnChart').getWidth() / 70))
            }
        });

        var interval = this.getWidgetConfig()['interval'];
        var intervalUnit = this.getWidgetConfig()['intervalUnit'];

        if (intervalUnit === 'second') {
            interval = interval;
        }
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

    loadDataPointsInfo: function () {
        var me = this;
        me.dataPointsInfo = [];
        Ext.each(me.getWidgetConfig()['dataPoints'], function (dataPointId) {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/dataPoint/load/' + dataPointId,
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    me.dataPointsInfo.push(result.data);
                },
                scope: this
            });
        })
    }

});