Ext.define('withub.ext.ea.reportPage.ReportPage', {
    extend: 'withub.ext.common.Window',
    title: '报告组件',
    width: 600,
    modal: true,
    resizable: false,
    bodyPadding: 10,
    baseUrl: "/ea/reportPage",
    layout: 'fit',
    initComponent: function () {

        // this.height = ExtUtil.getFitHeight();  //可以根据浏览器的大小改变高度ExtUtil.getFitHeight(int maxSize) 默认为600

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 95,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    name: 'objectId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.callParent();

        this.on('load', function (form, action) {
            var result = action.result;
        });

    }
});

