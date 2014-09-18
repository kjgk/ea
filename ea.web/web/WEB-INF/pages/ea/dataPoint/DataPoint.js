Ext.define('withub.ext.ea.dataPoint.DataPoint', {
    extend: 'withub.ext.common.Window',
    title: '数据点',
    width: 650,
    baseUrl: '/ea/dataPoint',
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
                    fieldLabel: '数据点标识',
                    name: 'dataPointTag',
                    readOnly: true,
                    allowBlank: false
                },
                {
                    fieldLabel: '数据点名称',
                    name: 'name',
                    maxLength: 300,
                    allowBlank: false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '数据点类型',
                    columns: 6,
                    hidden: true,
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
                        {boxLabel: '区间值', name: 'pointDataValueType', inputValue: 1},
                        {boxLabel: '累计值', name: 'pointDataValueType', inputValue: 2}
                    ],
                    allowBlank: false
                },
                {
                    fieldLabel: '测量单位',
                    name: 'measureUnit',
                    maxLength: 100
                },
                {
                    xtype: 'hidden',
                    name: 'source'
                },
                {
                    xtype: 'hidden',
                    name: 'original'
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