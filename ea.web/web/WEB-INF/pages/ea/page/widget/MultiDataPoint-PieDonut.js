/**
 * 多级饼
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-PieDonut', {
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
                type: 'pie',
                spacingTop: 15,
                spacingLeft: 15,
                spacingRight: 45,
                spacingBottom: 20
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '{point.percentage:.1f} %'
                    },
                    showInLegend: true
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
            legend: {
                borderWidth: 0
            },
            tooltip: {
                pointFormat: '<div style="color: {series.color};"><b>{point.y}</b></div>',
                valueDecimals: 2,
                percentageDecimals: 2
            },
            series: [
            ]
        });
    },

    drawChart: function () {
        var me = this;
        var dateRange = me.headerContainer.down('#dateRange');
        me.groups = [];
        var treeNodes = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[0])
        me.parseTree(treeNodes);
        var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[1]);
        var dataPointObjectIds = [], colors = [];
        Ext.each(me.groups, function (group) {
            Ext.each(dataPointList, function (dataPoint) {
                if (group.groupId == dataPoint['groupId']) {
                    dataPointObjectIds.push(dataPoint['dataPointId']);
                    colors.push('#' + dataPoint['color']);
                    group.dataRecords++;
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
            scope: this,
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);
                var measureUnit = Ext.isDefined(result.items[0]['dataPointInfo']['measureUnit']) ? result.items[0]['dataPointInfo']['measureUnit'] : '';
                if (result.success) {
                    me.removeAllSeries();
                    me.index = 0;
                    var treeNodeValues = me.setTreeNodeValues(treeNodes, result);
                    var baseInnerSize = parseInt(90 / me.maxDepth);
                    for (var i = 2; i <= me.maxDepth; i++) {
                        var datas = [];
                        if (i == 2) {
                            me.chart.addSeries({
                                data: me.getDataByDepth(treeNodeValues, i, datas),
                                size: baseInnerSize + '%',
                                tooltip: {
                                    valueSuffix: measureUnit
                                },
                                dataLabels: {
                                    distance: -30
                                }
                            });
                        } else {
                            me.chart.addSeries({
                                data: me.getDataByDepth(treeNodeValues, i, datas),
                                size: (baseInnerSize * (i - 1)) + '%',
                                tooltip: {
                                    valueSuffix: measureUnit
                                },
                                innerSize: (baseInnerSize * (i - 2)) + '%',
                                dataLabels: {
                                    distance: -20
                                }
                            });
                        }
                    }
                    var dataPointDatas = [];
                    for (var i = 0; i < result.items.length; i++) {
                        var dataPointInfo = result.items[i]['dataPointInfo'];
                        var actualValueList = result.items[i]['actualValueList'];
                        dataPointDatas.push({
                            name: dataPointInfo['dataPointName'],
                            y: actualValueList[0].sumActualValue,
                            color: colors[i]
                        });
                    }
                    me.chart.addSeries({
                        data: dataPointDatas,
                        size: '90%',
                        tooltip: {
                            valueSuffix: measureUnit
                        },
                        innerSize: (90 - baseInnerSize) + '%',
                        dataLabels: {
                            distance: -30
                        }
                    });
                    me.chart.setSize(me.contentContainer.getWidth() - 2, me.contentContainer.getHeight() - 2, true);
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
                    selectModel: 'Group',
                    enableColor: true,
                    enableGroupColor: true
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

    parseTree: function (treeNodes) {

        var me = this;
        me.groups = me.groups || [];

        Ext.each(treeNodes, function (treeNode) {
            var group = {
                groupName: '',
                groupId: '',
                color: '',
                dataRecords: 0
            }
            if (treeNode.children.length > 0) {
                me.parseTree(treeNode.children)
            } else {
                group.groupId = treeNode.id;
                group.groupName = treeNode.text;
                group.color = treeNode.color;
            }
            if (!Ext.isEmpty(group.groupName)) {
                me.groups.push(group)
            }
        })
    },

    setTreeNodeValues: function (treeNodes, result) {

        var me = this;
        var groups = [];
        me.index = me.index || 0;
        me.maxDepth = 0;

        Ext.each(treeNodes, function (treeNode) {
            var group = {
                groupName: '',
                groupId: '',
                color: '',
                depth: '',
                value: 0,
                children: []
            };
            group.groupId = treeNode.id;
            group.groupName = treeNode.text;
            group.color = treeNode.color;
            group.depth = treeNode.depth;
            if (treeNode.children.length > 0) {
                var childGroups = me.setTreeNodeValues(treeNode.children, result);
                if (childGroups.length > 0) {
                    group.children = childGroups;
                    Ext.each(childGroups, function (childGroup) {
                        group.value += childGroup.value
                    });
                }
            } else {
                var dataRecords = 0;
                Ext.each(me.groups, function (group) {
                    if (group.groupId == treeNode.id) {
                        dataRecords = group.dataRecords;
                    }
                });
                for (var i = 0; i < dataRecords; i++) {
                    var actualValueList = result.items[me.index]['actualValueList'];
                    group.value += actualValueList[0].sumActualValue;
                    me.index++;
                }
                if (treeNode.depth > me.maxDepth) {
                    me.maxDepth = treeNode.depth;
                }
            }
            groups.push(group);
        })
        return groups;
    },

    getDataByDepth: function (treeNodes, depth, datas) {

        var me = this;
        var tempTreeNode;
        Ext.each(treeNodes, function (treeNode) {
            tempTreeNode = treeNode;
            if (treeNode.depth < depth) {
                me.getDataByDepth(treeNode.children, depth, datas);
            } else if (treeNode.depth = depth) {
                datas.push({
                    name: treeNode.groupName,
                    color: '#' + treeNode.color,
                    y: treeNode.value
                });
            }
        });
        return datas;
    }
});