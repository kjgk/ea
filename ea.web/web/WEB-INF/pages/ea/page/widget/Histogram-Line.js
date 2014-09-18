Ext.define('withub.ext.ea.page.widget.Histogram-Line', {
    extend: 'Ext.container.Container',
    bodyPadding: 1,
    width: 640,
    height: 360,
    minHeight: 300,
    minWidth: 450,
    mixins: {
        base: 'withub.ext.ea.page.widget.Base',
        chart: 'withub.ext.ea.page.widget.Chart'
    },
    devMode: false,

    initComponent: function () {

        var me = this;

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
                    height: 22,
                    xtype: 'daterange',
                    width: 220
                } ,
                {
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-query',
                    scope: this,
                    handler: me.drawChart
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
                type: 'line',
                renderTo: me.contentContainer.getId(),
                spacingTop: 15,
                spacingLeft: 35,
                spacingRight: 35,
                spacingBottom: 20,
                events: {
                    tooltipRefresh: function (e) {
                        Ext.each(this.series, function (series) {
                            Ext.each(series.points, function (point) {
                                point.firePointEvent('mouseOut');
                            })
                        });
                        this.hoverPoints[0].firePointEvent('mouseOver');
                    }
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: [
                {
                    min: 0,
                    lineWidth: 2,
                    gridLineWidth: 0,
                    showLastLabel: true,
                    endOnTick: true,
                    labels: {
                        formatter: function () {
                            return "<div style='padding-top: 10px;width: 100px'>" + this.value + "</div>";
                        },
                        useHTML: true
                    },
                    lineColor: HighchartsConfig.xAxisLineColor
                }
            ],
            yAxis: [
                {
                    min: 0,
                    title: {
                        text: ''
                    },
                    tickColor: '#F2F2F2',
                    lineColor: '#F2F2F2',
                    minorTickInterval: null
                },
                {
                    title: {
                        text: ''
                    },
                    minorTickInterval: null,
                    tickColor: '#F2F2F2',
                    lineColor: '#F2F2F2',
                    opposite: true
                }
            ],
            tooltip: {
                shared: true,
                valueSuffix: '',
                valueDecimals: 2,
                crosshairs: true
            },
            legend: {
                borderWidth: 0,
                layout: 'horizontal',
                align: 'center',
                itemStyle: {
                    fontFamily: 'Microsoft YaHei'
                },
                verticalAlign: 'bottom'
            },
            plotOptions: {
                series: {
                    events: {
                        legendItemClick: function () {
                            return false;
                        },
                        mouseOver: function () {
                        }
                    },
                    point: {
                        events: {
                            mouseOver: function () {
                                me.mouseOverHandler(this);
                            },
                            mouseOut: function () {
                                me.mouseOutHandler(this);
                            }
                        }
                    }
                }
            },
            series: []
        });
    },

    drawChart: function () {

        var me = this;
        var dateRange = me.headerContainer.down('#dateRange');
        var beginDate = Ext.Date.clearTime(new Date(dateRange.getBeginDate()));
        var endDate = Ext.Date.parse(dateRange.getEndDate() + ' 23:59:59', 'Y-m-d H:i:s');
        var charts = ['column', 'spline'];
        var timeUnit = this.getTimeUnit();
        var dataPointObjectIds = [];
        var colors = [];
        var histogramDataPoint = Ext.decode(me.getWidgetConfig()['histogramDataPoint']);
        dataPointObjectIds.push(histogramDataPoint.dataPointId);
        colors.push('#' + histogramDataPoint.color);
        Ext.each(Ext.decode(me.getWidgetConfig()['lineDataPoint']), function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
            colors.push('#' + dataPoint['color']);
        });

        me.chart ? '' : me.initChart();
        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
            params: {
                dataPointObjectIds: dataPointObjectIds.join('|'),
                beginDate: beginDate,
                endDate: endDate,
                timeUnit: timeUnit
            },
            method: 'GET',
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    me.removeAllSeries();
                    me.buildXAxis();
                    Ext.each(result.items, function (item, index) {
                        var dataPointInfo = item['dataPointInfo'];
                        var actualValueList = item['actualValueList'];
                        var yAxis = index > 0 ? 1 : 0;
                        me.chart.addSeries({
                            name: Ext.isDefined(dataPointInfo['dataPointName']) ? dataPointInfo['dataPointName'] : '',
                            color: colors[index],
                            type: charts[yAxis],
                            marker: {
                                symbol: 'circle'
                            },
                            yAxis: yAxis,
                            tooltip: {
                                valueSuffix: Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : ''
                            }
                        });

                        var data = me.fillSeriesData(beginDate, endDate, timeUnit, actualValueList, dataPointInfo['pointDataValueType']);
                        if (index == 0) {
                            me.chart.series[index].setData(data.sumActualValueArray);
                        } else {
                            me.chart.series[index].setData(data.avgActualValueArray);
                        }
                    });
                    if (timeUnit === 'Hour' && me.chart.xAxis[0].hasData) {
                        me.showTimeLabel()
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
        var dateRange = me.headerContainer.down('#dateRange');
        var startTime = new Date(dateRange.getBeginDate());
        var endTime = new Date(dateRange.getEndDate());
        var days = moment(endTime).diff(moment(startTime), 'days') + 1;
        var categories = [];
        var step;
        if (days <= 3) {
            for (var i = 0; i < days; i++) {
                var dateTime = Ext.Date.add(new Date(startTime), Ext.Date.DAY, i);
                if (dateTime.getTime() <= endTime.getTime()) {
                    for (var j = 0; j < 24; j++) {
                        categories.push(Ext.Date.format(dateTime, HighchartsConfig.dateFormatString.Day) + ' ' + j + ':00');
                    }
                }
            }
            step = 24
        } else if (days > 3) {
            for (var i = 1; i <= days; i++) {
                categories.push(Ext.Date.format(new Date(startTime), HighchartsConfig.dateFormatString.Day));
                startTime = Ext.Date.add(new Date(startTime), Ext.Date.DAY, 1)
            }
            step = Math.ceil(days / (me.width / 120))
        }

        chart.xAxis[0].setCategories(categories);
        chart.xAxis[0].update({
            labels: {
                step: step
            }
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['histogramDataPoint']) && !Ext.isEmpty(this.getWidgetConfig()['lineDataPoint'])) {
            Ext.defer(this.drawChart, 500, this);
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            headerTitle: {
                displayName: '标题',
                value: '柱图曲线'
            },
            histogramDataPoint: {
                displayName: '柱图数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single',
                    enableColor: true
                }),
                renderer: this.propertyRender.singleDataPoint,
                value: ''
            },
            lineDataPoint: {
                displayName: '曲线图数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    enableColor: true,
                    allowOne: true
                }),
                renderer: this.propertyRender.multiDataPoint,
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
                value: '5|Minute'
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
        }
    },

    getTimeUnit: function () {

        var timeUnit = 'Hour';
        var dateRange = this.headerContainer.down('#dateRange');
        var beginDate = new Date(dateRange.getBeginDate());
        var endDate = new Date(dateRange.getEndDate());

        if (moment(endDate).diff(moment(beginDate), 'days') + 1 > 3) {
            timeUnit = 'Day';
        }

        return timeUnit;

    },

    showTimeLabel: function () {

        var xAxis = this.chart.xAxis[0];

        var dateRange = this.headerContainer.down('#dateRange');

        var startTime = new Date(dateRange.getBeginDate());
        var endTime = new Date(dateRange.getEndDate());

        var days = moment(endTime).diff(moment(startTime), 'days') + 1;

        xAxis.ticks[(days - 1) * 24].label.xy.opacity = 1;
        xAxis.ticks[(days - 1) * 24].label.element.firstElementChild.style.opacity = 1;

    }

});
