Ext.define('withub.ext.ea.page.common.DataPointGroup', {
    title: '添加数据组',
    extend: 'Ext.Window',
    width: 400,
    modal: true,
    resizable: false,
    constrain: true,
    multiDataPoint: false,
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 60,
                labelAlign: 'right',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'treecombo',
                    fieldLabel: '组分类',
                    hidden: !this.selectGroup,
                    url: '/ea/dataPointGroupCategory/loadTree',
                    name: 'dataPointGroupCategory',
                    emptyText: '请选择数据点组'
                },
                {
                    fieldLabel: '组名称',
                    hidden: this.selectGroup,
                    name: 'dataPointGroupName',
                    value: this.dataPointGroupName || ''
                },
                {
                    xtype: 'fieldcontainer',
                    combineErrors: true,
                    layout: 'column',
                    hidden: !this.enableGroupColor,
                    items: [
                        {
                            text: '颜色:',
                            xtype: 'label',
                            style: 'padding :0 5px 0 25px',
                            columns: 0.4,
                            allowBlank: false
                        },
                        {
                            itemId: 'dataPointGroupColor',
                            columns: 0.2,
                            width: 70,
                            xtype: 'colorSelector',
                            style: 'padding :0 0 0 10px',
                            value: this.dataPointGroupColor || '000000'
                        }
                    ]
                }
            ]
        });

        this.buttons = [
            {
                text: '确认',
                handler: function () {
                    if (!this.formPanel.getForm().isValid()) {
                        return;
                    }
                    if (this.selectGroup) {
                        if (Ext.isEmpty(this.formPanel.getForm().findField("dataPointGroupCategory").getObjectValue())) {
                            return;
                        }
                        this.fireEvent('create',
                            {dataPointGroupCategoryId: this.formPanel.getForm().findField("dataPointGroupCategory").getObjectValue(),
                                dataPointGroupName: this.formPanel.getForm().findField("dataPointGroupCategory").getRawValue(),
                                dataPointGroupColor: this.enableGroupColor ? this.formPanel.down('#dataPointGroupColor').getValue() : ''});
                    } else {
                        if (Ext.isEmpty(this.formPanel.getForm().findField("dataPointGroupName").getValue())) {
                            return;
                        }
                        this.fireEvent('create',
                            {dataPointGroupName: this.formPanel.getForm().findField("dataPointGroupName").getValue(),
                                dataPointGroupColor: this.enableGroupColor ? this.formPanel.down('#dataPointGroupColor').getValue() : ''});
                    }
                    this.close();
                },
                scope: this
            },
            {
                text: '取消',
                handler: this.close,
                scope: this
            }
        ]
        ;

        this.items = [this.formPanel];
        this.callParent();

    }
})
;
