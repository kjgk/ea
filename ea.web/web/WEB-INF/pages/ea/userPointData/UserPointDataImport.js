Ext.define('withub.ext.ea.userPointData.UserPointDataImport', {
    extend: 'Ext.Window',
    title: '自定义数据点导入',
    width: 480,
    resizable: false,
    modal: true,
    requires: ['withub.ext.ea.dataPoint.DataPointField'],
    initComponent: function () {

        var fileName = '', tempFileName = '';

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 70,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'datapointfield',
                    name: 'dataPointId',
                    itemId: 'dataPointId',
                    hidden: !this.single,
                    allowBlank: !this.single
                },
                {
                    xtype: 'swfuploadfield',
                    name: 'attachment',
                    swfUploadConfig: {
                        url: PageContext.contextPath + '/ea/userPointData/upload',
                        fileTypes: '*.xls;*.xlsx;',
                        fileTypesDescription: '*.xls;*.xlsx;'
                    },
                    fieldLabel: 'Excel文件',
                    allowBlank: false,
                    listeners: {
                        filequeued: function () {
                            this.doUpload(function (result) {
                                fileName = result['fileName'];
                                tempFileName = result['tempFileName'];
                            });
                        }
                    }
                },
                {
                    xtype: 'tbtext',
                    text: this.single ? "<span style='color:red;padding-left:70px;'>数据起始行为第二行，第一列为数据时间，第二列为数据值</span>"
                        : "<span style='color:red;padding-left:70px;'></br>数据起始行为第二行，第一列为数据点ID，第二列为数据时间，第三列为数据值</span>"
                }
            ]
        });

        this.items = [this.formPanel];

        this.buttons = [
            {
                text: '导入',
                handler: function () {
                    var me = this;
                    var dataPointId = this.formPanel.getForm().findField("dataPointId").getValue();
                    var mask = new Ext.LoadMask(Ext.getBody(), {
                        msg: '正在导入，请稍候...'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: PageContext.contextPath + '/ea/userPointData/import',
                        params: {
                            dataPointId: dataPointId,
                            fileName: fileName,
                            tempFileName: tempFileName
                        },
                        method: 'GET',
                        timeout: 60 * 60 * 1000,
                        success: function (response) {
                            mask.hide();
                            var result = Ext.decode(response.responseText);
                            if (result.success) {
                                if (Ext.isEmpty(result['importInfo'])) {
                                    ExtUtil.Msg.info("导入成功！");
                                } else {
                                    ExtUtil.Msg.info("部分数据导入成功！" + result['importInfo']);
                                }
                                me.fireEvent('success');
                                me.close();
                            } else {
                                ExtUtil.Msg.error(result.message);
                            }
                        },
                        failure: function (response) {
                            mask.hide();
                            ExtUtil.Msg.error(response.responseText);
                        }
                    });
                },
                scope: this
            },
            {
                text: '关闭',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();
    }
});

