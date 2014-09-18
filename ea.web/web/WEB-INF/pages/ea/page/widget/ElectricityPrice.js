Ext.define('withub.ext.ea.page.widget.ElectricityPrice', {
    extend: 'Ext.Component',
    width: 180,
    height: 164,
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },

    initComponent: function () {

        this.data = {
            items: []
        };
        this.tpl = new Ext.XTemplate(
            '<div class="electricity-price">',
            '<div class="title">费用统计（元）</div>',
            '<ul>',
            '<tpl for="items">',
            '<li><a class="label">{label}</a><a class="value">{value}</a></li>',
            '</tpl>',
            '</ul>',
            '</div>'
        );

        this.initWidgetConfig();

        this.callParent();
    },

    loadData: function () {
        var me = this;
        var mask = new Ext.LoadMask(this, {
            msg: '正在加载图表数据...'
        });
        mask.show();
        var dataPoint = Ext.decode(me.getWidgetConfig()['dataPoint']);
        var dataPointObjectId = dataPoint.dataPointId;
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/pointDataFetch/actualValue/fetchSinglePointElectricityPrice',
            params: {
                dataPointObjectId: dataPointObjectId
            },
            timeout: 10 * 60 * 1000,
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var items = [];
                    var labels = ['今日', '昨日', '本月', '上月']
                    Ext.each(result.electricityPriceList, function (electricityPrice, index) {
                        items.push({
                            label: labels[index],
                            value: electricityPrice.toFixed(2)
                        });
                    })
                    me.update({items: items});
                    mask.hide();
                } else {
                    mask.hide();
                    me.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                        '数据加载错误，异常信息：' + (result.message || '无') + '</div>');
                }
            },
            failure: function (response) {
                mask.hide();
                me.getEl().mask('<div style="padding: 10px; line-height: 18px; font-size: 16px; color: #BB0000;">' +
                    '数据加载错误，异常信息：' + (response.responseText || '无') + '</div>');
            }
        });
    },

    refreshTaskHandler: function () {
        if (!Ext.isEmpty(this.getWidgetConfig()['dataPoint'])) {

            this.loadData();
            // todo
            /*            this.update({
             items: [
             {
             label: '今日',
             value: 690
             },
             {
             label: '昨日',
             value: 470
             },
             {
             label: '本月',
             value: 690
             },
             {
             label: '上月',
             value: 470
             }
             ]
             })*/
        }
    },

    getDefaultWidgetConfig: function () {
        return {
            dataPoint: {
                displayName: '数据点',
                editor: Ext.create('withub.ext.ea.page.common.DataPointField', {
                    selectModel: 'Single',
                    enableColor: false
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
                value: HighchartsConfig.defalutRefreshInterval
            }
        };
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);
    }
});