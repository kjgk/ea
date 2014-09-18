Ext.define('withub.ext.ea.page.widget.Standard-BarPercentage', {
    extend: 'Ext.Component',
    width: 200,
    height: 60,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        var fontSize = this.getWidgetConfig()['fontSize'] || 16;
        var color = this.getWidgetConfig()['color'] || '000000';
        var percentageFontSize = this.getWidgetConfig()['percentageFontSize'] || 16;
        var percentageColor = this.getWidgetConfig()['percentageColor'] || '000000';
        var backgroundColor = this.getWidgetConfig()['backgroundColor'] || 'F2F2F2';
        var foregroundColor = this.getWidgetConfig()['foregroundColor'] || '058DC7';
        var maxPointValue = this.getWidgetConfig()['maxPointValue'] || 0;
        var height = this.height - 2 * fontSize || 20;

        this.componentId = Ext.id();
        var divComponent = '' +
            '<div style="height: ' + this.height + 'px; width: ' + this.width + 'px" id="' + this.componentId + '">' +
            '<div id="' + this.componentId + '-top" style="margin-bottom:6px;text-align: right;height: ' + fontSize + 'px;font-size: ' + fontSize + 'px;color:#' + color + ';" >' + maxPointValue + '</div>' +
            '<div id="' + this.componentId + '-progressbar" style="width: 100%;position: relative;height:' + height + 'px;">' +
            '<span id="' + this.componentId + '-progressdone" style="background:#' + backgroundColor + '; z-index:10;position:absolute; width: 100%;height:100%;">&nbsp;</span>' +
            '<span id="' + this.componentId + '-progressing" style="background:#' + foregroundColor + '; z-index:11;position:absolute; width: 0%;height:100%;">&nbsp;</span>' +
            '</div>' +
            '<div id="' + this.componentId + '-bottom" style="text-align: right;height: ' + percentageFontSize + 'px;font-size: ' + percentageFontSize + 'px;color:#' + percentageColor + ';margin-top:2px" >0.0%</div>' +
            '</div>';

        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;

            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            var fontSize = this.getWidgetConfig()['fontSize'] || 12;

            $('#' + componentId).css('width', width);
            $('#' + componentId).css('height', height);
            $('#' + componentId + '-progressbar').css('height', height - 2 * fontSize);

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
        var dataPointObjectIds = [];
        Ext.each(Ext.decode(me.getWidgetConfig()['numeratorDataPoints']), function (dataPoint) {
            dataPointObjectIds.push(dataPoint['dataPointId']);
        });
        var numerators = dataPointObjectIds.length;
        if (!Ext.isEmpty(me.getWidgetConfig()['denominatorDataPoints'])) {
            Ext.each(Ext.decode(me.getWidgetConfig()['denominatorDataPoints']), function (dataPoint) {
                dataPointObjectIds.push(dataPoint['dataPointId']);
            });
        }

//        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchMultiPointLatestActualValue',
            params: {
                dataPointObjectIds: dataPointObjectIds.join('|'),
                numerators: numerators
            },
            method: 'GET',
            success: function (response) {
//                me.hideLoading();
                var result = Ext.decode(response.responseText);

                if (result.success) {
                    var maxPointValue = 100;
                    if (!Ext.isEmpty(me.getWidgetConfig()['maxPointValue'])) {
                        if (me.getWidgetConfig()['dataPointFalg'] == 0) {
                            maxPointValue = me.getWidgetConfig()['maxPointValue'];
                        }
                    } else {
                        if (!Ext.isEmpty(me.getWidgetConfig()['denominatorDataPoints']) && result.items[1] != 0) {
                            maxPointValue = result.items[1];
                        }
                    }
                    var percentage = (result.items[0] * 100 / maxPointValue).toFixed(1) + '%';

                    $('#' + componentId + '-progressing').css('width', percentage);
                    Ext.fly(componentId + '-bottom').update(percentage);
                    Ext.fly(componentId + '-top').update(result.items[0]);
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
        if (!Ext.isEmpty(this.getWidgetConfig()['numeratorDataPoints'])) {
            Ext.defer(this.loadChartData, 500, this);
        }
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);


        if (property === 'maxPointValue') {
            Ext.fly(this.componentId + '-top').update(value);
        }

        if (property === 'backgroundColor') {
            Ext.fly(this.componentId + '-progressdone').setStyle('background', '#' + value);
        }

        if (property === 'foregroundColor') {
            Ext.fly(this.componentId + '-progressing').setStyle('background', '#' + value);
        }

        if (property === 'color') {
            Ext.fly(this.componentId + '-top').setStyle('color', '#' + value);
        }

        if (property === 'percentageColor') {
            Ext.fly(this.componentId + '-bottom').setStyle('color', '#' + value);
        }

        if (property === 'fontSize') {
            var oldFontSize = Ext.fly(this.componentId + '-top').getStyle('fontSize').slice(0, -2);
            var percentageFontSize = Ext.fly(this.componentId + '-bottom').getStyle('fontSize').slice(0, -2);
            Ext.fly(this.componentId + '-top').setStyle('fontSize', value + 'px');
            var height = this.getHeight() + (value - oldFontSize);
            this.setHeight(height);

            Ext.fly(this.componentId).setStyle('height', height + 'px');
            Ext.fly(this.componentId + '-top').setStyle('height', value + 'px');
            Ext.fly(this.componentId + '-progressbar').setStyle('height', height - value - percentageFontSize + 'px');

        }

        if (property === 'percentageFontSize') {
            var oldFontSize = Ext.fly(this.componentId + '-bottom').getStyle('fontSize').slice(0, -2);
            var fontSize = Ext.fly(this.componentId + '-top').getStyle('fontSize').slice(0, -2);
            Ext.fly(this.componentId + '-bottom').setStyle('fontSize', value + 'px');
            var height = this.getHeight() + (value - oldFontSize);
            this.setHeight(height);

            Ext.fly(this.componentId).setStyle('height', height + 'px');
            Ext.fly(this.componentId + '-progressbar').setStyle('height', height - value - fontSize + 'px');
            Ext.fly(this.componentId + '-bottom').setStyle('height', value + 'px');

        }

    },

    getDefaultWidgetConfig: function () {
        return {
            numeratorDataPoints: {
                displayName: '分子数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    allowOne: true
                }),
                renderer: this.propertyRender.multiDataPoint,
                value: ''
            },
            denominatorDataPoints: {
                displayName: '分母数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Multi',
                    allowOne: true
                }),
                renderer: this.propertyRender.multiDataPoint,
                value: ''
            },
            maxPointValue: {
                displayName: '最大值',
                editor: Ext.create('Ext.form.field.Number'),
                value: ''
            },
            dataPointFalg: {
                displayName: '数据点为百分比',
                renderer: function (v) {
                    return {0: '否', 1: '是'}[v];
                },
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    editable: false,
                    store: [
                        [1, '是'],
                        [0, '否']
                    ],
                    lazyRender: true,
                    listClass: 'x-combo-list-small'
                }),
                value: 0
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
                displayName: '字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 16
            },
            color: {
                displayName: '字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            percentageFontSize: {
                displayName: '百分比字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 16
            },
            percentageColor: {
                displayName: '百分比字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            backgroundColor: {
                displayName: '背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'F2F2F2'
            },
            foregroundColor: {
                displayName: '前景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '058DC7'
            }
        };
    }

});