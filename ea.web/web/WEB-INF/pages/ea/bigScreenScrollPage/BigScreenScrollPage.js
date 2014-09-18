Ext.define('withub.ext.ea.bigScreenScrollPage.BigScreenScrollPage', {
    extend: 'withub.ext.common.Window',
    title: '菜单',
    width: 420,
    baseUrl: '/ea/bigScreenScrollPage',
    initComponent: function () {
        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 90,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'treecombo',
                    fieldLabel: '大屏页面',
                    params: {
                        menuType: 2,
                        pageType: 'BigScreen'
                    },
                    url: '/system/menu/loadTree',
                    name: 'menu.objectId',
                    listeners: {
                        beforeselect: function (nodeId, objectId, nodeType, record, index) {
                            if (!record.data.leaf) {
                                return false;
                            }
                        },
                        scope: this
                    },
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: '展示时间(分钟)',
                    name: 'displayMinutes',
                    minValue: 1,
                    value: 1,
                    allowDecimals: false,
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
    }
});