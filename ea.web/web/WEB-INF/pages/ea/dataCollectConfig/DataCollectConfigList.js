Ext.define('withub.ext.ea.dataCollectConfig.DataCollectConfigList', {
    extend: 'Ext.Viewport',
    closable: true,
    requires: ['withub.ext.ea.dataCollectConfig.DataCollectConfigModel'],
    layout: 'fit',
    initComponent: function () {

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.dataCollectConfig.DataCollectConfigModel',
            baseUrl: '/ea/dataCollectConfig',
            enablePagginBar: true,
            enableDeleteItem: false,
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '数据源', width: 160, dataIndex: 'databaseTag'},
                {text: '表名', width: 160, dataIndex: 'tableName'},
                {text: '历史数据采集开始时间', width: 150, dataIndex: 'historyDataStartUtcDateTime', displayType: DisplayType.DateMinute},
                {text: '历史数据采集结束时间', width: 150, dataIndex: 'historyDataEndUtcDateTime', displayType: DisplayType.DateMinute},
                {text: '历史数据最后采集时间', width: 150, dataIndex: 'historyDataLastCollectTime', displayType: DisplayType.DateMinute},
                {text: '是否启用历史数据采集', width: 150, dataIndex: 'enableHistoryDataCollect', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '是'
                    } else if (value == 0) {
                        return '否'
                    }
                }},
                {text: '采集开始时间', width: 130, dataIndex: 'startUtcDateTime', displayType: DisplayType.DateMinute},
                {text: '最后采集时间', width: 130, dataIndex: 'lastCollectTime', displayType: DisplayType.DateMinute},
                {text: '是否启用数据采集', width: 140, dataIndex: 'enableCollect', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '是'
                    } else if (value == 0) {
                        return '否'
                    }
                }}
            ],
            selModel: {
                mode: 'MULTI'
            },
            tbar: [
                '表名',
                {
                    itemId: 'tableName',
                    xtype: 'textfield',
                    width: 180
                },
                {
                    xtype: 'button',
                    text: '搜索',
                    iconCls: 'icon-query',
                    handler: this.queryDataCollectConfig,
                    scope: this
                },
                '-',
                {
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.dataCollectConfig.DataCollectConfig', {
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
                    text: '清空数据',
                    iconCls: 'icon-trash',
                    handler: function () {
                        var me = this;
                        ExtUtil.Msg.confirm('确认清空数据？', function (sel) {
                            if (sel == 'yes') {
                                me.gridPanel.getEl().mask('正在清空数据，请稍候...');
                                Ext.Ajax.request({
                                    url: PageContext.contextPath + '/ea/dataPoint/deleteTableData',
                                    method: 'POST',
                                    success: function (response) {
                                        me.gridPanel.getEl().unmask();
                                        var result = Ext.decode(response.responseText);
                                        if (result.success) {
                                            ExtUtil.Msg.info('数据清空成功!');
                                        } else {
                                            ExtUtil.Msg.error(result.message);
                                        }
                                    }
                                });
                            }
                        })
                    },
                    scope: this
                }

            ]
        });

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            var runtimeFlag = (record.get('tableName').toLowerCase() == 'tblactualvaluedigital');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.dataCollectConfig.DataCollectConfig', {
                            action: 'update',
                            objectId: objectId,
                            runtimeFlag: runtimeFlag,
                            listeners: {
                                success: function () {
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
        this.queryDataCollectConfig();
    },

    queryDataCollectConfig: function () {
        var tableName = this.gridPanel.down('#tableName');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            tableName: tableName.getValue()
        });
        this.gridPanel.getStore().loadPage(1);
    }

});