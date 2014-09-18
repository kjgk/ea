Ext.define('withub.ext.ea.page.widget.Standard-CirclePercentage', {
    extend: 'Ext.Component',
    width: 300,
    height: 300,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        this.componentId = Ext.id();
        var divComponent = '<div id="' + this.componentId + '">' +
            '<div style="position:absolute; text-align:center;" id="' + this.componentId + 'percentValue"></div>' +
            '<div style="position:absolute; text-align:center;margin-top: 0px" id="' + this.componentId + 'pointValue"></div>' +
            '</div>';


        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;

            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            if ((height / width ) > 1) {

                var scale = height / oldHeight;

                this.setWidth(oldWidth * scale);
                this.getWidgetConfig()['skWidth'] = ( this.getWidgetConfig()['skWidth'] || 50) * scale;

                $('#' + componentId).css('width', oldWidth * scale);
                $('#' + componentId).css('height', height);

            } else if ((height / width ) < 1) {
                var scale = width / oldWidth;

                this.setHeight(oldHeight * scale)
                this.getWidgetConfig()['skWidth'] = ( this.getWidgetConfig()['skWidth'] || 50) * scale;
                $('#' + componentId).css('width', width);
                $('#' + componentId).css('height', oldHeight * scale);

            }

            this.initCircle(0);

            return false;

        }, this);

        this.on('afterrender', function () {

            this.initCircle(0);

            this.getEl().on('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    },

    initCircle: function (numeratorValue, denominatorValue) {

        var maxPointValue = 100;
        if (!Ext.isEmpty(this.getWidgetConfig()['maxPointValue'])) {
            if (this.getWidgetConfig()['dataPointFalg'] == 0) {
                maxPointValue = this.getWidgetConfig()['maxPointValue'];
            }
        } else {
            if (!Ext.isEmpty(this.getWidgetConfig()['denominatorDataPoints']) && denominatorValue != 0) {
                maxPointValue = denominatorValue;
            }
        }

        var pointValue = numeratorValue;

        var percentage = pointValue / maxPointValue;

        if (Ext.isDefined(this.paper)) {
            this.paper.clear();
            Ext.fly(this.componentId).update('<div style="position:absolute; text-align:center;" id="' + this.componentId + 'percentValue"></div>'
                + '<div style="position:absolute; text-align:center;" id="' + this.componentId + 'pointValue"></div>')

        }

        this.paper = Raphael(this.componentId, this.width, this.height);

        var xValue = this.width / 2;
        var yValue = this.height / 2;
        var skWidth = this.getWidgetConfig()['skWidth'] || 50;
        var radius = this.getWidgetConfig()['radius'] || this.width / 2 - skWidth;

        var backgroundColor = '#' + this.getWidgetConfig()['backgroundColor'] || '#9e9e9e';
        var fontBackgroundColor = '#' + this.getWidgetConfig()['fontBackgroundColor'] || '#ffffff';
        var foregroundColor = '#' + this.getWidgetConfig()['foregroundColor'] || '#058DC7';
        var fontSize = this.getWidgetConfig()['fontSize'] || 18;
        var color = '#' + this.getWidgetConfig()['color'] || '#000000';
        var pointValueFontSize = this.getWidgetConfig()['pointValueFontSize'] || 12;
        var pointValueColor = '#' + this.getWidgetConfig()['pointValueColor'] || '#000000';

        this.paper.circle(xValue, yValue, radius).attr({"stroke-width": skWidth, "stroke": backgroundColor, "fill": "90-" + fontBackgroundColor + "-" + fontBackgroundColor });

        var percent = percentage === "NaN" ? 0 : percentage;
        var drawPercent = percent >= 1 ? 1 : percent;


        var percentValue = Math.round(percent * 100);
        if (this.getWidgetConfig()['dataPointFalg'] == 1) {
            $("#" + this.componentId + "pointValue").hide();
        }

        $("#" + this.componentId + "percentValue").html('<span style="padding-left:' + fontSize * 0.4 + 'px">' + percentValue + '<span style="font-size: 40%;">%</span></span>');
        $("#" + this.componentId + "percentValue").css('width', this.width);
        $("#" + this.componentId + "percentValue").css('height', fontSize + 1);
        $("#" + this.componentId + "percentValue").css('top', yValue - fontSize);
        $("#" + this.componentId + "percentValue").css('left', 0);
        $("#" + this.componentId + "percentValue").css('fontSize', fontSize);
        $("#" + this.componentId + "percentValue").css('color', color);

        $("#" + this.componentId + "pointValue").text(pointValue);
        $("#" + this.componentId + "pointValue").css('width', this.width);
        $("#" + this.componentId + "pointValue").css('height', pointValueFontSize + 1);
        $("#" + this.componentId + "pointValue").css('top', yValue);
        $("#" + this.componentId + "pointValue").css('left', 0);
        $("#" + this.componentId + "pointValue").css('fontSize', pointValueFontSize);
        $("#" + this.componentId + "pointValue").css('color', pointValueColor);

        if (drawPercent == 1) {
            this.paper.circle(xValue, yValue, radius).attr({"stroke-width": skWidth, "stroke": foregroundColor});
            return;
        }
        var flag = (Number(radius * 2) + Number(skWidth)) / 2;
        var r1 = (flag - Number(skWidth)), r2 = flag, PI = Math.PI;
        var p1 = {
                x: Number(xValue),
                y: Number(yValue) - flag //69
            },
            p4 = {
                x: p1.x,
                y: p1.y + r2 - r1
            },
            p2 = {
                x: p1.x - r2 * Math.sin(2 * PI * (1 - drawPercent)),
                y: p1.y + r2 - r2 * Math.cos(2 * PI * (1 - drawPercent))
            },
            p3 = {
                x: p4.x - r1 * Math.sin(2 * PI * (1 - drawPercent)),
                y: p4.y + r1 - r1 * Math.cos(2 * PI * (1 - drawPercent))
            },
            path = [
                'M', p1.x, ' ', p1.y,
                'A', r2, ' ', r2, ' 0 ', percent > 0.5 ? 1 : 0, ' 1 ', p2.x, ' ', p2.y,
                'L', p3.x, ' ', p3.y,
                'A', r1, ' ', r1, ' 0 ', percent > 0.5 ? 1 : 0, ' 0 ', p4.x, ' ', p4.y,
                'Z'
            ].join('');

        this.paper.path(path)
            .attr({"stroke-width": 0, "fill": "90-" + foregroundColor + "-" + foregroundColor });

    },

    loadChartData: function () {
        var me = this;

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
                    me.initCircle(result.items[0], result.items[1]);
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

        this.initCircle(0);

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
                displayName: '百分比字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 50
            },
            color: {
                displayName: '百分比字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            pointValueFontSize: {
                displayName: '数据点字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 30
            },
            pointValueColor: {
                displayName: '数据点字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            fontBackgroundColor: {
                displayName: '字体背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'ffffff'
            },
            skWidth: {
                displayName: '厚度',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, allowDecimals: false}),
                value: 50
            },
            backgroundColor: {
                displayName: '背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '9e9e9e'
            },
            foregroundColor: {
                displayName: '前景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '08c6f5'
            }
        };
    }

});