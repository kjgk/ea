Ext.define('withub.ext.ea.metasys.Metasys', {
    extend: 'Ext.window.Window',
    width: 300,
    height: 150,
    resizable: false,
    modal: true,
    title: 'Metasys管理',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            border: false,
            bodyStyle: 'padding: 10px 15px',
            layout: 'anchor',
            defaults: {
                labelWidth: 110,
                allowBlank: false,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: 'Metasys Ip',
                    name: 'ip',
                    xtype: 'textfield',
                    margin: '0 0 20 0'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '操作系统位数',
                    columns: 2,
                    items: [
                        {boxLabel: '64位', name: 'bit', inputValue: 1, checked: true},
                        {boxLabel: '32位', name: 'bit', inputValue: 0 }
                    ]
                }
            ]
        });

        this.items = [this.formPanel];

        this.buttons = [
            {
                itemId: "btnExport",
                text: '导出注册表',
                disabled: true,
                iconCls: 'icon-export',
                handler: function () {
                    ExtUtil.exportData({
                        title: '注册表下载',
                        url: '/ea/metasys/export'
                    });
                },
                scope: this
            },
            {
                text: '保存',
                handler: function () {
                    var form = this.formPanel.getForm();
                    if (!form.isValid()) {
                        return;
                    }
                    this.doSave();
                },
                scope: this
            },
            {
                text: '取消',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();

        this.formPanel.getForm().load({
            url: PageContext.contextPath + '/ea/metasys/load',
            method: 'GET',
            success: function (form, action) {
                var result = action.result;
                if (result.hasData) {
                    this.down("#btnExport").enable();
                }
            },
            scope: this
        });


    },

    doSave: function () {

        var form = this.formPanel.getForm();

        Ext.apply(Ext.form.Basic.prototype, {waitMsgTarget: this.getId()});
        form.submit({
            url: PageContext.contextPath + '/ea/metasys/save',
            success: function (form, action) {
                ExtUtil.Msg.info('保存成功！', function () {
                    this.fireEvent('success');
                    this.close();
                }, this);
            },
            failure: function (form, action) {
                ExtUtil.Msg.error(action.result.message);
            },
            method: 'POST',
            timeout: 60 * 1000,
            scope: this,
            waitMsg: PageContext.waitMsg,
            waitTitle: PageContext.msgTitle
        });
    }
})
;

