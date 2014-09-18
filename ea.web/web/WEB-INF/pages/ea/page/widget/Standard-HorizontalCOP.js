Ext.define('withub.ext.ea.page.widget.Standard-HorizontalCOP', {
    extend: 'Ext.Component',
    width: 500,
    height: 43,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        this.componentId = Ext.id();

        var divComponent = '' +
            '<div style="height: ' + this.height + 'px; width: ' + this.width + 'px" id="' + this.componentId + '">'
            + this.getScaleDivString() +
            '<div style="width: 100%; height: 60%" id="' + this.componentId + '-cursor" ></div>'
        '</div>';

        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {

            var componentId = this.componentId;

            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            if ((height / width ).toFixed(2) > (43 / 500).toFixed(2)) {

                var scale = height / oldHeight;

                this.setWidth(oldWidth * scale);

                $('#' + componentId).css('width', oldWidth * scale);
                $('#' + componentId).css('height', height);

            } else if ((height / width ).toFixed(2) < (43 / 500).toFixed(2)) {
                var scale = width / oldWidth;

                this.setHeight(oldHeight * scale)
                $('#' + componentId).css('width', width);
                $('#' + componentId).css('height', oldHeight * scale);

            }

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

        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointLatestActualValue',
            params: {
                dataPointObjectId: dataPointObjectId
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);

                if (result.success) {
                    var value = me.parseCopValue(result.value);
                    var bigValue = value.bigValue;
                    var smallValue = value.smallValue;
                    var textValue = '';

                    if (smallValue <= 0.7) {
                        textValue = '极佳';
                    } else if (smallValue <= 0.85) {
                        textValue = '好';
                    } else if (smallValue <= 1) {
                        textValue = '一般';
                    } else {
                        textValue = '急需改进';
                    }

                    var scale = Ext.getDom(componentId + '-scale').offsetWidth / 500;
                    var left = Ext.getDom(componentId + '-scale').offsetWidth * 0.7258 * (7 - (1.2 - smallValue) * 10 ) / 7 + 1.5 * scale + 'px';

                    var cursorDiv;

                    if (Ext.isIE) {
                        cursorDiv = '<div  style="' +
                            'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + PageContext.contextPath + '/images/widget/cop/horizontalCursor.png,sizingMethod=scale);' +
                            'background-repeat:no-repeat;position:relative;left: ' + left + ';width:26.3%;height: 100% ; ">' +
                            '<div style="height: 100%;width:100%;margin:0 0;display:table;position:absolute;"> ' +
                            '<div id="' + componentId + '-value" style="z-index: 3; display:table-cell; font-size: 12px;' +
                            '-webkit-transform:scale(' + scale + '); color: #ffffff;text-align: center;vertical-align: middle;width: 100%; ">' +
                            textValue + ' ' + bigValue + '(' + smallValue.toFixed(1) + ')' + '</div>' +
                            '</div> ' +
                            '</div>';
                    } else {

                        cursorDiv = '<div  style="  background-image: url(' + PageContext.contextPath + '/images/widget/cop/horizontalCursor.png);' +
                            'background-size:contain;background-repeat:no-repeat;width: 100%;height: 100% ; position:relative;left: ' + left + ';">' +
                            '<div style="height: 100%;width:25%;margin:0 0;display:table;position:absolute;"> ' +
                            '<div id="' + componentId + '-value" style=" z-index: 3; display:table-cell; font-size: 12px;' +
                            '-webkit-transform:scale(' + scale + '); color: #ffffff;text-align: center;' +
                            'vertical-align: middle;width: 100%; ">' + textValue + ' ' + bigValue + '(' + smallValue.toFixed(1) + ')' + '</div>' +
                            '</div> ' +
                            '</div>';
                    }
                    Ext.fly(componentId + '-cursor').update(cursorDiv);
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

    parseCopValue: function (pointValue) {

        pointValue = Math.abs(pointValue);

        var bigCopValue = [7.0, 5.9, 5.0, 4.4, 3.9, 3.5, 3.2, 2.9];
        var smallCopValue = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2];


        var index = -1;
        var value;


        if (pointValue >= 7 || pointValue <= 0.5) {
            index = 0;
            value = {
                bigValue: bigCopValue[index],
                smallValue: smallCopValue[index]
            }
            return value;
        }

        if (Math.abs(pointValue - 2.05) < 0.1) {
            index = 7;
            value = {
                bigValue: bigCopValue[index],
                smallValue: smallCopValue[index]
            }
            return value;
        }

        var minRange = 0;
        if (pointValue > 2.05) {
            for (var i = 0; i < bigCopValue.length; i++) {
                if (i == 0) {
                    minRange = Math.abs(bigCopValue[i] - pointValue);
                }

                if (minRange > Math.abs(bigCopValue[i] - pointValue)) {
                    minRange = Math.abs(bigCopValue[i] - pointValue);
                    index = i;
                }
            }
        } else {
            for (var i = 0; i < smallCopValue.length; i++) {
                if (i == 0) {
                    minRange = Math.abs(bigCopValue[i] - pointValue);
                }
                if (minRange > Math.abs(smallCopValue[i] - pointValue)) {
                    minRange = Math.abs(smallCopValue[i] - pointValue);
                    index = i;
                }
            }
        }

        value = {
            bigValue: bigCopValue[index],
            smallValue: smallCopValue[index]
        }
        return value;

    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {
            Ext.defer(this.loadChartData, 500, this);
        }
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);
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
            refreshInterval: {
                displayName: '自动刷新间隔',
                editor: Ext.create('withub.ext.ea.page.common.DateTimeUnitField', {
                    timeUnits: ['Second', 'Minute', 'Hour']
                }),
                renderer: this.propertyRender.dateTimeUnit,
                value: '5|Minute'
            }
        };
    },

    getScaleDivString: function () {

        var scaleDiv;
        if (Ext.isIE) {
            scaleDiv = '<div id="' + this.componentId + '-scale" style = "height: 40%; width:100%;background-image: url(' + PageContext.contextPath + '/images/widget/cop/horizontalScale.png);' +
                'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + PageContext.contextPath + '/images/widget/cop/horizontalScale.png,sizingMethod=scale);background-repeat:no-repeat;" ></div>';

        } else {
            scaleDiv = '<div id="' + this.componentId + '-scale" style = "background-image: url(' + PageContext.contextPath + '/images/widget/cop/horizontalScale.png);background-size:contain;background-repeat:no-repeat;height: 40%; width:100%;" ></div>';

        }

        return   scaleDiv;

    }

});



