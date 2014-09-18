/**
 * 多点单类
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-StackedHistogram', {
    extend: 'Ext.container.Container',
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
                    xtype: 'daterange',
                    width: 220,
                    height: 22
                } ,
                {
                    xtype: 'combo',
                    width: 50,
                    height: 22,
                    itemId: 'dimension',
                    store: [
                        ['Day', '天'],
                        ['Week', '周'],
                        ['Month', '月'],
                        ['Year', '年']
                    ],
                    value: 'Day'
                },
                {
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-query',
                    scope: this,
                    handler: this.drawChart
                },
                {
                    xtype: 'button',
                    itemId: 'button-electricity',
                    cls: 'button-chart',
                    iconCls: 'icon-chart-electricity',
                    enableToggle: true,
                    handler: function () {
                        me.showElectricityPrice = this.pressed;
                        me.chart.destroy();
                        me.initChart();
                        me.drawChart();
                    }
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
                type: 'column',
                spacingRight: 45,
                spacingBottom: 25,
                inverted: me.getWidgetConfig()['invertedValue'] == 0,
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
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                },
                series: {
                    events: {
                        legendItemClick: function (event) {
                            this.chart.tooltip.hide();
                            var legendName = event.target.options.legendName;
                            if (me.showElectricityPrice) {
                                Ext.each(this.chart.series, function (series) {
                                    if (series.options.legendName == legendName && series.name != event.target.name) {
                                        if (series.visible) {
                                            series.hide();
                                        } else {
                                            series.show();
                                        }
                                    }
                                });
                            }
                        }
                    },
                    point: {
                        events: {
                            mouseOver: function () {
                                if (me.getWidgetConfig()['invertedValue'] == 0) {
                                    me.mouseOverHandler(this, 'vertical');
                                } else {
                                    me.mouseOverHandler(this);
                                }

                            },
                            mouseOut: function () {
                                me.mouseOutHandler(this);
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
            xAxis: {
                min: 0,
                lineWidth: 2,
                gridLineWidth: 0,
                showLastLabel: true,
                labels: {
                    formatter: function () {
                        var div;
                        if (me.getWidgetConfig()['invertedValue'] == 0) {
                            div = "<div style='padding-right: 10px; min-width: 100px;'>" + this.value + "</div>";
                        } else {
                            div = "<div style='padding-top: 10px; min-width: 100px';>" + this.value + "</div>";
                        }
                        return  div;
                    },
                    useHTML: true
                },
                lineColor: HighchartsConfig.xAxisLineColor
            },
            yAxis: [
                {
                    tickColor: '#F2F2F2',
                    lineColor: '#F2F2F2',
                    minorTickInterval: null,
                    min: 0,
                    title: {
                        text: ''
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
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
                valueDecimals: 2,
                crosshairs: true,
                shared: true
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                labelFormatter: function () {
                    return this.options.legendName || this.name;
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
        var dimension = me.headerContainer.down('#dimension').value;
        var charts = ['column', 'spline'];
        var colors = [];
        var dataPointObjectIds = [];
        Ext.each(Ext.decode(me.getWidgetConfig()['dataPointList']), function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
            colors.push('#' + dataPoint['color']);
        });
        var lines = 0;
        if (me.showLine == 1) {
            Ext.each(Ext.decode(me.getWidgetConfig()['lineDataPoint']), function (dataPoint) {
                dataPointObjectIds.push(dataPoint['dataPointId']);
                colors.push('#' + dataPoint['color']);
                lines++;
            });
        }
        me.chart ? '' : me.initChart();
        me.showLoading();
        if (me.showElectricityPrice) {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointElectricityPriceList',
                params: {
                    dataPointObjectIds: dataPointObjectIds.join('|'),
                    beginDate: dateRange.getBeginDate(),
                    endDate: dateRange.getEndDate(),
                    timeUnit: dimension
                },
                timeout: 60 * 60 * 1000,
                method: 'GET',
                success: function (response) {
                    me.hideLoading();
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.removeAllSeries();
                        me.buildXAxis();
                        Ext.each(result.items, function (item, index0) {
                            var timeSegments = [];
                            Ext.each(item['electricityPriceList'], function (electricityPrice) {
                                if (!Ext.Array.contains(timeSegments, electricityPrice['electricityPriceTimeSegment'])) {
                                    timeSegments.push(electricityPrice['electricityPriceTimeSegment']);
                                }
                            });

                            Ext.each(timeSegments, function (timeSegment, index1) {
                                var data = [];
                                Ext.each(me.chart.xAxis[0].categories, function (category) {
                                    var powerConsumption = null;
                                    var weekBeginDate, weekEndDate;
                                    if (dimension == 'Week') {
                                        var dateRange = category.split('~');
                                        weekBeginDate = Ext.Date.parse(dateRange[0], 'Y/m/d');
                                        if (dateRange[1].length == 2) {
                                            weekEndDate = Ext.Date.parse(dateRange[0].substr(0, 7) + '/' + dateRange[1], 'Y/m/d');
                                        } else if (dateRange[1].length == 5) {
                                            weekEndDate = Ext.Date.parse(dateRange[0].substr(0, 4) + '/' + dateRange[1], 'Y/m/d');
                                        } else {
                                            weekEndDate = Ext.Date.parse(dateRange[1], 'Y/m/d');
                                        }
                                    }
                                    Ext.each(item['valueList'], function (value) {
                                        if (timeSegment['objectId'] == value['electricityPriceTimeSegmentId']) {
                                            var datetimeString = '';
                                            var flag = false;
                                            if (dimension == 'Week') {
                                                datetimeString = value['datetimeString'].substr(0, 10).replace(/\-/g, '/');
                                                flag = Ext.Date.between(Ext.Date.parse(datetimeString, 'Y/m/d'), weekBeginDate, weekEndDate);
                                            } else {
                                                if (dimension == 'Day') {
                                                    datetimeString = value['datetimeString'].substr(0, 10).replace(/\-/g, '/');
                                                }
                                                if (dimension == 'Month') {
                                                    datetimeString = value['datetimeString'].substr(0, 7).replace(/\-/g, '/');
                                                }
                                                if (dimension == 'Year') {
                                                    datetimeString = value['datetimeString'].substr(0, 4).replace(/\-/g, '/');
                                                }
                                                flag = datetimeString == category;
                                            }

                                            if (flag) {
                                                powerConsumption = powerConsumption || 0;
                                                powerConsumption += value['powerConsumption'];
                                            }
                                        }
                                    });
                                    data.push(powerConsumption);
                                });

                                var brightness = (timeSegments.length - index1 - 1) / timeSegments.length / 2;
                                me.chart.addSeries({
                                    name: item['dataPointInfo']['dataPointName'] + '-' + timeSegment['name'],
                                    legendName: item['dataPointInfo']['dataPointName'],
                                    color: Highcharts.Color(colors[index0]).brighten(brightness).get(),
                                    showInLegend: index1 == timeSegments.length - 1,
                                    marker: {
                                        symbol: 'circle'
                                    },
                                    tooltip: {
                                        valueSuffix: item['dataPointInfo']['measureUnit']
                                    },
                                    data: data
                                });
                            });
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
        } else {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
                params: {
                    dataPointObjectIds: dataPointObjectIds.join('|'),
                    beginDate: beginDate,
                    endDate: endDate,
                    timeUnit: dimension
                },
                method: 'GET',
                success: function (response) {
                    me.hideLoading();
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.removeAllSeries();
                        me.buildXAxis();
                        var lineIndex = -1;
                        if (me.showLine == 1) {
                            lineIndex = result.items.length - lines;
                        }
                        for (var i = 0; i < result.items.length; i++) {
                            var dataPointInfo = result.items[i]['dataPointInfo'];
                            var actualValueList = result.items[i]['actualValueList'];
                            var yAxis = 0;
                            if (me.showLine == 1) {
                                yAxis = (i >= lineIndex ? 1 : 0);
                            }
                            me.chart.addSeries({
                                name: Ext.isDefined(dataPointInfo['dataPointName']) ? dataPointInfo['dataPointName'] : '',
                                color: colors[i],
                                type: charts[yAxis],
                                marker: {
                                    symbol: 'circle'
                                },
                                yAxis: yAxis,
                                tooltip: {
                                    valueSuffix: Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : ''
                                }
                            });
                            var data = me.fillSeriesData(beginDate, endDate, dimension, actualValueList, dataPointInfo['pointDataValueType']);
                            if (yAxis == 0) {
                                me.chart.series[i].setData(data.sumActualValueArray);
                            } else {
                                me.chart.series[i].setData(data.avgActualValueArray);
                            }
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
        }
    },


    buildXAxis: function () {
        var me = this;
        var chart = me.chart;
        var dateRange = me.headerContainer.down('#dateRange');
        var dimension = me.headerContainer.down('#dimension').value;
        var startTime = dateRange.getBeginDate();
        var endTime = dateRange.getEndDate();
        var categories = me.getXAxisCategories(dimension, startTime, endTime);
        var stepValue;
        if (this.getWidgetConfig()['invertedValue'] == 1) {
            if (dimension === 'Week') {
                stepValue = Math.ceil(categories.length / ((me.width - 50) / 120));
            } else {
                stepValue = Math.ceil(categories.length / ((me.width - 50) / 90));
            }
        } else {
            stepValue = Math.ceil(categories.length * 24 / (me.height - 38));
        }
        chart.xAxis[0].update({
            categories: categories,
            tickInterval: null,
            showLastLabel: true,
            endOnTick: true,
            labels: {
                step: stepValue
            }
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPointList'])) {
            Ext.defer(this.drawChart, 500, this);
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPointList: {
                displayName: '堆积柱图数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    enableColor: true
                }),
                renderer: this.propertyRender.multiDataPoint,
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
            showLine: {
                displayName: '是否显示曲线',
                renderer: function (v) {
                    return {0: '否', 1: '是'}[v];
                },
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                value: 0
            },
            invertedValue: {
                displayName: '轴方向',
                renderer: function (v) {
                    return {0: '横向', 1: '竖向'}[v];
                },
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '竖向', 0: '横向'}}),
                value: 1
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
            },
            enableElectricityPrice: {
                displayName: '显示/隐藏分时电量',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '显示', 0: '隐藏'}}),
                renderer: function (v) {
                    return {1: '显示', 0: '隐藏'}[v];
                },
                value: 1
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
        if (property === 'showLine') {
            this.showLine = value;
        }
        if (property === 'invertedValue') {
            if (this.chart) {
                this.chart.destroy();
                this.initChart();
                this.drawChart();
            }
        }
        if (property === 'enableElectricityPrice') {
            this.headerContainer.down('#button-electricity').setVisible(value == 1);
            if (this.showElectricityPrice && value == 0) {
                this.headerContainer.down('#button-electricity').toggle();
                this.showElectricityPrice = false;
                this.chart.destroy();
                this.initChart();
                this.drawChart();
            }
        }
    }
});