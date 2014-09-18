Ext.define('withub.ext.ea.page.widget.CurvedSurface-Histogram', {
    extend: 'Ext.Viewport',
    bodyPadding: 1,
    width: 600,
    height: 600,
    minHeight: 500,
    minWidth: 400,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    mixins: ['withub.ext.ea.page.widget.Base'],
    devMode: false,
    initComponent: function () {

        var componentId = Ext.id();
        this.chartContainer = Ext.create('Ext.container.Container', {
            flex: 1,
            html: '<div style="height: 520px; min-width: 500px" id="' + componentId + '"></div>'
        });
        this.items = [ this.chartContainer];

        this.callParent();

//        this.on('resize', function (component, width, height) {
//            this.chart.setSize(width - 4, height - 4, true);
//        });

//        $('#' + componentId).resizable({
//            resize: function(component, width, height) {
//                this.chart.setSize(width -4, height - 4, true);
//            }
//        });

        this.on('afterrender', function (component) {
            var data = [
                [1150934400000, 58.20, 59.75, 58.07, 59.58, 34551392],
                [1151020800000, 59.72, 60.17, 58.73, 58.83, 23578607],
                [1151280000000, 59.17, 59.20, 58.37, 58.99, 16661904],
                [1151366400000, 59.09, 59.22, 57.40, 57.43, 19665400],
                [1151452800000, 57.29, 57.30, 55.41, 56.02, 30395258],
                [1151539200000, 56.76, 59.09, 56.39, 58.97, 31258941],
                [1151625600000, 57.59, 57.75, 56.50, 57.27, 26451164],
                /* Aug 2006 */
                [1154390400000, 67.20, 67.93, 65.94, 67.18, 25422342],
                [1154476800000, 67.65, 68.68, 67.51, 68.16, 19676548],
                [1154563200000, 67.91, 70.00, 67.81, 69.59, 30050087],
                [1155168000000, 63.15, 64.81, 62.70, 64.07, 24922555],
                [1155254400000, 63.24, 64.13, 62.58, 63.65, 27769040],
                [1155513600000, 64.05, 65.22, 63.60, 63.94, 25630849],
                [1155600000000, 65.34, 66.50, 64.80, 66.45, 30776194]
            ];
            var ohlc = [],
                volume = [],
                dataLength = data.length;

            for (var i = 0; i < dataLength; i++) {
                ohlc.push([
                    data[i][0], // the date
                    data[i][1], // open
                    data[i][2], // high
                    data[i][3], // low
                    data[i][4] // close
                ]);

                volume.push([
                    data[i][0], // the date
                    data[i][5] // the volume
                ])
            }

            this.chart = $('#' + componentId).highcharts('StockChart', {
                chart: {
                    spacingTop: 15,
                    spacingLeft: 15,
                    spacingRight: 15,
                    spacingBottom: 30,
                    backgroundColor: '#F2F2F2',
                    borderColor: '#C4C4C4',
                    borderWidth: 1,
                    borderRadius: 0
                },
                credits: {
                    text: ''
                },
                rangeSelector: {
                    enable:false,
                    selected: 1
                },
                title: {
                    text: 'AAPL Historical'
                },

                yAxis: [
                    {
                        title: {
                            text: 'OHLC'
                        },
                        height: 200,
                        lineWidth: 2
                    },
                    {
                        title: {
                            text: 'Volume'
                        },
                        top: 300,
                        height: 100,
                        offset: 0,
                        lineWidth: 2
                    }
                ],

                series: [
                    {
                        type: 'area',
                        name: 'AAPL',
                        data: ohlc
                    },
                    {
                        type: 'column',
                        name: 'Volume',
                        data: volume,
                        yAxis: 1
                    }
                ]
            });
        }, this)
    }
});