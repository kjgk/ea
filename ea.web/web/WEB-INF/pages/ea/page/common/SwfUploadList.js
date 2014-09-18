Ext.define('withub.ext.ea.page.common.SwfUploadList', {
    extend: 'Ext.form.field.Trigger',
    editable: false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    fieldLabel: null,
    height: 22,

    initComponent: function () {
        this.on('focus', this.onTriggerClick, this)
        this.callParent();
    },

    getValue: function () {
        return this.value;
    },

    mimicBlur: function (e) {
        if (!this.isDestroyed && !this.bodyEl.contains(e.target) && this.validateBlur(e) && this.selector === undefined) {
            this.triggerBlur(e);
        }
    },

    onTriggerClick: function () {

        var me = this;

        var swfUpload = Ext.create('withub.ext.base.SWFUpload', {
            buttonText: '添加',
            url: PageContext.contextPath + '/ea/page/image/upload',
            fileTypes: '*.jpg;*.jpeg;*.bmp;*.png;',
            fileDescription: '图片文件',
            width: 70
        });

        var data = [];
        if (me.getValue()) {
            data = Ext.decode(me.getValue());
        }

        var listPanel = Ext.create('Ext.grid.Panel', {
            store: Ext.create('Ext.data.Store', {
                fields: ['fileId', 'fileName', 'fileSize', 'tempFileName', 'fileStatus', 'description'],
                data: data
            }),
            border: false,
            tbar: [swfUpload],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],

            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {
                    dataIndex: 'fileName',
                    flex: 1,
                    text: '文件名'
                },
                {
                    dataIndex: 'description',
                    flex: 1,
                    text: '备注',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    dataIndex: 'fileSize',
                    width: 90,
                    align: 'right',
                    text: '文件大小'
                },
                {
                    xtype: 'actioncolumn',
                    icon: PageContext.contextPath + '/images/icons/delete.png',
                    tooltip: '删除',
                    width: 26,
                    handler: function (view, rowIndex, colIndex) {
                        var record = view.getStore().getAt(rowIndex);
                        if (record.get('fileStatus') == 'Local') {
                            swfUpload.removeFile(record.get('fileId'));
                        }
                        view.getStore().remove(record);
                        view.refresh();
                    }
                }
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: '移动到此处'
                }
            }
        });

        swfUpload.on('filequeued', function (file) {
            listPanel.getStore().loadData([
                {
                    fileId: file.id,
                    fileName: file.name,
                    fileSize: SWFUpload.speed.formatBytes(file.size),
                    fileStatus: 'Local',
                    tempFileName: ''
                }
            ], true);
        });

        var selector = Ext.create('Ext.window.Window', {
            title: '上传文件',
            height: 360,
            width: 640,
            constrain: true,
            modal: true,
            resizable: false,
            layout: 'fit',
            items: [listPanel],
            buttons: [
                {
                    text: '确定',
                    handler: function () {
                        var values = [];
                        if (swfUpload.getUploader().getQueueFile(0)) {
                            swfUpload.doUpload(function (result, files) {
                                Ext.each(result, function (item, index) {
                                    var record = listPanel.getStore().findRecord('fileId', files[index].id);
                                    record.set({
                                        fileId: '',
                                        fileStatus: 'Remote',
                                        tempFileName: item['tempFileName']
                                    });
                                    record.commit();
                                });
                                listPanel.getStore().each(function (record, index) {
                                    values.push(Ext.apply({orderNo: index}, record.data));
                                });
                                me.setValue(Ext.encode(values));
                                selector.close();
                            });
                        } else {
                            listPanel.getStore().each(function (record, index) {
                                values.push(Ext.apply({orderNo: index}, record.data));
                            });
                            me.setValue(Ext.encode(values));
                            selector.close();
                        }

                    }
                },
                {
                    text: '关闭',
                    handler: function () {
                        selector.close();
                    }
                }
            ]
        });
        selector.on('close', function () {
            this.selector = undefined;
            this.triggerBlur();
        }, this);

        selector.show();
        me.selector = selector;
    }
});