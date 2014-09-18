Ext.define('withub.ext.ea.page.widget.Standard-COP', {
    extend: 'Ext.Component',
    width: 140,
    height: 500,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {

        this.initWidgetConfig();

        this.componentId = Ext.id();


        var divComponent = '' +
            '<div style="height: ' + this.height + 'px; width: ' + this.width + 'px" id="' + this.componentId + '">' +
            '<div style="height: 100%; width: 15%; text-align: center;float: left; ">' +

            '<div style="background-color: blue; height: 32.3% ;position: relative;">' +
            '<div style="height: 100%; width: 5px;margin:0 auto;display:table;"> ' +
            '<div  style="height: 100%;  display:table-cell;vertical-align:middle;color: #ffffff;">极佳</div> ' +
            '</div> ' +
            '</div>' +

            '<div style="background-color: green; height: 17.5%;">' +
            '<div style="height: 100%; width: 5px;margin:0 auto;display:table;"> ' +
            '<div  style="height: 100%;  display:table-cell;vertical-align:middle;color: #ffffff;">好</div> ' +
            '</div> ' +
            '</div>' +

            '<div style="background-color: yellow; height: 16.5%;">' +
            '<div style="height: 100%; width: 5px;margin:0 auto;display:table;"> ' +
            '<div  style="height: 100%;  display:table-cell;vertical-align:middle;color: #ffffff;">一般</div> ' +
            '</div> ' +
            '</div>' +

            '<div style="background-color: red; height: 33.2%;">' +
            '<div style="height: 100%; width: 5px;margin:0 auto;display:table;"> ' +
            '<div  style="height: 100%;  display:table-cell;vertical-align:middle;color: #ffffff;">急需改进</div> ' +
            '</div> ' +
            '</div>' +

            '</div>' + this.getScaleDivString() +
            '</div>';

        this.html = divComponent;

        this.callParent();

        this.on('resize', function (component, width, height, oldWidth, oldHeight) {
//            this.componentId = this.getEl().dom.firstChild.id;

            var componentId = this.componentId;

            if (!Ext.isDefined(width) || !Ext.isDefined(height) || !Ext.isDefined(oldWidth) || !Ext.isDefined(oldHeight)) {
                return false;
            }

            if ((height / width ).toFixed(5) > (500 / 140).toFixed(5)) {

                var scale = height / oldHeight;

                this.setWidth(oldWidth * scale);

                $('#' + componentId).css('width', oldWidth * scale);
                $('#' + componentId).css('height', height);

            } else if ((height / width ).toFixed(5) < (500 / 140).toFixed(5)) {
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
                    var value = me.parseCopValue(result.value);
                    var bigValue = value.bigValue;
                    var smallValue = value.smallValue;

                    var top = Ext.getDom(componentId + '-scale').offsetHeight * 0.88 * (8 - (1.2 - smallValue) * 10 - 1) / 8 + Ext.getDom(componentId + '-scale').offsetHeight * 0.06 + 'px';
                    var scale = Ext.getDom(componentId + '-scale').offsetHeight / 500;
                    var cursorDiv;

                    if (Ext.isIE) {

                        cursorDiv = '<div id="' + componentId + '-cursor" style="top:' + top + ';' +
                            'background-image: url(' + PageContext.contextPath + '/images/widget/cop/cursor.png);' +
                            'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + PageContext.contextPath + '/images/widget/cop/cursor.png,sizingMethod=scale);' +
                            'background-repeat:no-repeat;z-index:2;position:absolute;width:100%;height: 9.5% ; ">' +
                            '<div style="height: 100%; margin-right:12%;margin:0 auto;display:table;"> ' +
                            '<div id="' + componentId + '-value" style="z-index: 3; display:table-cell; font-size: ' + 12 * scale + 'px; color: #ffffff;text-align: center;vertical-align: middle;width: 100%; ">' + bigValue + 'C.O.P.' + '</BR>(' + smallValue.toFixed(1) + 'kW/Ton)' + '</div>' +
                            '</div> ' +
                            '</div>';
                    } else {

                        cursorDiv = '<div id="' + componentId + '-cursor" style="top:' + top + ';background-image: url(' + PageContext.contextPath + '/images/widget/cop/cursor.png);background-size:contain;background-repeat:no-repeat;z-index: 2;position: absolute;width: 100%;height: 9.5% ; ">' +
                            '<div style="height: 100%; padding-right:12%;margin:0 auto;display:table;"> ' +
                            '<div id="' + componentId + '-value" style="z-index: 3; display:table-cell; font-size: 12px;-webkit-transform:scale(' + scale + '); color: #ffffff;text-align: center;vertical-align: middle;width: 100%; ">' + bigValue + 'C.O.P.' + '</BR>(' + smallValue.toFixed(1) + 'kW/Ton)' + '</div>' +
                            '</div> ' +
                            '</div>';
                    }
                    Ext.fly(componentId + '-scale').update(cursorDiv);
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
            scaleDiv = '<div id="' + this.componentId + '-scale" style = "background-image: url(' + PageContext.contextPath + '/images/widget/cop/scale.jpg);filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + PageContext.contextPath + '/images/widget/cop/scale.jpg,sizingMethod=scale);background-repeat:no-repeat;height: 100%; width:85%;float: left;position: relative;" ></div>';

        } else {
            scaleDiv = '<div id="' + this.componentId + '-scale" style = "background-image: url(' + PageContext.contextPath + '/images/widget/cop/scale.jpg);background-size:contain;background-repeat:no-repeat;height: 100%; width:85%;float: left;position: relative;" ></div>';

        }

        return   scaleDiv;

    }

});



