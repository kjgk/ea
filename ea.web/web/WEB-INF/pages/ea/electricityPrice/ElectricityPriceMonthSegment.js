Ext.define('withub.ext.ea.electricityPrice.ElectricityPriceMonthSegment', {
    extend: 'withub.ext.common.Window',
    title: '用电月份',
    baseUrl: '/ea/electricityPriceMonthSegment',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 60,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '月份',
                    columns: 4,
                    items: [
                        {boxLabel: '1', name: 'months', inputValue: '1'},
                        {boxLabel: '2', name: 'months', inputValue: '2'},
                        {boxLabel: '3', name: 'months', inputValue: '3'},
                        {boxLabel: '4', name: 'months', inputValue: '4'},
                        {boxLabel: '5', name: 'months', inputValue: '5'},
                        {boxLabel: '6', name: 'months', inputValue: '6'},
                        {boxLabel: '7', name: 'months', inputValue: '7'},
                        {boxLabel: '8', name: 'months', inputValue: '8'},
                        {boxLabel: '9', name: 'months', inputValue: '9'},
                        {boxLabel: '10', name: 'months', inputValue: '10'},
                        {boxLabel: '11', name: 'months', inputValue: '11'},
                        {boxLabel: '12', name: 'months', inputValue: '12'}
                    ],
                    allowBlank: false
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
