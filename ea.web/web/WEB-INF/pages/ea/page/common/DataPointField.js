Ext.define('withub.ext.ea.page.common.DataPointField', {
    extend: 'Ext.form.field.Trigger',
    editable: false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    selectModel: 'Single',
    enableColor: false,
    enableGroupColor: false,
    enableDataConvert: false,   // 用于折算组件
    enableElectricityPrice: false,
    allowOne: false,
    fieldLabel: null,
    requires: ['withub.ext.ea.dataPoint.DataPointField'],
    initComponent: function () {
        this.on('focus', this.onTriggerClick, this)
        this.callParent();
    },

    onTriggerClick: function () {

        var me = this, selector;
        if (this.selectModel === 'Single') {
            var dataPointId, color, electricityPriceTimeSegmentList;
            if (!Ext.isEmpty(this.value)) {
                var dataPoint = Ext.decode(this.value);
                dataPointId = dataPoint['dataPointId'];
                color = dataPoint['color'];
                electricityPriceTimeSegmentList = dataPoint['electricityPriceTimeSegmentList']
            } else {
                color = HighchartsConfig.defalutDataPointColor;
            }

            var checkDataPointElectricityConfig = function (dataPointId) {
                Ext.Ajax.request({
                    url: PageContext.contextPath + '/ea/dataPointElectricityConfig/exist',
                    method: 'GET',
                    params: {
                        dataPointId: dataPointId
                    },
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        selector.down('#electricityPriceTimeSegment').setVisible(result.data === true);
                    },
                    scope: this
                });
            }

            selector = Ext.create('Ext.window.Window', {
                bodyPadding: 10,
                layout: 'form',
                width: 730,
                height: 120 + (this.enableColor ? 24 : 0) + (this.enableElectricityPrice ? 24 : 0),
                modal: true,
                title: '选择数据点',
                items: [
                    {
                        itemId: 'dataPointField',
                        xtype: 'datapointfield',
                        labelWidth: 60,
                        value: dataPointId,
                        params: {
                            showTimeSegment: true
                        },
                        listeners: {
                            select: function (nodeId, objectId, nodeType, record, index) {
                                if (me.enableElectricityPrice) {
                                    checkDataPointElectricityConfig(objectId);
                                }
                            },
                            scope: this
                        },
                        emptyText: '请选择数据点'
                    },
                    {
                        xtype: 'fieldcontainer',
                        combineErrors: true,
                        layout: 'column',
                        fieldLabel: '颜色',
                        labelWidth: 60,
                        hidden: !this.enableColor,
                        items: [
                            {
                                itemId: 'dataPointColor',
                                xtype: 'colorSelector',
                                value: color || '000000'
                            }
                        ]
                    }
                ],
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                            var dataPointField = selector.down('#dataPointField');
                            var dataPointColor = selector.down('#dataPointColor');
                            var electricityPriceTimeSegmentField = selector.down('#electricityPriceTimeSegment');
                            var electricityPriceTimeSegmentList = '';
                            if (electricityPriceTimeSegmentField && electricityPriceTimeSegmentField.isVisible()) {
                                electricityPriceTimeSegmentList = [];
                                Ext.each(Ext.ComponentQuery.query('colorSelector', electricityPriceTimeSegmentField), function (item) {
                                    electricityPriceTimeSegmentList.push({
                                        timeSegmentId: item.timeSegmentId,
                                        color: item.getValue()
                                    })
                                });
                            }
                            this.setValue(Ext.encode({
                                dataPointId: dataPointField.getValue(),
                                color: this.enableColor ? dataPointColor.getValue() : '',
                                electricityPriceTimeSegmentList: electricityPriceTimeSegmentList
                            }));
                            this.setRawValue(dataPointField.getRawValue());
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
                ]
            });

            if (me.enableElectricityPrice) {
                Ext.Ajax.request({
                    url: PageContext.contextPath + '/ea/electricityPriceTimeSegment/query',
                    method: 'GET',
                    params: {
                        pageNo: 1,
                        start: 0,
                        pageSize: 100
                    },
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        var colors = [];

                        Ext.each(result.items, function (item) {
                            var color = '000000';
                            Ext.each(electricityPriceTimeSegmentList, function (electricityPriceTimeSegment) {
                                if (item.objectId == electricityPriceTimeSegment['timeSegmentId']) {
                                    color = electricityPriceTimeSegment['color'];
                                    return false;
                                }
                            });
                            colors.push({
                                xtype: 'label',
                                text: item.name + '：',
                                style: 'margin: 2px 2px 0px 0px;'
                            }, {
                                xtype: 'colorSelector',
                                timeSegmentId: item.objectId,
                                value: color,
                                style: 'margin: 0px 5px 0px 0px;'
                            });
                        });
                        selector.add({
                            itemId: 'electricityPriceTimeSegment',
                            xtype: 'fieldcontainer',
                            combineErrors: true,
                            layout: 'column',
                            fieldLabel: '电价区间',
                            labelWidth: 60,
                            items: colors,
                            hidden: true
                        });
                        if (dataPointId) {
                            checkDataPointElectricityConfig(dataPointId);
                        }

                    },
                    scope: this
                });
            }
        }
        else if (this.selectModel === 'Multi') {
            var cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1
            });
            selector = Ext.create('Ext.window.Window', {
                bodyPadding: 10,
                layout: 'border',
                width: 800,
                height: 480,
                modal: true,
                title: '选择数据点',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        height: 32,
                        region: 'north',
                        items: [
                            {
                                itemId: 'dataPointField',
                                xtype: 'datapointfield',
                                labelWidth: 40,
                                flex: 1,
                                params: {
                                    showTimeSegment: true
                                },
                                listeners: {
                                    select: function (nodeId, objectId, nodeType, record, index) {
                                        selector.down('#addButton').setDisabled(false);
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
                                    var dataPointField = selector.down('#dataPointField');
                                    var dataPointGrid = selector.down('#dataPointGrid');
                                    var record;
                                    dataPointGrid.getStore().each(function (_record) {
                                        if (_record.get('dataPointId') === dataPointField.getValue()) {
                                            record = _record;
                                            return false;
                                        }
                                    }, this);
                                    if (record) {
                                        dataPointGrid.getSelectionModel().select(record);
                                    } else {
                                        var records = dataPointGrid.getStore().getRange(0, dataPointGrid.getStore().getCount());
                                        var orderNo = 1;
                                        if (!Ext.isEmpty(records)) {
                                            orderNo = dataPointGrid.getStore().getMax(records, 'orderNo') + 1;
                                        }
                                        this.addDataPointRecord({
                                            dataPointId: dataPointField.getValue(),
                                            color: HighchartsConfig.defalutDataPointColor,
                                            orderNo: orderNo
                                        });
                                    }
                                    selector.down('#addButton').setDisabled(true);
                                    dataPointField.setValue(null);
                                },
                                scope: this
                            }
                        ]
                    },
                    {
                        itemId: 'dataPointGrid',
                        xtype: 'grid',
                        region: 'center',
                        sortableColumns: false,
                        store: Ext.create('Ext.data.ArrayStore', {
                            sorters: [
                                {
                                    property: 'orderNo',
                                    direction: 'ASC'
                                }
                            ],
                            fields: ['dataPointId', 'dataPointTag', 'dataPointName', 'measureUnit', 'color', 'orderNo']
                        }),
                        selModel: {
                            selType: 'cellmodel'
                        },
                        plugins: [cellEditing],
                        columns: [
                            {xtype: 'rownumberer', width: 32 },
                            {text: '数据点标识', flex: 1, minWidth: 120, dataIndex: 'dataPointTag'},
                            {text: '数据点名称', width: 120, dataIndex: 'dataPointName'},
                            {text: '测量单位', width: 65, dataIndex: 'measureUnit'},
                            {text: '颜色', width: 80, dataIndex: 'color',
                                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
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
                                        icon: PageContext.contextPath + '/images/icons/import.png',
                                        tooltip: '替换数据点',
                                        handler: function (grid, rowIndex, colIndex) {
                                            Ext.create('withub.ext.ea.page.common.DataPoint', {
                                                listeners: {
                                                    scope: this,
                                                    select: function (data) {
                                                        var dataPointGrid = selector.down('#dataPointGrid');
                                                        var mainRecord;
                                                        dataPointGrid.getStore().each(function (_record) {
                                                            if (_record.get('dataPointId') === data.dataPointId) {
                                                                mainRecord = _record;
                                                                return false;
                                                            }
                                                        }, this);
                                                        if (mainRecord) {
                                                            dataPointGrid.getSelectionModel().select(mainRecord);
                                                        } else {
                                                            me.replaceDataPointRecord(rowIndex, data.dataPointId);
                                                        }
                                                    }
                                                }
                                            }).show();
                                        }
                                    }
                                ]
                            },
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
                        ],
                        tbar: {
                            hidden: !me.enableDataConvert,
                            items: [
                                {
                                    text: '添加折算公式',
                                    iconCls: 'icon-add',
                                    handler: function () {
                                        var dataPointGrid = selector.down('#dataPointGrid');
                                        var wind = Ext.create('Ext.window.Window', {
                                            title: '添加折算公式',
                                            bodyPadding: 5,
                                            layout: 'fit',
                                            width: 360,
                                            height: 200,
                                            modal: true,
                                            resizable: false,
                                            items: [
                                                {
                                                    xtype: 'form',
                                                    baseCls: 'x-plain',

                                                    defaults: {
                                                        labelWidth: 50,
                                                        anchor: '98%',
                                                        labelAlign: 'right'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'name',
                                                            fieldLabel: '名称',
                                                            allowBlank: false
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            name: 'measureUnits',
                                                            fieldLabel: '单位',
                                                            allowBlank: false
                                                        },
                                                        {
                                                            xtype: 'textarea',
                                                            name: 'formula',
                                                            fieldLabel: '公式',
                                                            allowBlank: false
                                                        }
                                                    ]
                                                }
                                            ],
                                            buttons: [
                                                {
                                                    text: '确定',
                                                    handler: function () {
                                                        var form = wind.getComponent(0).getForm();
                                                        if (!form.isValid()) {
                                                            return;
                                                        }
                                                        var model = dataPointGrid.getStore().getProxy().getModel();
                                                        var name = form.findField('name').getValue();
                                                        var measureUnits = form.findField('measureUnits').getValue();
                                                        var fieldName = 'CF_' + new Date().getTime();
                                                        var formula = form.findField('formula').getValue();
                                                        var column = Ext.create('Ext.grid.column.Column', {
                                                            text: name,
                                                            dataIndex: fieldName,
                                                            measureUnits: measureUnits,
                                                            width: 80,
                                                            sortable: false,
                                                            editor: {
                                                                xtype: 'textfield'
                                                            }
                                                        });
                                                        dataPointGrid.headerCt.insert(dataPointGrid.headerCt.items.items.length - 2, column);
                                                        dataPointGrid.getView().refresh();
                                                        var fields = [];
                                                        Ext.each(model.getFields(), function (field) {
                                                            fields.push(field.name);
                                                        });
                                                        fields.push(fieldName);
                                                        model.setFields(fields);
                                                        dataPointGrid.getStore().each(function (record) {
                                                            record.set(fieldName, formula);
                                                            record.commit();
                                                        });
                                                        wind.close();
                                                    }
                                                },
                                                {
                                                    text: '取消',
                                                    handler: function () {
                                                        wind.close();
                                                    }
                                                }
                                            ]
                                        });
                                        wind.show();
                                    }
                                }
                            ]
                        },
                        listeners: {
                            itemcontextmenu: function (view, record, item, index, event, options) {
                                var store = this.getStore();
                                me.createcontextmenu(store, record, index, event);
                            },
                            headercontextmenu: function (ct, column, event) {
                                if (Ext.String.startsWith(column.dataIndex, 'CF_')) {
                                    var dataPointGrid = selector.down('#dataPointGrid');
                                    var menu = Ext.create('Ext.menu.Menu', {
                                        items: [
                                            {
                                                text: '删除折算公式',
                                                iconCls: 'icon-delete',
                                                handler: function () {
                                                    dataPointGrid.headerCt.remove(column);
                                                    dataPointGrid.getView().refresh();
                                                }
                                            }
                                        ]
                                    });
                                    menu.showAt(event.getXY());
                                }
                                event.preventDefault();
                            }
                        }
                    }
                ],
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                            var dataPointList = [], dataPointNames = [];
                            selector.down('#dataPointGrid').getStore().each(function (record, index) {
                                var copy = Ext.clone(record.data);
                                delete copy.dataPointTag;
                                delete copy.dataPointName;
                                delete copy.measureUnit;
                                copy['orderNo'] = index + 1;
                                dataPointList.push(copy);
                                dataPointNames.push(record.get('dataPointName'));
                            }, this);

                            if (dataPointList.length < 2 && !this.allowOne) {
                                ExtUtil.Msg.info('请至少选择2个数据点');
                                return;
                            }
                            if (this.enableDataConvert) {
                                var dataConvertList = [];
                                Ext.each(selector.down('#dataPointGrid').headerCt.items.items, function (item) {
                                    if (Ext.String.startsWith(item.dataIndex, 'CF')) {
                                        dataConvertList.push({
                                            dataIndex: item.dataIndex,
                                            text: item.text,
                                            measureUnits: item.measureUnits
                                        });
                                    }
                                });
                                this.setValue(Ext.encode({
                                    dataPointList: dataPointList,
                                    dataConvertList: dataConvertList
                                }));
                            } else {
                                this.setValue(Ext.encode(dataPointList));
                            }
                            this.setRawValue(dataPointNames.join(','));
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
                            var result = Ext.decode(this.value);
                            var dataPointList = [];
                            var dataPointGrid = selector.down('#dataPointGrid');
                            if (this.enableDataConvert) {
                                dataPointList = result['dataPointList'];
                                var model = dataPointGrid.getStore().getProxy().getModel();
                                var columns = [], fields = model.getFields();
                                Ext.each(result['dataConvertList'], function (item) {
                                    fields.push(item['dataIndex']);
                                    columns.push(Ext.apply({
                                        editor: {xtype: 'textfield'}
                                    }, item));
                                });
                                model.setFields(fields);
                                dataPointGrid.headerCt.insert(dataPointGrid.headerCt.items.items.length - 2, columns);
                                dataPointGrid.getView().refresh();
                            } else {
                                dataPointList = result;
                            }
                            Ext.each(dataPointList, this.addDataPointRecord, this);
                        }
                    },
                    scope: this
                }
            });
        }
        else {

            var treeData = Ext.isEmpty(this.value) ? [
                { text: "数据点组", id: 'dataPointGroup', expanded: true}
            ] : Ext.decode(this.value.split('|')[0]);

            this.treePanel = Ext.create('Ext.tree.Panel', {
                region: 'west',
                title: '数据点组',
                split: true,
                store: Ext.create('Ext.data.TreeStore', {
                    fields: [ 'text', 'expanded', 'attributes', 'color'],
                    root: {
                        expanded: true,
                        children: Ext.clone(treeData)
                    }
                }),
                width: 240,
                rootVisible: false,
                singleExpand: true

            });

            this.mainPanel = Ext.create('Ext.grid.Panel', {
                itemId: 'dataPointGrid',
                title: '数据点列表',
                region: 'center',
                selModel: {
                    selType: 'cellmodel'
                },
                sortableColumns: false,
                plugins: [new Ext.grid.plugin.CellEditing({
                    clicksToEdit: 1
                })],
                store: Ext.create('Ext.data.ArrayStore', {
                    sorters: [
                        {
                            property: 'orderNo',
                            direction: 'ASC'
                        }
                    ],
                    fields: ['dataPointId', 'dataPointTag', 'dataPointName', 'measureUnit', 'color', 'orderNo', 'groupId']
                }),
                columns: [
                    {xtype: 'rownumberer', width: 32 },
                    {text: '数据点标识', flex: 1, minWidth: 240, dataIndex: 'dataPointTag' },
                    {text: '数据点名称', width: 120, dataIndex: 'dataPointName'},
                    {text: '测量单位', width: 65, dataIndex: 'measureUnit'},
                    {text: '颜色', width: 60, dataIndex: 'color', editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
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
                                icon: PageContext.contextPath + '/images/icons/import.png',
                                tooltip: '替换数据点',
                                handler: function (grid, rowIndex, colIndex) {
                                    Ext.create('withub.ext.ea.page.common.DataPoint', {
                                        listeners: {
                                            scope: this,
                                            select: function (data) {
                                                var mainRecord;
                                                me.mainPanel.getStore().each(function (_record) {
                                                    if (_record.get('dataPointId') === data.dataPointId) {
                                                        mainRecord = _record;
                                                        return false;
                                                    }
                                                }, this);
                                                if (mainRecord) {
                                                    me.mainPanel.getSelectionModel().select(mainRecord);
                                                } else {
                                                    me.replaceDataPointRecord(rowIndex, data.dataPointId);
                                                }
                                            }
                                        }
                                    }).show();
                                }
                            }
                        ]
                    },
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
                ],
                tbar: {
                    hidden: !me.enableDataConvert,
                    items: [
                        {
                            text: '添加折算公式',
                            iconCls: 'icon-add',
                            handler: function () {
                                var dataPointGrid = selector.down('#dataPointGrid');
                                var wind = Ext.create('Ext.window.Window', {
                                    title: '添加折算公式',
                                    bodyPadding: 5,
                                    layout: 'fit',
                                    width: 360,
                                    height: 200,
                                    modal: true,
                                    resizable: false,
                                    items: [
                                        {
                                            xtype: 'form',
                                            baseCls: 'x-plain',

                                            defaults: {
                                                labelWidth: 50,
                                                anchor: '98%',
                                                labelAlign: 'right'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    name: 'name',
                                                    fieldLabel: '名称',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    name: 'measureUnits',
                                                    fieldLabel: '单位',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    name: 'formula',
                                                    fieldLabel: '公式',
                                                    allowBlank: false
                                                }
                                            ]
                                        }
                                    ],
                                    buttons: [
                                        {
                                            text: '确定',
                                            handler: function () {
                                                var form = wind.getComponent(0).getForm();
                                                if (!form.isValid()) {
                                                    return;
                                                }
                                                var model = dataPointGrid.getStore().getProxy().getModel();
                                                var name = form.findField('name').getValue();
                                                var measureUnits = form.findField('measureUnits').getValue();
                                                var fieldName = 'CF_' + new Date().getTime();
                                                var formula = form.findField('formula').getValue();
                                                var column = Ext.create('Ext.grid.column.Column', {
                                                    text: name,
                                                    dataIndex: fieldName,
                                                    measureUnits: measureUnits,
                                                    width: 80,
                                                    sortable: false,
                                                    editor: {
                                                        xtype: 'textfield'
                                                    }
                                                });
                                                dataPointGrid.headerCt.insert(dataPointGrid.headerCt.items.items.length - 2, column);
                                                dataPointGrid.getView().refresh();
                                                var fields = [];
                                                Ext.each(model.getFields(), function (field) {
                                                    fields.push(field.name);
                                                });
                                                fields.push(fieldName);
                                                model.setFields(fields);
                                                dataPointGrid.getStore().clearFilter(true);
                                                dataPointGrid.getStore().each(function (record) {
                                                    record.set(fieldName, formula);
                                                    record.commit();
                                                });
                                                wind.close();
                                            }
                                        },
                                        {
                                            text: '取消',
                                            handler: function () {
                                                wind.close();
                                            }
                                        }
                                    ]
                                });
                                wind.show();
                            }
                        }
                    ]
                },
                listeners: {
                    itemcontextmenu: function (view, record, item, index, event, options) {
                        var store = this.getStore();
                        me.createcontextmenu(store, record, index, event);
                    },
                    headercontextmenu: function (ct, column, event) {
                        if (Ext.String.startsWith(column.dataIndex, 'CF_')) {
                            var dataPointGrid = selector.down('#dataPointGrid');
                            var menu = Ext.create('Ext.menu.Menu', {
                                items: [
                                    {
                                        text: '删除折算公式',
                                        iconCls: 'icon-delete',
                                        handler: function () {
                                            dataPointGrid.headerCt.remove(column);
                                            dataPointGrid.getView().refresh();
                                        }
                                    }
                                ]
                            });
                            menu.showAt(event.getXY());
                        }
                        event.preventDefault();
                    }
                }
            });

            this.treePanel.on('itemcontextmenu', function (view, record, item, index, event, options) {
                var store = this.getStore(), items = [], objectId = record.get('objectId');
                var enableGroupColor = me.enableGroupColor;
                items.push(
                    {
                        text: '选择数据点组',
                        iconCls: 'icon-add',
                        hidden: !Ext.isEmpty(me.level) && record.get('depth') > me.level,
                        handler: function () {
                            Ext.create('withub.ext.ea.page.common.DataPointGroup', {
                                enableGroupColor: enableGroupColor,
                                selectGroup: true,
                                listeners: {
                                    scope: this,
                                    create: function (data) {
                                        var dataPointGroupCategoryId = data.dataPointGroupCategoryId;
                                        Ext.Ajax.request({
                                            url: PageContext.contextPath + '/ea/dataPointGroupCategory/getAll/' + dataPointGroupCategoryId,
                                            success: function (response) {
                                                var result = Ext.decode(response.responseText);
                                                var dataPointGroupCategorys = result.dataPointGroupCategorys;
                                                record.appendChild({
                                                    id: dataPointGroupCategorys[0]['objectId'],
                                                    parentId: record.id,
                                                    text: data.dataPointGroupName,
                                                    color: data.dataPointGroupColor,
                                                    expanded: true
                                                });
                                                for (var i = 1; i < dataPointGroupCategorys.length; i++) {
                                                    var parentRecord = this.getStore().getNodeById(dataPointGroupCategorys[i]['parentId']);
                                                    parentRecord.appendChild({
                                                        id: dataPointGroupCategorys[i]['objectId'],
                                                        parentId: dataPointGroupCategorys[i]['parentId'],
                                                        text: dataPointGroupCategorys[i]['name'],
                                                        color: '000000',
                                                        expanded: true
                                                    });
                                                }
                                                var dataPoints = result.dataPoints;
                                                for (var i = 0; i < dataPoints.length; i++) {
                                                    var records = me.mainPanel.getStore().getRange(0, me.mainPanel.getStore().getCount());
                                                    var orderNo = 1;
                                                    if (!Ext.isEmpty(records)) {
                                                        orderNo = me.mainPanel.getStore().getMax(records, 'orderNo') + 1;
                                                    }
                                                    me.addDataPointRecord({
                                                        dataPointId: dataPoints[i]['objectId'],
                                                        color: HighchartsConfig.defalutDataPointColor,
                                                        orderNo: orderNo,
                                                        groupId: dataPoints[i]['categoryId']
                                                    });
                                                }
                                            },
                                            scope: this
                                        });
                                    }
                                }
                            }).show();
                        },
                        scope: this
                    },
                    {
                        text: '添加数据点组',
                        iconCls: 'icon-add',
                        hidden: !Ext.isEmpty(me.level) && record.get('depth') > me.level,
                        handler: function () {
                            Ext.create('withub.ext.ea.page.common.DataPointGroup', {
                                enableGroupColor: enableGroupColor,
                                selectGroup: false,
                                listeners: {
                                    scope: this,
                                    create: function (data) {
                                        record.appendChild({
                                            id: new Ext.data.UuidGenerator().generate(),
                                            parentId: record.id,
                                            text: data.dataPointGroupName,
                                            color: data.dataPointGroupColor,
                                            expanded: true
                                        })
                                    }
                                }
                            }).show();
                        },
                        scope: this
                    },
                    {
                        text: '添加数据点',
                        hidden: record.get('depth') == 1,
                        iconCls: 'icon-add',
                        handler: function () {
                            Ext.create('withub.ext.ea.page.common.DataPoint', {
                                listeners: {
                                    scope: this,
                                    select: function (data) {
                                        var mainRecord;
                                        me.mainPanel.getStore().each(function (_record) {
                                            if (_record.get('dataPointId') === data.dataPointId) {
                                                mainRecord = _record;
                                                return false;
                                            }
                                        }, this);
                                        if (mainRecord) {
                                            me.mainPanel.getSelectionModel().select(mainRecord);
                                        } else {
                                            var records = me.mainPanel.getStore().getRange(0, me.mainPanel.getStore().getCount());
                                            var orderNo = 1;
                                            if (!Ext.isEmpty(records)) {
                                                orderNo = me.mainPanel.getStore().getMax(records, 'orderNo') + 1;
                                            }
                                            me.addDataPointRecord({
                                                dataPointId: data.dataPointId,
                                                color: HighchartsConfig.defalutDataPointColor,
                                                orderNo: orderNo,
                                                groupId: record.data.id
                                            });
                                        }
                                    }
                                }
                            }).show();
                        },
                        scope: this
                    },
                    {
                        text: '编辑组名',
                        iconCls: 'icon-edit',
                        hidden: record.get('depth') == 1,
                        handler: function () {
                            Ext.create('withub.ext.ea.page.common.DataPointGroup', {
                                dataPointGroupName: record.data.text,
                                dataPointGroupColor: record.data.color,
                                enableGroupColor: enableGroupColor,
                                selectGroup: false,
                                listeners: {
                                    scope: this,
                                    create: function (data) {
                                        record.set('text', data.dataPointGroupName);
                                        record.set('color', data.dataPointGroupColor);
                                        record.commit();
                                    }
                                }
                            }).show();
                        },
                        scope: this
                    },
                    {
                        text: '删除',
                        iconCls: 'icon-delete',
                        hidden: record.get('depth') == 1,
                        handler: function () {
                            ExtUtil.Msg.confirm('确认删除?', function (select) {
                                if (select == 'no') {
                                    return;
                                }
                                var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在删除...'});
                                mask.show();
                                var parentNode = record.parentNode;
                                parentNode.removeChild(record);
                                mask.hide();
                            });
                        },
                        scope: this
                    }
                );
                var menu = Ext.create('Ext.menu.Menu', {
                    items: items
                });
                event.preventDefault();
                menu.showAt(event.getXY());
            });

            this.treePanel.on('select', function (tree, record, index) {
                var store = this.mainPanel.getStore();
                store.clearFilter(true);
                store.filter('groupId', record.data.id);
            }, this);

            selector = Ext.create('Ext.window.Window', {
                layout: 'border',
                width: 960,
                height: 480,
                modal: true,
                bodyPadding: 5,
                title: '选择数据点',
                items: [
                    this.treePanel, this.mainPanel
                ],
                buttons: [
                    {
                        text: '确定',
                        handler: function () {
                            var childNodes = me.treePanel.getRootNode().childNodes;
                            var value = Ext.encode(this.parseTree(childNodes)) + '|' + Ext.encode(this.parseGirdStore());
                            if (this.enableDataConvert) {
                                var dataConvertList = [];
                                Ext.each(selector.down('#dataPointGrid').headerCt.items.items, function (item) {
                                    if (Ext.String.startsWith(item.dataIndex, 'CF')) {
                                        dataConvertList.push({
                                            dataIndex: item.dataIndex,
                                            text: item.text,
                                            measureUnits: item.measureUnits
                                        });
                                    }
                                });
                                value += '|' + Ext.encode(dataConvertList)
                            }
                            this.setValue(value);
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
                            var dataPointList = Ext.decode(this.value.split('|')[1]);
                            var dataPointGrid = selector.down('#dataPointGrid');
                            dataPointGrid.getStore().clearFilter(true);
                            dataPointGrid.getStore().filter('groupId', 'dataPointGroup');
                            if (this.enableDataConvert) {
                                var dataConvertList = Ext.decode(this.value.split('|')[2]);
                                var model = dataPointGrid.getStore().getProxy().getModel();
                                var columns = [], fields = model.getFields();
                                Ext.each(dataConvertList, function (item) {
                                    fields.push(item['dataIndex']);
                                    columns.push(Ext.apply({
                                        editor: {xtype: 'textfield'}
                                    }, item));
                                });
                                model.setFields(fields);
                                dataPointGrid.headerCt.insert(dataPointGrid.headerCt.items.items.length - 2, columns);
                                dataPointGrid.getView().refresh();
                            }
                            Ext.each(dataPointList, this.addDataPointRecord, this);
                        }
                    },
                    scope: this
                }
            });
        }

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

    addDataPointRecord: function (dataPoint) {
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/load/' + dataPoint['dataPointId'],
            success: function (response) {
                var result = Ext.decode(response.responseText);
                Ext.apply(dataPoint, {
                    dataPointName: result.data['name'],
                    dataPointTag: result.data['dataPointTag'],
                    measureUnit: result.data['measureUnit']
                });
                this.selector.down('#dataPointGrid').getStore().loadData([dataPoint], true);
            },
            scope: this
        });
    },

    replaceDataPointRecord: function (rowIndex, dataPointId, groupId) {
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/load/' + dataPointId,
            success: function (response) {
                var result = Ext.decode(response.responseText);
                var store = this.selector.down('#dataPointGrid').getStore();
                var record = store.getAt(rowIndex);
                record.set({
                    dataPointId: result.data['objectId'],
                    dataPointTag: result.data['dataPointTag'],
                    dataPointName: result.data['name'],
                    measureUnit: result.data['measureUnit']
                });
                record.commit();
            },
            scope: this
        });
    },

    parseTree: function (treeNodes) {

        var me = this;
        var nodes = [];
        Ext.each(treeNodes, function (treeNode) {

            var node = {
                id: '',
                parentId: '',
                text: '',
                color: '',
                depth: 0,
                expanded: false,
                children: []
            }

            if (treeNode.childNodes.length > 0) {
                node.id = treeNode.data.id;
                node.parentId = treeNode.data.parentId;
                node.text = treeNode.data.text;
                node.color = treeNode.data.color;
                node.depth = treeNode.data.depth;
                node.expanded = treeNode.data.expanded;
                var childNodes = me.parseTree(treeNode.childNodes)
                if (childNodes.length > 0) {
                    node.children = childNodes;
                }
            } else {
                node.id = treeNode.data.id;
                node.parentId = treeNode.data.parentId;
                node.text = treeNode.data.text;
                node.color = treeNode.data.color;
                node.depth = treeNode.data.depth;
                node.expanded = treeNode.data.expanded;
            }
            nodes.push(node)
        });
        return nodes;
    },

    parseGirdStore: function () {
        var data = [];
        this.mainPanel.getStore().clearFilter(true);
        this.mainPanel.getStore().sort('orderNo', 'ASC');
        this.mainPanel.getStore().each(function (record, index) {
            var copy = Ext.clone(record.data);
            delete copy.dataPointTag;
            delete copy.dataPointName;
            delete copy.measureUnit;
            copy['orderNo'] = index + 1
            data.push(copy);
        }, this);
        return data;
    },

    mimicBlur: function (e) {
        if (!this.isDestroyed && !this.bodyEl.contains(e.target) && this.validateBlur(e) && this.selector === undefined) {
            this.triggerBlur(e);
        }
    },

    createcontextmenu: function (store, record, index, event) {

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    xtype: 'menuitem',
                    text: '移到第一个',
                    iconCls: 'icon-arrow-top',
                    handler: function () {
                        if (index == 0) {
                            return
                        }

                        var tempRecord = store.getAt(0);
                        var tempOrderNo = tempRecord.get('orderNo');

                        var orderNo = record.get('orderNo');

                        record.set({
                            orderNo: tempOrderNo
                        })
                        record.commit();

                        for (var i = 0; i < index; i++) {
                            tempRecord = store.getAt(i);
                            if (i + 1 == index) {
                                tempOrderNo = orderNo;
                            } else {
                                tempOrderNo = store.getAt(i + 1).get('orderNo');
                            }
                            tempRecord.set({
                                orderNo: tempOrderNo
                            });
                            tempRecord.commit();
                        }
                        store.sort('orderNo', 'ASC');

                    }
                },
                {
                    xtype: 'menuitem',
                    text: '上移',
                    iconCls: 'icon-arrow-up',
                    handler: function () {
                        if (index == 0) {
                            return
                        }

                        var tempRecord = store.getAt(index - 1);
                        var orderNo = tempRecord.get('orderNo');
                        tempRecord.set({
                            orderNo: record.get('orderNo')
                        });
                        tempRecord.commit();

                        record.set({
                            orderNo: orderNo
                        })
                        record.commit();

                        store.sort('orderNo', 'ASC');
                    }
                },
                {
                    xtype: 'menuitem',
                    text: '下移',
                    iconCls: 'icon-arrow-down',
                    handler: function () {

                        var maxIndex = store.getCount() - 1;

                        if (index == maxIndex) {
                            return
                        }

                        var tempRecord = store.getAt(index + 1);
                        var orderNo = tempRecord.get('orderNo');
                        tempRecord.set({
                            orderNo: record.get('orderNo')
                        });
                        tempRecord.commit();

                        record.set({
                            orderNo: orderNo
                        })
                        record.commit();

                        store.sort('orderNo', 'ASC');
                    }
                },
                {
                    xtype: 'menuitem',
                    text: '移到最后一个',
                    iconCls: 'icon-arrow-bottom',
                    handler: function () {

                        var maxIndex = store.getCount() - 1;

                        if (index == maxIndex) {
                            return
                        }

                        var tempRecord = store.getAt(maxIndex);
                        var tempOrderNo = tempRecord.get('orderNo');

                        var orderNo = record.get('orderNo');

                        record.set({
                            orderNo: tempOrderNo
                        })
                        record.commit();

                        for (var i = index + 1; i <= maxIndex; i++) {
                            tempRecord = store.getAt(i);
                            tempOrderNo = tempRecord.get('orderNo');
                            tempRecord.set({
                                orderNo: orderNo
                            });
                            tempRecord.commit();
                            orderNo = tempOrderNo;
                        }
                        store.sort('orderNo', 'ASC');

                    }
                }
            ]
        });

        event.preventDefault();
        menu.showAt(event.getXY());

    }
});