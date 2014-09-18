Ext.define('withub.ext.ea.reportExport.ReportExportLogList', {
    extend: 'Ext.Viewport',
    closable: true,
    layout: 'fit',
    requires: ['withub.ext.ea.reportExport.ReportExportLogModel'],

    initComponent: function () {

        var me = this;

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.reportExport.ReportExportLogModel',
            baseUrl: '/ea/reportExportLog',
            enablePagginBar: true,
            enableDeleteItem: true,
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '报表名称', minWidth: 200, flex: 1, dataIndex: 'name', renderer: function (value, p, record) {
                    return Ext.String.format(
                        '<a target="_blank" href="{0}">{1}</a>',
                        PageContext.contextPath + '/ea/reportExport/download/' + record.get('objectId'), value
                    );
                }},
                {text: '任务名称', width: 160, dataIndex: 'scheduleName'},
                {text: '导出时间', width: 120, dataIndex: 'exportTime', displayType: DisplayType.DateMinute}
            ],
            selModel: {
                mode: 'MULTI'
            },
            tbar: [
                '导出时间：',
                {
                    itemId: 'date',
                    range: '-1m',
                    xtype: 'daterange'
                },
                {
                    xtype: 'button',
                    text: '搜索',
                    iconCls: 'icon-query',
                    handler: this.queryReportExportLog,
                    scope: this
                }
            ]

        });

        this.items = this.gridPanel;

        this.callParent();
        this.queryReportExportLog();
    },

    queryReportExportLog: function () {

        var date = this.gridPanel.down('#date');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            beginDate: date.getBeginDate(),
            endDate: date.getEndDate(),
            flag: 1
        });
        this.gridPanel.getStore().loadPage(1);
    }
});