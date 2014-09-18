Ext.define('withub.ext.ea.electricityPrice.DataPointElectricityMultiConfig', {
    extend: 'Ext.Window',
    title: '数据点用电类型',
    width: 720,
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
                    fieldLabel: '用电类型分类',
                    url: '/ea/electricityUsageCategory/loadTree',
                    name: 'electricityUsageCategory',
                    value: this.electricityUsageCategoryId,
                    allowBlank: false
                },
                {
                    fieldLabel: '数据点',
                    name: 'dataPoints',
                    xtype: 'datapointfield',
                    enableCheck: true,
                    allowBlank: false
                },
                {
                    fieldLabel: '电压段(千伏)',
                    name: 'voltageSegment',
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

        this.buttons = [
            {
                text: '保存',
                handler: function () {
                    var form = this.formPanel.getForm();
                    var dataPoints = form.findField('dataPoints');
                    var dataPointArray = []
                    Ext.each(dataPoints.getPicker().getChecked(), function (node) {
                        dataPointArray.push(node.data.objectId);
                    });
                    if (Ext.isEmpty(dataPointArray)) {
                        ExtUtil.Msg.info("数据点不能为空！");
                        return;
                    }
                    var electricityUsageCategoryId = form.findField('electricityUsageCategory').getObjectValue();
                    var voltageSegmentId = form.findField('voltageSegment').getValue();
                    form.submit({
                        method: 'POST',
                        url: PageContext.contextPath + '/ea/dataPointElectricityConfig/save',
                        params: {
                            electricityUsageCategoryId: electricityUsageCategoryId,
                            dataPointIds: dataPointArray.join('|'),
                            voltageSegmentId: voltageSegmentId
                        },
                        success: function (form, action) {
                            ExtUtil.Msg.info('保存成功！', function () {
                                this.fireEvent('success');
                                this.close();
                            }, this);
                        },
                        failure: function (form, action) {
                            ExtUtil.Msg.error(action.result.message);
                        },
                        timeout: 60 * 1000,
                        scope: this,
                        waitMsg: PageContext.waitMsg,
                        waitTitle: PageContext.msgTitle
                    });
                },
                scope: this
            },
            {
                text: '取消',
                handler: function () {
                    this.close();
                },
                scope: this
            }
        ];

        this.items = [this.formPanel];

        this.callParent();
    }
});
