Ext.define('withub.ext.ea.page.common.DataPoint', {
    title: '添加数据点',
    extend: 'Ext.Window',
    width: 760,
    modal: true,
    resizable: false,
    constrain: true,
    multiDataPoint: false,
    selectModel: 'Single',
    enableColor: false,
    requires: ['withub.ext.ea.dataPoint.DataPointField'],
    initComponent: function () {

        var items;
        if (this.selectModel === 'Single') {
            this.setWidth(730);
            var dataPointId = '';
            var color;
            if (this.dataPoint) {
                dataPointId = this.dataPoint['dataPointId'];
                color = this.dataPoint['color'];
            }
            items = [
                {
                    xtype: 'datapointfield',
                    params: {
                        showTimeSegment: true
                    },
                    name: 'dataPointId',
                    allowBlank: false,
                    value: dataPointId
                },
                {
                    xtype: 'colorSelector',
                    fieldLabel: '颜色',
                    width: 70,
                    anchor: '15%',
                    hidden: !this.enableColor,
                    name: 'color',
                    value: color || '000000'
                }
            ]
        } else if (this.selectModel === 'Multi') {
            var cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1
            });
            items = [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: '数据点',
                    margin: '0 0 0 5',
                    items: [
                        {
                            itemId: 'dataPointField',
                            xtype: 'datapointfield',
                            flex: 1,
                            params: {
                                showTimeSegment: true
                            },
                            listeners: {
                                select: function (combo, records) {
                                    this.formPanel.down('#addButton').setDisabled(false);
                                },
                                scope: this
                            }
                        },
                        {
                            itemId: 'addButton',
                            xtype: 'button',
                            text: '添加',
                            width: 50,
                            margin: '0 0 0 5',
                            disabled: true,
                            handler: function () {
                                var dataPointField = this.formPanel.down('#dataPointField');
                                var dataPointList = this.formPanel.down('#dataPointList');
                                var record;
                                dataPointList.getStore().each(function (_record) {
                                    if (_record.get('dataPointId') === dataPointField.getValue()) {
                                        record = _record;
                                        return false;
                                    }
                                }, this);
                                if (record) {
                                    dataPointList.getSelectionModel().select(record);
                                } else {
                                    var records = dataPointList.getStore().getRange(0, dataPointList.getStore().getCount());
                                    var orderNo = 1;
                                    if (!Ext.isEmpty(records)) {
                                        orderNo = dataPointList.getStore().getMax(records, 'orderNo') + 1;
                                    }
                                    this.addDataPointRecord(dataPointField.getValue(), HighchartsConfig.defalutDataPointColor, orderNo);
                                }
                                this.formPanel.down('#addButton').setDisabled(true);
                                dataPointField.setValue(null);
                            },
                            scope: this
                        }
                    ]
                },
                {
                    itemId: 'dataPointList',
                    xtype: 'grid',
                    height: 240,
                    margin: '5 0 0 0',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['dataPointId', 'dataPointTag', 'dataPointName', 'measureUnit', 'color', 'orderNo']
                    }),
                    selModel: {
                        selType: 'cellmodel'
                    },
                    plugins: [cellEditing],
                    columns: [
                        {xtype: 'rownumberer', width: 32 },
                        {text: '数据点标识', flex: 1, minWidth: 240, dataIndex: 'dataPointTag' },
                        {text: '数据点名称', width: 120, dataIndex: 'dataPointName'},
                        {text: '测量单位', width: 65, dataIndex: 'measureUnit'},
                        {text: '颜色', width: 80, dataIndex: 'color', editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                            renderer: function (v, e) {
                                e.style = " background-color: #" + v + ";";
                                return v;
                            }, hidden: !this.enableColor},
                        {
                            xtype: 'actioncolumn',
                            width: 32,
                            align: 'center',
                            items: [
                                {
                                    icon: PageContext.contextPath + '/images/icons/delete.png',
                                    tooltip: '删除数据点',
                                    handler: function (grid, rowIndex, colIndex) {
                                        grid.getStore().removeAt(rowIndex);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 60,
                anchor: '100%'
            },
            items: items
        });

        this.buttons = [
            {
                text: '确认',
                handler: function () {
                    if (!this.formPanel.getForm().isValid()) {
                        return;
                    }
                    if (this.selectModel === 'Multi') {
                        this.dataPointList = [];
                        this.formPanel.down('#dataPointList').getStore().sort('orderNo', 'ASC');
                        this.formPanel.down('#dataPointList').getStore().each(function (record, index) {
                            this.dataPointList.push({
                                dataPointId: record.get('dataPointId'),
                                color: this.enableColor ? record.get('color') : '',
                                orderNo: index + 1
                            });
                        }, this);

                        if (this.dataPointList.length < 2 && !this.allowOne) {
                            ExtUtil.Msg.info('请至少选择2个数据点');
                            return;
                        }
                        this.fireEvent('select', this.dataPointList);
                    } else {
                        var dataPoint = {
                            dataPointId: this.formPanel.getForm().findField("dataPointId").getValue(),
                            dataPointName: this.formPanel.getForm().findField("dataPointId").getRawValue(),
                            color: this.enableColor ? this.formPanel.getForm().findField("color").getValue() : ''
                        }
                        this.fireEvent('select', dataPoint);
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
        ];

        this.items = [this.formPanel];

        this.callParent();

        if (this.selectModel === 'Multi') {
            Ext.each(this.dataPointList, function (dataPoint) {
                this.addDataPointRecord(dataPoint['dataPointId'], dataPoint['color'], dataPoint['orderNo']);
            }, this);

            this.formPanel.down('#dataPointList').getStore().sort('orderNo', 'ASC');
        }
    },

    addDataPointRecord: function (dataPointId, color, orderNo) {
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/load/' + dataPointId,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                this.formPanel.down('#dataPointList').getStore().loadData([
                    [result.data['objectId'], result.data['dataPointTag'], result.data['name'], result.data['measureUnit'], color, orderNo]
                ], true);
            },
            scope: this
        });
    }

});
