/**
 * 折算组件(组)
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-ConvertGroupStackedHistogram', {
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
                        me.chart.setSize(width, height - 2, true);
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

        if (!Ext.isEmpty(me.getWidgetConfig()['dataPointGroup'])) {
            var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[1]);
            var dataConvertList = Ext.decode(me.getWidgetConfig()['dataPointGroup'].split('|')[2]);
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
                        Ext.each(me.groups, function (group) {
                            Ext.each(dataPointList, function (dataPoint) {
                                if (group.groupId == dataPoint['groupId']) {
                                    formulas.push(dataPoint[item['dataIndex']]);
                                }
                            })
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
                width: 30,
                style: 'margin: 5px 5px 0px 0px;'
            },
            items: items
        });
    },

    initGridPanel: function () {

        this.gridPanel = Ext.create('Ext.panel.Panel', {
            flex: 1,
            border: false,
            hidden: true
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
                        return "<div style='padding-right: 10px; min-width: 80px'>" + this.value + "</div>";
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
                    var legendItem = [];
                    var consumptionData = [], measureUnits = [];
                    for (var i = 0; i < result.items.length; i++) {
                        var dataPointInfo = result.items[i]['dataPointInfo'];
                        var actualValueList = result.items[i]['actualValueList'];
                        var measureUnit = dataPointInfo['measureUnit'] || '';
                        var showInLegend = true;
                        if (jQuery.inArray(dataPointInfo['dataPointName'], legendItem) >= 0) {
                            showInLegend = false;
                        } else {
                            legendItem.push(dataPointInfo['dataPointName']);
                        }
                        me.chart.addSeries({
                            name: dataPointInfo['dataPointName'],
                            color: colors[i],
                            showInLegend: showInLegend,
                            tooltip: {
                                valueSuffix: measureUnit
                            }
                        });

                        var data = [];
                        Ext.each(me.groups, function (group, index) {
                            data[index] = null;
                        });
                        data[me.getGroupIndex(i, me.groups)] = actualValueList[0].sumActualValue;
                        me.chart.series[i].setData(data);
                        measureUnits.push(measureUnit);
                        consumptionData.push(data);
                    }
                    me.consumptionData = consumptionData;
                    me.measureUnits = measureUnits;
                    me.setTitle(me.getWidgetConfig()['headerTitle'] + '-->用量');
                    me.resultData = result.items;
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
                    timeUnit: 'Day'
                },
                method: 'GET',
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        me.priceData = [];
                        for (var i = 0; i < result.items.length; i++) {
                            var dataPointInfo = result.items[i]['dataPointInfo'];
                            var valueList = result.items[i]['valueList'];
                            var data = [], value = 0;
                            Ext.each(me.groups, function (group, index) {
                                data[index] = null;
                            });
                            Ext.each(valueList, function (v) {
                                value += v['price'];
                            });
                            data[me.getGroupIndex(i, me.groups)] = value;
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

    setTitle: function (title) {
        this.headerContainer.down('#headerText').setText(title);
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


    buildDataGrid: function () {

        var data, tpl, me = this;
        var dataPointGroup = Ext.decode(this.getWidgetConfig()['dataPointGroup'].split('|')[0]);
        var dataPointList = Ext.decode(this.getWidgetConfig()['dataPointGroup'].split('|')[1]);
        var dataConvertList = Ext.decode(this.getWidgetConfig()['dataPointGroup'].split('|')[2]);
        var resultData = me.resultData;
        var priceData = me.priceData;

        var dataPointGroupList = [], depth = 1, data = [], totalData = [], totalDataIndex = 3;
        (function fn(parentId, dataGroups) {
            Ext.each(dataGroups, function (dataGroup) {
                dataPointGroupList.push({
                    id: dataGroup.id,
                    parentId: parentId,
                    depth: dataGroup.depth - 1,
                    text: dataGroup.text
                });
                fn(dataGroup.id, dataGroup.children);
                depth = Math.max(depth, dataGroup.depth - 1);
            });
        })('', dataPointGroup[0].children);

        Ext.each(dataPointList, function (dataPoinit, index0) {
            var X = resultData[index0]['actualValueList'][0]['sumActualValue'];
            var index = depth;
            var total = 0;

            data[index0] = [];
            data[index0][index++] = Ext.apply({text: resultData[index0]['dataPointInfo']['dataPointName']}, dataPoinit);
            data[index0][index++] = {text: Ext.util.Format.number(X, '0,000')};
            if (me.getWidgetConfig()['dataPointsType'] == 0) {
                var price = null;
                Ext.each(priceData[index0], function (v) {
                    if (v != null) {
                        price = v;
                        return false;
                    }
                });
                data[index0][index++] = {text: price == null ? '' : Ext.util.Format.number(price, '0,000')};
            }
            Ext.each(dataConvertList, function (dataConvert) {
                var formula = dataPoinit[dataConvert['dataIndex']];
                var value = eval(formula);
                data[index0][index++] = {text: Ext.util.Format.number(value, '0,000')};
                total += value;
            });

            totalData[totalDataIndex++] = {
                text: Ext.util.Format.number(total, '0,000')
            };
        });

        Ext.each(data, function (item, index) {
            Ext.each(dataPointGroupList, function (dataPointGroup) {
                if (dataPointGroup.id == item[depth]['groupId']) {
                    item[depth - 1] = Ext.clone(dataPointGroup);
                }
            })
        });

        var _depth = depth, pos = [];
        (function fn() {
            _depth--;
            if (_depth == 0) {
                return;
            }
            Ext.each(data, function (item, index) {
                Ext.each(dataPointGroupList, function (dataPointGroup) {
                    if (dataPointGroup.id == item[_depth]['parentId']) {
                        item[_depth - 1] = Ext.clone(dataPointGroup);
                    }
                })
            });
            fn();
        })();
        Ext.each(data, function (item, index) {
            for (var i = 0; i < depth; i++) {
                var rowspan = 0;
                Ext.each(data, function (_item, _index) {
                    if (item[i].id == _item[i].id && _index > (pos[i] || -1)) {
                        rowspan++;
                        pos[i] = _index;
                    }
                });
                item[i]['rowspan'] = rowspan;
            }
        });

        var temp = [];
        Ext.each(data, function (item, index) {
            for (var i = 0; i < depth; i++) {
                if (item[i]['rowspan'] == 0) {
                    item[i] = undefined;
                }
            }
            temp.push(Ext.Array.clean(item));
        });

        var titleData = [
            {text: '数据点组', colspan: depth},
            {text: '数据点'},
            {text: '用量'}
        ];

        if (me.getWidgetConfig()['dataPointsType'] == 0) {
            titleData.push({text: '电费(元)'})
        }

        Ext.each(dataConvertList, function (dataConvert) {
            titleData.push({
                text: dataConvert['text'] + '(' + dataConvert['measureUnits'] + ')'
            });
        });

        data = Ext.Array.insert(temp, 0, [titleData]);

        data.push(totalData);

        tpl = new Ext.XTemplate(
            '<table class="data-list data-list-group" border="0" cellspacing="0">',
            '<tpl for=".">',
            '<tr class="{[xindex % 2 === 0 ? "even" : "odd"]} {[xindex === 1 ? "title" : "row"]}">',
            '<tpl for=".">',
            '<td <tpl if="rowspan">rowspan="{rowspan}"</tpl> <tpl if="colspan">colspan="{colspan}"</tpl>>{text}</td>',
            '</tpl>',
            '</tr>',
            '</tpl>',
            '</table>'
        );
        tpl.overwrite(this.gridPanel.body, data);
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
                    enableGroupColor: false,
                    enableDataConvert: true
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
        if (property === 'dataPointGroup') {
            this.mainContainer.remove(this.menuContainer);
            this.initChartMenu();
            this.mainContainer.add(this.menuContainer);
        }
        if (property === 'dataPointsType') {
            this.menuContainer.down('#button-fee').setVisible(value == 0);
        }
    }
});