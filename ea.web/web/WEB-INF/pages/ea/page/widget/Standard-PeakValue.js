/**
 *峰值组件
 */
Ext.define('withub.ext.ea.page.widget.Standard-PeakValue', {
    extend: 'Ext.Component',
    width: 480,
    height: 320,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        var valueFontSize = this.getWidgetConfig()['valueFontSize'] || 16;
        var valueColor = this.getWidgetConfig()['valueColor'] || '000000';
        var backgroundColor = this.getWidgetConfig()['backgroundColor'] || '000000';
        var headerTitleColor = this.getWidgetConfig()['headerTitleColor'] || 'CCCCCC';
        var smallFontSize = parseInt(valueFontSize / 2);
        var chartHeight = this.height - 108;

        this.componentId = Ext.id();
        var divComponent = ''
            + '<div style="height: ' + this.height + 'px; width: ' + this.width + 'px" id="' + this.componentId + '">'
            + '<div id="' + this.componentId + '-all" style="background-color:#F2F2F2;height: ' + this.height + 'px; width: ' + this.width + 'px;border-width: 1px;border-color: #CCCCCC;border-style: solid; border-radius: 6px;text-align:center;" >'
            + '<div id="' + this.componentId + '-headerTitle" style="width:100%;height:36px;background-color:#' + backgroundColor + ';color:#' + headerTitleColor + ';font-size: 20px;border-width: 0px;border-style: solid;border-top-left-radius: 6px;border-top-right-radius: 6px;text-align:left;"></div>'
            + '<div id = "' + this.componentId + '-chart" style="width:100%;height:' + chartHeight + 'px;background-color:#' + backgroundColor + ';"></div>'
            + '<div id="' + this.componentId + '-label" style="width:100%;height:70px;background:-webkit-linear-gradient(top,#cfcfcf,#ffffff);">'
            + '<div style="float:left;width:24%;height:100%;"><div style="height:10%;"></div><div id = "' + this.componentId + '-avg" style="height:50%;color:' + valueColor + ';font-size: ' + valueFontSize + 'px;">0<span id = "' + this.componentId + '-avgUnit" style="font-size: ' + smallFontSize + 'px;">%</span></div><div id = "' + this.componentId + '-avgLabel" style="height:30%;color:' + valueColor + ';font-size: ' + smallFontSize + 'px;">高于平均百分比</div><div style="height:10%;"></div></div>'
            + '<div style="float:left;width:40%;height:100%;"><div style="height:10%;"></div><div id = "' + this.componentId + '-time" style="height:50%;color:' + valueColor + ';font-size: ' + valueFontSize + 'px;"></div><div id = "' + this.componentId + '-timeLabel" style="height:30%;color:' + valueColor + ';font-size: ' + smallFontSize + 'px;">发生区间</div><div style="height:10%;"></div></div>'
            + '<div style="float:left;width:36%;height:100%;"><div style="height:10%;"></div><div id = "' + this.componentId + '-value" style="height:50%;color:' + valueColor + ';font-size: ' + valueFontSize + 'px;">0<span id = "' + this.componentId + '-valueUnit" style="font-size: ' + smallFontSize + 'px;"></span></div><div id = "' + this.componentId + '-valueLabel" style="height:30%;color:' + valueColor + ';font-size: ' + smallFontSize + 'px;">区间总耗能</div><div style="height:10%;"></div></div>'
            + '</div></div></div>';

        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;
            this.height = height;
            this.width = width;

            $('#' + componentId).css('width', width);
            $('#' + componentId).css('height', height);
            $('#' + componentId + '-all').css('height', height);
            $('#' + componentId + '-all').css('width', width);
            $('#' + componentId + '-chart').css('height', height - 108);
            this.chart.setSize(width - 2, height - 108, true);
            return false;

        }, this);

        this.on('afterrender', function () {
            this.initChart(this.getWidgetConfig()['backgroundColor'] || '000000');
            this.getEl().on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    },

    initChart: function (backgroundColor) {
        var me = this;
        me.chart = new Highcharts.Chart({
            chart: {
                type: 'line',
                renderTo: this.componentId + '-chart',
                spacingTop: 0,
                spacingBottom: 0,
                backgroundColor: '#' + backgroundColor
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
                    tickWidth: 0,
                    lineWidth: 0,
                    gridLineWidth: 0,
                    showLastLabel: true,
                    endOnTick: true,
                    labels: {
                        enabled: false
                    },
                    lineColor: HighchartsConfig.xAxisLineColor
                }
            ],
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    enabled: false
                },
                minorTickInterval: null,
                tickWidth: 0,
                lineWidth: 0,
                gridLineWidth: 0
//                opposite: true
            },
            tooltip: {
                enabled: true,
                headerFormat: '<span style="font-size: 10px">{point.key}:00</span><br/>'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    lineWidth: 4
                }
            },
            series: []
        });
    },

    loadChartData: function () {
        var me = this;

        var componentId = this.componentId;
        var dataPoint = Ext.decode(me.getWidgetConfig()['dataPoint']);
        var dataPointObjectId = dataPoint.dataPointId;
        var dateLimit = me.getWidgetConfig()['dateLimit'];
        var beginDate = this.parseBeginDate(dateLimit.split('|')[1], dateLimit.split('|')[0]);
        var endDate = new Date();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
            params: {
                dataPointObjectIds: dataPointObjectId,
                beginDate: beginDate,
                endDate: endDate,
                timeUnit: 'Hour'
            },
            method: 'GET',
            success: function (response) {
                if (me.chart) {
                    while (me.chart.series.length > 0) {
                        me.chart.series[0].remove();
                    }
                }
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var dataPointInfo = result.items[0]['dataPointInfo'];
                    var dataPointValueType = dataPointInfo['pointDataValueType'];
                    var actualValueList = result.items[0]['actualValueList'];
                    var datas = [], categories = [];
                    var maxValueTime = '', maxIndex = 0;
                    var maxValue = 0, totalValue = 0, count = 0;
                    if (dataPointValueType == 2) {
                        for (var i = 0; i < actualValueList.length; i++) {
                            var actualValue = actualValueList[i];
                            if (i == 0) {
                                maxValue = actualValue['sumActualValue'];
                                maxValueTime = actualValue['datetimeString'];
                            } else {
                                if (actualValue['sumActualValue'] > maxValue) {
                                    maxValue = actualValue['sumActualValue'];
                                    maxValueTime = actualValue['datetimeString'];
                                    maxIndex = i;
                                }
                            }
                            if (actualValue['sumActualValue'] != null) {
                                count++;
                            }
                            totalValue += actualValue['sumActualValue'];
                        }
                    } else {
                        for (var i = 0; i < actualValueList.length; i++) {
                            var actualValue = actualValueList[i];
                            if (i == 0) {
                                maxValue = actualValue['avgActualValue'];
                                maxValueTime = actualValue['datetimeString'];
                            } else {
                                if (actualValue['avgActualValue'] > maxValue) {
                                    maxValue = actualValue['avgActualValue'];
                                    maxValueTime = actualValue['datetimeString'];
                                    maxIndex = i;
                                }
                            }
                            if (actualValue['avgActualValue'] != null) {
                                count++;
                            }
                            totalValue += actualValue['avgActualValue'];
                        }
                    }
                    var avgValue = totalValue / count;
                    var valueUnit = Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : '';
                    var timeLabel = '发生区间';
                    if (Ext.Date.isEqual(Ext.Date.clearTime(beginDate), Ext.Date.clearTime(endDate))) {
                        timeLabel = '今日' + timeLabel;
                    } else {
                        timeLabel += maxValueTime.substring(0, 10);
                    }
                    var startIndex = Math.max(0, maxIndex - 4);
                    var endIndex = Math.min(actualValueList.length - 1, startIndex + 8);
                    var time = maxValueTime.substring(11, 13) + ':00 - ' + (maxIndex + 1 == actualValueList.length ? '' : actualValueList[maxIndex + 1]['datetimeString'].substring(11, 13) + ':00');
                    for (var i = startIndex; i <= endIndex; i++) {
                        var actualValue = actualValueList[i];
                        if (dataPointValueType == 1) {
                            datas.push(actualValue['avgActualValue']);
                        } else {
                            datas.push(actualValue['sumActualValue']);
                        }
                        categories.push(actualValue['datetimeString']);
                    }
                    me.chart.xAxis[0].setCategories(categories);
                    me.chart.addSeries({
                        name: dataPointInfo['dataPointName'],
                        color: '#' + dataPoint['color'],
                        marker: {
                            symbol: 'circle'
                        },
                        tooltip: {
                            valueSuffix: valueUnit
                        },
                        data: datas
                    });
                    me.addAvgLine(avgValue);
                    var smallFontSize = parseInt(me.getWidgetConfig()['valueFontSize'] / 2);
                    Ext.fly(componentId + '-avg').update('' + parseInt((maxValue - avgValue) / avgValue * 100)
                        + '<span id = "' + componentId + '-avgUnit" style="font-size: ' + smallFontSize + 'px;">%</span>');
                    Ext.fly(componentId + '-time').update(time);
                    Ext.fly(componentId + '-timeLabel').update(timeLabel);
                    Ext.fly(componentId + '-value').update('' + maxValue.toFixed(2)
                        + '<span id = "' + componentId + '-valueUnit" style="font-size: ' + smallFontSize + 'px;">' + valueUnit + '</span>');
                } else {
                    me.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                        '数据加载错误，异常信息：' + (result.message || '无') + '</div>');
                }
            },
            failure: function (response) {
                me.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                    '数据加载错误，异常信息：' + (response.responseText || '无') + '</div>');
            }
        });
    },

    addAvgLine: function (value) {
        var me = this;
        var chart = me.chart;
        if (chart == null) {
            return;
        }
        chart.yAxis[0].removePlotLine('avgLine');
        var avgValue = parseInt(value * 100) / 100;
        chart.yAxis[0].addPlotLine({
            value: avgValue,
            label: {
                text: '平均值:' + avgValue,
//                text: '',
                rotation: 0,
                textAlign: 'left',
                style: {
                    fontWeight: 'bold',
                    color: '#CCC'
                },
                verticalAlign: 'top'
            },
            color: '#CCC',
            width: 1,
            id: 'avgLine'
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {
            Ext.defer(this.loadChartData, 500, this);
        }
    },

    applyWidgetConfig: function (property, value) {
        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (property === 'backgroundColor') {
            Ext.fly(this.componentId + '-headerTitle').setStyle('background-color', '#' + value);
            Ext.fly(this.componentId + '-chart').setStyle('background-color', '#' + value);
            this.initChart(value);
            this.refreshTaskHandler();
        }

        if (property === 'headerTitleColor') {
            Ext.fly(this.componentId + '-headerTitle').setStyle('color', '#' + value);
        }

        if (property === 'valueColor') {
            Ext.fly(this.componentId + '-avg').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-time').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-value').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-avgLabel').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-timeLabel').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-valueLabel').setStyle('color', '#' + value);
        }

        if (property === 'headerTitle') {
            Ext.fly(this.componentId + '-headerTitle').update('&nbsp;' + value);
        }

        if (property === 'valueFontSize') {
            Ext.fly(this.componentId + '-avg').setStyle('font-size', value + 'px');
            Ext.fly(this.componentId + '-time').setStyle('font-size', value + 'px');
            Ext.fly(this.componentId + '-value').setStyle('font-size', value + 'px');
            var smallFontSize = parseInt(value / 2);
            Ext.fly(this.componentId + '-avgLabel').setStyle('font-size', smallFontSize + 'px');
            Ext.fly(this.componentId + '-timeLabel').setStyle('font-size', smallFontSize + 'px');
            Ext.fly(this.componentId + '-valueLabel').setStyle('font-size', smallFontSize + 'px');
            Ext.fly(this.componentId + '-avgUnit').setStyle('font-size', smallFontSize + 'px');
            Ext.fly(this.componentId + '-valueUnit').setStyle('font-size', smallFontSize + 'px');
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
                    enableColor: true
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
                value: '5|Minute'
            },
            valueFontSize: {
                displayName: '值字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 16
            },
            valueColor: {
                displayName: '值字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            backgroundColor: {
                displayName: '背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            headerTitleColor: {
                displayName: '标题颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'CCCCCC'
            }
        };
    }

});