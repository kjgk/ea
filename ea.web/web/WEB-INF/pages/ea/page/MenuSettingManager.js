Ext.define('withub.ext.ea.customPage.MenuSettingManager', {
    extend: 'Ext.Viewport',
    layout: 'border',
    closable: true,
    initComponent: function () {

        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            title: '菜单及选项卡设置',
            split: true,
            width: 260,
            singleExpand: true,
            margins: '5 0 0 0',
            enableOrderItem: true,
            enableDeleteItem: true,
            baseUrl: '/ea/customPage'
        });

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '菜单及选项卡列表',
            enableOrderItem: true,
            enableDeleteItem: true,
            entity: 'Page',
            region: 'center',
            margins: '5 0 0 0',
            baseUrl: '/ea/customPage',
            fields: ['objectId', 'name', 'parent'],
            treePanel: this.treePanel,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: '名称', minWidth: 320, flex: 1, dataIndex: 'name', sortable: false}
            ]
        });

        this.items = [this.treePanel, this.gridPanel];

        this.treePanel.on('select', function (tree, record, index) {
            var store = this.gridPanel.getStore();
            store.getProxy().extraParams['objectId'] = record.get('objectId');
            store.load();
        }, this);

        this.treePanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push({
                text: '添加',
                iconCls: 'icon-add',
                handler: function () {
                    Ext.create('withub.ext.ea.customPage.Page', {
                        action: 'create',
                        parentId: objectId,
                        listeners: {
                            success: function () {
                                if (record.get('leaf')) {
                                    store.load({
                                        node: store.getNodeById(record.get('parentId'))
                                    });
                                } else {
                                    store.load({
                                        node: record
                                    });
                                }
                                this.gridPanel.getStore().load();
                            },
                            scope: this
                        }
                    }).show();
                },
                scope: this
            });
            items.push({
                text: '编辑',
                hidden: record.get('depth') == 1,
                iconCls: 'icon-edit',
                handler: function () {
                    Ext.create('withub.ext.ea.customPage.Page', {
                        action: 'update',
                        objectId: objectId,
                        listeners: {
                            success: function () {
                                store.load({
                                    node: store.getNodeById(record.get('parentId'))
                                });
                            },
                            scope: this
                        }
                    }).show();
                },
                scope: this
            });
            items.push({
                text: '激活/取消激活',
                hidden: record.get('depth') == 1,
                iconCls: 'icon-edit',
                handler: function () {
                    //Todo
                },
                scope: this
            });
        }, this);

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            var name = record.get('name');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.customPage.Page', {
                            action: 'update',
                            objectId: objectId,
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
            );
        }, this);

        this.callParent();
    }
});