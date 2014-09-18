Ext.define('withub.ext.ea.page.widget.MultiDataPoint-Table', {
    extend: 'Ext.container.Container',
    width: 640,
    height: 480,
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    layout: 'fit',
    devMode: false,
    cls: 'multi-data-point-table',
    autoScroll: true,
    requires: ['withub.ext.ea.page.common.DataPointReport'],

    initComponent: function () {

        var me = this;

        this.initWidgetConfig();

        this.callParent();

        this.on('afterrender', function () {

            if (me.devMode) {
                me.getEl().update('<div class="data-table-title" style="height: 25px; padding: 0px 5px; line-height: 25px; text-align: left; width: 100%;">表格组件</div>');
                return;
            }
            var precision = me.getWidgetConfig()['precision'];
            var dataPointList = Ext.decode(me.getWidgetConfig()['dataPointList'] || '[]');
            var dateTimeList = Ext.decode(me.getWidgetConfig()['dateTimeList'] || '[]');
            var format = (function () {
                var f = '0,000.';
                for (var i = 0; i < precision; i++) {
                    f += '0';
                }
                return f;
            })();

            var params = [];
            Ext.each(dateTimeList, function (dateTimeConfig, index) {
                Ext.each(dataPointList, function (dataPointConfig) {
                    params.push({
                        startTime: dateTimeConfig['startTime'],
                        endTime: dateTimeConfig['endTime'],
                        timeUnit: dateTimeConfig['timeUnit'] == 'All' ? '' : dateTimeConfig['timeUnit'],
                        sortType: dateTimeConfig['sortType'],
                        group: index + 1,
                        dataPointId: dataPointConfig['dataPointId'],
                        sectionTypes: dataPointConfig['sectionTypes'] || [],
                        incrementTypes: dataPointConfig['incrementTypes'] || []
                    });
                });
            });

            var index = 0, currentGroup = 0, results = {}, incrementTypes = {
                Original: '原始值',
                Increment: '增量',
                ElectricityPowerConsumption: '电量',
                ElectricityPrice: '电价'
            }, sectionTypes = {
                Original: '原始值',
                Max: '最大值',
                Avg: '平均值',
                Min: '最小值'
            }, posConfig = {Original: 0, Avg: 1, Max: 2, Min: 3, Increment: 4, ElectricityPrice: 1, ElectricityPowerConsumption: 0};

            (function fn() {
                if (params.length > index) {
                    var param = params[index];
                    Ext.Ajax.request({
                        method: 'GET',
                        url: PageContext.contextPath + '/ea/userDataPointReport/list',
                        params: Ext.apply({
                            precision: precision
                        }, param),
                        success: function (response) {
                            var items = Ext.decode(response.responseText).items;
                            if (currentGroup != param['group']) {
                                currentGroup = param['group'];
                                results[currentGroup] = items;
                            } else {
                                Ext.each(items, function (item1) {
                                    var flag = false;
                                    Ext.each(results[currentGroup], function (item2) {
                                        if (item1['datetime'] == item2['datetime']) {
                                            Ext.apply(item2, item1);
                                            flag = true;
                                            return false;
                                        }
                                    });
                                    if (!flag) {
                                        results[currentGroup].push(item1);
                                    }
                                });
                            }
                            index++;
                            fn();
                        }
                    });
                } else {
                    var electricityPriceFlag = false, electricityPriceTimeSegmentList = [];
                    Ext.each(dataPointList, function (dataPointConfig) {
                        var electricityPriceInfo = [], incrementTypes = [];
                        Ext.each(dataPointConfig['incrementTypes'], function (incrementType) {
                            if (incrementType == 'ElectricityPrice' || incrementType == 'ElectricityPowerConsumption') {
                                electricityPriceInfo.push(incrementType);
                                electricityPriceFlag = true;
                            } else {
                                incrementTypes.push(incrementType);
                            }
                        });
                        dataPointConfig['electricityPriceInfo'] = electricityPriceInfo;
                        dataPointConfig['incrementTypes'] = incrementTypes;
                    });

                    if (electricityPriceFlag) {
                        ExtUtil.request({
                            url: PageContext.contextPath + '/ea/electricityPriceTimeSegment/getAll',
                            async: false,
                            method: 'GET',
                            success: function (result) {
                                electricityPriceTimeSegmentList = result.items;
                            },
                            scope: this
                        });
                    }

                    var tableData = [], tableHeight = 0, tableWidth = 0;

                    if (me.getWidgetConfig()['transform'] == 0) {
                        var tableHeader1 = {class: 'data-table-title', cols: []}
                            , tableHeader2 = {class: 'data-table-title', cols: []}
                            , tableHeader3 = {class: 'data-table-title', cols: []};

                        var datetimeColumnWidth = 150, defaultColumnWidth = 80, epColumnWidth = 120;

                        tableWidth += datetimeColumnWidth;
                        tableHeader1.cols.push({value: '', width: datetimeColumnWidth, rowspan: electricityPriceFlag ? 3 : 2});

                        Ext.each(dataPointList, function (dataPointConfig) {
                            var colspan = 0;
                            if (dataPointConfig['incrementTypes'].length > 0) {
                                colspan = dataPointConfig['incrementTypes'].length;
                                tableWidth += colspan * defaultColumnWidth;
                                if (dataPointConfig['electricityPriceInfo'].length > 0) {
                                    colspan += electricityPriceTimeSegmentList.length;
                                    tableWidth += electricityPriceTimeSegmentList.length * epColumnWidth;
                                }
                            }
                            if (dataPointConfig['sectionTypes'].length > 0) {
                                colspan = dataPointConfig['sectionTypes'].length;
                                tableWidth += colspan * defaultColumnWidth;
                            }
                            tableHeader1.cols.push({
                                value: dataPointConfig['dataPointName'],
                                colspan: colspan
                            });

                        });
                        tableData.push(tableHeader1);

                        Ext.each(dataPointList, function (dataPointConfig) {
                            Ext.each(dataPointConfig['incrementTypes'], function (incrementType) {
                                tableHeader2.cols.push({
                                    value: incrementTypes[incrementType],
                                    rowspan: electricityPriceFlag ? 2 : 1,
                                    width: defaultColumnWidth
                                });
                            });
                            Ext.each(dataPointConfig['sectionTypes'], function (sectionType) {
                                tableHeader2.cols.push({
                                    value: sectionTypes[sectionType],
                                    rowspan: electricityPriceFlag ? 2 : 1,
                                    width: defaultColumnWidth
                                });
                            });

                            if (dataPointConfig['electricityPriceInfo'].length > 0) {
                                var electricityPriceInfoLabels = [];
                                Ext.each(dataPointConfig['electricityPriceInfo'], function (electricityPriceInfo) {
                                    electricityPriceInfoLabels.push(incrementTypes[electricityPriceInfo]);
                                });
                                tableHeader2.cols.push({
                                    value: electricityPriceInfoLabels.join('、'),
                                    width: epColumnWidth * electricityPriceTimeSegmentList.length,
                                    colspan: electricityPriceTimeSegmentList.length
                                });
                            }

                        });
                        tableData.push(tableHeader2);

                        if (electricityPriceFlag) {
                            Ext.each(dataPointList, function (dataPointConfig) {
                                if (dataPointConfig['electricityPriceInfo'].length > 0) {
                                    Ext.each(electricityPriceTimeSegmentList, function (electricityPriceTimeSegment) {
                                        tableHeader3.cols.push({
                                            value: electricityPriceTimeSegment['name'],
                                            width: epColumnWidth
                                        });
                                    });
                                }
                            });
                        }
                        tableData.push(tableHeader3);


                        for (var key in results) {
                            Ext.each(results[key], function (item) {
                                var cols = [];
                                if (item['datetime'] == 'total') {
                                    return true;
                                }
                                cols.push({value: item['datetime'], class: 'data-table-title'});
                                Ext.each(dataPointList, function (dataPointConfig) {
                                    var values = item[dataPointConfig['dataPointId']];
                                    Ext.each(dataPointConfig['sectionTypes'], function (sectionType) {
                                        cols.push({value: values ? ExtUtil.formatNumber(values[posConfig[sectionType]], format) : '', class: 'data-table-cell'});
                                    });
                                    Ext.each(dataPointConfig['incrementTypes'], function (incrementType) {
                                        cols.push({value: values ? ExtUtil.formatNumber(values[posConfig[incrementType]], format) : '', class: 'data-table-cell'});
                                    });
                                    if (dataPointConfig['electricityPriceInfo'].length > 0) {
                                        var epValues = [];
                                        Ext.each(electricityPriceTimeSegmentList, function (electricityPriceTimeSegment, index) {
                                            var value = 0;
                                            if (values && values[5] && values[5][index]) {
                                                if (dataPointConfig['electricityPriceInfo'].length == 1) {
                                                    value = ExtUtil.formatNumber(values[5][index][posConfig[dataPointConfig['electricityPriceInfo'][0]]], format);
                                                } else {
                                                    value = ExtUtil.formatNumber(values[5][index][0], format)
                                                        + '（' + ExtUtil.formatNumber(values[5][index][1], format) + '元）';
                                                }
                                            }
                                            epValues.push(value);
                                        });
                                        Ext.each(epValues, function (value) {
                                            cols.push({value: value, class: 'data-table-cell'});
                                        });
                                    }
                                });
                                tableData.push({cols: cols});
                            })
                        }
                        tableHeight = Math.min(me.getEl().getHeight() - 20, tableData.length * 25);
                    }
                    else {

                        var tableHeader = {class: 'data-table-title', cols: []};

                        var defaultColumnWidth = 120, labelColumnWidth = 80;
                        var datetimeColumnWidth = (electricityPriceFlag ? 3 : 2) * labelColumnWidth;

                        tableWidth += datetimeColumnWidth;

                        tableHeader.cols.push({value: '', width: datetimeColumnWidth, colspan: electricityPriceFlag ? 3 : 2});
                        for (var key in results) {
                            Ext.each(results[key], function (item) {
                                if (item['datetime'] == 'total') {
                                    return true;
                                }
                                tableHeader.cols.push({value: item['datetime'], width: defaultColumnWidth});
                                tableWidth += defaultColumnWidth;
                            });
                        }
                        tableData.push(tableHeader);

                        Ext.each(dataPointList, function (dataPointConfig) {
                            var pIndex;
                            {
                                var cols = [];
                                var rowspan = dataPointConfig['incrementTypes'].length
                                    + (dataPointConfig['electricityPriceInfo'].length > 0 ? electricityPriceTimeSegmentList.length : 0)
                                    + dataPointConfig['sectionTypes'].length;
                                cols.push({
                                    value: dataPointConfig['dataPointName'],
                                    class: 'data-table-title',
                                    height: rowspan * 25,
                                    rowspan: rowspan
                                });
                                tableData.push({cols: cols});
                                pIndex = tableData.length - 1;
                            }

                            if (dataPointConfig['incrementTypes'].length > 0) {
                                Ext.each(dataPointConfig['incrementTypes'], function (incrementType, index) {
                                    if (index == 0) {
                                        tableData[pIndex].cols.push({
                                            value: incrementTypes[incrementType],
                                            class: 'data-table-title',
                                            colspan: electricityPriceFlag ? 2 : 1,
                                            width: (electricityPriceFlag ? 2 : 1) * labelColumnWidth
                                        })
                                    } else {
                                        var cols = [];
                                        cols.push({
                                            value: incrementTypes[incrementType],
                                            class: 'data-table-title',
                                            colspan: electricityPriceFlag ? 2 : 1,
                                            width: (electricityPriceFlag ? 2 : 1) * labelColumnWidth
                                        });
                                        tableData.push({cols: cols});
                                    }
                                });
                            }

                            if (dataPointConfig['electricityPriceInfo'].length > 0) {
                                {
                                    var cols = [];
                                    var electricityPriceInfoLabels = [];
                                    Ext.each(dataPointConfig['electricityPriceInfo'], function (electricityPriceInfo) {
                                        electricityPriceInfoLabels.push(incrementTypes[electricityPriceInfo]);
                                    });
                                    cols.push({
                                        value: electricityPriceInfoLabels.join('、'),
                                        class: 'data-table-title',
                                        rowspan: electricityPriceTimeSegmentList.length,
                                        width: labelColumnWidth
                                    });
                                    tableData.push({cols: cols});
                                    pIndex = tableData.length - 1;
                                }

                                Ext.each(electricityPriceTimeSegmentList, function (electricityPriceTimeSegment, index) {
                                    if (index == 0) {
                                        tableData[pIndex].cols.push({
                                            value: electricityPriceTimeSegment['name'],
                                            class: 'data-table-title',
                                            width: labelColumnWidth
                                        })
                                    } else {
                                        var cols = [];
                                        cols.push({
                                            value: electricityPriceTimeSegment['name'],
                                            class: 'data-table-title',
                                            width: labelColumnWidth
                                        });
                                        tableData.push({cols: cols});
                                    }
                                });
                            }

                            if (dataPointConfig['sectionTypes'].length > 0) {
                                Ext.each(dataPointConfig['sectionTypes'], function (sectionType, index) {
                                    if (index == 0) {
                                        tableData[pIndex].cols.push({
                                            value: sectionTypes[sectionType],
                                            class: 'data-table-title',
                                            colspan: electricityPriceFlag ? 2 : 1,
                                            width: (electricityPriceFlag ? 2 : 1) * labelColumnWidth
                                        })
                                    } else {
                                        var cols = [];
                                        cols.push({
                                            value: sectionTypes[sectionType],
                                            class: 'data-table-title',
                                            colspan: electricityPriceFlag ? 2 : 1,
                                            width: (electricityPriceFlag ? 2 : 1) * labelColumnWidth
                                        });
                                        tableData.push({cols: cols});
                                    }
                                });
                            }


                        });

                        var rowIndex = 1;
                        Ext.each(dataPointList, function (dataPointConfig) {

                            if (dataPointConfig['incrementTypes'].length > 0) {
                                Ext.each(dataPointConfig['incrementTypes'], function (incrementType) {
                                    for (var key in results) {
                                        Ext.each(results[key], function (item) {
                                            if (item['datetime'] == 'total') {
                                                return true;
                                            }
                                            var values = item[dataPointConfig['dataPointId']];
                                            tableData[rowIndex].cols.push({
                                                value: values ? ExtUtil.formatNumber(values[posConfig[incrementType]], format) : '',
                                                class: 'data-table-cell'
                                            });
                                        });
                                    }
                                    rowIndex++;
                                });
                            }

                            if (dataPointConfig['electricityPriceInfo'].length > 0) {
                                Ext.each(electricityPriceTimeSegmentList, function (electricityPriceTimeSegment, index) {
                                    var value = 0;
                                    for (var key in results) {
                                        Ext.each(results[key], function (item) {
                                            if (item['datetime'] == 'total') {
                                                return true;
                                            }

                                            var values = item[dataPointConfig['dataPointId']];
                                            if (values && values[5] && values[5][index]) {
                                                if (dataPointConfig['electricityPriceInfo'].length == 1) {
                                                    value = ExtUtil.formatNumber(values[5][index][posConfig[dataPointConfig['electricityPriceInfo'][0]]], format);
                                                } else {
                                                    value = ExtUtil.formatNumber(values[5][index][0], format)
                                                        + '（' + ExtUtil.formatNumber(values[5][index][1], format) + '元）';
                                                }
                                            }
                                            tableData[rowIndex].cols.push({
                                                value: value,
                                                class: 'data-table-cell'
                                            });
                                        });
                                    }
                                    rowIndex++;

                                });
                            }

                            if (dataPointConfig['sectionTypes'].length > 0) {
                                Ext.each(dataPointConfig['sectionTypes'], function (sectionType) {
                                    for (var key in results) {
                                        Ext.each(results[key], function (item) {
                                            if (item['datetime'] == 'total') {
                                                return true;
                                            }
                                            var values = item[dataPointConfig['dataPointId']];
                                            tableData[rowIndex].cols.push({
                                                value: values ? ExtUtil.formatNumber(values[posConfig[sectionType]], format) : '',
                                                class: 'data-table-cell'
                                            });
                                        });
                                    }
                                    rowIndex++;
                                });
                            }

                        });

                    }

                    var table = '<table cellspacing="0" class="data-table" style="width: ' + Math.max(tableWidth, me.getEl().getWidth() - 28) + 'px;' +
                        ' height: ' + tableHeight + 'px;">';
                    Ext.each(tableData, function (row) {
                        table += '<tr class="' + (row['class'] || '') + '">'
                        Ext.each(row.cols, function (col) {
                            table += '<td class="' + (col['class'] || '') + '"'
                                + ' style="'
                                + (col['width'] > 0 ? ' width: ' + col['width'] + 'px;' : '')
                                + (col['height'] > 0 ? ' height: ' + col['height'] + 'px;' : '')
                                + '"'
                                + (col['rowspan'] > 1 ? ' rowspan=' + col['rowspan'] : '')
                                + (col['colspan'] > 1 ? ' colspan=' + col['colspan'] : '')
                                + '>'
                                + (col.value == null ? '' : col.value)
                                + '</td>'
                        });
                        table += '</tr>';
                    });
                    me.getEl().update(table);
                }
            })();
        });
    },

    getDefaultWidgetConfig: function () {
        var me = this;
        return {
            dataPointList: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointReport.DataPointField', {
                }),
                renderer: function (v) {
                    return '...'
                },
                value: ''
            },
            dateTimeList: {
                displayName: '时间段',
                editor: Ext.create('withub.ext.ea.page.common.DataPointReport.DateTimeField', {
                }),
                renderer: function (v) {
                    return '...'
                },
                value: ''
            },
            precision: {
                displayName: '小数点位数',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 5, allowDecimals: false}),
                value: 2
            },
            transform: {
                displayName: '行列转换',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                renderer: function (v) {
                    return {1: '是', 0: '否'}[v];
                },
                value: 0
            }
        };
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (property === 'dataPointConfig') {

        }
    }
});


Ext.util.CSS.createStyleSheet('.multi-data-point-table {border: 1px solid #C5C5C5;}');
Ext.util.CSS.createStyleSheet('.data-table {}');
Ext.util.CSS.createStyleSheet('.data-table td {padding: 0px 2px; height: 25px; line-height: 18px; border-right: 1px solid #C5C5C5; border-bottom: 1px solid #C5C5C5;}')
Ext.util.CSS.createStyleSheet('.data-table-cell {text-align: right;}');
Ext.util.CSS.createStyleSheet('.data-table-title {text-align: center;' +
    ' background : -webkit-linear-gradient(top, rgb(249, 249, 249) 04%, rgb(227, 228, 230) 94%);' +
    ' background : -moz-linear-gradient(top, rgb(249, 249, 249) 04%, rgb(227, 228, 230) 94%);' +
    ' background : -o-linear-gradient(top, rgb(249, 249, 249) 04%, rgb(227, 228, 230) 94%);' +
    ' background : -ms-linear-gradient(top, rgb(249, 249, 249) 04%, rgb(227, 228, 230) 94%);' +
    ' background : -linear-gradient(top, rgb(249, 249, 249) 04%, rgb(227, 228, 230) 94%);' +
    ';}');
