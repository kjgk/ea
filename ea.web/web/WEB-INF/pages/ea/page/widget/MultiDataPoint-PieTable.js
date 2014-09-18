/**
 * 饼表 // todo 默认图片
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-PieTable', {
    extend: 'Ext.container.Container',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base',
        chart: 'withub.ext.ea.page.widget.Chart'
    },
    devMode: false,

    initComponent: function () {

        this.initWidgetConfig();

        this.initHeaderContainer();

        this.chartContainer = Ext.create('Ext.container.Container', {
            region: 'center',
            flex: 1
        });

        this.gridPanel = Ext.create('withub.ext.base.Grid', {
            region: 'east',
            split: true,
            autoScroll: true,
            width: this.getWidgetConfig()['gridWidth'] || (this.width - 1) * 0.35,
            height: this.getWidgetConfig()['gridHeight'] || (this.height - 1) * 0.35,
            store: Ext.create('Ext.data.ArrayStore', {
                fields: ['dataPointName', 'value']
            }),
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '数据点名称', flex: 1, minWidth: 160, dataIndex: 'dataPointName' },
                {text: '值', width: 120, dataIndex: 'value', align: 'right'}
            ]
        });

        this.gridPanel.on('resize', function (component, width, height) {
            this.putWidgetConfig({
                gridWidth: width,
                gridHeight: height
            });
            if (this.chart != undefined) {
                var tablePosition = this.getWidgetConfig()['tablePosition'];
                if (tablePosition == 'top' || tablePosition == 'bottom') {
                    this.chart.setSize(this.width, this.height - 36 - 3 - height, true);
                } else {
                    this.chart.setSize(this.width - 1 - width, this.height - 36 - 1, true);
                }
            }
        }, this);

        this.initContentContainer({
            layout: 'border',
            items: [this.chartContainer, this.gridPanel]
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();

        this.contentContainer.on('resize', function (component, width, height) {
            this.width = width;
            this.height = height + 36;
            if (this.chart != undefined) {
                var tablePosition = this.getWidgetConfig()['tablePosition'];
                if (tablePosition == 'top' || tablePosition == 'bottom') {
                    var gridHeight = this.getWidgetConfig()['gridHeight'] || (this.height - 1) * 0.35;
                    this.chart.setSize(width, height - 3 - gridHeight, true);
                } else {
                    var gridWidth = this.getWidgetConfig()['gridWidth'] || (this.width - 1) * 0.35;
                    this.chart.setSize(width - 1 - gridWidth, height - 1, true);
                }
            }
        }, this);
    },

    initHeaderContainer: function () {
        var me = this;
        var config = {
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
        }

        this.mixins.chart.initHeaderContainer.call(this, config);
    },

    initChart: function () {
        var me = this;
        me.chart = new Highcharts.Chart({
            chart: {
                renderTo: me.chartContainer.getId(),
                type: 'pie',
                spacingBottom: 60,
                backgroundColor: '#F2F2F2',
                borderColor: '#C4C4C4',
                borderWidth: 1,
                borderRadius: 0
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    showInLegend: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        distance: 10,
                        format: '{point.percentage:.1f} %'
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
            tooltip: {
                pointFormat: '<div style="color: {series.color};"><b>{point.y}</b></div>',
                valueDecimals: 2,
                percentageDecimals: 2
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                y: 40,
                verticalAlign: 'bottom',
                borderWidth: 0
            },
            series: [
                {
                    type: 'pie'
                }
            ]
        });
    },

    drawChart: function () {
        var me = this;
        var dateRange = me.headerContainer.down('#dateRange');
        var dataPointObjectIds = [];
        var colors = [];
        Ext.each(Ext.decode(me.getWidgetConfig()['dataPointList']), function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
            colors.push('#' + dataPoint['color']);
        });
        me.chart ? '' : me.initChart();
        me.showLoading();
        me.chart.series[0].setData([]);
        Ext.Ajax.request({
            method: 'GET',
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
            params: {
                dataPointObjectIds: dataPointObjectIds.join('|'),
                beginDate: dateRange.getBeginDate(),
                endDate: dateRange.getEndDate(),
                timeUnit: 'None'
            },
            success: function (response) {
                me.hideLoading();
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var data = [];
                    var tableData = [];
                    var dataPointInfo, actualValueList;
                    for (var i = 0; i < result.items.length; i++) {
                        dataPointInfo = result.items[i]['dataPointInfo'];
                        actualValueList = result.items[i]['actualValueList'];
                        data.push({
                            name: dataPointInfo['dataPointName'],
                            y: actualValueList[0].sumActualValue,
                            color: colors[i]
                        });
                        tableData.push([dataPointInfo['dataPointName'], actualValueList[0].sumActualValue.toFixed(2)]);
                    }
                    me.chart.series[0].update({
                        tooltip: {
                            valueSuffix: Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : ''
                        }
                    });
                    me.chart.series[0].setData(data);
                    me.gridPanel.getStore().loadData(tableData);
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
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPointList'])) {
            Ext.defer(this.drawChart, 500, this);
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPointList: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    enableColor: true
                }),
                renderer: this.propertyRender.multiDataPoint,
                value: ''
            },
            tablePosition: {
                displayName: '表方位',
                renderer: function (v) {
                    return {'top': '上', 'bottom': '下', 'left': '左', 'right': '右'}[v];
                },
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    editable: false,
                    store: [
                        ['top', '上'],
                        ['bottom', '下'],
                        ['left', '左'],
                        ['right', '右']
                    ],
                    lazyRender: true,
                    listClass: 'x-combo-list-small'
                }),
                value: 'right'
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

        if (property === 'headerTitle') {
            this.setTitle(value);
        }
        if (property === 'dateLimit') {
            var dateRange = this.headerContainer.down('#dateRange');
            var beginDate = this.parseBeginDate(value.split('|')[1], value.split('|')[0]);
            dateRange.beginTimeField.setValue(beginDate);
            dateRange.endTimeField.setValue(new Date());
        }
        if (property === 'tablePosition') {
            if (value === 'top') {
                this.gridPanel.setBorderRegion('north');
            } else if (value === 'bottom') {
                this.gridPanel.setBorderRegion('south');
            } else if (value === 'left') {
                this.gridPanel.setBorderRegion('west');
            } else if (value === 'right') {
                this.gridPanel.setBorderRegion('east');
            }
        }
    },

    setTitle: function (title) {
        this.headerContainer.down('#headerText').setText(title);
    }
})
;