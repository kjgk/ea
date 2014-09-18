Ext.define('withub.ext.ea.page.PageManager', {
    extend: 'Ext.Viewport',
    layout: 'border',
    closable: true,
    initComponent: function () {

        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            title: '自定义展示图',
            split: true,
            width: 260,
            singleExpand: true,
            margins: '5 0 0 0',
            enableOrderItem: false,
            enableDeleteItem: false,
            baseUrl: '/ea/page'
        });

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '自定义展示图列表',
            enableOrderItem: false,
            enableDeleteItem: false,
            entity: 'Page',
            region: 'center',
            margins: '5 0 0 0',
            baseUrl: '/ea/page',
            fields: ['objectId', 'name', 'parent'],
            treePanel: this.treePanel,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: '名称', minWidth: 320, flex: 1, dataIndex: 'name', sortable: false,
                    renderer: function (value, md, record) {
                        return '<a style="color: #0000FF;" target="_blank" href="' + PageContext.contextPath + '/loadPage/withub.ext.ea.page.PageDesigner?menuId='
                            + record.get('objectId') + '">' + value + '</a>'
                    }
                }
            ]
        });

        this.items = [this.treePanel, this.gridPanel];

        this.treePanel.on('select', function (tree, record, index) {
            var store = this.gridPanel.getStore();
            store.getProxy().extraParams['objectId'] = record.get('objectId');
            store.load();
        }, this);

        this.callParent();
    }
});