Ext.define('withub.ext.ea.electricityPrice.ElectricityPriceTimeSegmentDetail', {
    extend: 'Ext.Window',
    width: 480,
    resizable: false,
    modal: true,
    title: '分时电价',
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 70,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength: 30,
                    allowBlank: false
                },
                {
                    fieldLabel: '标识',
                    name: 'tag',
                    readOnly: this.action == 'update',
                    maxLength: 30
                },
                {
                    fieldLabel: '排序号',
                    name: 'orderNo',
                    xtype: 'numberfield',
                    allowDecimals: false,
                    anchor: '100%',
                    maxValue: 99,
                    minValue: 1,
                    allowBlank: false
                },
                {
                    xtype: 'hidden',
                    name: 'objectId'
                }
            ]
        });

        this.items = [this.formPanel];

        this.buttons = [
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

        if (!Ext.isEmpty(this.objectId)) {
            this.formPanel.getForm().load({
                url: PageContext.contextPath + '/ea/electricityPriceTimeSegment/load/' + this.objectId,
                method: 'GET',
                success: function (form, action) {
                },
                scope: this
            });
        }
    },

    doSave: function () {

        var params = this.formPanel.getForm().getValues();

        var url;
        if (this.objectId) {
            url = PageContext.contextPath + '/ea/electricityPriceTimeSegment/update';
        } else {
            url = PageContext.contextPath + '/ea/electricityPriceTimeSegment/save';
        }


        Ext.Ajax.request({
            url: url,
            params: params,
            method: 'POST',
            success: function (form, action) {
                ExtUtil.Msg.info('保存成功！', function () {
                    this.fireEvent('success');
                    this.close();
                }, this);
            },
            failure: function (form, action) {
                ExtUtil.Msg.error(action.result.message);
            },
            timeout: 60 * 1000,
            scope: this,
            waitMsg: PageContext.waitMsg,
            waitTitle: PageContext.msgTitle
        });
    }
});