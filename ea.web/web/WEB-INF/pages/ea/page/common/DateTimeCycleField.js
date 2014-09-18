Ext.define('withub.ext.ea.page.common.DateTimeCycleField', {
    extend: 'Ext.form.field.Trigger',
    editable: false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    fieldLabel: null,
    allowAll: true,

    initComponent: function () {
        this.on('focus', this.onTriggerClick, this)
        this.callParent();
    },

    onTriggerClick: function () {

        var me = this, selector;
        selector = Ext.create('Ext.Window', {
            bodyPadding: 5,
            layout: 'vbox',
            width: 420,
            height: 120,
            modal: true,
            title: '对比周期设置',
            items: [
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {xtype: 'label', text: '对比周期：'},
                        { itemId: 'yearValue', xtype: 'numberfield', width: 50, allowBlank: false, allowDecimals: false, value: 0},
                        {xtype: 'label', text: '年'},
                        { itemId: 'monthValue', xtype: 'numberfield', width: 50, allowBlank: false, allowDecimals: false, value: 0},
                        {xtype: 'label', text: '月'},
                        { itemId: 'weekValue', xtype: 'numberfield', width: 50, allowBlank: false, allowDecimals: false, value: 0},
                        {xtype: 'label', text: '周'},
                        { itemId: 'dayValue', xtype: 'numberfield', width: 50, allowBlank: false, allowDecimals: false, value: 0},
                        {xtype: 'label', text: '日'},
                        { itemId: 'hourValue', xtype: 'numberfield', width: 50, allowBlank: !this.allowAll, allowDecimals: false, value: 0, hidden: !this.allowAll},
                        {xtype: 'label', text: '时', hidden: !this.allowAll}
                    ]
                },
                {
                    xtype: 'tbtext',
                    text: this.allowAll ? "<span style='color:red;padding-left:60px;'>0年 -1月 0周 3日 0时 ： 同年 前1月 同周 后3日 同时</span>" :
                        "<span style='color:red;padding-left:60px;'>0年 -1月  ： 同年 前1月 </span>"
                }
            ],
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        var valueList = [];
                        valueList.push(selector.down('#yearValue').getValue());
                        valueList.push(selector.down('#monthValue').getValue());
                        if (this.allowAll) {
                            valueList.push(selector.down('#weekValue').getValue());
                            valueList.push(selector.down('#dayValue').getValue());
                            valueList.push(selector.down('#hourValue').getValue());
                        }
                        me.setValue(Ext.encode(valueList));
                        selector.close();
                    },
                    scope: this
                },
                {
                    text: '关闭',
                    handler: function () {
                        selector.close();
                    }
                }
            ],
            listeners: {
                afterrender: function () {
                    if (!Ext.isEmpty(this.value)) {
                        var valueList = Ext.decode(this.value);
                        selector.down('#yearValue').setValue(valueList[0]);
                        selector.down('#monthValue').setValue(valueList[1]);
                        if (this.allowAll) {
                            selector.down('#weekValue').setValue(valueList[2]);
                            selector.down('#dayValue').setValue(valueList[3]);
                            selector.down('#hourValue').setValue(valueList[4]);
                        }
                    }
                },
                scope: this
            }
        });

        selector.on('close', function () {
            this.selector = undefined;
            this.triggerBlur();
        }, this);

        selector.show();
        this.selector = selector;
    },

    getValue: function () {
        return this.value;
    },

    mimicBlur: function (e) {
        if (!this.isDestroyed && !this.bodyEl.contains(e.target) && this.validateBlur(e) && this.selector === undefined) {
            this.triggerBlur(e);
        }
    }
});
