Ext.define('withub.ext.ea.userPointData.UserDataPoint', {
    extend: 'withub.ext.common.Window',
    title: '数据点',
    baseUrl: '/ea/userDataPoint',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
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
                    fieldLabel: '标识',
                    name: 'dataPointTag',
                    allowBlank: false
                },
                {
                    fieldLabel: '测量单位',
                    name: 'measureUnit',
                    allowBlank: false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '数据点类型',
                    columns: 6,
                    items: [
                        {boxLabel: '模拟', name: 'pointDataType', inputValue: 1, checked: true},
                        {boxLabel: '布尔', name: 'pointDataType', inputValue: 2}
                    ],
                    allowBlank: false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '数据点值类型',
                    columns: 6,
                    items: [
                        {boxLabel: '区间值', name: 'pointDataValueType', inputValue: 1, checked: true},
                        {boxLabel: '累计值', name: 'pointDataValueType', inputValue: 2}
                    ],
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    name: 'source',
                    value: 2
                },
                {
                    xtype: 'hidden',
                    name: 'original',
                    value: 1
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