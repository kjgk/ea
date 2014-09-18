Ext.define('withub.ext.ea.page.widget.MultiDataPoint-MultiStackedHistogram', {
    extend: 'Ext.container.Container',
    bodyPadding: 1,
    width: 700,
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
                    xtype: 'daterange',
                    width: 220,
                    height: 22
                } ,
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
                spacingRight: 45,
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
                        return "<div style='padding-top: 10px; min-width: 100px'>" + this.value + "</div>";
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
                valueDecimals: 2,
                shared: true
            },
            legend: {
//                enabled: false,
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

                        me.groups = [];

                    }
                    return groupName.join(',');

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
                value: '5|Minute'
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

    }
});