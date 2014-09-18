Ext.define('withub.ext.ea.widget.WidgetManager', {
    extend: 'Ext.Viewport',
    layout: 'border',
    closable: true,
    requires: ['withub.ext.ea.widget.WidgetModel'],
    initComponent: function () {

        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            title: '组件分类',
            split: true,
            width: 200,
            singleExpand: true,
            margins: '5 0 0 0',
            enableOrderItem: true,
            enableDeleteItem: true,
            baseUrl: '/ea/widgetCategory'
        });

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '组件列表',
            enableOrderItem: true,
            enableDeleteItem: true,
            entity: 'Widget',
            baseUrl: '/ea/widget',
            region: 'center',
            margins: '5 0 0 0',
            model: 'withub.ext.ea.widget.WidgetModel',
            selModel: {
                mode: 'MULTI'
            },
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '名称', width: 160, dataIndex: 'name', sortable: false},
                {text: '授权', width: 80, dataIndex: 'license', align: 'center', sortable: false, renderer: function (value, record) {
                    if (Ext.isEmpty(value)) {
                        return '否'
                    } else {
                        return '是'
                    }
                }},
                {text: '标识', width: 360, dataIndex: 'widgetTag', sortable: false}
            ]
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
                    text: '添加分类',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.widget.WidgetCategory', {
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
                }
            );
            items.push(
                {
                    text: '添加组件',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.widget.Widget', {
                            action: 'create',
                            widgetCategoryId: objectId,
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
                }
            );
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    hidden: record.get('depth') == 1,
                    handler: function () {
                        Ext.create('withub.ext.ea.widget.WidgetCategory', {
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
        }, this);

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            var license = record.get('license');
//            if (Ext.isEmpty(license)) {
//                items.push({
//                    text: '授权',
//                    iconCls: 'icon-edit',
//                    handler: function () {
//                        ExtUtil.Msg.confirm('确认授权?', function (select) {
//                            if (select === 'no') {
//                                return;
//                            }
//                            Ext.Ajax.request({
//                                method: 'GET',
//                                url: PageContext.contextPath + '/ea/widget/authorize',
//                                params: {
//                                    objectId: objectId
//                                },
//                                success: function () {
//                                    store.load();
//                                }
//                            })
//                        });
//                    },
//                    scope: this
//                });
//            } else {
//                items.push({
//                    text: '取消授权',
//                    iconCls: 'icon-edit',
//                    handler: function () {
//                        ExtUtil.Msg.confirm('确认取消授权?', function (select) {
//                            if (select === 'no') {
//                                return;
//                            }
//                            Ext.Ajax.request({
//                                method: 'GET',
//                                url: PageContext.contextPath + '/ea/widget/deauthorize',
//                                params: {
//                                    objectId: objectId
//                                },
//                                success: function () {
//                                    store.load();
//                                }
//                            })
//                        });
//                    },
//                    scope: this
//                });
//            }
            items.push({
                text: '编辑',
                iconCls: 'icon-edit',
                handler: function () {
                    Ext.create('withub.ext.ea.widget.Widget', {
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
            });
        }, this);

        this.callParent();
    }
});