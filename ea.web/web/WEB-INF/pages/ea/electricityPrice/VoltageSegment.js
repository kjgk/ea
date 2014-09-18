Ext.define('withub.ext.ea.electricityPrice.VoltageSegment', {
    extend: 'withub.ext.common.Window',
    title: '电压区间',
    baseUrl: '/ea/voltageSegment',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 100,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '电压区间名称',
                    name: 'name',
                    maxLength: 100
                },
                {
                    fieldLabel: '电压区间开始值',
                    name: 'beginValue',
                    maxLength: 100
                },
                {
                    fieldLabel: '电压区间结束值',
                    name: 'endValue',
                    maxLength: 100
                },
                {
                    xtype: 'hidden',
                    name: 'objectId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();
    }
});
