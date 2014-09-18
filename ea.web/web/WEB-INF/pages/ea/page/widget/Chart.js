Ext.define('withub.ext.ea.page.widget.Chart', {
    cls: 'chart-wrap',
    layout: {
        type: 'border'
    },
    width: 640,
    height: 360,
    minHeight: 240,
    minWidth: 360,

    initHeaderContainer: function (config) {

        this.headerContainer = Ext.create('Ext.container.Container', Ext.apply({
            cls: 'chart-header',
            height: 36,
            region: 'north',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaultType: 'button',
            defaults: {
                height: 28,
                style: 'margin: 0px 5px 0px 0px;'
            }
        }, config));
    },

    initContentContainer: function (config) {
        var me = this;
        me.contentContainer = Ext.create('Ext.container.Container', Ext.apply({
            region: 'center',
            cls: 'chart-content',
            style: {
                backgroundImage: 'url(' + PageContext.contextPath + '/ea/widget/coverImage/load?widgetTag='
                    + me.$className.substring(me.$className.lastIndexOf('.') + 1, me.$className.length) + ')'
            },
            listeners: {
                resize: function (component, width, height) {
                    if (me.chart && me.chart.renderTo.id == component.getId()) {
                        me.chart.setSize(width, height - 2, true);
                    }
                }
            }
        }, config));
    },

    initBottomContainer: function (config) {

        this.bottomContainer = Ext.create('Ext.panel.Panel', Ext.apply({
            region: 'south',
            border: true,
            split: true,
            cls: 'chart-bottom',
            layout: 'fit',
            bodyStyle: {
//                padding: '4px',
                backgroundColor: '#F2F2F2'
            },
            height: this.getWidgetConfig()['bottomHeight'] || Math.max(120, (this.height - 36) / 2)
        }, config));

        this.bottomContainer.on('resize', function (component, width, height) {
            this.putWidgetConfig({
                bottomHeight: height
            });
        }, this);

        this.bottomContainer.on('afterrender', function () {
            var splitter = Ext.getCmp(this.id + '-splitter');
            if (splitter.horizontal) {
                splitter.height = 1
                this.height = this.height + 4;
            }
        });

    },

    applyWidgetConfig: function (property, value) {

        if (property === 'headerTitle') {
            this.headerContainer.down('#headerText').setText(value);
        }

        if (property === 'enableDataGrid') {
            if (value == 1) {
                this.initBottomContainer();
                this.add(this.bottomContainer);
            } else {
                this.remove(this.bottomContainer);
                delete this.bottomContainer;
            }
        }
    },

    buildDataGrid: function () {

        var data, tpl;
        var fields , columns;
        if (this.getWidgetConfig()['dataPointGroup']) {
            var dataPointGroup = Ext.decode(this.getWidgetConfig()['dataPointGroup'].split('|')[0]);
            var dataPointList = Ext.decode(this.getWidgetConfig()['dataPointGroup'].split('|')[1]);
            var resultData = arguments[0];

            var dataPointGroupList = [], depth = 1, data = [];
            (function fn(parentId, dataGroups) {
                Ext.each(dataGroups, function (dataGroup) {
                    dataPointGroupList.push({
                        id: dataGroup.id,
                        parentId: parentId,
//                        depth: dataGroup.depth - 1,
                        text: dataGroup.text
                    });
                    fn(dataGroup.id, dataGroup.children);
//                    depth = Math.max(depth, dataGroup.depth - 1);
                });
            })('', dataPointGroup[0].children);
            var temp = [];
            Ext.each(dataPointGroupList, function (dataPointGroup) {
                Ext.each(dataPointList, function (dataPoint) {
                    if (dataPointGroup.id == dataPoint['groupId']) {
                        temp.push(dataPoint);
                    }
                })
            });

            dataPointList = temp;
            Ext.each(dataPointList, function (dataPoinit, index) {
                data[index] = [];
                data[index][depth] = Ext.apply({text: resultData[index]['dataPointInfo']['dataPointName']}, dataPoinit);
                data[index][depth + 1] = resultData[index]['actualValueList'][0]['sumActualValue'];
            });

            Ext.each(data, function (item, index) {
                Ext.each(dataPointGroupList, function (dataPointGroup) {
                    if (dataPointGroup.id == item[depth]['groupId']) {
                        item[depth - 1] = dataPointGroup.text;
                        item[depth] = item[depth]['text'];
                    }
                })
            });

            fields = ['dataPointGroup', 'dataPointName', 'value'];
            columns = [
                {xtype: 'rownumberer', width: 32 },
                {text: '数据点组', width: 160, dataIndex: 'dataPointGroup' },
                {text: '数据点', width: 160, dataIndex: 'dataPointName'},
                {text: '值', width: 160, dataIndex: 'value', align: 'right' }
            ];

        } else {
            data = []
            fields = ['dateTime'];
            columns = [
                {xtype: 'rownumberer', width: 32 },
                {text: '时间', width: 120, dataIndex: 'dateTime' }
            ];
            if (this.chart.xAxis[0].categories.length > 0) {
                Ext.each(this.chart.xAxis[0].categories, function (item) {
                    data.push([item]);
                });
            } else {
                for (var i = this.chart.xAxis[0].min; i <= this.chart.xAxis[0].max; i++) {
                    data.push([i]);
                }
            }

            Ext.each(this.chart.series, function (series, index) {
                var row = 0;
                fields[index + 1] = series.name;
                columns[index + 2] = {text: series.name, width: 100, dataIndex: series.name, align: 'right'};
                Ext.each(series.yData, function (yData) {
                    data[row++].push(yData);
                })
            });
        }

        this.bottomContainer.removeAll();

        this.gridPanel = Ext.create('withub.ext.base.Grid', {
            width: this.bottomContainer.width,
            height: this.bottomContainer.height,
            border: false,
            autoScroll: true,
            store: Ext.create('Ext.data.ArrayStore', {
                fields: fields
            }),
            columns: columns
        });
        this.bottomContainer.add(this.gridPanel);

        this.gridPanel.getStore().loadData(data);

    },

    removeAllSeries: function () {
        if (this.chart) {
            while (this.chart.series.length > 0) {
                this.chart.series[0].remove();
            }
        }
    },

    showLoading: function () {
        this.contentContainer.getEl().mask(arguments[0] || HighchartsConfig.chartLoadMaskMessage);
    },

    hideLoading: function () {
        this.contentContainer.getEl().unmask();
    },

    showError: function () {
        this.contentContainer.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
            '数据加载错误，异常信息：' + (arguments[0] || '无') + '</div>');
    }

});