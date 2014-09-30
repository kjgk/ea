Ext.define('withub.ext.ea.reportWedget.ReportWidgetList', {
    extend: 'Ext.Viewport',
    closable: true,
    layout: 'fit',
    requires: ['withub.ext.ea.reportExport.ReportWidgetModel'],

    initComponent: function () {

        var me = this;

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.reportExport.ReportWidgetModel',
            baseUrl: '/ea/reportWidget',
            enablePagginBar: true,
            enableDeleteItem: true,
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '任务计划名称', minWidth: 250, flex: 1, dataIndex: 'name'}
            ],
            selModel: {
                mode: 'MULTI'
            },
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
                    handler: this.queryReportWidget,
                    scope: this
                },
                {
                    text: '添加',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.reportExport.ReportWidget', {
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
                        Ext.create('withub.ext.ea.reportExport.ReportWidget', {
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

        this.items = this.gridPanel;

        this.callParent();
        this.queryReportWidget();
    },

    queryReportWidget: function () {
        var name = this.gridPanel.down('#name');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            name: name.getValue()
        });
        this.gridPanel.getStore().loadPage(1);
    }
});