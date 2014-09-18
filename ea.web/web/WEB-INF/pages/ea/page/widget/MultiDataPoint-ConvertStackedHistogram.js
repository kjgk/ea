/**
 * 折算组件(时间)
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-ConvertStackedHistogram', {
    extend: 'Ext.container.Container',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base',
        chart: 'withub.ext.ea.page.widget.Chart'
    },
    devMode: false,
    hasAvgLine: false,

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
                    handler: function () {
                        if (!me.mainContainer.isVisible()) {
                            me.down('#button-chart').toggle();
                            me.down('#button-grid').toggle();
                            me.gridPanel.hide();
                            me.mainContainer.show();
                        }
                        me.drawChart();
                    }
                },
                {
                    itemId: 'button-chart',
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-chart',
                    pressed: true,
                    enableToggle: true,
                    handler: me.contentSwitchHandler('button-chart')
                },
                {
                    itemId: 'button-grid',
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-table',
                    enableToggle: true,
                    handler: me.contentSwitchHandler('button-grid')
                }
            ]
        });

        this.initChartMenu();

        this.chartContainer = Ext.create('Ext.container.Container', {
            flex: 1,
            listeners: {
                resize: function (component, width, height) {
                    if (me.chart) {
                        me.chart.setSize(width, height, true);
                    }
                }
            }
        });

        this.mainContainer = Ext.create('Ext.container.Container', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [this.chartContainer, this.menuContainer]
        });

        this.initGridPanel();

        this.initContentContainer({
            layout: 'fit',
            items: [this.mainContainer, this.gridPanel]
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();
    },

    contentSwitchHandler: function (itemId) {
        var me = this;
        return function () {
            var flag = true;
            if (itemId == 'button-chart') {
                flag = this.pressed;
            }
            if (itemId == 'button-grid') {
                flag = !this.pressed;
            }

            if (flag) {
                me.down('#button-grid').toggle(false, false);
                me.down('#button-chart').toggle(true, false);
                me.gridPanel.hide();
                me.mainContainer.show();
            } else {
                me.down('#button-chart').toggle(false, false);
                me.down('#button-grid').toggle(true, false);
                me.mainContainer.hide();
                me.gridPanel.show();
                if (me.refreshDataGrid) {
                    me.buildDataGrid();
                    me.refreshDataGrid = false;
                }
            }
        }
    },

    initChartMenu: function () {

        var me = this;
        var items = [
            {
                itemId: 'button-power',
                xtype: 'button',
                text: '用量',
                scope: this,
                handler: function () {
                    me.showPowerData();
                    me.setTitle(me.getWidgetConfig()['headerTitle'] + '-->用量');
                }
            },
            {
                itemId: 'button-fee',
                xtype: 'button',
                text: '电费',
                scope: this,
                handler: function () {
                    var dataPointsType = me.getWidgetConfig()['dataPointsType'];
                    me.setTitle(me.getWidgetConfig()['headerTitle'] + '-->电费');
                    me.showPriceData();
                }
            }
        ];

        if (!Ext.isEmpty(me.getWidgetConfig()['dataPointList'])) {
            var dataConvertList = Ext.decode(me.getWidgetConfig()['dataPointList'])['dataConvertList'];
            var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointList'])['dataPointList'];
            var buttonLimit = Math.floor((me.height - 140) / 28) - 2, moreButons = [];
            Ext.each(dataConvertList, function (item) {
                var target;
                if (buttonLimit > 0) {
                    target = items;
                } else {
                    target = moreButons;
                }
                target.push({
                    text: item['text'],
                    handler: function () {
                        var formulas = [], measureUnits = item['measureUnits'];
                        Ext.each(dataPointList, function (dataPoint) {
                            formulas.push(dataPoint[item['dataIndex']]);
                        });
                        me.showConvertData(formulas, measureUnits);
                        me.setTitle(me.getWidgetConfig()['headerTitle'] + '-->' + item['text']);
                    },
                    scope: this
                });
                if (buttonLimit == 0) {
                    items.push({
                        text: '更多',
                        menu: moreButons,
                        scope: this
                    });
                }
                buttonLimit--;
            });
        }

        items.push(
            {
                itemId: 'button-asc',
                xtype: 'button',
                cls: 'button-chart ',
                iconCls: 'icon-chart-asc',
                scope: this,
                pressed: true,
                enableToggle: true,
                handler: function () {
                    me.down('#button-desc').toggle();
                    me.orderData('asc');
                }
            },
            {
                itemId: 'button-desc',
                xtype: 'button',
                cls: 'button-chart ',
                iconCls: 'icon-chart-desc',
                scope: this,
                enableToggle: true,
                handler: function () {
                    me.down('#button-asc').toggle();
                    me.orderData('desc');
                }
            },
            {
                itemId: 'button-avg',
                xtype: 'button',
                cls: 'button-chart ',
                iconCls: 'icon-chart-means',
                scope: this,
                handler: function () {
                    me.addAvgLine();
                }
            },
            {
                itemId: 'button-datum',
                xtype: 'button',
                cls: 'button-chart ',
                iconCls: 'icon-chart-baseline',
                scope: this,
                handler: function () {
                    var wind = Ext.create('Ext.window.Window', {
                        bodyPadding: 10,
                        layout: 'form',
                        width: 240,
                        height: 120,
                        modal: true,
                        title: '设置基准值',
                        items: [
                            {
                                xtype: 'numberfield',
                                fieldLabel: '基准值',
                                itemId: 'datumValue',
                                labelWidth: 48,
                                minValue: 0,
                                anchor: '100%',
                                value: this.getWidgetConfig()['datumValue']
                            }
                        ],
                        buttons: [
                            {
                                text: '确定',
                                handler: function () {
                                    var datumValue = wind.down('#datumValue').value;
                                    me.addDatumLine(datumValue);
                                    me.putWidgetConfig({
                                        datumValue: datumValue
                                    });
                                    wind.close();
                                }
                            },
                            {
                                text: '取消',
                                handler: function () {
                                    var datumValue = null;
                                    me.addDatumLine(datumValue);
                                    me.putWidgetConfig({
                                        datumValue: datumValue
                                    });
                                    wind.close();
                                }
                            }
                        ]
                    });
                    wind.show();
                }
            }
        );

        this.menuContainer = Ext.create('Ext.container.Container', {
            width: 64,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaultType: 'button',
            defaults: {
                style: 'margin: 5px 5px 5px 5px;'
            },
            items: items
        });
    },

    initGridPanel: function () {
        var me = this;
        var columns = [
            {xtype: 'rownumberer', width: 32 },
            {text: '时间', width: 120, dataIndex: 'datetimeString', align: 'center'},
            {text: '用量', width: 80, dataIndex: 'value', displayType: DisplayType.Number},
            {itemId: 'price_column', text: '电费(元)', width: 80, dataIndex: 'price', displayType: DisplayType.Number, hidden: me.getWidgetConfig()['dataPointsType'] != 0}
        ];
        var fields = ['datetimeString', 'value', 'price'];

        if (!Ext.isEmpty(me.getWidgetConfig()['dataPointList'])) {
            var dataConvertList = Ext.decode(me.getWidgetConfig()['dataPointList'])['dataConvertList'];
            var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointList'])['dataPointList'];
            Ext.each(dataConvertList, function (dataConvert) {
                fields.push(dataConvert['dataIndex']);
                columns.push(Ext.applyIf({
                    minWidth: 80,
                    flex: 1,
                    displayType: DisplayType.Number,
                    text: dataConvert['text'] + '(' + dataConvert['measureUnits'] + ')'
                }, dataConvert));
            });
        }
        this.gridPanel = Ext.create('withub.ext.base.Grid', {
            flex: 1,
            border: false,
            hidden: true,
            store: Ext.create('Ext.data.ArrayStore', {
                fields: fields
            }),
            columns: columns
        });
    },

    initChart: function () {
        var me = this;
        me.chart = new Highcharts.Chart({
            chart: {
                renderTo: me.chartContainer.getId(),
                type: 'column',
                spacingTop: 15,
                spacingLeft: 15,
                spacingRight: 30,
                spacingBottom: 20,
                inverted: true,
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
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
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
                                me.mouseOverHandler(this, 'vertical');
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
                    x: 0,
                    formatter: function () {
                        return "<div style='padding-right: 10px; min-width: 80px;'>" + this.value + "</div>";
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
                },
                stackLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.total == null ? 0.0 : this.total.toFixed(2);
                    },
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true,
                valueDecimals: 2
//                formatter: function () {
//                    var s = '<b>' + this.x + '</b><br/>';
//                    Ext.each(this.points, function (point) {
//                        var valueSuffix = Ext.isEmpty(point.series.tooltipOptions.valueSuffix) ? '' : point.series.tooltipOptions.valueSuffix;
//                        if (point.series.name.split(' ').length == 1) {
//                            s += '<span style="color:' + point.series.color + '">' + point.series.name + '</span>:' + point.y.toFixed(2) + valueSuffix + '<br/>';
//                        } else {
//                            s += '<span style="color:' + point.series.color + '">' + point.series.name.split(' ')[0] + point.series.name.split(" ")[2].split("~")[0] + "~" +
//                                point.series.name.split(" ")[3] + '</span>:' + point.y.toFixed(2) + valueSuffix + '<br/>';
//                        }
//
//                    });
//                    return s;
//                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                padding: 25,
                margin: -5,
                borderWidth: 0
            },
            series: []
        });
    },

    drawChart: function () {
        var me = this;
        var dateRange = me.headerContainer.down('#dateRange');
        var dimension = me.headerContainer.down('#dimension').value;
        var beginDate = Ext.Date.clearTime(new Date(dateRange.getBeginDate()));
        var endDate = Ext.Date.parse(dateRange.getEndDate() + ' 23:59:59', 'Y-m-d H:i:s');
        var colors = [];
        var dataPointObjectIds = [];
        Ext.each(Ext.decode(me.getWidgetConfig()['dataPointList'])['dataPointList'], function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
            colors.push('#' + dataPoint['color']);
        });

        me.chart ? '' : me.initChart();
        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
            params: {
                dataPointObjectIds: dataPointObjectIds.join('|'),
                beginDate: dateRange.getBeginDate(),
                endDate: dateRange.getEndDate(),
                timeUnit: dimension
            },
            method: 'GET',
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var consumptionData = [], measureUnits = [];
                    me.removeAllSeries();
                    me.buildXAxis();
                    for (var i = 0; i < result.items.length; i++) {
                        var dataPointInfo = result.items[i]['dataPointInfo'];
                        var actualValueList = result.items[i]['actualValueList'];
                        var measureUnit = dataPointInfo['measureUnit'] || '';
                        var data = me.fillSeriesData(beginDate, endDate, dimension, actualValueList, dataPointInfo['pointDataValueType']);
                        me.chart.addSeries({
                            name: Ext.isDefined(dataPointInfo['dataPointName']) ? dataPointInfo['dataPointName'] : '',
                            color: colors[i],
                            marker: {
                                symbol: 'circle'
                            },
                            tooltip: {
                                valueSuffix: measureUnit
                            },
                            data: data.sumActualValueArray
                        });
                        measureUnits.push(measureUnit);
                        consumptionData.push(data.sumActualValueArray);
                    }
                    me.consumptionData = consumptionData;
                    me.measureUnits = measureUnits;
                    me.setTitle(me.getWidgetConfig()['headerTitle'] + '-->用量');
                    me.refreshDataGrid = true;
                } else {
                    me.showError(result.message);
                }
            },
            failure: function (response) {
                me.hideLoading();
                me.showError(response.responseText);
            }
        });

        if (me.getWidgetConfig()['dataPointsType'] == 0) {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointElectricityPriceList',
                params: {
                    dataPointObjectIds: dataPointObjectIds.join('|'),
                    beginDate: dateRange.getBeginDate(),
                    endDate: dateRange.getEndDate(),
                    timeUnit: dimension
                },
                method: 'GET',
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.priceData = [];

                        for (var i = 0; i < result.items.length; i++) {
                            var dataPointInfo = result.items[i]['dataPointInfo'];
                            var valueList = result.items[i]['valueList'];
                            var data = [];
                            Ext.each(me.chart.xAxis[0].categories, function (item) {
                                var price = null;
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
                                        price = price || 0;
                                        price += value['price'];
                                    }
                                });
                                data.push(price);
                            });
                            me.priceData.push(data);
                        }
                    } else {
                        me.showError(result.message);
                    }
                },
                failure: function (response) {
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
        stepValue = Math.ceil(categories.length * 24 / (me.height - 38));
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

    showPowerData: function () {
        var me = this;
        Ext.each(me.chart.series, function (series, index) {
            series.update({
                tooltip: {
                    valueSuffix: me.measureUnits[index]
                },
                data: me.consumptionData[index]
            });
        });
    },

    showConvertData: function (formulas, measureUnits) {
        var me = this;
        Ext.each(me.chart.series, function (series, index) {
            var data = [];
            Ext.each(series.data, function (v, index_) {
                var X = me.consumptionData[index][index_];
                data.push((X == null) ? X : eval(formulas[index]));
            });
            series.update({
                tooltip: {
                    valueSuffix: measureUnits
                },
                data: data
            });
        });
    },

    showPriceData: function () {
        var me = this;
        Ext.each(me.chart.series, function (series, index) {
            series.update({
                tooltip: {
                    valueSuffix: '元'
                },
                data: me.priceData[index]
            });
        });
    },

    orderData: function (order) {
        var me = this;
        var chart = me.chart;
        var categories = [];
        var orderDatas = [];
        var seriesCounts = chart.series.length;
        var dataCounts = chart.series[0].data.length;

        for (var i = 0; i < seriesCounts; i++) {
            var datas = chart.series[i].data.sort(function sortNum(a, b) {
                if (order === 'asc') {
                    return a.stackTotal - b.stackTotal;
                } else {
                    return b.stackTotal - a.stackTotal;
                }
            });
            var data = [];
            for (var j = 0; j < dataCounts; j++) {
                data.push(datas[j].y);
                if (i == 0) {
                    categories.push(datas[j].category);
                }
            }
            orderDatas.push(data);
        }

        chart.xAxis[0].setCategories(categories);
        for (var i = 0; i < seriesCounts; i++) {
            chart.series[i].setData(orderDatas[i]);
        }
    },

    addAvgLine: function () {
        var me = this;
        var chart = me.chart;
        chart.yAxis[0].removePlotLine('avgLine');
        if (!this.hasAvgLine) {
            var counts = chart.series[0].data.length;
            var total = 0;
            for (var j = 0; j < counts; j++) {
                total += chart.series[0].data[j].stackTotal;
            }
            var avgValue = parseInt(total / counts * 100) / 100;
            chart.yAxis[0].addPlotLine({
                value: avgValue,
                label: {
                    text: '平均值:' + avgValue,
                    rotation: 0,
                    textAlign: 'left',
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || '#000'
                    },
                    verticalAlign: 'top'
                },
                color: '#000',
                dashStyle: 'Dash',
                width: 3,
                id: 'avgLine'
            });
            this.hasAvgLine = true;
        } else {
            this.hasAvgLine = false;
        }
    },

    addDatumLine: function (value) {

        if (this.chart == null) {
            return;
        }
        this.chart.yAxis[0].removePlotLine('datumLine');
        if (value != null) {
            this.chart.yAxis[0].addPlotLine({
                value: value,
                label: {
                    text: '基准值:' + value,
                    rotation: 0,
                    textAlign: 'left',
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                    },
                    verticalAlign: 'top'
                },
                color: 'red',
                width: 3,
                id: 'datumLine'
            });
        }
    },

    buildDataGrid: function () {
        var me = this;
        var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointList'])['dataPointList'];
        var dataConvertList = Ext.decode(me.getWidgetConfig()['dataPointList'])['dataConvertList'];
        var data = [];
        Ext.each(me.chart.xAxis[0].categories, function (datetime, index0) {
            var originValue = 0;
            var price = 0;
            var convertValues = [];
            Ext.each(me.consumptionData, function (value, index1) {
                var X = parseInt(value[index0] || 0, 10);
                Ext.each(dataConvertList, function (dataConvert, index2) {
                    var formula = dataPointList[index1][dataConvert['dataIndex']];
                    convertValues[index2] = convertValues[index2] || 0;
                    convertValues[index2] += eval(formula);
                });
                originValue += X;
            });
            Ext.each(me.priceData, function (value, index1) {
                price += parseInt(value[index0] || 0, 10);
            });
            data.push([datetime, originValue, price].concat(convertValues));
        });
        me.gridPanel.getStore().loadData(data);
    },

    setTitle: function (title) {
        this.headerContainer.down('#headerText').setText(title);
    },

    getDefaultWidgetConfig: function () {
        var me = this;
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPointList: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    enableColor: true,
                    enableDataConvert: true
                }),
                renderer: this.propertyRender.multiDataPoint,
                value: ''
            },
            datumValue: {
                displayName: '基准值',
                editor: Ext.create('Ext.form.field.Number'),
                value: ''
            },
            dataPointsType: {
                displayName: '数据点消耗类型',
                renderer: function (v) {
                    return {0: '电量', 1: '其它'}[v];
                },
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    editable: false,
                    store: [
                        [0, '电量'],
                        [1, '其它']
                    ],
                    lazyRender: true,
                    listClass: 'x-combo-list-small'
                }),
                value: 0
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
            }
        };
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (property === 'headerTitle') {
            this.setTitle(value);
        }
        if (property === 'datumValue') {
            this.addDatumLine(value);
        }
        if (property === 'dateLimit') {
            var dateRange = this.headerContainer.down('#dateRange');
            var beginDate = this.parseBeginDate(value.split('|')[1], value.split('|')[0]);
            dateRange.beginTimeField.setValue(beginDate);
            dateRange.endTimeField.setValue(new Date());
        }
        if (property === 'dataPointList') {
            this.mainContainer.remove(this.menuContainer);
            this.contentContainer.remove(this.gridPanel);
            this.initChartMenu();
            this.initGridPanel();
            this.mainContainer.add(this.menuContainer);
            this.contentContainer.add(this.gridPanel);
        }
        if (property === 'dataPointsType') {
            this.menuContainer.down('#button-fee').setVisible(value == 0);
            this.gridPanel.down('#price_column').setVisible(value == 0);
        }
    }
});