Ext.define('withub.ext.ea.widget.Widget', {
    extend: 'withub.ext.common.Window',
    title: '组件',
    width: 640,
    baseUrl: '/ea/widget',
    initComponent: function () {

        var me = this;
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
                    fieldLabel: '组件类别',
                    url: '/ea/widgetCategory/loadTree',
                    name: 'widgetCategory.objectId',
                    value: this.action == 'create' ? this.widgetCategoryId : undefined,
                    allowBlank: false
                },
                {
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    fieldLabel: '标识',
                    name: 'widgetTag',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    fieldLabel: '版本',
                    name: 'widgetVersion',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '许可证组件',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '是', name: 'licenseWidget', inputValue: 1},
                        {boxLabel: '否', name: 'licenseWidget', inputValue: 0, checked: true}
                    ]
                },
                {
                    fieldLabel: '许可证',
                    name: 'license',
//                    maxLength: 100,
                    readOnly: true,
                    allowBlank: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '安装日期',
                    format: 'Y-m-d',
                    name: 'installTime'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '允许协议',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '是', name: 'allowEvaluate', inputValue: 1, checked: true},
                        {boxLabel: '否', name: 'allowEvaluate', inputValue: 0}
                    ]
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '协议失效日期',
                    format: 'Y-m-d',
                    name: 'evaluateExpiredTime'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '状态',
                    allowBlank: false,
                    columns: 6,
                    items: [
                        {boxLabel: '启用', name: 'status', inputValue: 1, checked: true},
                        {boxLabel: '禁用', name: 'status', inputValue: 0}
                    ]
                },
                {
                    xtype: 'swfuploadfield',
                    fieldLabel: '效果图',
                    height: 24,
                    itemId: 'coverImageUploadField',
                    swfUploadConfig: {
                        url: PageContext.contextPath + '/ea/widget/coverImage/upload',
                        fileTypes: '*.jpg;*.jpeg;*.png;*.gif;*.bmp;',
                        fileTypesDescription: '所有图片'
                    },
                    listeners: {
                        filequeued: function () {
                            this.doUpload(function (result) {
                                me.formPanel.getForm().findField('coverImage')
                                    .setValue(result['tempFileName'] + '|' + result['fileName']);
                            });
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: '备注',
                    name: 'description',
                    height: 80,
                    maxLength: 1000
                },
                {
                    xtype: 'hidden',
                    name: 'coverImage'
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
            var coverImage = action.result.data['coverImage'];
            if (coverImage.split('|').length > 1) {
                me.down('#coverImageUploadField').infoText.setRawValue(coverImage.split('|')[1]);
            } else {
                me.down('#coverImageUploadField').infoText.setRawValue(coverImage);
            }
        });
    }
});