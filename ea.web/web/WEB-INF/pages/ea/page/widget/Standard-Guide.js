Ext.define('withub.ext.ea.page.widget.Standard-Guide', {
    extend: 'Ext.container.Container',
    width: 400,
    height: 300,
//    minHeight: 180,
    minWidth: 80,
    layout: {
        type: 'border'
    },
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        var backgroundColor = ('#' + this.getWidgetConfig()['backgroundColor']) || '#ffffff';

        var displayHeaderTitle = this.getWidgetConfig()['displayHeaderTitle'] || 1;

        var displayBorder = this.getWidgetConfig()['displayBorder'] || 1;

        var borderConfig = {};

        if (displayBorder == 1) {
            borderConfig = {
                border: 1,
                style: {borderColor: '#C4C4C4', borderStyle: 'solid', borderWidth: '1px', backgroundColor: backgroundColor}
            }
        } else {
            borderConfig = {
                style: { backgroundColor: backgroundColor}
            }
        }

        var marginTop;
        if (displayHeaderTitle == 1) {
            marginTop = -(this.height - 36) * 0.2 + 15 + 'px';
        } else {
            marginTop = -this.height * 0.2 + 15 + 'px';
        }

        this.componentId = Ext.id();
        this.chartContainer = Ext.create('Ext.container.Container', Ext.apply({
            flex: 1,
            region: 'center',
            html: '<div style="margin-top: ' + marginTop + ';  height: ' + this.width / 1.25 + 'px; width: ' + this.width + 'px"  id="' + this.componentId + '">' + '</div>'
        }, borderConfig));

        this.items = [this.chartContainer];

        this.callParent();

        this.chartContainer.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;

            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            this.chartContainer.setHeight(width / 1.33);
            this.chartContainer.setWidth(width);

            $('#' + componentId).css('width', width);
            $('#' + componentId).css('height', width / 1.25);

            var height = width / 1.25;

            Ext.fly(this.componentId).setStyle('margin-top', -height * 0.2 + 15 + 'px');

            this.initCircle(0);

//            return false;

        }, this);

        this.on('afterrender', function () {

            this.initCircle(0);

            this.getEl().on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    },

    initChartHeader: function (config) {
        var me = this;
        this.headerContainer = Ext.create('Ext.container.Container', Ext.apply({
            cls: ['chart-header', 'chart-wrap'],
            height: 36,
            style: {borderRadius: '5px 5px 0 0'},
            region: 'north',
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'middle'
            },
            defaultType: 'button',
            defaults: {
                height: 28,
                style: 'margin: 0px 5px 0px 0px;'
            },
            items: [
                {
                    itemId: 'headerText',
                    xtype: 'label',
                    height: 36,
                    style: 'margin: 0px 10px;',
                    cls: 'label'
                }
            ]
        }, config));

        var headerTitle = me.getWidgetConfig()['headerTitle'];
        if (headerTitle != null) {
            this.headerContainer.down('#headerText').setText(headerTitle);
        }
    },

    initCircle: function (pointValue) {

        if (Ext.isDefined(this.justGage)) {
            Ext.fly(this.componentId).update('');
        }

        var maxPointValue = this.getWidgetConfig()['maxPointValue'];
        var minPointValue = this.getWidgetConfig()['minPointValue'];
        var warnPointValue = this.getWidgetConfig()['warnPointValue'];
        var guideBackgroundColor = '#' + this.getWidgetConfig()['guideBackgroundColor'] || '#9e9e9e';
        var guideForegroundColor = '#' + this.getWidgetConfig()['guideForegroundColor'] || '#058DC7';
        var minOrMaxValueColor = '#' + this.getWidgetConfig()['minOrMaxValueColor'] || '#058DC7';
        var warnValueColor = '#' + this.getWidgetConfig()['warnValueColor'] || '#058DC7';
        var fontColor = '#' + this.getWidgetConfig()['fontColor'] || '#000000';
        var fontSize = this.getWidgetConfig()['fontSize'] || 16;


        var displayWarnPointValue = this.getWidgetConfig()['displayWarnPointValue'] || 1;

        var displayWarnPointValueConfig = {};

        if (displayWarnPointValue == 1) {
            displayWarnPointValueConfig = {
                extraLines: [
                    {
                        value: warnPointValue,
                        color: warnValueColor,
                        width: 3
                    }
                ]
            }
        }

        this.justGage = new JustGage(Ext.apply({
            id: this.componentId,
            value: pointValue,
            title: '',
            levelColors: [guideForegroundColor],
            gaugeColor: guideBackgroundColor,
            labelFontColor: minOrMaxValueColor,
            min: minPointValue,
            max: maxPointValue,
            valueFontColor: fontColor,
            valueFontSize: fontSize,
            label: ""
        }, displayWarnPointValueConfig));

    },

    loadChartData: function () {
        var me = this;

        var dataPoint = Ext.decode(me.getWidgetConfig()['dataPoint']);
        var dataPointObjectId = dataPoint.dataPointId;

//        me.showLoading();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointLatestActualValue',
            params: {
                dataPointObjectId: dataPointObjectId
            },
            method: 'GET',
            success: function (response) {
//                me.hideLoading();
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    me.justGage.refresh(result.value);
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

        if (property === 'displayHeaderTitle') {
            if (value == 1) {
                var displayBorder = this.getWidgetConfig()['displayBorder'] || 1;

                if (displayBorder == 1) {
                    this.initChartHeader({
                        cls: ['chart-header', 'chart-wrap']
                    });
                } else {
                    this.initChartHeader({
                        cls: ['chart-header']
                    });
                }
                this.add(this.headerContainer);
            } else {
                if (this.headerContainer) {
                    this.remove(this.headerContainer);
                    delete this.headerContainer;
                }

            }
        }
        if (property === 'headerTitle') {
            if (this.headerContainer) {
                this.headerContainer.down('#headerText').setText(value);
            }

        }

        this.initCircle(0);
    },

    getDefaultWidgetConfig: function () {
        return {
            headerTitle: {
                displayName: '标题',
                value: this.name
            },
            dataPoint: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single'
                }),
                renderer: this.propertyRender.singleDataPoint,
                value: ''
            },
            refreshInterval: {
                displayName: '自动刷新间隔',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Second', 'Minute', 'Hour']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: '5|Minute'
            },
            minPointValue: {
                displayName: '下限值',
                editor: Ext.create('Ext.form.field.Number', {allowDecimals: false}),
                value: 0
            },
            maxPointValue: {
                displayName: '上限值',
                editor: Ext.create('Ext.form.field.Number', {allowDecimals: false}),
                value: 100
            },
            minOrMaxValueColor: {
                displayName: '上/下限值颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            displayWarnPointValue: {
                displayName: '是否显示警戒值',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                renderer: function (v) {
                    return {1: '是', 0: '否'}[v];
                },
                value: 1
            },
            warnPointValue: {
                displayName: '警戒值',
                editor: Ext.create('Ext.form.field.Number', {allowDecimals: false}),
                value: 50
            },
            warnValueColor: {
                displayName: '警戒线颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'ff0000'
            },
            fontSize: {
                displayName: '字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, allowDecimals: false}),
                value: 48
            },
            fontColor: {
                displayName: '字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            guideBackgroundColor: {
                displayName: '指针背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '9e9e9e'
            },
            guideForegroundColor: {
                displayName: '指针前景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '08c6f5'
            },
            backgroundColor: {
                displayName: '背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'ffffff'
            },
            displayHeaderTitle: {
                displayName: '是否显示标题',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                renderer: function (v) {
                    return {1: '是', 0: '否'}[v];
                },
                value: 1
            },
            displayBorder: {
                displayName: '是否边框',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                renderer: function (v) {
                    return {1: '是', 0: '否'}[v];
                },
                value: 1
            }
        };
    }

});