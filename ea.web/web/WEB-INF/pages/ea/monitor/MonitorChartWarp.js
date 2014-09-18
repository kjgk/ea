Ext.define('withub.ext.monitor.MonitorChartWarp', {
    extend: 'Ext.Viewport',
    layout: 'fit',

    initComponent: function () {

        this.items = Ext.create('withub.ext.monitor.MonitorChart', {
            border: false
        })

        this.callParent();

    }
});