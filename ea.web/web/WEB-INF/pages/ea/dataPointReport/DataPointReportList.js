Ext.define('withub.ext.ea.dataPointReport.DataPointReportList', {
    extend: 'Ext.Viewport',
    closable: true,
    layout: 'fit',
    requires: ['withub.ext.ea.dataPointReport.DataPointReportModel'],

    initComponent: function () {

        var me = this;

        this.gridPanel = Ext.create('withub.ext.base.Grid', {
            url: '/ea/userDataPointReport/list',
            fields: ['datetime'],
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '数据时间', width: 140, align: 'center', dataIndex: 'datetime', sortable: false,
                    renderer: function (v) {
                        if (v == 'total') {
                            return me.collectLabel || '汇总'
                        } else {
                            return v;
                        }
                    }}
            ],
            tbar: [
                {
                    text: '设置搜索条件',
                    iconCls: 'icon-query',
                    handler: function () {
                        this.queryWindow.down('#btn_query').show();
                        this.queryWindow.down('#btn_export').hide();
                        this.queryWindow.show();
                    },
                    scope: this
                },
                '-',
                {
                    text: '导出',
                    iconCls: 'icon-export',
                    handler: function () {
                        this.queryWindow.down('#btn_export').show();
                        this.queryWindow.down('#btn_query').hide();
                        this.queryWindow.show();
                    },
                    scope: this
                }
            ]
        });

        this.queryWindow = Ext.create('withub.ext.ea.dataPointReport.DataPointReport', {
            listeners: {
                query: this.queryUserDataPoint,
                export: this.exportUserDataPoint,
                show: function (win) {
                    win.center();
                },
                scope: this
            },
            closeAction: 'hide'
        })

        this.items = [this.gridPanel];

        this.callParent();

    },

    exportUserDataPoint: function (data) {
        var me = this;
        var dataPointGroupCategoryId = data['dataPointGroupCategoryId'];
        var startTime = data['startTime'];
        var endTime = data['endTime'];
        var sectionTypes = data['sectionTypes'];
        var incrementTypes = data['incrementTypes'];
        var sortType = data['sortType'];
        var timeUnit = data['timeUnit'];
        var precision = data['precision'];
        var collectLabel = data['collectLabel'];
        ExtUtil.exportData({
            title: '报表下载',
            url: '/ea/userDataPointReport/export',
            params: {
                startTime: startTime,
                endTime: endTime,
                dataPointGroupCategoryId: dataPointGroupCategoryId,
                timeUnit: timeUnit == 'All' ? '' : timeUnit,
                sortType: sortType,
                sectionTypes: sectionTypes,
                incrementTypes: incrementTypes,
                precision: precision,
                collectLabel: collectLabel
            }
        });
    },

    queryUserDataPoint: function (data) {
        var me = this;
        var dataPointGroupCategoryId = data['dataPointGroupCategoryId'];
        var startTime = data['startTime'];
        var endTime = data['endTime'];
        var sectionTypes = data['sectionTypes'];
        var incrementTypes = data['incrementTypes'];
        var sortType = data['sortType'];
        var timeUnit = data['timeUnit'];
        var precision = data['precision'];
        me.collectLabel = data['collectLabel'];
        me.getEl().mask(PageContext.loadMsg);
        Ext.Ajax.request({
            method: 'GET',
            url: PageContext.contextPath + '/ea/userDataPointReport/loadDataPointInfo',
            params: {
                dataPointGroupCategoryId: dataPointGroupCategoryId
            },
            success: function (response) {
                me.getEl().unmask();
                var result = Ext.decode(response.responseText);
                for (var i = me.gridPanel.headerCt.items.items.length; i > 2; i--) {
                    me.gridPanel.headerCt.remove(me.gridPanel.headerCt.items.items[i - 1]);
                }
                var fields = ['datetime'];
                var electricityPriceTimeSegmentList = [];
                Ext.each(incrementTypes, function (incrementType) {
                    if (incrementType == 'ElectricityPrice' || incrementType == 'ElectricityPowerConsumption') {
                        ExtUtil.request({
                            url: PageContext.contextPath + '/ea/electricityPriceTimeSegment/getAll',
                            async: false,
                            method: 'GET',
                            success: function (result) {
                                electricityPriceTimeSegmentList = result.items;
                            },
                            scope: this
                        });
                        return false;
                    }
                });

                Ext.each(result.items, function (dataPoint, index) {
                    var objectId = dataPoint['dataPointObjectId'];
                    fields.push(objectId);
                    var measureStr = '';
                    if (!Ext.isEmpty(dataPoint['measureUnit'])) {
                        measureStr = '(' + dataPoint['measureUnit'] + ')';
                    }
                    var dataPointName;

                    if (Ext.isEmpty(dataPoint['dataPointName'])) {
                        dataPointName = dataPoint['dataPointTag'] + measureStr;
                    } else {
                        dataPointName = dataPoint['dataPointName'] + measureStr;
                    }

                    var columnWidth = 0, defaultColumnWidth = 96, defaultElectricityColumnWidth = defaultColumnWidth + 48, subColumns = [];
                    if (dataPoint['pointDataValueType'] == 1) {
                        Ext.each(sectionTypes, function (sectionType) {
                            subColumns.push({
                                text: {
                                    Original: "原始值",
                                    Avg: "平均值",
                                    Max: "最大值",
                                    Min: "最小值"
                                }[sectionType],
                                dataIndex: objectId,
                                valueType: sectionType
                            });
                            columnWidth += defaultColumnWidth;
                        });
                    }
                    if (dataPoint['pointDataValueType'] == 2) {
                        var electricityInfoFlag = dataPoint['electricityInfoFlag'] == 1;
                        var electricityPowerConsumptionFlag = false;
                        var electricityPriceFlag = false;
                        Ext.each(incrementTypes, function (incrementType) {
                            if (incrementType == 'ElectricityPrice') {
                                electricityPriceFlag = electricityInfoFlag;
                            } else if (incrementType == 'ElectricityPowerConsumption') {
                                electricityPowerConsumptionFlag = electricityInfoFlag;
                            } else {
                                subColumns.push({
                                    text: {
                                        Original: "原始值",
                                        Increment: "增量"
                                    }[incrementType],
                                    dataIndex: objectId,
                                    valueType: incrementType
                                });
                                columnWidth += defaultColumnWidth;
                            }
                        });
                        electricityInfoFlag = electricityPriceFlag || electricityPowerConsumptionFlag;
                        if (electricityInfoFlag) {
                            var electricityPriceColumns = [];
                            Ext.each(electricityPriceTimeSegmentList, function (electricityPriceTimeSegment) {
                                electricityPriceColumns.push({
                                    text: electricityPriceTimeSegment.name,
                                    dataIndex: objectId
                                });
                                columnWidth += defaultElectricityColumnWidth;
                            });
                            var electricityLabels = [], electricityValueType = [];
                            if (electricityPowerConsumptionFlag) {
                                electricityLabels.push('电量');
                                electricityValueType.push('ElectricityPowerConsumption')
                            }
                            if (electricityPriceFlag) {
                                electricityLabels.push('电价');
                                electricityValueType.push('ElectricityPrice')
                            }
                            subColumns.push({
                                text: electricityLabels.join('、'),
                                columns: electricityPriceColumns,
                                valueType: electricityValueType.join('|'),
                                electricityPriceInfo: true
                            });
                        }
                    }
                    columnWidth = Math.max(columnWidth, dataPointName.length * 14);

                    Ext.each(subColumns, function (subColumn) {
                        if (subColumn.electricityPriceInfo === true) {
                            Ext.each(subColumn.columns, function (electricityColumn, index) {
                                Ext.apply(electricityColumn, {
                                    width: defaultElectricityColumnWidth,
                                    align: 'center',
                                    renderer: function (v, md) {
                                        md.style = 'text-align: right;';
                                        if (v[5] == null || v[5][index] == null) {
                                            return '';
                                        }
                                        var value = v[5][index];
                                        if (subColumn.valueType == 'ElectricityPowerConsumption') {
                                            return  ExtUtil.toFixed(value[0], precision);
                                        } else if (subColumn.valueType == 'ElectricityPrice') {
                                            return  ExtUtil.toFixed(value[1], precision) + '元';
                                        } else if (subColumn.valueType == 'ElectricityPowerConsumption|ElectricityPrice') {
                                            return   ExtUtil.toFixed(value[0], precision) + '（' + ExtUtil.toFixed(value[1], precision) + '元）';
                                        }
                                    }
                                });
                            });
                        } else {
                            Ext.apply(subColumn, {
                                width: electricityInfoFlag ? defaultElectricityColumnWidth : columnWidth / subColumns.length,
                                align: 'center',
                                renderer: function (v, md) {
                                    md.style = 'text-align: right;';
                                    var value = v[{Original: 0, Avg: 1, Max: 2, Min: 3, Sum: 4, Increment: 4}[subColumn.valueType]];
                                    if (value == null) {
                                        return '';
                                    }
                                    if (electricityPriceFlag && subColumn.valueType == 'Increment') {
                                        var totalPrice = 0;
                                        Ext.each(v[5], function (electricityValues) {
                                            if (electricityValues) {
                                                totalPrice += electricityValues[1];
                                            }
                                        });
                                        if (totalPrice != 0) {
                                            return value + '（' + ExtUtil.toFixed(totalPrice, precision) + '元）';
                                        }
                                    }
                                    return value;
                                }
                            });
                        }
                    });
                    me.gridPanel.headerCt.insert(me.gridPanel.headerCt.items.items.length, new Ext.grid.column.Column({
                        text: dataPointName,
                        width: columnWidth,
                        columns: subColumns.length == 0 ? undefined : subColumns
                    }));
                });

                me.gridPanel.getStore().getProxy().getModel().setFields(fields);
                me.gridPanel.getView().refresh();

                Ext.apply(me.gridPanel.getStore().getProxy().extraParams, {
                    startTime: startTime,
                    endTime: endTime,
                    dataPointGroupCategoryId: dataPointGroupCategoryId,
                    timeUnit: timeUnit == 'All' ? '' : timeUnit,
                    sectionTypes: sectionTypes,
                    incrementTypes: incrementTypes,
                    precision: precision,
                    sortType: sortType
                });
                me.gridPanel.getStore().load({
                    callback: function () {
                        me.gridPanel.getStore().sort([
                            {
                                sorterFn: function (o1, o2) {
                                    if (o1.get('datetime') == 'total') {
                                        return 1;
                                    }
                                    if (o2.get('datetime') == 'total') {
                                        return -1;
                                    }
                                }
                            }
                        ]);
                    }
                });
            }
        });
    }
});