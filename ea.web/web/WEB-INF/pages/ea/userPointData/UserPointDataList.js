Ext.define('withub.ext.ea.userPointData.UserPointDataList', {
    extend: 'Ext.Viewport',
    closable: true,
    layout: 'fit',
    requires: ['withub.ext.ea.userPointData.UserPointDataModel', 'withub.ext.ea.dataPoint.DataPointField'],

    initComponent: function () {

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.userPointData.UserPointDataModel',
            baseUrl: '/ea/userPointData',
            enablePagginBar: true,
            enableDeleteItem: false,
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '数据点名称', flex: 1, minWidth: 240, dataIndex: 'dataPointName'},
                {text: '数据值', width: 80, dataIndex: 'actualValue', align: 'right'},
                {text: '数据点类型', width: 80, dataIndex: 'source', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '系统'
                    } else if (value == 2) {
                        return '自定义'
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
                {text: '数据时间', width: 160, dataIndex: 'utcDateTime', displayType: DisplayType.DateMinute}
            ],
            tbar: [
                '开始时间',
                {
                    itemId: 'startTime',
                    xtype: 'datetimefield',
                    allowBlank: false,
                    width: 130,
                    value: Ext.Date.clearTime(new Date())
                },
                '结束时间',
                {
                    itemId: 'endTime',
                    xtype: 'datetimefield',
                    width: 130,
                    value: Ext.Date.clearTime(new Date())
                },
                '数据点',
                {
                    xtype: 'datapointfield',
                    itemId: 'dataPoints',
                    anchor: '100%',
                    width: 420,
                    treeWidth: 420,
                    fieldLabel: null,
                    enableCheck: true
                },
                {
                    xtype: 'button',
                    text: '搜索',
                    iconCls: 'icon-query',
                    handler: this.queryUserPointData,
                    scope: this
                },
                '-',
                {
                    xtype: 'button',
                    text: '导入',
                    iconCls: 'icon-edit',
                    menu: [
                        {
                            text: '单点导入',
                            iconCls: 'icon-edit',
                            handler: function () {
                                Ext.create('withub.ext.ea.userPointData.UserPointDataImport', {
                                    single: true,
                                    listeners: {
                                        success: function () {
                                            this.gridPanel.getStore().load();
                                        },
                                        scope: this
                                    }
                                }).show();
                            },
                            scope: this
                        },
                        {
                            text: '多点导入',
                            iconCls: 'icon-edit',
                            handler: function () {
                                Ext.create('withub.ext.ea.userPointData.UserPointDataImport', {
                                    single: false,
                                    listeners: {
                                        success: function () {
                                            this.gridPanel.getStore().load();
                                        },
                                        scope: this
                                    }
                                }).show();
                            },
                            scope: this
                        }
                    ]
                },
                '-',
                {
                    xtype: 'button',
                    text: '自定义数据点管理',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.userPointData.UserDataPointManager', {
                            listeners: {
                                success: function () {
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

//        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
//            var objectId = record.get('objectId');
//            items.push(
//                {
//                    text: '编辑',
//                    iconCls: 'icon-edit',
//                    handler: function () {
//                        Ext.create('withub.ext.ea.userPointData.UserPointData', {
//                            action: 'update',
//                            objectId: objectId,
//                            listeners: {
//                                success: function () {
//                                    this.gridPanel.getStore().load();
//                                },
//                                scope: this
//                            }
//                        }).show();
//                    },
//                    scope: this
//                }
//            );
//
//        }, this);

        this.items = this.gridPanel;

        this.callParent();

    },

    queryUserPointData: function () {
        var startTime = this.gridPanel.down('#startTime');
        var endTime = this.gridPanel.down('#endTime');
        var dataPoints = this.gridPanel.down('#dataPoints');

        var dataPointArray = [];
        Ext.each(dataPoints.getPicker().getChecked(), function (node) {
            dataPointArray.push(node.data.objectId);
        });
        if (Ext.isEmpty(dataPointArray)) {
            ExtUtil.Msg.info("请选择数据点！");
            return;
        }
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            startTime: Ext.Date.format(startTime.getValue(), 'Y-m-d H:i'),
            endTime: Ext.Date.format(endTime.getValue(), 'Y-m-d H:i'),
            dataPoints: dataPointArray.join('|')
        });
        this.gridPanel.getStore().loadPage(1);
    }

});