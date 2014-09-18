Ext.define('withub.ext.ea.page.common.SimpleDataPointLineColor', {
    extend: 'Ext.form.field.Trigger',
    editable: false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    fieldLabel: null,

    initComponent: function () {
        this.on('focus', this.onTriggerClick, this)
        this.callParent();
    },

    onTriggerClick: function () {

        var me = this, selector;
        var column = {};
        if (me.columnName == '向前偏移量') {
            column = {
                text: me.columnName, flex: 1, minWidth: 240, dataIndex: me.column, editor: Ext.create('Ext.form.field.Number', {
                    minValue: 1,
                    allowDecimals: false
                })
            }
        } else {
            column = {
                text: me.columnName, flex: 1, minWidth: 240, dataIndex: me.column, editor: Ext.create('Ext.form.field.Text', {
                    emptyText: '日期使用~分割,格式如:20130101~20130104'
                })
            }
        }

        var cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        selector = Ext.create('Ext.window.Window', {
            bodyPadding: 5,
            layout: 'border',
            width: 600,
            height: 360,
            modal: true,
            title: me.title,
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    height: 32,
                    region: 'north',
                    items: [
                        {
                            itemId: 'addButton',
                            xtype: 'button',
                            text: '添加',
                            width: 50,
                            margin: '0 0 0 5',
                            handler: function () {
                                var dataPointList = selector.down('#dataPointList');

                                var records = dataPointList.getStore().getRange(0, dataPointList.getStore().getCount());
                                var orderNo = 1;
                                if (!Ext.isEmpty(records)) {
                                    orderNo = dataPointList.getStore().getMax(records, 'orderNo') + 1;
                                }

                                var store = dataPointList.getStore();
                                store.add({
                                    color: HighchartsConfig.defalutDataPointColor,
                                    orderNo: orderNo
                                })

                            },
                            scope: this
                        }
                    ]
                },
                {
                    itemId: 'dataPointList',
                    xtype: 'grid',
                    region: 'center',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: [ me.column, 'color', 'orderNo']
                    }),
                    selModel: {
                        selType: 'cellmodel'
                    },
                    plugins: [cellEditing],
                    columns: [
                        {xtype: 'rownumberer', width: 32 },
                        column,
                        {text: '颜色', width: 80, dataIndex: 'color',
                            editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                            renderer: function (v, e) {
                                e.style = " background-color: #" + v + ";";
                                return v;
                            }
                        },
                        {
                            xtype: 'actioncolumn',
                            width: 32,
                            align: 'center',
                            items: [
                                {
                                    icon: PageContext.contextPath + '/images/icons/delete.png',
                                    tooltip: '删除时间段',
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.getStore().removeAt(rowIndex);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        var valueList = [];
                        selector.down('#dataPointList').getStore().sort('orderNo', 'ASC');
                        selector.down('#dataPointList').getStore().each(function (record, index) {
                            if (me.columnName == '向前偏移量') {
                                valueList.push({
                                    offset: record.get(me.column),
                                    color: record.get('color'),
                                    orderNo: index + 1
                                });
                            } else {
                                valueList.push({
                                    definiteTime: record.get(me.column),
                                    color: record.get('color'),
                                    orderNo: index + 1
                                });
                            }

                        }, this);

                        me.setValue(Ext.encode(valueList));
                        selector.close();
                    },
                    scope: this
                },
                {
                    text: '关闭',
                    handler: function () {
                        selector.close();
                    }
                }
            ],
            listeners: {
                afterrender: function () {
                    if (!Ext.isEmpty(this.value)) {
                        var valueList = Ext.decode(this.value);
                        Ext.each(valueList, function (value) {
                            if (me.columnName == '向前偏移量') {
                                selector.down('#dataPointList').getStore().add({
                                    offset: value['offset'],
                                    color: value['color'],
                                    orderNo: value['orderNo']
                                });
                            } else {
                                selector.down('#dataPointList').getStore().add({
                                    definiteTime: value['definiteTime'],
                                    color: value['color'],
                                    orderNo: value['orderNo']
                                });
                            }
                        }, this);

                        selector.down('#dataPointList').getStore().sort('orderNo', 'ASC');
                    }
                },
                scope: this
            }
        });

        selector.on('close', function () {
            this.selector = undefined;
            this.triggerBlur();
        }, this);

        selector.show();
        this.selector = selector;
    },

    getValue: function () {
        return this.value;
    },

    mimicBlur: function (e) {
        if (!this.isDestroyed && !this.bodyEl.contains(e.target) && this.validateBlur(e) && this.selector === undefined) {
            this.triggerBlur(e);
        }
    }

});
