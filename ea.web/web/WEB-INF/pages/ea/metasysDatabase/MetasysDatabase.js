Ext.define('withub.ext.ea.metasysDatabase.MetasysDatabase', {
    extend: 'withub.ext.common.Window',
    title: '数据源配置',
    width: 480,
    runtimeFlag: false,
    baseUrl: '/ea/metasysDatabase',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 10px 7px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 80,
                anchor: '100%',
                allowBlank: false
            },
            items: [
                {
                    fieldLabel: "名称",
                    name: "name"
                },
                {
                    name: 'databaseTag',
                    fieldLabel: "数据库标识",
                    readOnly: this.action == 'update'
                },
                {
                    name: 'hostIp',
                    fieldLabel: "服务器"
                },
                {
                    name: 'port',
                    xtype: 'numberfield',
                    min: 1,
                    max: 65535,
                    fieldLabel: "端口"
                },
                {
                    name: 'instanceName',
                    allowBlank: true,
                    fieldLabel: "实例名"
                },
                {
                    name: 'databaseName',
                    fieldLabel: "数据库"
                },
                {
                    name: 'userName',
                    fieldLabel: "用户名"
                },
                {
                    name: 'password',
                    inputType: 'password',
                    fieldLabel: "密码"
                },
                {
                    name: 'timeNode',
                    hidden: true,
                    xtype: 'textarea',
                    height: 100,
                    allowBlank: true,
                    fieldLabel: "时间节点"
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