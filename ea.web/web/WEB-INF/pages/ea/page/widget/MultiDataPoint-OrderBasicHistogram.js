/**
 * 排名组件
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-OrderBasicHistogram', {
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
                }
            ]
        });

        this.initChartMenu();

        this.chartContainer = Ext.create('Ext.container.Container', {
            layout: 'fit',
            autoScroll: true
        });

        this.initContentContainer({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [this.menuContainer, this.chartContainer]
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();

        this.contentContainer.on('resize', function (component, width, height) {
            if(me.chart){
                if (me.groups == null || me.groups.length === 0) {
                    this.chart.setSize(Math.max(450, width - 32), height - 50, true);
                } else {
                    this.chart.setSize(Math.max(450, width - 32), Math.max(me.chartHeight, height - 50), true);
                }
            }
            this.chartContainer.setHeight(height - 34);
            this.chartContainer.setWidth(width - 2);
        }, this);
    },

    initChartMenu: function () {
        var me = this;
        this.menuContainer = Ext.create('Ext.container.Container', {
            height: 32,
            cls: 'chart-header',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaultType: 'button',
            defaults: {
                width: 64,
                style: 'margin: 3px 0px 3px 20px;'
            },
            items: [
                {
                    itemId: 'button-asc',
                    xtype: 'button',
                    text: '从低到高',
                    scope: this,
                    handler: function () {
                        me.orderData('asc');
                    }
                },
                {
                    itemId: 'button-desc',
                    xtype: 'button',
                    text: '从高到低',
                    scope: this,
                    handler: function () {
                        me.orderData('desc');
                    }
                },
                {
                    itemId: 'button-default',
                    xtype: 'button',
                    text: '默认排序',
                    scope: this,
                    handler: function () {
                        me.setDefaultData();
                    }
                },
                {
                    itemId: 'button-avg',
                    xtype: 'button',
                    text: '平均值',
                    scope: this,
                    handler: function () {
                        me.addAvgLine();
                    }
                },
                {
                    itemId: 'button-datum',
                    xtype: 'button',
                    text: '参考值',
                    scope: this,
                    handler: function () {
                        var wind = Ext.create('Ext.window.Window', {
                            bodyPadding: 10,
                            layout: 'form',
                            width: 240,
                            height: 120,
                            modal: true,
                            title: '设置参考值',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: '参考值',
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
                spacingTop: 5,
                spacingLeft: 15,
                spacingRight: 45,
                spacingBottom: 10,
                inverted: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    pointPadding: 0.1,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        x: -40,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || '#000000',
                        formatter: function () {
                            var value = ExtUtil.toFixed(this.y / me.totalValue, 2) * 100;
                            if (value == 0) {
                                return "<span style='padding-left: 30px;'>" + value.toFixed(0)
                                    + "%</span><span style='padding-left: 10px'>" + this.y + "</span>";
                            } else if (value < 10) {
                                return "<span style='padding-left: 20px;'>" + value.toFixed(0)
                                    + "%</span><span style='padding-left: 10px'>" + this.y + "</span>";
                            } else if (value < 100) {
                                return "<span style='padding-left: 10px;'>" + value.toFixed(0)
                                    + "%</span><span style='padding-left: 10px'>" + this.y + "</span>";
                            }
                            return "<span>" + value.toFixed(0) + "%</span><span style='padding-left: 10px'>" + this.y + "</span>";
                        },
                        useHTML: true
                    }
                },
                series: {
                    pointWidth: 35
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
                tickLength: 0,
                lineWidth: 0,
                gridLineWidth: 0,
                labels: {
                    x: 0,
                    formatter: function () {
                        return "<div style='padding-right: 10px'>" + this.value + "</div>";
                    },
                    useHTML: true
                },
                lineColor: HighchartsConfig.xAxisLineColor
            },
            yAxis: {
                tickColor: '#F2F2F2',
                lineColor: '#F2F2F2',
                gridLineColor: '#F2F2F2',
                minorTickInterval: null,
                min: 0,
                labels: {
                    enabled: false
                },
                title: {
                    text: ''
                }
            },
            tooltip: {
                enabled: false
            },
            legend: {
                enabled: false
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
                }
            })
        });

        me.chart ? '' : me.initChart();
        me.showLoading();
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
                    var categories = [];
                    var dataArray = [];
                    me.chart.addSeries({
                        name: '总量',
                        color: '#' + me.getWidgetConfig()['barColor'],
                        tooltip: {
                            valueSuffix: ''
                        }
                    });
                    var totalValue = 0;
                    for (var i = 0; i < result.items.length; i++) {
                        var dataPointInfo = result.items[i]['dataPointInfo'];
                        categories.push(Ext.isEmpty(dataPointInfo['dataPointName']) ? dataPointInfo['dataPointTag'] : dataPointInfo['dataPointName']);
                        var actualValueList = result.items[i]['actualValueList'];
                        dataArray.push(actualValueList[0].sumActualValue);
                        totalValue += actualValueList[0].sumActualValue;
                    }
                    me.totalValue = totalValue;
                    me.defaultData = dataArray;
                    me.categories = categories;
                    me.chart.xAxis[0].setCategories(categories);
                    me.chart.xAxis[0].update({
                        showLastLabel: true,
                        endOnTick: true
                    });
                    me.chart.series[0].setData(dataArray);
                    me.chartHeight = result.items.length * 50;
                    me.chart.setSize(Math.max(450, me.width - 32), Math.max(me.chartHeight, me.height - 50), true);
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
        var dataCounts = chart.series[0].data.length;
        var datas = chart.series[0].data.sort(function sortNum(a, b) {
            if (order === 'asc') {
                return a.y - b.y;
            } else {
                return b.y - a.y;
            }
        });
        for (var j = 0; j < dataCounts; j++) {
            orderDatas.push(datas[j].y);
            categories.push(datas[j].category);
        }

        chart.xAxis[0].setCategories(categories);
        chart.series[0].setData(orderDatas);
    },

    setDefaultData: function () {
        var me = this;
        var chart = me.chart;
        chart.xAxis[0].setCategories(me.categories);
        chart.series[0].setData(me.defaultData);
    },

    addAvgLine: function () {
        var me = this;
        var chart = me.chart;

        chart.yAxis[0].removePlotLine('avgLine');
        if (!this.hasAvgLine) {
            var counts = chart.series[0].data.length;
            var total = 0;
            for (var j = 0; j < counts; j++) {
                total += chart.series[0].data[j].y;
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
                    text: '参考值:' + value,
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
                    enableColor: false,
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
                displayName: '参考值',
                editor: Ext.create('Ext.form.field.Number'),
                value: ''
            },
            barColor: {
                displayName: '柱图颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
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
    }
});