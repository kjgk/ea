Ext.define('withub.ext.ea.page.widget.Standard-Gauge', {
    extend: 'Ext.container.Container',
    bodyPadding: 1,
    width: 300,
    height: 240,
    minHeight: 160,
    minWidth: 100,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },

    initComponent: function () {

        this.initWidgetConfig();

        var componentId = Ext.id();

        this.chartContainer = Ext.create('Ext.container.Container', {
            flex: 1,
            html: '<div id="' + componentId + '"></div>'
        });

        this.items = [this.chartContainer];

        this.callParent();

        this.on('resize', function (component, width, height) {
            this.chart.setSize(width + 1, height - 36, true);
        });

        this.on('afterrender', function () {

            var me = this;

            this.initChart(componentId);

            if (!Ext.isEmpty(this.getWidgetConfig()['dataPointId'])) {
                Ext.defer(this.drawChart, 500, this);
            }

            me.getEl().on('contextmenu', function (event) {
                event.preventDefault();
                event.stopEvent();
            });

        }, this);

        this.on('widgetconfigchange', function (property, value) {
            this.applyWidgetConfig(property, value);
        }, this);
    },

    initChart: function (componentId) {
        var me = this;
        Highcharts.setOptions({
            lang: {
                numericSymbols: null
            }
        });
        me.chart = new Highcharts.Chart({
            chart: {
                renderTo: Ext.getElementById(componentId),
                type: 'gauge',
                spacingTop: 15,
                spacingLeft: 15,
                spacingRight: 15,
                spacingBottom: 20,
                backgroundColor: '#F2F2F2',
                borderColor: '#C4C4C4',
                borderWidth: 1,
                borderRadius: 0,
                events: {

                }
            },
            credits: {
                enabled: false
            },
            pane: {
                startAngle: -90,
                endAngle: 90,
                background: null,
                center: ['50%', '100%'],
                size: 200
            },
            title: {
                text: ''
            },
            yAxis: {
                minorTickPosition: 'outside',
                tickPosition: 'outside',
                labels: {
                    rotation: 'auto',
                    distance: 10
                },
                title: {
                    text: ''
                },
                plotBands: []
            },
            plotOptions: {
                gauge: {
                    dataLabels: {
                        enabled: true,
                        y: -60
                    }
                }
            },
            series: [
                {
                    name: '当前值',
                    data: [0]
                }
            ]
        });
    },

    drawChart: function () {
        var me = this;

        me.buildPlotBands();

        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointLatestActualValue',
            params: {
                dataPointObjectId: me.getWidgetConfig()['dataPointId'].split('|')[0]
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                var point = me.chart.series[0].points[0];
                point.update(Math.round(Math.random() * 100), false);
                me.chart.redraw();
            }
        });
    },

    buildPlotBands: function () {

        var me = this;
        var upperLimit = me.getWidgetConfig()['upperLimit'];
        var lowerLimit = me.getWidgetConfig()['lowerLimit'];
        var warningValue = me.getWidgetConfig()['warningValue'];
        if (upperLimit != null && lowerLimit != null) {
            me.chart.yAxis[0].removePlotBand('plotBand');
            if (warningValue == null) {
                me.chart.yAxis[0].update({
                    min: lowerLimit,
                    max: upperLimit,
                    plotBands: [
                        {
                            id: 'plotBand', from: lowerLimit, to: upperLimit, color: '#55BF3B' // green
                        }
                    ]
                });
            } else {
                me.chart.yAxis[0].update({
                    min: lowerLimit,
                    max: upperLimit,
                    plotBands: [
                        {
                            id: 'plotBand', from: lowerLimit, to: warningValue, color: '#55BF3B' // green
                        },
                        {
                            id: 'plotBand', from: warningValue, to: upperLimit, color: '#DF5353' // red
                        }
                    ]
                });
            }
        } else {
//            me.chart.yAxis[0].update({
//                plotBands: [
//                    {
//                        from: 0, to: 200, color: '#55BF3B' // green
//                    }
//                ]
//            });
        }
        me.chart.redraw();
    },

    getDefaultWidgetConfig: function () {
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPointObjectId: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single'
                }),
                renderer: this.propertyRender.singleDataPoint,
                value: ''
            },

            upperLimit: {
                displayName: '上限',
                editor: Ext.create('Ext.form.field.Number'),
                value: ''
            },
            lowerLimit: {
                displayName: '下限',
                editor: Ext.create('Ext.form.field.Number'),
                value: ''
            },
            warningValue: {
                displayName: '警戒值',
                editor: Ext.create('Ext.form.field.Number'),
                value: ''
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

        if (property == 'upperLimit' || property == 'lowerLimit' || property == 'warningValue') {
            if (this.chart != undefined) {
                this.buildPlotBands();
            }
        }

    }

});