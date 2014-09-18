/**
 * 日历对比组件
 */
Ext.define('withub.ext.ea.page.widget.Calendar-Contrast', {
    extend: 'Ext.container.Container',
    width: 480,
    height: 280,
    minWidth: 360,
    minHeight: 240,
    bodyPadding: 5,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },
    initComponent: function () {
        var me = this;

        me.initWidgetConfig();

        var yearStart = 2013;       // todo 获取系统起始年月
        var yearEnd = new Date().getFullYear();
        var yearData = {}, monthData = {};
        for (var i = yearStart; i <= yearEnd; i++) {
            yearData[i] = i + '年';
        }
        for (var i = 0; i <= 11; i++) {
            monthData[i] = i + 1 + '月';
        }

        me.items = [
            Ext.create('Ext.form.Panel', {
                itemId: 'monthPanel',
                width: 80,
                bodyPadding: '32 0 0 0',
                fieldDefaults: {
                    labelAlign: 'top',
                    labelStyle: 'font-size: 16px; height: 20px;'
                },
                border: false,
                items: [
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '当前',
                        anchor: '-5',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {xtype: 'arraycombo', data: yearData},
                            {xtype: 'arraycombo', data: monthData}
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '对比',
                        anchor: '-5',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {xtype: 'arraycombo', data: yearData},
                            {xtype: 'arraycombo', data: monthData}
                        ]
                    },
                    {
                        xtype: 'button',
                        text: '确定',
                        anchor: '-5',
                        handler: me.drawCalendar,
                        scope: me
                    }
                ]
            }),
            {
                itemId: 'jCalendar',
                flex: 1
            },
            Ext.create('Ext.view.View', {
                itemId: 'dayCount',
                width: 64,
                store: Ext.create('Ext.data.Store', {
                    fields: ['color', 'count', 'degree'],
                    data: []
                }),
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                    '<div style="left: {#*16-8}px; height: {count*80/31}%;" class="day-count" degree="{degree}">',
                    '<span>{count}</span><a style="background-color: #{color};"></a>',
                    '</div>',
                    '</tpl>'
                ),
                itemSelector: 'div.day-count'
            })
        ]

        me.callParent();

        me.on('afterrender', function () {
            var months = me.parseMonth();
            setTimeout(function () {
                var jCalendar = me.down('#jCalendar');
                var options = {
                    width: jCalendar.getWidth(),
                    height: jCalendar.getHeight(),
                    currentMonth: months[0],
                    contrastMonth: months[1],
                    cellDefaultColor: me.getWidgetConfig()['otherColor'],
                    lowerColor: me.getWidgetConfig()['lowerColor'],
                    equalColor: me.getWidgetConfig()['equalColor'],
                    higherColor: me.getWidgetConfig()['higherColor'],
                    dateColor: me.getWidgetConfig()['dateColor'],
                    dateFontFamily: me.getWidgetConfig()['dateFontFamily'],
                    dateFontSize: me.getWidgetConfig()['dateFontSize'],
                    weekColor: me.getWidgetConfig()['weekColor'],
                    weekFontFamily: me.getWidgetConfig()['weekFontFamily'],
                    weekFontSize: me.getWidgetConfig()['weekFontSize']
                };
                me.jCalendar = jQuery('#' + jCalendar.getId()).jMonthCalendar(options);
                me.jCalendarOptions = options;
            }, 100);
        });
    },

    parseMonth: function () {
        var me = this;
        var definiteMonth = me.getWidgetConfig()['definiteMonth'];
        var offsets = me.getWidgetConfig()['offsets'];
        var currentMonth, contrastMonth;
        if (definiteMonth) {
            currentMonth = Ext.Date.parse(definiteMonth.split('~')[0], 'Ym');
            contrastMonth = Ext.Date.parse(definiteMonth.split('~')[1], 'Ym');
        } else {
            currentMonth = new Date();
            contrastMonth = Ext.Date.add(new Date(), Ext.Date.MONTH, -parseInt(offsets, 10));
        }
        return [currentMonth, contrastMonth];
    },

    drawCalendar: function () {
        var me = this;
        var monthPanel = me.down('#monthPanel');
        var dateValues = [
            monthPanel.getComponent(0).getComponent(0).getValue(),
            monthPanel.getComponent(0).getComponent(1).getValue(),
            monthPanel.getComponent(1).getComponent(0).getValue(),
            monthPanel.getComponent(1).getComponent(1).getValue()
        ];

        if (me.jCalendarOptions) {
            var jCalendar = me.down('#jCalendar');
            me.jCalendarOptions.drawCalendar(dateValues, {
                width: jCalendar.getWidth(),
                height: jCalendar.getHeight(),
                dateColor: me.getWidgetConfig()['dateColor'],
                dateFontFamily: me.getWidgetConfig()['dateFontFamily'],
                dateFontSize: me.getWidgetConfig()['dateFontSize'],
                weekColor: me.getWidgetConfig()['weekColor'],
                weekFontFamily: me.getWidgetConfig()['weekFontFamily'],
                weekFontSize: me.getWidgetConfig()['weekFontSize']
            });
            me.loadData(dateValues);
        }
    },

    loadData: function (dateValues) {
        var me = this;
        var jCalendar = me.down('#jCalendar');
        jCalendar.getEl().unmask();
        var dataPoint = me.getWidgetConfig()['dataPoint'];
        if (!dataPoint) {
            return;
        }

        if (dateValues === undefined) {
            var months = me.parseMonth();
            dateValues = [months[0].getFullYear(), months[0].getMonth()
                , months[1].getFullYear(), months[1].getMonth()];
        }
        dataPoint = Ext.decode(dataPoint);
        var datumBeginDate = new Date(dateValues[0], dateValues[1], 1);
        var datumEndDate = new Date(dateValues[0], dateValues[1], Ext.Date.getDaysInMonth(datumBeginDate));
        var contrastBeginDate = new Date(dateValues[2], dateValues[3], 1);
        var contrastEndDate = new Date(dateValues[2], dateValues[3], Ext.Date.getDaysInMonth(contrastBeginDate));
        jCalendar.getEl().mask(PageContext.loadMsg);
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointSameTimeSegmentContrastActualValue',
            params: {
                dataPointObjectId: dataPoint['dataPointId'],
                timeUnit: 'Day',
                datumBeginDate: Ext.Date.format(datumBeginDate, 'Y-m-d'),
                datumEndDate: Ext.Date.format(datumEndDate, 'Y-m-d'),
                contrastBeginDate: Ext.Date.format(contrastBeginDate, 'Y-m-d'),
                contrastEndDate: Ext.Date.format(contrastEndDate, 'Y-m-d')
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    jCalendar.getEl().unmask();
                    var contrastValueList = result['contrastActualValueList'];
                    var measureUnit = result['dataPointInfo']['measureUnit'];
                    var dayCountData = {};
                    Ext.each(result['datumActualValueList'], function (item, index) {
                        var currentValue = item['sumActualValue'] || 0, contrastValue = 0, contrastDatetimeString = '--';
                        if (contrastValueList[index]) {
                            contrastDatetimeString = contrastValueList[index]['datetimeString'];
                            contrastValue = contrastValueList[index]['sumActualValue'] || 0;
                        }
                        var value = currentValue - contrastValue;
                        var color = '', degree = '';
                        if (value > 0) {
                            color = me.getWidgetConfig()['higherColor'];
                            degree = 'H';
                        } else if (value < 0) {
                            color = me.getWidgetConfig()['lowerColor'];
                            degree = 'L';
                        } else {
                            color = me.getWidgetConfig()['equalColor'];
                            degree = 'E';
                        }
                        me.jCalendar.jMonthCalendar.updateCellInfo(me.jCalendar, item['datetimeString'], {
                            currentValue: currentValue + measureUnit,
                            contrastValue: contrastValue + measureUnit,
                            contrastDate: contrastDatetimeString,
                            backgroundColor: color,
                            degree: degree,
                            color: color

                        });
                        if (dayCountData[degree + '_' + color]) {
                            dayCountData[degree + '_' + color]++;
                        } else {
                            dayCountData[degree + '_' + color] = 1;
                        }
                    });
                    var dayCount = me.down('#dayCount');
                    var arr = [];
                    for (var key in dayCountData) {
                        arr.push({
                            degree: key.split('_')[0],
                            color: key.split('_')[1],
                            count: dayCountData[key]
                        });
                    }
                    dayCount.getStore().loadData(arr);

                } else {
                    jCalendar.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                        '数据加载错误，异常信息：' + (result.message || '无') + '</div>');
                }
            }
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {
            Ext.defer(this.loadData, 500, this);
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
            offsets: {
                displayName: '向前偏移量',
                editor: Ext.create('Ext.form.field.Number', {
                    allowDecimals: false,
                    minValue: 1,
                    maxValue: 9999
                }),
                value: 1,
                renderer: function (value) {
                    if (value) {
                        return value + '个月';
                    }
                }
            },
            definiteMonth: {
                displayName: '固定月份',
                editor: Ext.create('Ext.form.field.TextArea', {
                    enableKeyEvents: true,
                    emptyText: '格式：201302~201301',
                    height: 48,
                    listeners: {
                        keydown: function (field, e) {
                            if (e.getKey() >= 48 && e.getKey() <= 57 || e.getKey() == 192 || e.isSpecialKey()) {
                            } else {
                                e.stopEvent();
                            }
                        }
                    }
                }),
                value: ''
            },
            higherColor: {
                displayName: '日期背景色(高于)',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'ff6633'
            },
            equalColor: {
                displayName: '日期背景色(持平)',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '00aaff'
            },
            lowerColor: {
                displayName: '日期背景色(低于)',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '009933'
            },
            otherColor: {
                displayName: '日期背景色(其它)',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: 'cccccc'
            },
            dateColor: {
                displayName: '日期文字颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            dateFontFamily: {
                displayName: '日期文字字体',
                editor: Ext.create('withub.ext.ea.page.common.FontField', {}),
                value: '微软雅黑'
            },
            dateFontSize: {
                displayName: '日期文字大小',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 14
            },
            weekColor: {
                displayName: '星期文字颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            weekFontFamily: {
                displayName: '星期文字字体',
                editor: Ext.create('withub.ext.ea.page.common.FontField', {}),
                value: '微软雅黑'
            },
            weekFontSize: {
                displayName: '星期文字大小',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 14
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

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (property == 'offsets' || property == 'definiteMonth') {
            var months = this.parseMonth();
            var monthPanel = this.down('#monthPanel');
            monthPanel.getComponent(0).getComponent(0).setValue(months[0].getFullYear());
            monthPanel.getComponent(0).getComponent(1).setValue(months[0].getMonth());
            monthPanel.getComponent(1).getComponent(0).setValue(months[1].getFullYear());
            monthPanel.getComponent(1).getComponent(1).setValue(months[1].getMonth());
            this.drawCalendar();
        }

        if (property == 'higherColor' || property == 'equalColor' || property == 'lowerColor') {
            var degree = {
                higherColor: 'H',
                equalColor: 'E',
                lowerColor: 'L'
            }[property];
            if (this.jCalendar) {
                this.jCalendar.find('.bottom>span[degree="' + degree + '"]').css('border-left-color', '#' + value);
                this.jCalendar.find('.DateBox[degree="' + degree + '"]').css('background-color', '#' + value);
            }
            var dayCount = this.down('#dayCount');
            if (dayCount.rendered) {
                jQuery('#' + dayCount.getId() + '>div[degree="' + degree + '"]>a').css('background-color', '#' + value);
            }
        }

        if (property == 'otherColor') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateBox[degree="A"]').css('background-color', '#' + value);
            }
        }

        if (property === 'dateColor') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateBox a').css('color', '#' + value);
            }
        }
        if (property === 'dateFontFamily') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateBox a').css('font-family', value);
            }
        }
        if (property === 'dateFontSize') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateBox a').css('font-size', value + 'px');
            }
        }

        if (property === 'weekColor') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateHeader span').css('color', '#' + value);
            }
        }
        if (property === 'weekFontFamily') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateHeader span').css('font-family', value);
            }
        }
        if (property === 'weekFontSize') {
            if (this.jCalendar) {
                this.jCalendar.find('.DateHeader span').css('font-size', value + 'px');
            }
        }
    }
});