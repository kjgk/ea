Ext.define('withub.ext.ea.dataPointGroup.DataPointMultiGroup', {
    extend: 'Ext.Window',
    title: '数据点组',
    modal: true,
    resizable: false,
    width: 600,
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
                    name: 'dataPointGroupCategory',
                    allowBlank: false,
                    value: this.dataPointGroupCategoryId
                },
                {
                    xtype: 'datapointfield',
                    fieldLabel: '添加数据点',
                    name: 'dataPoints',
                    enableCheck: true,
                    allowBlank: false
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
                    var dataPointGroupCategoryId = form.findField('dataPointGroupCategory').getObjectValue();
                    form.submit({
                        method: 'POST',
                        url: PageContext.contextPath + '/ea/dataPointGroup/save',
                        params: {
                            dataPointGroupCategoryId: dataPointGroupCategoryId,
                            dataPointIds: dataPointArray.join('|')
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
