Ext.define('withub.ext.ea.page.widget.Dynamic-Text', {
    extend: 'withub.ext.ea.page.widget.Standard-Text',
    editable: false,
    text: undefined,

    getDefaultWidgetConfig: function () {
        return Ext.apply(this.callParent(), {
            dataPoint: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single',
                    enableColor: false
                }),
                renderer: this.propertyRender.singleDataPoint,
                value: ''
            },
            //增强动态文字组件的功能，目前只能显示数据点的原始值，
            // 需要增加可以显示一定时间段（如，最近一小时，最近一天，最近一个月，
            // 又或者特定的某个时段，后台可设置）内数据点的增量、最大值、最小值、平均值
            textValueType: {
                displayName: '数据点显示类型',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {0: '原始值', 1: '统计值'}}),
                renderer: function (v) {
                    return {0: '原始值', 1: '统计值'}[v];
                },
                value: 0
            },
            intervalType: {
                displayName: '区间值显示类型',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {0: '平均值', 1: '最大值', 2: '最小值'}}),
                renderer: function (v) {
                    return {0: '平均值', 1: '最大值', 2: '最小值'}[v];
                },
                value: 0
            },
            dateRangeType: {
                displayName: '时间段类型',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {0: '动态', 1: '固定'}}),
                renderer: function (v) {
                    return {0: '动态', 1: '固定'}[v];
                },
                value: 0
            },
            dynamicInterval: {
                displayName: '动态时间段(最近)',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Hour', 'Day', 'Month', 'Year']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: '1|Day'
            },
            offset: {
                displayName: '向前偏移量',
                editor: Ext.create('Ext.form.field.Number', {minValue: 0}),
                value: 0
            },
            fixedInterval: {
                displayName: '固定时间段',
                editor: Ext.create('Ext.form.field.Text', {
                    emptyText: '格式如:20130901~20131030',
                    allowBlank: !this.getWidgetConfig()['dateRangeType'] == 1
                }),
                value: ''
            },
            refreshInterval: {
                displayName: '自动刷新间隔',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Second', 'Minute', 'Hour']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: HighchartsConfig.defalutRefreshInterval
            },
            text: ''
        });
    },

    applyWidgetConfig: function (property, value) {

        this.callParent(arguments);
    },

    refreshTaskHandler: function () {

        var dataPointId = Ext.decode(this.getWidgetConfig()['dataPoint'])['dataPointId'];
        if (Ext.isEmpty(dataPointId)) {
            return;
        }
        var textValueType = this.getWidgetConfig()['textValueType'];
        if (textValueType == 0) {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointLatestActualValue',
                method: 'GET',
                params: {
                    dataPointObjectId: dataPointId
                },
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        this.setText(result.value + '');
                    } else {
                        this.showError(result.message);
                    }
                },
                failure: function (response) {
                    this.showError(response.responseText);
                },
                scope: this
            });
        } else {
            var beginDate, endDate;
            var dateRangeType = this.getWidgetConfig()['dateRangeType'];
            var dateFormatFlag = 'do';
            if (dateRangeType == 0) {
                var dynamicInterval = this.getWidgetConfig()['dynamicInterval'];
                var offset = this.getWidgetConfig()['offset'];
                var offsetType = {
                    Hour: Ext.Date.HOUR,
                    Day: Ext.Date.DAY,
                    Month: Ext.Date.MONTH,
                    Year: Ext.Date.YEAR
                };
                var timeUnit = dynamicInterval.split('|')[1], dateLimit = dynamicInterval.split('|')[0];
                beginDate = Ext.Date.format(Ext.Date.add(this.parseBeginDate(timeUnit, dateLimit), offsetType[timeUnit], -offset * dateLimit), 'Y-m-d H:i:s');
                endDate = Ext.Date.format(Ext.Date.add(new Date(), offsetType[timeUnit], -offset * dateLimit), 'Y-m-d H:i:s');
                if (dynamicInterval.split('|')[1] == 'Hour') {
                    dateFormatFlag = 'dont';
                }
            } else {
                var fixedInterval = this.getWidgetConfig()['fixedInterval'];
                beginDate = Ext.Date.format(Ext.Date.parse(fixedInterval.split("~")[0], 'Ymd'), 'Y-m-d');
                endDate = Ext.Date.format(Ext.Date.parse(fixedInterval.split("~")[1], 'Ymd'), 'Y-m-d');
            }

            var intervalType = this.getWidgetConfig()['intervalType'];
            Ext.Ajax.request({
                url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointActualValue',
                method: 'GET',
                params: {
                    dataPointObjectId: dataPointId,
                    beginDate: beginDate,
                    endDate: endDate,
                    timeUnit: 'None',
                    dateFormatFlag: dateFormatFlag
                },
                success: function (response) {
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        var dataPointInfo = result.items[0]['dataPointInfo'];
                        var actualValueList = result.items[0]['actualValueList'];
                        var value;
                        if (dataPointInfo['pointDataValueType'] == 2) {
                            value = actualValueList[0]['sumActualValue'];
                        } else {
                            if (intervalType == 0) {
                                value = actualValueList[0]['avgActualValue'];
                            } else if (intervalType == 1) {
                                value = actualValueList[0]['maxActualValue'];
                            } else {
                                value = actualValueList[0]['minActualValue'];
                            }
                        }
                        this.setText(value + '');
                    } else {
                        this.showError(result.message);
                    }
                },
                failure: function (response) {
                    this.showError(response.responseText);
                },
                scope: this
            });
        }
    }
});