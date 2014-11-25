/**
 * 饼图
 */
Ext.define('withub.ext.ea.page.widget.MultiDataPoint-Pie', {
    extend: 'Ext.container.Container',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base',
        chart: 'withub.ext.ea.page.widget.Chart'
    },
    devMode: false,

    initComponent: function () {

        this.initWidgetConfig();

        this.initHeaderContainer();

        this.gridPanel = Ext.create('withub.ext.base.Grid', {
            flex: 1,
            border: false,
            hidden: true,
            store: Ext.create('Ext.data.ArrayStore', {
                fields: ['dataPointName', 'value']
            }),
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '数据点名称', width: 240, dataIndex: 'dataPointName' },
                {text: '值', width: 120, dataIndex: 'value', align: 'right'}
            ]
        });

        this.chartContainer = Ext.create('Ext.container.Container', {
            flex: 1
        });

        this.initContentContainer({
            layout: 'fit',
            items: [this.chartContainer, this.gridPanel]
        });

        this.items = [this.headerContainer, this.contentContainer];

        this.callParent();
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
                },
                {
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-query',
                    scope: this,
                    handler: me.drawChart
                } ,
                {
                    itemId: 'button-chart',
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-chart',
                    scope: this,
                    pressed: true,
                    enableToggle: true,
                    handler: function () {
                        me.down('#button-grid').toggle();
                        me.gridPanel.hide();
                        me.chartContainer.show();
                    }
                },
                {
                    itemId: 'button-grid',
                    xtype: 'button',
                    cls: 'button-chart ',
                    iconCls: 'icon-chart-table',
                    scope: this,
                    enableToggle: true,
                    handler: function () {
                        me.down('#button-chart').toggle();
                        me.chartContainer.hide();
                        me.gridPanel.show();
                    }
                }
            ]
        }

        this.mixins.chart.initHeaderContainer.call(this, config);
    },

    initChart: function () {
        var me = this;
        var colors;
        if (me.getWidgetConfig()['dataPointList']) {
            colors = [];
            Ext.each(Ext.decode(this.getWidgetConfig()['dataPointList']), function (dataPoint) {
                colors.push('#' + dataPoint['color']);
            });
//            Highcharts.setOptions({colors: colors});
        }
        me.chart = new Highcharts.Chart({
            chart: {
                renderTo: me.chartContainer.getId(),
                type: 'column'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    showInLegend: true,
                    cursor: 'pointer',
                    colors: colors,
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
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
                y: 10,
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
        Ext.each(Ext.decode(me.getWidgetConfig()['dataPointList']), function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
        });

        me.chart ? '' : me.initChart();
        me.showLoading();
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
                    me.chart.series[0].setData([]);
                    var data = [];
                    Ext.each(result.items, function (item) {
                        var dataPointInfo = item['dataPointInfo'];
                        var actualValueList = item['actualValueList'];
                        Ext.each(actualValueList, function (actualValue) {
                            data.push([dataPointInfo['dataPointName'], eval(actualValue['sumActualValue'].toFixed(2))]);
                        });
                        me.chart.series[0].update({
                            tooltip: {
                                valueSuffix: Ext.isDefined(dataPointInfo['measureUnit']) ? dataPointInfo['measureUnit'] : ''
                            }
                        });
                    });
                    me.chart.series[0].setData(data);
                    me.gridPanel.getStore().loadData(data);
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

        if (property === 'dateLimit') {
            var dateRange = this.headerContainer.down('#dateRange');
            var beginDate = this.parseBeginDate(value.split('|')[1], value.split('|')[0]);
            dateRange.beginTimeField.setValue(beginDate);
            dateRange.endTimeField.setValue(new Date());
        }
    }
});