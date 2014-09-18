Ext.define('withub.ext.ea.bigScreenScrollPage.BigScreenScrollPageList', {
    extend: 'Ext.Window',
    closable: true,
    width: 560,
    resizable: false,
    modal: true,
    title: '大屏幕滚动页面管理',
    initComponent: function () {

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            fields: ['objectId', 'menuName', 'displayMinutes', 'orderNo'],
            height: 370,
            entity: 'BigScreenScrollPage',
            baseUrl: '/ea/bigScreenScrollPage',
//            enablePagginBar: true,
            enableDeleteItem: true,
            enableOrderItem: true,
            autoQuery: true,
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '页面菜单名称', flex: 1, minWidth: 200, dataIndex: 'menuName'},
                {text: '展示时间(分钟)', width: 90, dataIndex: 'displayMinutes', align: 'right'}
            ],
            tbar: [
                {
                    text: '新增',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.bigScreenScrollPage.BigScreenScrollPage', {
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
                        Ext.create('withub.ext.ea.bigScreenScrollPage.BigScreenScrollPage', {
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
    }
});