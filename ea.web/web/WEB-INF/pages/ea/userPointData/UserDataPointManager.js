Ext.define('withub.ext.ea.userPointData.UserDataPointManager', {
    extend: 'Ext.Window',
    closable: true,
    width: 840,
    resizable: false,
    modal: true,
    title: '自定义数据点管理',
    height: 400,
    requires: ['withub.ext.ea.dataPoint.DataPointModel'],
    initComponent: function () {

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.dataPoint.DataPointModel',
            height: 370,
            baseUrl: '/ea/userDataPoint',
//            enablePagginBar: true,
            enableDeleteItem: true,
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '数据点ID', width: 80, dataIndex: 'dataPointId', align: 'center'},
                {text: '数据点SliceID', width: 80, dataIndex: 'dataPointSliceId', align: 'center'},
                {text: '数据点名称', width: 160, dataIndex: 'name'},
                {text: '数据点标识', flex: 1, minWidth: 240, dataIndex: 'dataPointTag' },
                {text: '数据点类型', width: 80, dataIndex: 'pointDataType', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '模拟'
                    } else if (value == 2) {
                        return '布尔'
                    } else {
                        return '未知'
                    }
                }},
                {text: '数据点值类型', width: 80, dataIndex: 'pointDataValueType', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '区间值'
                    } else if (value == 2) {
                        return '累计值'
                    } else {
                        return '未知'
                    }
                }},
                {text: '测量单位', width: 100, dataIndex: 'measureUnit'}
            ],
            tbar: [
                '数据点名称',
                {
                    itemId: 'name',
                    xtype: 'textfield',
                    width: 180
                },
                {
                    xtype: 'button',
                    text: '搜索',
                    iconCls: 'icon-query',
                    handler: this.queryDataPoint,
                    scope: this
                },
                {
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.userPointData.UserDataPoint', {
                            listeners: {
                                success: function () {
                                    this.fireEvent('success');
                                    this.gridPanel.getStore().load();

                                },
                                scope: this
                            }
                        }).show();
                    },
                    scope: this
                }
            ]
        });

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');

            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.userPointData.UserDataPoint', {
                            action: 'update',
                            objectId: objectId,
                            listeners: {
                                success: function () {
                                    this.fireEvent('success');
                                    store.load();
                                },
                                scope: this
                            }
                        }).show();
                    },
                    scope: this
                }
            );
        }, this);

        this.items = this.gridPanel;

        this.callParent();

        this.queryDataPoint();
    },

    queryDataPoint: function () {
        var name = this.gridPanel.down('#name');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            name: name.getValue()
        });
        this.gridPanel.getStore().loadPage(1);
    }

});