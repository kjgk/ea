Ext.define('withub.ext.monitor.MonitorChart', {
    extend: 'Ext.panel.Panel',
    layout: 'border',
    liveUpdate: true,
    enableChartSeriesConfig: false,
    initComponent: function () {

        var me = this;
        me.chartStep = 5;
        me.toDay = Ext.Date.clearTime(new Date());
        me.chartSeriesConfig = me.chartSeriesConfig || ['1','2', '3', '4'];
        me.chartSeries = [
            {
                id: '1',
                text: '冷冻水供水温度'
            },
            {
                id: '2',
                text: '冷冻水回水温度'
            },
            {
                id: '3',
                enable: false,
                text: '冷却水供水温度'
            },
            {
                id: '4',
                enable: false,
                text: '冷却水回水温度'
            }
        ];


        me.slider = Ext.create('Ext.slider.Single', {
            minValue: 0,
            maxValue: 10,
            useTips: true,
            increment: 1,
            value: 10,
            style: 'margin: 0px 40px;',
            tipText: function (thumb) {
                var currentTime = Ext.Date.add(me.toDay, Ext.Date.MINUTE, thumb.value);
                return Ext.String.format('{0}', Ext.util.Format.date(currentTime, 'H:i'));
            },
            listeners: {
                changecomplete: function (slider) {
                    if (!me.liveUpdate) {
                        var startTime = Ext.Date.add(me.toDay, Ext.Date.MINUTE, slider.getValue());
                        var endTime = Ext.Date.add(me.toDay, Ext.Date.MINUTE, slider.getValue() + 1);
                        me.reloadChart.call(me, startTime, endTime);
                    }
                },
                change: function (slider, newValue) {
                    me.liveUpdate = slider.maxValue == newValue;
                }
            }
        });

        this.items = [
            {
                region: 'center',
                layout: 'fit',
                border: false
            },
            {
                region: 'south',
                height: 60,
                border: false,
                layout: 'fit',
                items: [
                    me.slider
                ]
            }
        ]

        if(this.enableChartSeriesConfig) {
            this.tools = [
                {
                    type: 'gear',
                    handler: function () {
                        var items = [];
                        Ext.each(me.chartSeries, function (chartSeries) {
                            items.push({
                                inputValue: chartSeries['id'],
                                boxLabel: chartSeries['text'],
                                checked: Ext.Array.contains(me.chartSeriesConfig, chartSeries['id'])
                            })
                        })
                        Ext.create('Ext.window.Window', {
                            layout: 'fit',
                            width: 200,
                            height: 240,
                            bodyPadding: 10,
                            resizable: false,
                            title: '选择监控指标',
                            modal: true,
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    name: 'chartSeries',
                                    items: items,
                                    columns: 1
                                }
                            ],
                            buttons: [
                                {
                                    text: '确定',
                                    handler: function () {

                                        var win = this.up('window');
                                        var chartSeriesConfig = [];
                                        Ext.each(win.down('checkboxgroup').items.items, function (item) {
                                            if (item.checked) {
                                                chartSeriesConfig.push(item.inputValue)
                                            }
                                        });
                                        if(chartSeriesConfig.length == 0) {
                                            ExtUtil.Msg.error('请至少选择一项！');
                                            return;
                                        }

                                        if (me.chartSeriesConfig.join(',') != chartSeriesConfig.join(',')) {
                                            me.chartSeriesConfig = chartSeriesConfig;
                                            me.chart = me.createChart();
                                            me.getComponent(0).removeAll();
                                            me.getComponent(0).add(me.chart);
                                        }
                                        win.close();
                                    }
                                },
                                {
                                    text: '取消',
                                    handler: function () {
                                        this.up('window').close();
                                    }
                                }
                            ]
                        }).show()

                    },
                    scope: this
                }
            ]
        }

        this.callParent();

        this.on('afterrender', function () {

            Ext.TaskManager.start({
                run: function () {
                    var minutes = Math.floor((new Date() - me.toDay) / 1000 / 60);
                    me.slider.setMaxValue(minutes);
                    me.slider.maxValue = minutes;
                    if (me.liveUpdate) {
                        me.slider.setValue(minutes);
                    }
                },
                interval: 1000 * 60
            });

            me.chart = me.createChart();
            me.getComponent(0).add(me.chart);

            var delay = 10;
            Ext.TaskManager.start({
                run: function () {
                    if (me.liveUpdate) {
                        var second = new Number(Ext.util.Format.date(new Date(), 's'));
                        var currentTime = Ext.Date.add(new Date(), Ext.Date.SECOND, -second % me.chartStep);
                        var startTime = Ext.Date.add(currentTime, Ext.Date.SECOND, -60 - delay);
                        var endTime = Ext.Date.add(currentTime, Ext.Date.SECOND, -delay);
                        me.reloadChart.call(me, startTime, endTime);
                    }
                },
                interval: 1000 * me.chartStep
            });
        }, this);
    },

    createChart: function () {
        var me = this;
        var fields = ['date'];
        var yFields = [];
        var series = [];
        Ext.each(me.chartSeries, function (chartSeries) {
            if (!Ext.Array.contains(me.chartSeriesConfig, chartSeries['id'])) {
                return;
            }
            fields.push('type-' + chartSeries.id);
            yFields.push('type-' + chartSeries.id);
            series.push({
                type: 'line',
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'type-' + chartSeries.id,
                highlight: {
                    size: 5,
                    radius: 5
                },
                markerConfig: {
                    radius: 3,
                    size: 3
                },
                tips: {
                    trackMouse: true,
                    width: 180,
                    height: 48,
                    renderer: function (storeItem, item) {
                        this.setTitle(chartSeries['text'] + '：' + storeItem.get('type-' + chartSeries.id) + '℃');
                        this.update('时间：' + Ext.util.Format.date(storeItem.get('date'), 'H:i:s'));
                    }
                },
                title: chartSeries['text']
            });
        }, this);
        var store = Ext.create('Ext.data.JsonStore', {
            fields: fields
        });
        return Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            store: store,
            insetPadding: 20,
            legend: {
                position: 'top'
            },
            axes: [
                {
                    type: 'Numeric',
                    minimum: 0,
                    maximum: 100,
                    position: 'left',
                    fields: yFields,
                    title: '温度℃',
                    grid: {
                        odd: {
                            fill: '#dedede',
                            stroke: '#ddd',
                            'stroke-width': 0.5
                        }
                    }
                },
                {
                    type: 'Time',
                    position: 'bottom',
                    fields: 'date',
                    title: '时间',
                    dateFormat: 'H:i:s',
                    groupBy: 'year',
                    aggregateOp: 'sum',
                    constrain: true,
                    step: [Ext.Date.SECOND, me.chartStep]
                }
            ],
            series: series
        });
    },

    reloadChart: function (startTime, endTime) {

        var me = this;
        Ext.Ajax.request({
            url: PageContext.contextPath + '/monitor/temperature/find',
            params: {
                types: '1,2,3,4',
                startTime: Ext.util.Format.date(startTime, 'Y-m-d H:i:s'),
                endTime: Ext.util.Format.date(endTime, 'Y-m-d H:i:s')
            },
            method: 'GET',
            success: function (response) {
                var items = Ext.decode(response.responseText)['items'];
                var recordTimes = [];
                var data = [];
                Ext.each(items, function (item) {
                    if (!Ext.Array.contains(recordTimes, item['recordTime'])) {
                        recordTimes.push(item['recordTime']);
                    }
                }, this);
                Ext.each(recordTimes, function (recordTime) {
                    var o = {
                        date: new Date(recordTime)
                    };
                    Ext.each(items, function (item) {
                        if (recordTime == item['recordTime']) {
                            o['type-' + item['type']] = item['temperature']
                        }
                    }, this);
                    data.push(o);
                }, this);

                me.chart.axes.get(1).fromDate = startTime;
                me.chart.axes.get(1).toDate = endTime;
                me.chart.getStore().loadData(data);
            }
        });
    }
});