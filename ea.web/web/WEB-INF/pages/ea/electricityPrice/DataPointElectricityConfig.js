Ext.define('withub.ext.ea.electricityPrice.DataPointElectricityConfig', {
    extend: 'withub.ext.common.Window',
    title: '数据点用电类型',
    width: 720,
    baseUrl: '/ea/dataPointElectricityConfig',
    requires: ['withub.ext.ea.dataPoint.DataPointField'],
    initComponent: function () {
        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 95,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'treecombo',
                    fieldLabel: '用电类型分类',
                    url: '/ea/electricityUsageCategory/loadTree',
                    name: 'electricityUsageCategory.objectId',
                    value: this.action == 'create' ? this.electricityUsageCategoryId : undefined,
                    allowBlank: false
                },
                {
                    xtype: 'datapointfield',
                    name: 'dataPoint.objectId',
                    allowBlank: false
                },
                {
                    fieldLabel: '电压段(千伏)',
                    name: 'voltageSegment.objectId',
                    xtype: 'basecombo',
                    url: '/ea/voltageSegment/listVoltageSegment',
                    autoLoad: true,
                    allowBlank: false,
                    emptyText: '请选择电压段'
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