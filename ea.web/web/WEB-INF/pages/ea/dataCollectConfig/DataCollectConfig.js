Ext.define('withub.ext.ea.dataCollectConfig.DataCollectConfig', {
    extend: 'withub.ext.common.Window',
    title: '数据采集配置',
    width: 350,
    runtimeFlag: false,
    baseUrl: '/ea/dataCollectConfig',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 10px 7px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'datetimefield',
            defaults: {
                labelWidth: 140,
                anchor: '100%',
                allowBlank: false
            },
            items: [
                {
                    fieldLabel: "数据源",
                    name: 'metasysDatabase.objectId',
                    xtype: 'basecombo',
                    url: '/ea/metasysDatabase/listMetasysDatabase',
                    autoLoad: true,
                    extraParams: {detail: false},
                    emptyText: '请选择数据源'
                },
                {
                    fieldLabel: "表名",
                    name: "tableName",
                    xtype: "textfield",
                    readOnly: this.action == 'update'
                },
                {
                    fieldLabel: '历史数据采集开始时间',
                    name: 'historyDataStartUtcDateTime',
                    hidden: this.runtimeFlag,
                    value: new Date()
                },
                {
                    fieldLabel: '历史数据采集结束时间',
                    name: 'historyDataEndUtcDateTime',
                    hidden: this.runtimeFlag,
                    value: new Date()
                },
                {
                    fieldLabel: '历史数据最后采集时间</br><span style="color: red;">(仅首次同步使用)</span>',
                    name: 'historyDataLastCollectTime',
                    hidden: this.runtimeFlag,
                    value: new Date()
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '是否启用历史数据采集',
                    hidden: this.runtimeFlag,
                    columns: 2,
                    items: [
                        {boxLabel: '是', name: 'enableHistoryDataCollect', inputValue: 1, checked: true},
                        {boxLabel: '否', name: 'enableHistoryDataCollect', inputValue: 0}
                    ]
                },
                {
                    xtype: 'label',
                    text: '注：开关机数据不使用历史采集，注意采集开始时间的设置！',
                    style: 'color: red;',
                    hidden: !this.runtimeFlag
                },
                {
                    fieldLabel: '采集开始时间',
                    name: 'startUtcDateTime',
                    value: new Date()
                },
                {
                    fieldLabel: '最后采集时间</br><span style="color: red;">(仅首次同步使用)</span>',
                    name: 'lastCollectTime',
                    value: new Date()
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '是否启用数据采集',
                    columns: 2,
                    items: [
                        {boxLabel: '是', name: 'enableCollect', inputValue: 1, checked: true},
                        {boxLabel: '否', name: 'enableCollect', inputValue: 0}
                    ]
                },
                {
                    xtype: 'hidden',
                    name: 'objectId'
                }
            ]
        });

        this.items = [this.formPanel];
        this.callParent();
    }
});