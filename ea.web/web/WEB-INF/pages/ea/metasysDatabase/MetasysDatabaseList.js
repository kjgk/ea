Ext.define('withub.ext.ea.metasysDatabase.MetasysDatabaseList', {
    extend: 'Ext.Viewport',
    closable: true,
    requires: ['withub.ext.ea.metasysDatabase.MetasysDatabaseModel'],
    layout: 'fit',
    initComponent: function () {

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.metasysDatabase.MetasysDatabaseModel',
            baseUrl: '/ea/metasysDatabase',
            enablePagginBar: true,
            enableDeleteItem: true,
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '名称', width: 200, dataIndex: 'name'},
                {text: '数据库标识', flex: 1, minWidth: 200, dataIndex: 'databaseTag'},
                {text: '服务器IP', width: 160, dataIndex: 'hostIp'},
                {text: '端口', width: 100, dataIndex: 'port'},
                {text: '实例名', width: 200, dataIndex: 'instanceName'},
                {text: '数据库', width: 200, dataIndex: 'databaseName'},
                {text: '用户名', width: 160, dataIndex: 'userName'}
//                {text: '密码', width: 100, dataIndex: 'password'},
//                {text: '时间节点', width: 300, dataIndex: 'timeNode'}
            ],
            tbar: [
                '名称',
                {
                    itemId: 'name',
                    xtype: 'textfield',
                    width: 180
                },
                {
                    xtype: 'button',
                    text: '搜索',
                    iconCls: 'icon-query',
                    handler: this.queryMetasysDatabase,
                    scope: this
                },
                '-',
                {
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.metasysDatabase.MetasysDatabase', {
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

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.metasysDatabase.MetasysDatabase', {
                            action: 'update',
                            objectId: objectId,
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
        this.queryMetasysDatabase();
    },

    queryMetasysDatabase: function () {
        var name = this.gridPanel.down('#name');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            name: name.getValue()
        });
        this.gridPanel.getStore().loadPage(1);
    }

});