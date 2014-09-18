Ext.define('withub.ext.system.menu.Menu', {
    extend: 'withub.ext.common.Window',
    title: '菜单',
    width: 720,
    baseUrl: '/system/menu',
    initComponent: function () {
        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 95,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'treecombo',
                    fieldLabel: '上级菜单',
                    params: {
                        menuType: this.menuType
                    },
                    url: '/system/menu/loadTree',
                    name: 'parent.objectId',
                    value: this.action == 'create' ? this.parentId : undefined,
                    allowBlank: false
                },
                {
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength: 30,
                    allowBlank: false
                },

                {
                    xtype: 'radiogroup',
                    fieldLabel: '菜单类型',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '配置', name: 'menuType', inputValue: 0},
                        {boxLabel: '系统', name: 'menuType', inputValue: 1},
                        {boxLabel: '自定义', name: 'menuType', inputValue: 2, checked: true}
                    ],
                    hidden: this.menuType == 2
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '菜单式样',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '深色', name: 'menuStyle', inputValue: 1, checked: true},
                        {boxLabel: '浅色', name: 'menuStyle', inputValue: 2}
                    ],
                    hidden: this.menuType == 2
                },
                {
                    fieldLabel: 'URL',
                    name: 'url',
                    maxLength: 100,
                    allowBlank: true,
                    value: this.action == 'create' && this.menuUrl == 'BigScreen' ? this.menuUrl : undefined,
                    hidden: this.menuType == 2
                },

                {
                    xtype: 'radiogroup',
                    fieldLabel: '展开',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '是', name: 'expand', inputValue: 1, checked: true},
                        {boxLabel: '否', name: 'expand', inputValue: 0}
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '显示',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '是', name: 'visible', inputValue: 1, checked: true},
                        {boxLabel: '否', name: 'visible', inputValue: 0}
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '显示模式',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '导航', name: 'openMode', inputValue: 1, checked: true},
                        {boxLabel: '弹出', name: 'openMode', inputValue: 0},
                        {boxLabel: '新窗口', name: 'openMode', inputValue: 2}
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

