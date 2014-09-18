Ext.define('withub.ext.system.menu.MenuManager', {
    extend: 'Ext.Viewport',
    layout: 'border',
    closable: true,
    requires: ['withub.ext.system.menu.MenuModel'],
    initComponent: function () {

        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            title: '菜单',
            split: true,
            width: 200,
            singleExpand: true,
            margins: '5 0 0 0',
            enableOrderItem: true,
            enableDeleteItem: true,
            baseUrl: '/system/menu',
            extraParams: {
                menuType: this.menuType == 1 ? 1 : 2
            }
        });

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '菜单列表',
            enableOrderItem: true,
            enableDeleteItem: true,
            entity: 'Menu',
            baseUrl: '/system/menu',
            region: 'center',
            margins: '5 0 0 0',
            model: 'withub.ext.system.menu.MenuModel',
            selModel: {
                mode: 'MULTI'
            },
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '菜单名称', width: 210, dataIndex: 'name', sortable: false},
                {text: 'URL', flex: 1, dataIndex: 'url', sortable: false}
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
            var url = (record.get('attributes')['url'] == 'ROOT' && record.get('text') == '大屏设置') ? 'BigScreen' : record.get('attributes')['url'];
            items.push(
                {
                    text: '添加',
                    iconCls: 'icon-add',
                    hidden: record.get('depth') > 2 && url == 'BigScreen',
                    handler: function () {
                        Ext.create('withub.ext.system.menu.Menu', {
                            action: 'create',
                            parentId: objectId,
                            menuType: this.menuType == 1 ? 1 : 2,
                            menuUrl: url,
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
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    hidden: record.get('depth') == 1 || (record.get('depth') == 2 && record.get('text') == '大屏设置'),
                    handler: function () {
                        Ext.create('withub.ext.system.menu.Menu', {
                            action: 'update',
                            objectId: objectId,
                            menuType: this.menuType == 1 ? 1 : 2,
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
            items.push(
                {
                    text: '重置排序号',
                    iconCls: 'icon-user',
                    hidden: record.get('depth') != 1,
                    handler: function () {
                        var me = this;
                        ExtUtil.Msg.confirm('确认重置排序号吗?', function (select) {
                            if (select == 'no') {
                                return;
                            }
                            var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在重置排序号...'});
                            mask.show();
                            Ext.Ajax.request({
                                method: 'POST',
                                url: PageContext.contextPath + "/system/menu/resetMenuOrderNo",
                                success: function (response) {
                                    mask.hide();
                                    var result = Ext.decode(response.responseText);
                                    if (result.success) {
                                        ExtUtil.Msg.info("排序号完成重置!");
                                    } else {
                                        ExtUtil.Msg.error(result.message);
                                    }
                                },
                                failure: function (response) {
                                    mask.hide();
                                    ExtUtil.Msg.error(response.responseText);
                                }
                            });
                        });
                    },
                    scope: this
                });
            items.push(
                {
                    text: url == 'BigScreen' ? '设置为大屏首页' : '设置为首页',
                    iconCls: 'icon-edit',
                    hidden: (record.get('depth') != 3 && record.get('depth') != 2 ) || (record.get('depth') == 2 && record.get('text') == '大屏设置'),
                    handler: function () {
                        var me = this;
                        ExtUtil.Msg.confirm('确认设置为首页?', function (select) {
                            if (select == 'no') {
                                return;
                            }
                            var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在设置...'});
                            mask.show();
                            Ext.Ajax.request({
                                method: 'GET',
                                url: PageContext.contextPath + "/system/menu/setHomePage/" + objectId,
                                success: function (response) {
                                    mask.hide();
                                    var result = Ext.decode(response.responseText);
                                    if (result.success) {
                                        ExtUtil.Msg.info("设置成功!");
                                    } else {
                                        ExtUtil.Msg.error(result.message);
                                    }
                                },
                                failure: function (response) {
                                    mask.hide();
                                    ExtUtil.Msg.error(response.responseText);
                                }
                            });
                        });
                    },
                    scope: this
                });
            if (record.get('text') == '大屏设置') {
                items.push(
                    {
                        text: '设置滚动页面',
                        iconCls: 'icon-edit',
                        handler: function () {
                            Ext.create('withub.ext.ea.bigScreenScrollPage.BigScreenScrollPageList').show();
                        },
                        scope: this
                    }
                );
            }
        }, this);

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push({
                text: '编辑',
                iconCls: 'icon-edit',
                handler: function () {
                    Ext.create('withub.ext.system.menu.Menu', {
                        action: 'update',
                        objectId: objectId,
                        menuType: this.menuType == 1 ? 1 : 2,
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
})
;