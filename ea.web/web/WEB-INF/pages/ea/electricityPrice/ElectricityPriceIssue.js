Ext.define('withub.ext.ea.electricityPrice.ElectricityPriceIssue', {
    extend: 'withub.ext.common.Window',
    title: '电价发布',
    baseUrl: '/ea/electricityPriceIssue',
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
                    fieldLabel: '电价执行名称',
                    name: 'name',
                    maxLength: 100
                },
                {
                    fieldLabel: '电价执行开始时间',
                    xtype: 'datefield',
                    name: 'startDate',
                    format: 'Y-m-d'
                },
                {
                    fieldLabel: '电价执行结束时间',
                    xtype: 'datefield',
                    name: 'endDate',
                    format: 'Y-m-d'
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
