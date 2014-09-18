/**
 * 三值组件
 */
Ext.define('withub.ext.ea.page.widget.Standard-ThreeValues', {
    extend: 'Ext.Component',
    width: 200,
    height: 200,
    minHeight: 90,
    minWidth: 90,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        var fontSize = this.getWidgetConfig()['fontSize'] || 16;
        var color = this.getWidgetConfig()['color'] || '000000';
        var valueFontSize = this.getWidgetConfig()['valueFontSize'] || 16;
        var valueColor = this.getWidgetConfig()['valueColor'] || '000000';
        var backgroundColor = this.getWidgetConfig()['backgroundColor'] || '7FCDF4';
        var foregroundColor = this.getWidgetConfig()['foregroundColor'] || 'E4E4DC';
        var smallFontSize = parseInt(valueFontSize / 3);
        var labelWidth = parseInt((fontSize * 200) / this.width + 4);
        var valueWidth = 95 - labelWidth;

        this.componentId = Ext.id();
        var divComponent = ''
            + '<div style="height: ' + this.height + 'px; width: ' + this.width + 'px" id="' + this.componentId + '">'
            + '<div id="' + this.componentId + '-table" style="background-color: #' + backgroundColor + ';height: ' + this.height + 'px; width: ' + this.width + 'px;border-width: 0px;border-style: solid; border-radius: 15px;text-align:center;" >'
            + '<div id="' + this.componentId + '-label" style="margin-left:2%;float:left; width:' + labelWidth + '%; height:100%;">'
            + '<div style="width:100%;height:35%;display:table; overflow:hidden;"><div id = "' + this.componentId + '-unit1" style="display:table-cell; vertical-align:middle;color:#' + color + ';font-size: ' + fontSize + 'px;">最大</div></div>'
            + '<div id = "' + this.componentId + '-unitf2" style="width:100%;height:30%;background-color:#' + foregroundColor + ';display:table; overflow:hidden;"><div id = "' + this.componentId + '-unit2" style="display:table-cell; vertical-align:middle;color:#' + color + ';font-size: ' + fontSize + 'px;">平均</div></div>'
            + '<div style="width:100%;height:35%;display:table; overflow:hidden;"><div id = "' + this.componentId + '-unit3" style="display:table-cell; vertical-align:middle;color:#' + color + ';font-size: ' + fontSize + 'px;">最小</div></div></div>'
            + '<div style="float:left; width:1%; height:100%;">'
            + '<div id = "' + this.componentId + '-split1" style="width:100%;height:37%;background-color:#' + foregroundColor + ';"></div>'
            + '<div id = "' + this.componentId + '-split2" style="width:100%;height:26%;background-color:#' + backgroundColor + ';"></div>'
            + '<div id = "' + this.componentId + '-split3" style="width:100%;height:37%;background-color:#' + foregroundColor + ';"></div></div>'
            + '<div id="' + this.componentId + '-value" style="margin-right:2%;float:left; width:' + valueWidth + '%; height:100%;">'
            + '<div style="width:100%;height:35%;"><div style="height:10%;"></div><div id = "' + this.componentId + '-unit4" style="height:50%;color:' + valueColor + ';font-size: ' + fontSize + 'px;">0.00</div><div id = "' + this.componentId + '-max" style="height:30%;color:' + valueColor + ';font-size: ' + smallFontSize + 'px;"></div><div style="height:10%;"></div></div>'
            + '<div id = "' + this.componentId + '-unitf5" style="width:100%;height:30%;background-color:#' + foregroundColor + ';display:table;"><div id = "' + this.componentId + '-unit5" style="display:table-cell; vertical-align:middle;color:' + valueColor + ';font-size: ' + fontSize + 'px;">0.00</div></div>'
            + '<div style="width:100%;height:35%;"><div style="height:10%;"></div><div id = "' + this.componentId + '-unit6" style="height:50%;color:' + valueColor + ';font-size: ' + fontSize + 'px;">0.00</div><div id = "' + this.componentId + '-min" style="height:30%;color:' + valueColor + ';font-size: ' + smallFontSize + 'px;"></div><div style="height:10%;"></div></div>'
            + '</div></div>';

        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;
            this.height = height;
            this.width = width;
            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            $('#' + componentId).css('width', width);
            $('#' + componentId).css('height', height);
            $('#' + componentId + '-table').css('height', height);
            $('#' + componentId + '-table').css('width', width);
            var fontSize = this.getWidgetConfig()['fontSize'] || 16;
            var labelWidth = parseInt((fontSize * 200) / this.width + 4);
            var valueWidth = 95 - labelWidth;
            $('#' + componentId + '-label').css('width', labelWidth + '%');
            $('#' + componentId + '-value').css('width', valueWidth + '%');
            return false;

        }, this);

        this.on('afterrender', function () {

            this.getEl().on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    },

    loadChartData: function () {
        var me = this;

        var componentId = this.componentId;
        var dataPoint = Ext.decode(me.getWidgetConfig()['dataPoint']);
        var dataPointObjectId = dataPoint.dataPointId;
        var dateLimit = me.getWidgetConfig()['dateLimit'];
        var beginDate = this.parseBeginDate(dateLimit.split('|')[1], dateLimit.split('|')[0]);
        var endDate = new Date();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointActualValue',
            params: {
                dataPointObjectIds: dataPointObjectId,
                beginDate: beginDate,
                endDate: endDate,
                timeUnit: null
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var dataPointValueType = result.items[0]['dataPointInfo']['pointDataValueType'];
                    var actualValueList = result.items[0]['actualValueList'];
                    var maxValueTime = '', minValueTime = '';
                    var avgValue = 0, minValue = 0, maxValue = 0, totalValue = 0;
                    if (dataPointValueType == 2) {
                        for (var i = 0; i < actualValueList.length; i++) {
                            var actualValue = actualValueList[i];
                            if (i == 0) {
                                minValue = actualValue['sumActualValue'], maxValue = actualValue['sumActualValue'];
                                minValueTime = actualValue['datetimeString'], maxValueTime = actualValue['datetimeString'];
                            } else {
                                if (actualValue['sumActualValue'] > maxValue) {
                                    maxValue = actualValue['sumActualValue'];
                                    maxValueTime = actualValue['datetimeString'];
                                }
                                if (actualValue['sumActualValue'] < minValue) {
                                    minValue = actualValue['sumActualValue'];
                                    minValueTime = actualValue['datetimeString'];
                                }
                            }
                            totalValue += actualValue['sumActualValue'];
                        }
                    } else {
                        for (var i = 0; i < actualValueList.length; i++) {
                            var actualValue = actualValueList[i];
                            if (i == 0) {
                                minValue = actualValue['value'], maxValue = actualValue['value'];
                                minValueTime = actualValue['datetimeString'], maxValueTime = actualValue['datetimeString'];
                            } else {
                                if (actualValue['value'] > maxValue) {
                                    maxValue = actualValue['value'];
                                    maxValueTime = actualValue['datetimeString'];
                                }
                                if (actualValue['value'] < minValue) {
                                    minValue = actualValue['value'];
                                    minValueTime = actualValue['datetimeString'];
                                }
                            }
                            totalValue += actualValue['value'];
                        }
                    }
                    avgValue = totalValue / actualValueList.length;
                    if (Ext.Date.isEqual(Ext.Date.clearTime(beginDate), Ext.Date.clearTime(endDate))) {
                        minValueTime = minValueTime.substring(11, 16);
                        maxValueTime = maxValueTime.substring(11, 16);
                    } else {
                        minValueTime = minValueTime.substring(0, 16);
                        maxValueTime = maxValueTime.substring(0, 16);
                    }
//                    var fontSize = Math.max(10, parseInt(Math.min(me.width, me.height) / 6));
//                    if (('' + maxValue.toFixed(2)).length > 5) {
//                        $('#' + componentId + '-unit4').css('font-size', fontSize - (('' + maxValue.toFixed(2)).length - 5) * 5);
//                    }
//                    if (('' + avgValue.toFixed(2)).length > 5) {
//                        $('#' + componentId + '-unit5').css('font-size', fontSize - (('' + avgValue.toFixed(2)).length - 5) * 5);
//                    }
//                    if (('' + minValue.toFixed(2)).length > 5) {
//                        $('#' + componentId + '-unit6').css('font-size', fontSize - (('' + minValue.toFixed(2)).length - 5) * 5);
//                    }
                    Ext.fly(componentId + '-unit4').update(maxValue.toFixed(2));
                    Ext.fly(componentId + '-unit5').update(avgValue.toFixed(2));
                    Ext.fly(componentId + '-unit6').update(minValue.toFixed(2));
                    Ext.fly(componentId + '-max').update('' + maxValueTime);
                    Ext.fly(componentId + '-min').update('' + minValueTime);
                } else {
                    me.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                        '数据加载错误，异常信息：' + (result.message || '无') + '</div>');
                }
            },
            failure: function (response) {
                me.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                    '数据加载错误，异常信息：' + (response.responseText || '无') + '</div>');
            }
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {
            Ext.defer(this.loadChartData, 500, this);
        }
    },

    applyWidgetConfig: function (property, value) {
        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (property === 'backgroundColor') {
            Ext.fly(this.componentId + '-table').setStyle('background-color', '#' + value);
            Ext.fly(this.componentId + '-split2').setStyle('background-color', '#' + value);
        }

        if (property === 'foregroundColor') {
            Ext.fly(this.componentId + '-unitf2').setStyle('background-color', '#' + value);
            Ext.fly(this.componentId + '-unitf5').setStyle('background-color', '#' + value);
            Ext.fly(this.componentId + '-split1').setStyle('background-color', '#' + value);
            Ext.fly(this.componentId + '-split3').setStyle('background-color', '#' + value);
        }

        if (property === 'color') {
            Ext.fly(this.componentId + '-unit1').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-unit2').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-unit3').setStyle('color', '#' + value);
        }

        if (property === 'valueColor') {
            Ext.fly(this.componentId + '-unit4').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-unit5').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-unit6').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-max').setStyle('color', '#' + value);
            Ext.fly(this.componentId + '-min').setStyle('color', '#' + value);
        }

        if (property === 'fontSize') {
            Ext.fly(this.componentId + '-unit1').setStyle('font-size', value + 'px');
            Ext.fly(this.componentId + '-unit2').setStyle('font-size', value + 'px');
            Ext.fly(this.componentId + '-unit3').setStyle('font-size', value + 'px');
            var labelWidth = parseInt((value * 200) / this.width + 4);
            var valueWidth = 95 - labelWidth;
            Ext.fly(this.componentId + '-label').setStyle('width', labelWidth + '%');
            Ext.fly(this.componentId + '-value').setStyle('width', valueWidth + '%');
        }

        if (property === 'valueFontSize') {
            Ext.fly(this.componentId + '-unit4').setStyle('font-size', value + 'px');
            Ext.fly(this.componentId + '-unit5').setStyle('font-size', value + 'px');
            Ext.fly(this.componentId + '-unit6').setStyle('font-size', value + 'px');
            var smallFontSize = parseInt(value / 3);
            Ext.fly(this.componentId + '-max').setStyle('font-size', smallFontSize + 'px');
            Ext.fly(this.componentId + '-min').setStyle('font-size', smallFontSize + 'px');
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            dataPoint: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single'
                }),
                renderer: this.propertyRender.singleDataPoint,
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
                value: '5|Minute'
            },
            fontSize: {
                displayName: '标识字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 16
            },
            color: {
                displayName: '标识字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            valueFontSize: {
                displayName: '值字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 16
            },
            valueColor: {
                displayName: '值字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            backgroundColor: {
                displayName: '背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '7FCDF4'
            },
            foregroundColor: {
                displayName: '前景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'E4E4DC'
            }
        };
    }

});