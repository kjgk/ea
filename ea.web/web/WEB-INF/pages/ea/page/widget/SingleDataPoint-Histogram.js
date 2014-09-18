Ext.define('withub.ext.ea.page.widget.SingleDataPoint-Histogram', {
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
                { xtype: 'tbfill'},
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
                },
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
                    cls: 'button-chart',
                    iconCls: 'icon-chart-query',
                    scope: this,
                    handler: me.drawChart
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
                type: 'column',
                renderTo: me.contentContainer.getId(),
                spacingTop: 15,
                spacingLeft: 15,
                spacingRight: 45,
                spacingBottom: 20,
                events: {
                    tooltipRefresh: function (e) {
                        Ext.each(this.series, function (series) {
                            Ext.each(series.points, function (point) {
                                point.firePointEvent('mouseOut');
                            });
                        });
                        this.hoverPoints[0].firePointEvent('mouseOver');
                    }
                }
            },
            plotOptions: {
                column: me.showElectricityPrice ? {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                } : {},
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
                labels: {
                    formatter: function () {
                        return "<div style='padding: 10px 2px 0px 2px; min-width: 80px;'>" + this.value + "</div>";
                    },
                    useHTML: true
                },
                lineColor: HighchartsConfig.xAxisLineColor
            },
            yAxis: {
                tickColor: '#F2F2F2',
                lineColor: '#F2F2F2',
                minorTickInterval: null,
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                valueDecimals: 2,
                shared: true,
                crosshairs: true,
                useHTML: true
            },
            legend: {
                enabled: me.showElectricityPrice,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0
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
        var dataPoint = Ext.decode(me.getWidgetConfig()['dataPoint']);
        var dataPointObjectId = dataPoint.dataPointId;

        me.chart ? '' : me.initChart();
        me.showLoading();
        if (me.showElectricityPrice) {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointElectricityPriceList',
                params: {
                    dataPointObjectIds: dataPointObjectId,
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
                        var dataPointInfo = result.items[0]['dataPointInfo'];
                        var electricityPriceList = result.items[0]['electricityPriceList'];
                        var valueList = result.items[0]['valueList'];

                        Ext.each(dataPoint['electricityPriceTimeSegmentList'], function (timeSegment) {
                            var timeSegmentId = timeSegment.timeSegmentId;
                            var color = timeSegment.color;
                            var data = [];
                            var name = '';
                            var electricityPriceIdList = [];
                            Ext.each(electricityPriceList, function (electricityPrice) {
                                if (electricityPrice['electricityPriceTimeSegment'].objectId == timeSegmentId) {
                                    electricityPriceIdList.push(electricityPrice.objectId);
                                    name = electricityPrice['electricityPriceTimeSegment'].name;
                                }
                            });

                            if(Ext.isEmpty(name)) {
                                return true;
                            }

                            Ext.each(me.chart.xAxis[0].categories, function (item) {
                                var powerConsumption = null;
                                var weekBeginDate, weekEndDate;
                                if (dimension == 'Week') {
                                    var dateRange = item.split('~');
                                    weekBeginDate = Ext.Date.parse(dateRange[0], 'Y/m/d');
                                    if (dateRange[1].length == 2) {
                                        weekEndDate = Ext.Date.parse(dateRange[0].substr(0, 7) + '/' + dateRange[1], 'Y/m/d');
                                    } else if (dateRange[1].length == 5) {
                                        weekEndDate = Ext.Date.parse(dateRange[0].substr(0, 4) + '/' + dateRange[1], 'Y/m/d');
                                    } else {
                                        weekEndDate = Ext.Date.parse(dateRange[1], 'Y/m/d');
                                    }
                                }
                                Ext.each(valueList, function (value) {
                                    if (electricityPriceIdList.join(',').indexOf(value['electricityPriceId']) >= 0) {
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
                                            flag = datetimeString == item;
                                        }

                                        if (flag) {
                                            powerConsumption = powerConsumption || 0;
                                            powerConsumption += value['powerConsumption'];
                                        }
                                    }
                                });
                                data.push(powerConsumption);
                            });

                            me.chart.addSeries({
                                name: name,
                                color: '#' + color,
                                marker: {
                                    symbol: 'circle'
                                },
                                tooltip: {
                                    valueSuffix: dataPointInfo['measureUnit']
                                },
                                data: data
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
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointActualValue',
                params: {
                    dataPointObjectId: dataPointObjectId,
                    beginDate: dateRange.getBeginDate(),
                    endDate: dateRange.getEndDate(),
                    timeUnit: dimension
                },
                method: 'GET',
                success: function (response) {
                    me.hideLoading();
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.removeAllSeries();
                        me.buildXAxis();
                        var dataPointInfo = result.items[0]['dataPointInfo'];
                        var actualValueList = result.items[0]['actualValueList'];
                        var data = me.fillSeriesData(beginDate, endDate, dimension, actualValueList, dataPointInfo['pointDataValueType']);
                        me.chart.addSeries({
                            name: dataPointInfo['dataPointName'],
                            color: '#' + dataPoint['color'],
                            tooltip: {
                                valueSuffix: Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : ''
                            },
                            data: data.sumActualValueArray
                        });
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
        if (dimension === 'Week') {
            stepValue = Math.ceil(categories.length / ((me.width - 50) / 120));
        } else {
            stepValue = Math.ceil(categories.length / ((me.width - 50) / 90));
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
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {
            Ext.defer(this.drawChart, 500, this);
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPoint: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single',
                    enableColor: true,
                    enableElectricityPrice: true
                }),
                renderer: this.propertyRender.singleDataPoint,
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
        if (property === 'dataPoint') {
            if (value) {
                var dataPoint = Ext.decode(value);
                this.headerContainer.down('#button-electricity').setVisible(dataPoint['electricityPriceTimeSegment'] != '')
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