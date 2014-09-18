Ext.define('withub.ext.ea.dataPointGroup.DataPointGroupManager', {
    extend: 'Ext.Viewport',
    layout: 'border',
    closable: true,
    requires: ['withub.ext.ea.dataPointGroup.DataPointGroupModel'],

    initComponent: function () {
        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            title: '数据点管理',
            split: true,
            width: 360,
            singleExpand: true,
            margins: '5 0 5 5',
            enableOrderItem: true,
            enableDeleteItem: true,
            baseUrl: '/ea/dataPointGroupCategory'
        });

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '数据点列表',
            enableOrderItem: true,
            enableDeleteItem: true,
            entity: 'DataPointGroup',
            baseUrl: '/ea/dataPointGroup',
            region: 'center',
            margins: '5 5 5 0',
            model: 'withub.ext.ea.dataPointGroup.DataPointGroupModel',
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: '数据点', flex: 1, dataIndex: 'dataPointName', sortable: false}
            ],
            selModel: {
                mode: 'MULTI'
            }
        });

        this.items = [this.treePanel, this.gridPanel];

        this.treePanel.on('select', function (tree, record, index) {
            var store = this.gridPanel.getStore();
            store.getProxy().extraParams['id'] = record.get('objectId');
            store.load();
        }, this);

        this.treePanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push(
                {
                    text: '添加数据点',
                    iconCls: 'icon-add',
                    hidden: record.get('depth') == 1,
                    handler: function () {
                        Ext.create('withub.ext.ea.dataPointGroup.DataPointMultiGroup', {
//                            action: 'create',
                            dataPointGroupCategoryId: objectId,
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
                    text: '添加分类',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.dataPointGroup.DataPointGroupCategory', {
                            action: 'create',
                            parentId: objectId,
                            listeners: {
                                success: function () {
                                    var nodeId = record.get('id');
                                    if (record.get('leaf')) {
                                        nodeId = record.get('parentId');
                                    }
                                    store.load({
                                        node: store.getNodeById(nodeId)
                                    });
                                },
                                scope: this
                            }
                        }).show();
                    }
                },
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    hidden: record.get('depth') == 1,
                    handler: function () {
                        Ext.create('withub.ext.ea.dataPointGroup.DataPointGroupCategory', {
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
                }
            );
        }, this);

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            var dataPointGroupCategoryId = record.get('dataPointGroupCategoryId');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.dataPointGroup.DataPointGroup', {
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

        this.callParent();
    }
});