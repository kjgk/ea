Ext.define('withub.ext.ea.dataPoint.ExpressionEditor', {
    extend: 'withub.ext.common.Window',
    title: '数据点组合',
    baseUrl: '/ea/dataPoint',
//    enableButton1:false,
    enableButton2: false,
    layout: 'border',
    width: 960,
    height: 480,
    initComponent: function () {

        var buttonArray = ['+', '-', '*', ',', '=', '>', '<', '<>', '>=', '>=', '|', '||', '&&', '/', '(', ')', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '代码'];
        var buttonItems = [];

        Ext.each(buttonArray, function (item) {
            buttonItems.push(
                {
                    xtype: 'button',
                    handler: function (button) {
                        var value = Ext.getCmp('formPanel').getForm().findField("dataPointTag").getValue() + button.text;
                        Ext.getCmp('formPanel').getForm().findField("dataPointTag").setValue(value);
                        Ext.getCmp('formPanel').getForm().findField("dataPointTagDisabled").setValue(value);
                    },
                    width: 39,
                    scope: this,
                    text: item
                }
            )

        })

        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            rootVisible: false,
            split: true,
            width: 320,
            singleExpand: false,
            margins: '5 0 5 5',
            enableOrderItem: false,
            enableDeleteItem: false,
            baseUrl: '/ea/dataPoint'
        });

        this.formPanel = Ext.create('Ext.form.Panel', {
            region: 'center',
            id: 'formPanel',
            baseCls: 'x-plain',
            margins: '5 5 5 0',
            items: [
                {
                    xtype: 'textfield',
                    labelWidth: 60,
                    fieldLabel: '名称',
                    anchor: '100%',
                    name: 'name',
                    maxLength: 300,
                    allowBlank: false
                },
                {
                    xtype: 'basecombo',
                    fieldLabel: "数据源",
                    labelWidth: 60,
                    name: 'metasysDatabase.objectId',
                    url: '/ea/metasysDatabase/listMetasysDatabase',
                    autoLoad: true,
                    extraParams: {detail: false},
                    allowBlank: false,
                    emptyText: '请选择数据源'
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
                    xtype: 'textfield',
                    fieldLabel: '测量单位',
                    labelWidth: 60,
                    anchor: '100%',
                    name: 'measureUnit',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    xtype: 'fieldset',
                    title: '组合表达式',
                    items: [
                        {
                            name: 'dataPointTag',
                            xtype: 'textarea',
                            height: 100,
//                            maxLength: 1000,
                            allowBlank: false,
                            anchor: '100%'
                        },
                        {
                            xtype: 'fieldset',
                            title: '插入当前位置',
                            items: [
                                {
                                    xtype: 'container',
                                    border: false,
                                    height: 50,
                                    layout: {
                                        type: 'table',
                                        columns: 14
                                    },
                                    items: buttonItems
                                }
                            ]
                        },
                        {
                            name: 'dataPointTagDisabled',
                            xtype: 'textarea',
                            height: 100,
                            disabled: true,
//                            maxLength: 1000,
                            anchor: '100%'
                        }
                    ]
                },
                {
                    xtype: 'hidden',
                    name: 'pointDataType',
                    value: 1
                },
                {
                    xtype: 'hidden',
                    name: 'source',
                    value: 1
                },
                {
                    xtype: 'hidden',
                    name: 'original',
                    value: 0
                },
                {
                    xtype: 'hidden',
                    name: 'objectId'
                }
            ]
        });

        this.buttons = [
            {
                text: '清除',
                handler: function (list) {
                    this.formPanel.getForm().reset();
                },
                scope: this
            }
        ];

        this.items = [this.treePanel, this.formPanel];

        var me = this;

        this.treePanel.on('itemdblclick', function (tree, record, index) {
            if (record.get('type') == 'math' || record.get('type') == 'dataPoints') {
                return false;
            }
            var value = me.formPanel.getForm().findField("dataPointTag").getValue() + record.data.type;
            me.formPanel.getForm().findField("dataPointTag").setValue(value);
            me.formPanel.getForm().findField("dataPointTagDisabled").setValue(value);

        }, this);

        this.treePanel.on('createcontextmenu', function (items, store, record, index, event) {

            var timeSegmentPointList = record.get('attributes')['timeSegmentPointList'];
            if (timeSegmentPointList) {
                Ext.each(timeSegmentPointList, function (timeSegmentPoint) {
                    items.push({
                        text: timeSegmentPoint.name,
                        handler: function () {
                            var value = me.formPanel.getForm().findField("dataPointTag").getValue() + timeSegmentPoint.dataPointTag;
                            me.formPanel.getForm().findField("dataPointTag").setValue(value);
                            me.formPanel.getForm().findField("dataPointTagDisabled").setValue(value);
                        }
                    })
                })
            }
        });

        this.callParent();
    }
});

