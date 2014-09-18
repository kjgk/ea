/**
 * 对比组件
 */
Ext.define('withub.ext.ea.page.widget.Standard-Contrast', {
    extend: 'Ext.Component',
    width: 280,
    height: 150,
    minHeight: 10,
    minWidth: 20,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        var fontFamily = this.getWidgetConfig()['fontFamily'];
        var color = this.getWidgetConfig()['color'] || '000000';

        this.componentId = Ext.id();

        var divComponent = '' +
            '<div style="height: ' + this.height + 'px; width: ' + this.width + 'px;position: relative;" id="' + this.componentId + '">' +
            '<div style="background-position: center center;background-image: url(' + PageContext.contextPath + '/images/widget/chart/balance-8.png);' +
            'background-size:contain;background-repeat:no-repeat;width:50%;height:100%;float: left;" id="' + this.componentId + '-image"></div>' +
            '<div style="float: left;padding-left:10%;width:40%;height:100%;"> ' +
            '<div style="font-size: ' + 150 * this.height / 200 + 'px;color: #' + color + ';fontFamily:' + fontFamily + '" id="' + this.componentId + '-value"> ' +
            '<span style="position: absolute;bottom: 0px"><a>0</a><span style="font-size: 40%">%</span></span>' +
            '</div>' +
            '</div>' +
            '</div>';

        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;

            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            $('#' + componentId).css('width', width);
            $('#' + componentId).css('height', height);
            $('#' + componentId + '-value').css('fontSize', 150 * height / 200 + 'px');

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
        var timeUnit = me.getWidgetConfig()['latelyInterval'].split('|')[1];
        var latelyInterval = me.getWidgetConfig()['latelyInterval'].split('|')[0];
        var contrastCycle = Ext.decode(me.getWidgetConfig()['contrastCycle']);
        var dataPointObjectIds = [];
        Ext.each(Ext.decode(me.getWidgetConfig()['dataPoints']), function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
        });
        var firstCounts = null;
        if (!Ext.isEmpty(me.getWidgetConfig()['contrastDataPoints'])) {
            firstCounts = dataPointObjectIds.length;
            Ext.each(Ext.decode(me.getWidgetConfig()['contrastDataPoints']), function (dataPoint) {
                dataPointObjectIds.push(dataPoint['dataPointId']);
            });
        }

        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointContrastActualValue',
            params: {
                dataPointObjectIds: dataPointObjectIds.join('|'),
                firstCounts: firstCounts,
                latelyInterval: latelyInterval,
                timeUnit: timeUnit,
                contrastCycle: contrastCycle.join(',')
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var textValue = result.value;
                    var imageUrl;
                    if (textValue > 0) {
                        var colorIndex = me.getWidgetConfig()['upColor'];
                        imageUrl = PageContext.contextPath + '/images/widget/chart/up-' + colorIndex + '.png';
                    } else if (textValue < 0) {
                        var colorIndex = me.getWidgetConfig()['downColor'];
                        imageUrl = PageContext.contextPath + '/images/widget/chart/down-' + colorIndex + '.png';
                    } else {
                        var colorIndex = me.getWidgetConfig()['balanceColor'];
                        imageUrl = PageContext.contextPath + '/images/widget/chart/balance-' + colorIndex + '.png';
                    }

                    $('#' + componentId + '-value span a').html(ExtUtil.toFixed(Math.abs(textValue) * 100, HighchartsConfig.valueDecimals));
                    $('#' + componentId + '-image').css('background-image', 'url(' + imageUrl + ')');
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
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoints'])) {
            Ext.defer(this.loadChartData, 500, this);
        }
    },

    applyWidgetConfig: function (property, value) {
        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (property === 'fontFamily') {
            Ext.fly(this.componentId + '-value').setStyle('fontFamily', value);
        }
        if (property === 'color') {
            Ext.fly(this.componentId + '-value').setStyle('color', '#' + value);
        }
        if (property == 'upColor') {
            var imageUrl = PageContext.contextPath + '/images/widget/chart/up-' + value + '.png';
            Ext.fly(this.componentId + '-image').setStyle('background-image', 'url(' + imageUrl + ')');
        }
        if (property == 'downColor') {
            var imageUrl = PageContext.contextPath + '/images/widget/chart/down-' + value + '.png';
            Ext.fly(this.componentId + '-image').setStyle('background-image', 'url(' + imageUrl + ')');
        }
        if (property == 'balanceColor') {
            var imageUrl = PageContext.contextPath + '/images/widget/chart/balance-' + value + '.png';
            Ext.fly(this.componentId + '-image').setStyle('background-image', 'url(' + imageUrl + ')');
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            dataPoints: {
                displayName: '数据点(必选)',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    allowOne: true
                }),
                renderer: this.propertyRender.multiDataPoint,
                value: ''
            },
            contrastDataPoints: {
                displayName: '对比数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    allowOne: true
                }),
                renderer: this.propertyRender.multiDataPoint,
                value: ''
            },
            latelyInterval: {
                displayName: '基准时间周期(前)',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Minute', 'Hour', 'Day', 'Week', 'Month', 'Year']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: '1|Hour'
            },
            contrastCycle: {
                displayName: '对比周期',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeCycleField', {}),
                renderer: function (v) {
                    var values = [];
                    if (v) {
                        var valueList = Ext.decode(v);
                        Ext.each(valueList, function (value) {
                            values.push(value);
                        }, this);
                    }
                    return values.join(',');
                },
                allowBlank: false,
                value: '[0,0,0,0,0]'
            },
            fontFamily: {
                displayName: '字体',
                editor: Ext.create('withub.ext.ea.page.common.FontField', {}),
                value: '微软雅黑'
            },
            color: {
                displayName: '字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            upColor: {
                displayName: '高于图标颜色',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '红', 2: '橙', 3: '黄', 4: '绿', 5: '青', 6: '蓝', 7: '紫', 8: '黑'}}),
                renderer: function (v) {
                    return {1: '红', 2: '橙', 3: '黄', 4: '绿', 5: '青', 6: '蓝', 7: '紫', 8: '黑'}[v];
                },
                value: 3
            },
            downColor: {
                displayName: '低于图标颜色',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '红', 2: '橙', 3: '黄', 4: '绿', 5: '青', 6: '蓝', 7: '紫', 8: '黑'}}),
                renderer: function (v) {
                    return {1: '红', 2: '橙', 3: '黄', 4: '绿', 5: '青', 6: '蓝', 7: '紫', 8: '黑'}[v];
                },
                value: 4
            },
            balanceColor: {
                displayName: '持平图标颜色',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '红', 2: '橙', 3: '黄', 4: '绿', 5: '青', 6: '蓝', 7: '紫', 8: '黑'}}),
                renderer: function (v) {
                    return {1: '红', 2: '橙', 3: '黄', 4: '绿', 5: '青', 6: '蓝', 7: '紫', 8: '黑'}[v];
                },
                value: 8
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
    }

});



