Ext.define('withub.ext.ea.page.widget.MultiDataPoint-OrderStackedHistogram', {
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
                },
                {
                    xtype: 'button',
                    cls: 'button-chart ',
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

        this.initChartMenu();

        this.chartContainer = Ext.create('Ext.container.Container', {
            flex: 1
        });

        this.initContentContainer({
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [this.chartContainer, this.menuContainer]
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();
    },

    initChartMenu: function () {
        var me = this;
        this.menuContainer = Ext.create('Ext.container.Container', {
            width: 36,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaultType: 'button',
            defaults: {
                width: 30,
                style: 'margin: 0px 5px 5px 0px;'
            },
            items: [
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
            ]
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
                spacingRight: 100,
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
                        return "<div style='padding-right: 10px; min-width: 100px'>" + this.value + "</div>";
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
        me.groups = [];
        me.parseTree(Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[0]));
        var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[1]);
        var dataPointObjectIds = [], colors = [];
        Ext.each(me.groups, function (group) {
            Ext.each(dataPointList, function (dataPoint) {
                if (group.groupId == dataPoint['groupId']) {
                    dataPointObjectIds.push(dataPoint['dataPointId']);
                    colors.push('#' + dataPoint['color']);
                }
            })
        });

        me.chart ? '' : me.initChart();
        me.showLoading();
        if (me.showElectricityPrice) {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointElectricityPriceList',
                params: {
                    dataPointObjectIds: dataPointObjectIds.join('|'),
                    beginDate: dateRange.getBeginDate(),
                    endDate: dateRange.getEndDate(),
                    timeUnit: 'Day'
                },
                timeout: 60 * 60 * 1000,
                method: 'GET',
                success: function (response) {
                    me.hideLoading();
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.removeAllSeries();
                        me.buildXAxis();
                        for (var i = 0; i < result.items.length; i++) {
                            var dataPointInfo = result.items[i]['dataPointInfo'];
                            var valueList = result.items[i]['valueList'];
                            var electricityPriceList = result.items[i]['electricityPriceList'];

                            var timeSegments = [];
                            Ext.each(electricityPriceList, function (electricityPrice) {
                                if (!Ext.Array.contains(timeSegments, electricityPrice['electricityPriceTimeSegment'])) {
                                    timeSegments.push(electricityPrice['electricityPriceTimeSegment']);
                                }
                            });

                            Ext.each(timeSegments, function (timeSegment, index) {
                                var data = [], powerConsumption = null;
                                Ext.each(valueList, function (value) {
                                    if (timeSegment['objectId'] == value['electricityPriceTimeSegmentId']) {
                                        powerConsumption = powerConsumption || 0;
                                        powerConsumption += value['powerConsumption'];
                                    }
                                });
                                Ext.each(me.groups, function (group, index) {
                                    var v = null;
                                    if (index == me.getGroupIndex(i, me.groups)) {
                                        v = powerConsumption;
                                    }
                                    data.push(v);
                                });

                                var brightness = (timeSegments.length - index - 1) / timeSegments.length / 2;
                                me.chart.addSeries({
                                    name: dataPointInfo['dataPointName'] + '-' + timeSegment['name'],
                                    legendName: dataPointInfo['dataPointName'],
                                    color: Highcharts.Color(colors[i]).brighten(brightness).get(),
                                    showInLegend: index == timeSegments.length - 1,
                                    marker: {
                                        symbol: 'circle'
                                    },
                                    tooltip: {
                                        valueSuffix: dataPointInfo['measureUnit']
                                    },
                                    data: data
                                });
                            });

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
        } else {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
                params: {
                    dataPointObjectIds: dataPointObjectIds.join('|'),
                    beginDate: dateRange.getBeginDate(),
                    endDate: dateRange.getEndDate(),
                    timeUnit: 'None'
                },
                method: 'GET',
                success: function (response) {
                    me.hideLoading();
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.removeAllSeries();
                        me.buildXAxis();
                        for (var i = 0; i < result.items.length; i++) {
                            var dataPointInfo = result.items[i]['dataPointInfo'];
                            var actualValueList = result.items[i]['actualValueList'];
                            var dataArray = [];
                            Ext.each(me.groups, function (group, index) {
                                dataArray[index] = null;
                            });
                            dataArray[me.getGroupIndex(i, me.groups)] = actualValueList[0]['sumActualValue'];
                            me.chart.addSeries({
                                name: dataPointInfo['dataPointName'],
                                color: colors[i],
                                tooltip: {
                                    valueSuffix: Ext.isDefined(dataPointInfo['measureUnit']) && !Ext.isEmpty(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : ''
                                },
                                data: dataArray
                            });
                        }
                        if (me.getWidgetConfig()['enableDataGrid'] == 1) {
                            me.buildDataGrid(result.items);
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
        var categories = [];
        Ext.each(me.groups, function (group) {
            categories.push(group.groupName)
        });
        this.chart.xAxis[0].setCategories(categories);
        me.categories = categories;
        chart.xAxis[0].update({
            showLastLabel: true,
            endOnTick: true
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPointGroup'])) {
            Ext.defer(this.drawChart, 500, this);
        }
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

    parseTree: function (treeNodes) {

        var me = this;
        me.groups = me.groups || [];

        Ext.each(treeNodes, function (treeNode) {

            var group = {
                groupName: '',
                groupId: ''
            }

            if (treeNode.children.length > 0) {

                me.parseTree(treeNode.children)

            } else {
                group.groupId = treeNode.id;
                group.groupName = treeNode.text;
            }
            if (!Ext.isEmpty(group.groupName)) {
                me.groups.push(group)
            }

        })

    },

    getGroupIndex: function (i, groups) {
        var length = 0;
        var groupIndex = -1;

        var dataPointList = Ext.decode(this.getWidgetConfig()['dataPointGroup'].split('|')[1]);

        Ext.each(groups, function (group, index) {
            var dataPointListLengthByGroup = 0;

            Ext.each(dataPointList, function (dataPoint) {
                if (dataPoint['groupId'] === group.groupId) {
                    dataPointListLengthByGroup++;
                }

            })
            length = dataPointListLengthByGroup + length;
            if (i < length) {
                groupIndex = index;
                return false
            }
        })

        return groupIndex;

    },

    getDefaultWidgetConfig: function () {
        var me = this;
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPointGroup: {
                displayName: '数据点组',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    level: 1,
                    selectModel: 'Group',
                    enableColor: true,
                    enableGroupColor: false
                }),
                renderer: function (v) {
                    var groupName = [];
                    if (v) {
                        me.groups = [];
                        me.parseTree(Ext.decode(v.split('|')[0]));

                        Ext.each(me.groups, function (group) {
                            groupName.push(group.groupName)
                        });

                    }
                    return groupName.join(',');

                },
                value: ''
            },
            datumValue: {
                displayName: '基准值',
                editor: Ext.create('Ext.form.field.Number'),
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

        if (property === 'datumValue') {
            this.addDatumLine(value);
        }
        if (property === 'dateLimit') {
            var dateRange = this.headerContainer.down('#dateRange');
            var beginDate = this.parseBeginDate(value.split('|')[1], value.split('|')[0]);
            dateRange.beginTimeField.setValue(beginDate);
            dateRange.endTimeField.setValue(new Date());
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