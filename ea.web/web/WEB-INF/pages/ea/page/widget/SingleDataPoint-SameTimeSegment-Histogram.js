/**
 * 同时段对比柱图
 */
Ext.define('withub.ext.ea.page.widget.SingleDataPoint-SameTimeSegment-Histogram', {
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
                    itemId: 'beginYearMonth',
                    xtype: 'yearmonthfield',
                    format: 'Y-m',
                    width: 80,
                    height: 22
                },
                {
                    text: "至",
                    cls: 'label',
                    height: 36,
                    style: 'font-size: 10px;',
                    xtype: 'label'
                },
                {
                    itemId: 'endYearMonth',
                    xtype: 'yearmonthfield',
                    format: 'Y-m',
                    width: 80,
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
                renderTo: me.contentContainer.getId(),
                type: 'column',
                spacingTop: 15,
                spacingLeft: 15,
                spacingRight: 15,
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
            plotOptions: {
                column: {
//                    colorByPoint: true,
                    stacking: 'normal',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                },
                series: {
                    events: {
                        legendItemClick: function (event) {
                            return false;
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
                        return "<div style='padding-top: 10px; min-width: 100px;'>" + this.value + "</div>";
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
                formatter: function () {
                    var dataIndex = this.points[0].point.x;
                    var datumText = me.datumDataArray[dataIndex] == null ? me.datumDateArray[dataIndex] + "：" + me.datumDataArray[dataIndex] : me.datumDateArray[dataIndex] + "：" + me.datumDataArray[dataIndex] + me.measureUnit;
                    var contrastText = me.contrastDataArray[dataIndex] == null ? me.contrastDateArray[dataIndex] + "：" + me.contrastDataArray[dataIndex] : me.contrastDateArray[dataIndex] + "：" + me.contrastDataArray[dataIndex] + me.measureUnit;
                    var contrastColorIndex = 2;
                    if (this.points[2].y == 0) {
                        contrastColorIndex = 3;
                    }
                    if (this.points[2].y == 0 && this.points[3].y == 0) {
                        contrastColorIndex = 1;
                    }

                    return "<div style='padding-right: 10px; min-width: 80px; min-height: 30px;'><p style='color: " + me.colors[0] + "'>" + datumText +
                        "</p><p style='color: " + me.colors[contrastColorIndex] + "'>" + contrastText + "</p></div>";
                },
                valueDecimals: 2,
                shared: true,
                crosshairs: true,
                useHTML: true
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'bottom',
                itemHoverStyle: null,
                y: -30,
                borderWidth: 0,
                labelFormatter: function () {
                    if ((this.name + '').indexOf('20') != 0) {
                        return this.options.legendName || this.name;
                    }
                }
            },
            series: []
        });
    },

    drawChart: function () {
        var me = this;
        var beginYearMonth = this.headerContainer.down('#beginYearMonth');
        var endYearMonth = this.headerContainer.down('#endYearMonth');
        var datumBeginDate = Ext.Date.clearTime(Ext.Date.getFirstDateOfMonth(new Date(beginYearMonth.getValue())));
        var datumEndDate = Ext.Date.clearTime(Ext.Date.getLastDateOfMonth(new Date(endYearMonth.getValue())));
        var dimension = me.headerContainer.down('#dimension').value;
        var dataPointObjectId = Ext.decode(me.getWidgetConfig()['dataPoint']).dataPointId;
        var contrastCycle = Ext.decode(me.getWidgetConfig()['contrastCycle']);
        var contrastBeginDate = new Date(moment(datumBeginDate).add({months: contrastCycle[1], years: contrastCycle[0]}));
        var contrastEndDate = new Date(moment(datumEndDate).add({months: contrastCycle[1], years: contrastCycle[0]}));

        me.chart ? '' : me.initChart();
        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointSameTimeSegmentContrastActualValue',
            method: 'GET',
            timeout: 60 * 60 * 1000,
            params: {
                dataPointObjectId: dataPointObjectId,
                datumBeginDate: datumBeginDate,
                datumEndDate: datumEndDate,
                contrastBeginDate: contrastBeginDate,
                contrastEndDate: contrastEndDate,
                timeUnit: dimension
            },
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    me.removeAllSeries();
                    me.buildXAxis();
                    var datumColor = me.getWidgetConfig()['datumColor'];
                    var equalColor = me.getWidgetConfig()['equalColor'];
                    var lowerColor = me.getWidgetConfig()['lowerColor'];
                    var higherColor = me.getWidgetConfig()['higherColor'];
                    me.colors = ['#' + datumColor, '#' + equalColor, '#' + lowerColor, '#' + higherColor ];
                    var names = [me.getXAxisCategories(null, datumBeginDate, datumEndDate), '持平', '低于同期', '高于同期'];

                    var dataPointInfo = result.dataPointInfo;
                    var datumActualValueList = result.datumActualValueList;
                    var contrastActualValueList = result.contrastActualValueList;
                    var dataArray = me.rebuildSeriesData(datumActualValueList, contrastActualValueList);
                    if (dataPointInfo['pointDataValueType'] == 2) {
                        me.datumDataArray = dataArray[4].sumDataArray;
                        me.contrastDataArray = dataArray[5].sumDataArray;
                    } else {
                        me.datumDataArray = dataArray[4].avgDataArray;
                        me.contrastDataArray = dataArray[5].avgDataArray;
                    }
                    me.datumDateArray = dataArray[4].datetimeStringArray;
                    me.contrastDateArray = dataArray[5].datetimeStringArray;
                    me.measureUnit = Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : '';
                    for (var i = 0; i < 4; i++) {
                        me.chart.addSeries({
                            name: names[i],
                            color: me.colors[i],
                            marker: {
                                symbol: 'circle'
                            }
                        });
                        if (dataPointInfo['pointDataValueType'] == 2) {
                            me.chart.series[i].setData(dataArray[i].sumActualValueArray);
                        } else {
                            me.chart.series[i].setData(dataArray[i].avgActualValueArray);
                        }
                    }
                } else {
                    me.showError(result.message);
                }
            },
            failure: function (response) {
                me.hideLoading();
                me.showError(response.responseText);
            },
            scope: this
        });
    },

    rebuildSeriesData: function (datumActualValueList, contrastActualValueList) {


        var datumMaxActualValueArray = [], higherMaxActualValueArray = [], equalMaxActualValueArray = [], lowerMaxActualValueArray = [], datumMaxDataArray = [], contrastMaxDataArray = [];
        var datumMinActualValueArray = [], higherMinActualValueArray = [], equalMinActualValueArray = [], lowerMinActualValueArray = [], datumMinDataArray = [], contrastMinDataArray = [];
        var datumAvgActualValueArray = [], higherAvgActualValueArray = [], equalAvgActualValueArray = [], lowerAvgActualValueArray = [], datumAvgDataArray = [], contrastAvgDataArray = [];
        var datumSumActualValueArray = [], higherSumActualValueArray = [], equalSumActualValueArray = [], lowerSumActualValueArray = [], datumSumDataArray = [], contrastSumDataArray = [];
        var datumDatetimeStringArray = [], contrastDatetimeStringArray = [];

        var datumListLength = datumActualValueList.length, contrastListLength = contrastActualValueList.length;
        for (var i = 0, j = 0; i < datumListLength; i++, j++) {

            var datumMaxActualValue = 0, higherMaxActualValue = 0, equalMaxActualValue = 0, lowerMaxActualValue = 0, datumMaxData = null, contrastMaxData = null;
            var datumMinActualValue = 0, higherMinActualValue = 0, equalMinActualValue = 0, lowerMinActualValue = 0, datumMinData = null, contrastMinData = null;
            var datumAvgActualValue = 0, higherAvgActualValue = 0, equalAvgActualValue = 0, lowerAvgActualValue = 0, datumAvgData = null, contrastAvgData = null;
            var datumSumActualValue = 0, higherSumActualValue = 0, equalSumActualValue = 0, lowerSumActualValue = 0, datumSumData = null, contrastSumData = null;

            var datumActualValue = datumActualValueList[i];
            var datumDatetimeString = datumActualValue['datetimeString'].replace('-', '/').replace('-', '/');
            var contrastActualValue = contrastActualValueList[j];
            var contrastDatetimeString = contrastActualValue == null ? '--' : contrastActualValue['datetimeString'].replace('-', '/').replace('-', '/');
            var datumDay = 0;
            var contrastDay = 0;
            if (datumDatetimeString.length == 10) {
                var datumDay = eval(datumDatetimeString.split('/')[2]);
                var contrastDay = eval(contrastDatetimeString.split('/')[2]);
                if (datumDay > contrastDay) {
                    j--;
                } else if (datumDay < contrastDay) {
                    while (datumDay != contrastDay) {
                        j++;
                        contrastActualValue = contrastActualValueList[j];
                        contrastDatetimeString = contrastActualValue['datetimeString'].replace('-', '/').replace('-', '/');
                        contrastDay = eval(contrastDatetimeString.split('/')[2]);
                    }
                }
            }
            if ((datumDatetimeString.length == 10 && datumDay > contrastDay) || contrastActualValue == null) {
                datumMaxActualValue = datumActualValue['maxActualValue'] == null ? 0 : eval(datumActualValue['maxActualValue']);
                datumMinActualValue = datumActualValue['minActualValue'] == null ? 0 : eval(datumActualValue['minActualValue']);
                datumAvgActualValue = datumActualValue['avgActualValue'] == null ? 0 : eval(datumActualValue['avgActualValue']);
                datumSumActualValue = datumActualValue['sumActualValue'] == null ? 0 : eval(datumActualValue['sumActualValue']);
                datumMaxData = datumActualValue['maxActualValue'], datumMinData = datumActualValue['minActualValue'], datumAvgData = datumActualValue['avgActualValue'], datumSumData = datumActualValue['sumActualValue'];
                datumDatetimeStringArray.push(datumDatetimeString);
                contrastDatetimeStringArray.push('--');
            } else {
                var datumValue = datumActualValue['maxActualValue'] == null ? 0 : eval(datumActualValue['maxActualValue']);
                var contrastValue = contrastActualValue['maxActualValue'] == null ? 0 : eval(contrastActualValue['maxActualValue']);
                datumMaxData = datumActualValue['maxActualValue'], contrastMaxData = contrastActualValue['maxActualValue'];
                if (datumValue > contrastValue) {
                    datumMaxActualValue = datumValue - contrastValue;
                    higherMaxActualValue = contrastValue;
                } else if (datumValue == contrastValue) {
                    equalMaxActualValue = datumValue;
                } else {
                    lowerMaxActualValue = contrastValue;
                }

                datumValue = datumActualValue['minActualValue'] == null ? 0 : eval(datumActualValue['minActualValue']);
                contrastValue = contrastActualValue['minActualValue'] == null ? 0 : eval(contrastActualValue['minActualValue']);
                datumMinData = datumActualValue['minActualValue'], contrastMinData = contrastActualValue['minActualValue'];
                if (datumValue > contrastValue) {
                    datumMinActualValue = datumValue - contrastValue;
                    higherMinActualValue = contrastValue;
                } else if (datumValue == contrastValue) {
                    equalMinActualValue = datumValue;
                } else {
                    lowerMinActualValue = contrastValue;
                }

                datumValue = datumActualValue['avgActualValue'] == null ? 0 : eval(datumActualValue['avgActualValue']);
                contrastValue = contrastActualValue['avgActualValue'] == null ? 0 : eval(contrastActualValue['avgActualValue']);
                datumAvgData = datumActualValue['avgActualValue'], contrastAvgData = contrastActualValue['avgActualValue'];
                if (datumValue > contrastValue) {
                    datumAvgActualValue = datumValue - contrastValue;
                    higherAvgActualValue = contrastValue;
                } else if (datumValue == contrastValue) {
                    equalAvgActualValue = datumValue;
                } else {
                    lowerAvgActualValue = contrastValue;
                }

                datumValue = datumActualValue['sumActualValue'] == null ? 0 : eval(datumActualValue['sumActualValue']);
                contrastValue = contrastActualValue['sumActualValue'] == null ? 0 : eval(contrastActualValue['sumActualValue']);
                datumSumData = datumActualValue['sumActualValue'], contrastSumData = contrastActualValue['sumActualValue'];
                if (datumValue > contrastValue) {
                    datumSumActualValue = datumValue - contrastValue;
                    higherSumActualValue = contrastValue;
                } else if (datumValue == contrastValue) {
                    equalSumActualValue = datumValue;
                } else {
                    lowerSumActualValue = contrastValue;
                }

                datumDatetimeStringArray.push(datumDatetimeString);
                contrastDatetimeStringArray.push(contrastDatetimeString);
            }

            datumMaxActualValueArray.push(datumMaxActualValue);
            higherMaxActualValueArray.push(higherMaxActualValue);
            equalMaxActualValueArray.push(equalMaxActualValue);
            lowerMaxActualValueArray.push(lowerMaxActualValue);
            datumMaxDataArray.push(datumMaxData);
            contrastMaxDataArray.push(contrastMaxData);
            datumMinActualValueArray.push(datumMinActualValue);
            higherMinActualValueArray.push(higherMinActualValue);
            equalMinActualValueArray.push(equalMinActualValue);
            lowerMinActualValueArray.push(lowerMinActualValue);
            datumMinDataArray.push(datumMinData);
            contrastMinDataArray.push(contrastMinData);
            datumAvgActualValueArray.push(datumAvgActualValue);
            higherAvgActualValueArray.push(higherAvgActualValue);
            equalAvgActualValueArray.push(equalAvgActualValue);
            lowerAvgActualValueArray.push(lowerAvgActualValue);
            datumAvgDataArray.push(datumAvgData);
            contrastAvgDataArray.push(contrastAvgData);
            datumSumActualValueArray.push(datumSumActualValue);
            higherSumActualValueArray.push(higherSumActualValue);
            equalSumActualValueArray.push(equalSumActualValue);
            lowerSumActualValueArray.push(lowerSumActualValue);
            datumSumDataArray.push(datumSumData);
            contrastSumDataArray.push(contrastSumData);
        }
        var dataArray = [];
        dataArray.push({datetimeStringArray: datumDatetimeStringArray, maxActualValueArray: datumMaxActualValueArray,
            minActualValueArray: datumMinActualValueArray, avgActualValueArray: datumAvgActualValueArray, sumActualValueArray: datumSumActualValueArray});
        dataArray.push({datetimeStringArray: contrastDatetimeStringArray, maxActualValueArray: equalMaxActualValueArray,
            minActualValueArray: equalMinActualValueArray, avgActualValueArray: equalAvgActualValueArray, sumActualValueArray: equalSumActualValueArray});
        dataArray.push({datetimeStringArray: contrastDatetimeStringArray, maxActualValueArray: lowerMaxActualValueArray,
            minActualValueArray: lowerMinActualValueArray, avgActualValueArray: lowerAvgActualValueArray, sumActualValueArray: lowerSumActualValueArray});
        dataArray.push({datetimeStringArray: contrastDatetimeStringArray, maxActualValueArray: higherMaxActualValueArray,
            minActualValueArray: higherMinActualValueArray, avgActualValueArray: higherAvgActualValueArray, sumActualValueArray: higherSumActualValueArray});
        dataArray.push({datetimeStringArray: datumDatetimeStringArray, maxDataArray: datumMaxDataArray,
            minDataArray: datumMinDataArray, avgDataArray: datumAvgDataArray, sumDataArray: datumSumDataArray});
        dataArray.push({datetimeStringArray: contrastDatetimeStringArray, maxDataArray: contrastMaxDataArray,
            minDataArray: contrastMinDataArray, avgDataArray: contrastAvgDataArray, sumDataArray: contrastSumDataArray});
        return dataArray;
    },

    buildXAxis: function () {
        var me = this;
        var chart = me.chart;
        var beginYearMonth = this.headerContainer.down('#beginYearMonth');
        var endYearMonth = this.headerContainer.down('#endYearMonth');
        var startTime = Ext.Date.clearTime(Ext.Date.getFirstDateOfMonth(new Date(beginYearMonth.getValue())));
        var endTime = Ext.Date.clearTime(Ext.Date.getLastDateOfMonth(new Date(endYearMonth.getValue())));
        var dimension = me.headerContainer.down('#dimension').value;
        var categories = me.getXAxisCategories(dimension, startTime, endTime);
        var stepValue;
        if (dimension === '') {
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
                    selectModel: 'Single'
                }),
                renderer: this.propertyRender.singleDataPoint,
                value: ''
            },
            dateLimit: {
                displayName: '默认显示时间段',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: [ 'Month', 'Year']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: '1|Month'
            },
            contrastCycle: {
                displayName: '对比周期',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeCycleField', {
                    allowAll: false
                }),
                renderer: function (v) {
                    var values = [];
                    if (v) {
                        var valueList = Ext.decode(v);
                        Ext.each(valueList, function (value) {
                            values.push(value);
                        }, this);
                    }
                    return values.join(',');
                },
                allowBlank: false,
                value: '[0,-1]'
            },
            datumColor: {
                displayName: '基准颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'cccccc'
            },
            equalColor: {
                displayName: '持平颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '00aaff'
            },
            lowerColor: {
                displayName: '低于颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '009933'
            },
            higherColor: {
                displayName: '高于颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'ff6633'
            },
            refreshInterval: {
                displayName: '自动刷新间隔',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Second', 'Minute', 'Hour']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: HighchartsConfig.defalutRefreshInterval
            }
        };
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);

        this.mixins.chart.applyWidgetConfig.call(this, property, value);

        if (property === 'dateLimit') {
            var beginYearMonth = this.headerContainer.down('#beginYearMonth');
            var endYearMonth = this.headerContainer.down('#endYearMonth');
            var beginDate = this.parseBeginDate(value.split('|')[1], value.split('|')[0]);
            if (value.split('|')[1] == 'Month') {
                beginDate = new Date(moment(beginDate).add('months', 1));
            }
            beginYearMonth.setValue(beginDate);
            endYearMonth.setValue(new Date());
        }
    }
})
;