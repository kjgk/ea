/**
 * 多联饼
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-PieMultiPart', {
    extend: 'Ext.container.Container',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base',
        chart: 'withub.ext.ea.page.widget.Chart'
    },
    devMode: false,

    initComponent: function () {

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
                    handler: this.drawChart
                }
            ]
        });

        this.initContentContainer({
            layout: {
                type: 'hbox',
                align: 'stretch'
            }
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();

        this.on('resize', function (component, width, height) {
            if (this.charts && this.charts.length > 0) {
                var count = this.charts.length;
                for (var i = 0; i < count; i++) {
                    this.charts[i].setSize(width / count, height - 38, true);
                }
                this.contentContainer.doLayout();
            }
        }, this);
    },

    initChart: function () {
        var me = this;
        me.charts = [];
        Ext.each(me.contentContainer.items, function (item, index) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: me.contentContainer.getComponent(index).getId(),
                    type: 'pie'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        size: '90%',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            distance: -30,
                            format: '{point.percentage:.1f} %'
                        },
                        point: {
                            events: {
                                click: function () {
                                    me.refreshPieCharts(this.x);
                                }
                            }
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
                tooltip: {
                    pointFormat: '<div style="color: {series.color};"><b>{point.y}</b></div>',
                    valueDecimals: 2,
                    percentageDecimals: 2
                },
                legend: {
                    borderWidth: 0
                },
                series: [
                    {
                        type: 'pie'
                    }
                ]
            });
            me.charts.push(chart);
        })
    },

    drawChart: function () {
        var me = this;
        var dateRange = me.headerContainer.down('#dateRange');
        me.groups = [];
        var treeNodes = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[0])
        me.parseTree(treeNodes);
        var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[1]);
        var dataPointObjectIds = [];
        me.colors = [];
        Ext.each(me.groups, function (group) {
            Ext.each(dataPointList, function (dataPoint) {
                if (group.groupId == dataPoint['groupId']) {
                    dataPointObjectIds.push(dataPoint['dataPointId']);
                    me.colors.push('#' + dataPoint['color']);
                    group.dataRecords++;
                }
            })
        });

        me.charts ? '' : me.initChart();
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
                me.result = Ext.decode(response.responseText);
                if (me.result.success) {
                    me.index = 0;
                    var treeNodeValues = me.setTreeNodeValues(treeNodes, me.result);

                    for (var i = 0; i < me.charts.length; i++) {
                        this.charts[i].destroy();
                    }
                    this.contentContainer.removeAll();
                    for (var i = 0; i < me.maxDepth; i++) {
                        this.contentContainer.add(Ext.create('Ext.container.Container', {
                            flex: 1
                        }));
                    }
                    this.contentContainer.doLayout();
                    me.initChart();
                    var measureUnit = Ext.isDefined(me.result.items[0]['dataPointInfo']['measureUnit']) ? me.result.items[0]['dataPointInfo']['measureUnit'] : '';
                    for (var i = 0; i < this.charts.length; i++) {
                        this.charts[i].setSize((me.getWidth() - 2) / this.charts.length, me.getHeight() - 38, true);
                        me.charts[i].series[0].update({
                            tooltip: {
                                valueSuffix: measureUnit
                            }
                        });
                    }

                    var datas = [];
                    me.charts[0].series[0].setData(me.getDataByDepth(treeNodeValues, 2, datas));
                    me.refreshPieCharts(treeNodeValues[0].children[0]);
                } else {
                    me.showError(me.result.message);
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
//                    level: 1,
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
            group.groupId = treeNode.id;
            group.groupName = treeNode.text;
            group.color = treeNode.color;
            if (treeNode.children.length > 0) {
                me.parseTree(treeNode.children)
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
            group.depth = treeNode.depth;
            group.color = treeNode.color;
            if (treeNode.children.length > 0) {
                var childGroups = me.setTreeNodeValues(treeNode.children, result);
                if (childGroups.length > 0) {
                    group.children = childGroups;
                    Ext.each(childGroups, function (childGroup) {
                        group.value += childGroup.value
                    });
                }
            } else {
                if (treeNode.depth > me.maxDepth) {
                    me.maxDepth = treeNode.depth;
                }
            }
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
            } else if (treeNode.depth == depth) {
                datas.push({
                    name: treeNode.groupName,
                    color: '#' + treeNode.color,
                    y: treeNode.value,
                    x: treeNode
                });
            }
        });
        var beginRecord = 0;
        Ext.each(me.groups, function (group) {
            if (group.groupId == treeNodes.groupId) {
                for (var i = 0; i < group.dataRecords; i++) {
                    var dataPointInfo = me.result.items[beginRecord + i]['dataPointInfo'];
                    var actualValueList = me.result.items[beginRecord + i]['actualValueList'];
                    datas.push({
                        name: dataPointInfo['dataPointName'],
                        color: me.colors[beginRecord + i],
                        y: actualValueList[0].sumActualValue,
                        x: treeNodes.depth
                    });
                }
                return false;
            }
            beginRecord += group.dataRecords;
        });
        return datas;
    },

    refreshPieCharts: function (treeNode) {

        var me = this;
        if (treeNode.depth == null) {
            for (var i = treeNode; i < me.maxDepth; i++) {
                me.contentContainer.items.items[i].hide();
            }
            return;
        }
        var nowTreeNode = treeNode;
        var maxDepth = this.maxDepth;
        for (var i = treeNode.depth; i < maxDepth; i++) {
            var datas = [];
            me.contentContainer.items.items[i - 1].show();
            me.charts[i - 1].series[0].setData(me.getDataByDepth(nowTreeNode, i + 1, datas));
            if (nowTreeNode.children.length > 0) {
                nowTreeNode = nowTreeNode.children[0];
            } else {
                me.contentContainer.items.items[i - 1].hide();
            }
        }
        var beginRecord = 0;
        var dataPointDatas = [];
        Ext.each(me.groups, function (group) {
            if (group.groupId == nowTreeNode.groupId) {
                for (var i = 0; i < group.dataRecords; i++) {
                    var dataPointInfo = me.result.items[beginRecord + i]['dataPointInfo'];
                    var actualValueList = me.result.items[beginRecord + i]['actualValueList'];
                    dataPointDatas.push({
                        name: dataPointInfo['dataPointName'],
                        color: me.colors[beginRecord + i],
                        y: actualValueList[0].sumActualValue,
                        x: maxDepth
                    });
                }
                me.contentContainer.items.items[maxDepth - 1].show();
                me.charts[maxDepth - 1].series[0].setData(dataPointDatas);

                return false;
            }
            beginRecord += group.dataRecords;
        });
    }
});