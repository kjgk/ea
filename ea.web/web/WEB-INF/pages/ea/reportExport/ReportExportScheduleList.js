Ext.define('withub.ext.ea.reportExport.ReportExportScheduleList', {
    extend: 'Ext.Viewport',
    closable: true,
    layout: 'fit',
    requires: ['withub.ext.ea.reportExport.ReportExportScheduleModel'],

    initComponent: function () {

        var me = this;

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.reportExport.ReportExportScheduleModel',
            baseUrl: '/ea/reportExportSchedule',
            enablePagginBar: true,
            enableDeleteItem: true,
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '任务计划名称', minWidth: 250, flex: 1, dataIndex: 'name'},
                {text: '报表名称模板', minWidth: 110, flex: 1, dataIndex: 'rePortNameTemplate'},
                {text: '数据点组', minWidth: 160, flex: 1, dataIndex: 'dataPointGroupCategory'},
                {text: '周期', width: 80, dataIndex: 'reCurrenceTimeUnit', renderer: function (value, md, record) {
                    return record.get('reCurrenceValue') + ' ' + {Hour: "小时", Day: "天", Week: "星期", Month: "月", Year: "年" }[value];
                }},
                {text: '开始日期', width: 90, dataIndex: 'startDate', displayType: DisplayType.DateDay},
                {text: '循环执行时间', width: 100, dataIndex: 'reCurringTime', displayType: DisplayType.DateMinute},
                {text: '下次执行时间', width: 120, align: 'center', dataIndex: 'nextTime', displayType: DisplayType.DateMinute}
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
                    handler: this.queryReportExportSchedule,
                    scope: this
                },
                {
                    text: '添加',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.reportExport.ReportExportSchedule', {
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
                        Ext.create('withub.ext.ea.reportExport.ReportExportSchedule', {
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
        this.queryReportExportSchedule();
    },

    queryReportExportSchedule: function () {
        var name = this.gridPanel.down('#name');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            name: name.getValue()
        });
        this.gridPanel.getStore().loadPage(1);
    }
});