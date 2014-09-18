Ext.define('withub.ext.Home', {
    extend: 'Ext.Viewport',
    customPageId: 'ff689922-a4a2-11e2-89f2-82e0ddb3e974',
    layout: 'absolute',

    initComponent: function () {

        var me = this;

        this.html = '<div id="backgroundImage" style=" position: absolute;top: 0px; left: 0px; z-index: 1"></div>';

        this.callParent();

        this.on('render', function () {
            Ext.Ajax.request({
                url: PageContext.contextPath + '/main/loadIndicator',
                method: 'GET',
                success: function (response) {
                    var indicatorData = Ext.decode(response.responseText).data;
                    Ext.Ajax.request({
                        url: PageContext.contextPath + '/customPage/load/' + this.customPageId,
                        method: 'GET',
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            Ext.each(result['items'], function (item) {
                                var widget;
                                var config = {
                                    title: item['name'],
                                    width: item['width'],
                                    height: item['height'],
                                    x: item['left'],
                                    y: item['top'],
                                    widgetData: item
                                };
                                if (item.page == 'Ext.toolbar.TextItem') {
                                    widget = this.createWidget(item.page, Ext.apply(config, {
                                        text: indicatorData['indicator.' + item.customField1],
                                        style: 'color: #ACEAEE; z-index: 1000; font-size: 14px; font-weight: bold;'
                                    }))
                                } else {
                                    if (item.page == 'withub.ext.monitor.MonitorChart') {
                                        Ext.apply(config, {
                                            chartSeriesConfig: item['customField1'].split(',')
                                        });
                                    }
                                    widget = this.createWidget(item.page, config);
                                }
                                me.add(widget);
                            }, this);

                            if (result.data['backgroundImage']) {
                                me.backgroundImage = Ext.create('Ext.Img', {
                                    autoEl: 'div',
                                    renderTo: 'backgroundImage',
                                    src: PageContext.contextPath + '/customPage/backgroundImage/load?fileName=' + result.data['backgroundImage']
                                });
                            }
                        },
                        scope: this
                    });
                },
                scope: this
            })
        }, this);
    },

    createWidget: function (type, config) {
        var me = this;
        var widget = Ext.create(type, config);
        return widget;
    }
});