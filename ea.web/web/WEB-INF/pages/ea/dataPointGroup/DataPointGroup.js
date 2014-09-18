Ext.define('withub.ext.ea.dataPointGroup.DataPointGroup', {
    extend: 'withub.ext.common.Window',
    title: '数据点组',
    width: 600,
    baseUrl: '/ea/dataPointGroup',
    requires: ['withub.ext.ea.dataPoint.DataPointField'],
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 5px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'treecombo',
                    fieldLabel: '数据点组分类',
                    url: '/ea/dataPointGroupCategory/loadTree',
                    name: 'dataPointGroupCategory.objectId',
                    allowBlank: false,
                    value: this.action == 'create' ? this.dataPointGroupCategoryId : undefined
                },
                {
                    xtype: 'datapointfield',
                    fieldLabel: '添加数据点',
                    name: 'dataPoint.objectId',
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
