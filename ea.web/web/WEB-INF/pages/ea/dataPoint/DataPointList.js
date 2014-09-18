Ext.define('withub.ext.ea.dataPoint.DataPointList', {
    extend: 'Ext.Viewport',
    closable: true,
    requires: ['withub.ext.ea.dataPoint.DataPointModel'],
    layout: 'fit',
    initComponent: function () {

        this.gridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            model: 'withub.ext.ea.dataPoint.DataPointModel',
            baseUrl: '/ea/dataPoint',
            enablePagginBar: true,
            enableDeleteItem: true,
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '数据点ID', width: 80, dataIndex: 'dataPointId', align: 'center'},
                {text: '数据点SliceID', width: 80, dataIndex: 'dataPointSliceId', align: 'center'},
                {text: '数据点标识', flex: 1, minWidth: 240, dataIndex: 'dataPointTag' },
                {text: '数据点名称', width: 160, dataIndex: 'name'},
                {text: '数据点类型', width: 80, dataIndex: 'pointDataType', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '模拟'
                    } else if (value == 2) {
                        return '布尔'
                    } else {
                        return '未知'
                    }
                }},
                {text: '数据点值类型', width: 80, dataIndex: 'pointDataValueType', align: 'center', renderer: function (value, record) {
                    if (value == 1) {
                        return '区间值'
                    } else if (value == 2) {
                        return '累计值'
                    } else {
                        return '未知'
                    }
                }},
                {text: '测量单位', width: 60, dataIndex: 'measureUnit'},
                {text: '数据点格式', width: 70, dataIndex: 'original', align: 'center', renderer: function (value, record) {
                    if (value == 0) {
                        return '组合'
                    } else {
                        return '原始'
                    }

                }},
                {text: '数据源', width: 100, dataIndex: 'databaseTag', align: 'center'}
            ],
            selModel: {
                mode: 'MULTI'
            },
            tbar: [
                '数据源: ',
                {
                    itemId: 'metasysDatabaseId',
                    xtype: 'basecombo',
                    url: '/ea/metasysDatabase/listMetasysDatabase',
                    autoLoad: true,
                    showAll: true,
                    extraParams: {detail: false},
                    value: '',
                    width: 100
                },
                '数据点格式',
                {
                    itemId: 'original',
                    xtype: 'combo',
                    width: 80,
                    store: [
                        ['', '全部'],
                        [1, '原始'],
                        [0, '组合']
                    ],
                    value: ''
                },
                '数据点值类型',
                {
                    itemId: 'pointDataValueType',
                    xtype: 'combo',
                    width: 80,
                    store: [
                        ['', '全部'],
                        [0, '未知'],
                        [1, '区间值'],
                        [2, '累计值']
                    ],
                    value: ''
                },
                '名称',
                {
                    itemId: 'name',
                    xtype: 'textfield',
                    width: 180
                },
                {
                    xtype: 'button',
                    text: '搜索',
                    iconCls: 'icon-query',
                    handler: this.queryDataPoint,
                    scope: this
                },
                {
                    text: '数据连接及配置',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.dataPoint.DataPointConfig', {
                            listeners: {
                                success: function () {
                                    this.gridPanel.getStore().load();
                                },
                                scope: this
                            }
                        }).show();
                    },
                    scope: this
                },
                {
                    text: '创建组合数据点',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.dataPoint.ExpressionEditor', {
                            action: 'create',
                            listeners: {
                                success: function () {
                                    this.gridPanel.getStore().load();
                                },
                                scope: this
                            }
                        }).show();
                    },
                    scope: this
                },
                '-',
                {
                    xtype: 'button',
                    text: '导出',
                    iconCls: 'icon-export',
                    handler: this.exportDataPoint,
                    scope: this
                },
                {
                    xtype: 'button',
                    text: '导入',
                    iconCls: 'icon-import',
                    handler: function () {
                        var store = this.gridPanel.getStore();
                        var wind = Ext.create('Ext.Window', {
                            title: '导入数据点',
                            width: 480,
                            height: 100,
                            modal: true,
                            border: false,
                            layout: 'fit',
                            buttonAlign: 'center',
                            items: [Ext.create('Ext.form.Panel', {
                                bodyPadding: 10,
                                border: false,
                                items: [
                                    {
                                        xtype: 'swfuploadfield',
                                        name: 'attachment',
                                        fieldLabel: '选择Excel文件',
                                        labelWidth: 80,
                                        anchor: '100%',
                                        height: 24,
                                        swfUploadConfig: {
                                            url: PageContext.contextPath + '/ea/dataPoint/upload',
                                            fileTypes: '*.xls;*.xlsx;',
                                            fileTypesDescription: '*.xls;*.xlsx;'
                                        },
                                        listeners: {
                                            filequeued: function () {
                                                this.doUpload(function (result) {
                                                    wind.close();
                                                    var fileName = result['fileName'];
                                                    var tempFileName = result['tempFileName'];
                                                    var mask = new Ext.LoadMask(Ext.getBody(), {
                                                        msg: '正在导入，请稍候...'
                                                    });
                                                    mask.show();
                                                    Ext.Ajax.request({
                                                        method: 'POST',
                                                        url: PageContext.contextPath + '/ea/dataPoint/import',
                                                        params: {
                                                            fileName: fileName,
                                                            tempFileName: tempFileName
                                                        },
                                                        success: function (response) {
                                                            mask.hide();
                                                            var result = Ext.decode(response.responseText);
                                                            if (result.success) {
                                                                if (Ext.isEmpty(result.importInfo)) {
                                                                    ExtUtil.Msg.info("导入成功！");
                                                                } else {
                                                                    ExtUtil.Msg.info("部分数据导入成功！" + result.importInfo);
                                                                }
                                                                store.reload();
                                                            } else {
                                                                ExtUtil.Msg.error(result['message']);
                                                            }
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    } ,
                                    {
                                        xtype: 'tbtext',
                                        text: "<span style='color:red;     padding-left:70px;'>数据起始行为第二行，每一列的数据应与展示页面一致</span>"
                                    }
                                ]
                            })]
                        }).show();
                    },
                    scope: this
                }
            ]
        });

        this.gridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            var original = record.get('original');
            var source = record.get('source');

            if (original == 1) {
                items.push(
                    {
                        text: '设置',
                        iconCls: 'icon-edit',
                        handler: function () {
                            Ext.create('withub.ext.ea.dataPoint.DataPoint', {
                                action: 'update',
                                objectId: objectId,
                                source: source,
                                original: original,
                                listeners: {
                                    success: function () {
                                        store.load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    }
                );
            }
            if (original == 0) {
                items.push(
                    {
                        text: '编辑组合数据点',
                        iconCls: 'icon-edit',
                        handler: function () {
                            Ext.create('withub.ext.ea.dataPoint.ExpressionEditor', {
                                action: 'update',
                                objectId: objectId,
                                source: source,
                                listeners: {
                                    success: function () {
                                        store.load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    }
                );
            }

        }, this);

        this.items = this.gridPanel;

        this.callParent();

        this.queryDataPoint();
    },

    queryDataPoint: function () {
        var name = this.gridPanel.down('#name');
        var original = this.gridPanel.down('#original');
        var pointDataValueType = this.gridPanel.down('#pointDataValueType');
        var metasysDatabaseId = this.gridPanel.down('#metasysDatabaseId');
        Ext.apply(this.gridPanel.getStore().getProxy().extraParams, {
            name: name.getValue(),
            original: original.getValue(),
            pointDataValueType: pointDataValueType.getValue(),
            metasysDatabaseId: metasysDatabaseId.getValue()
        });
        this.gridPanel.getStore().loadPage(1);
    },

    exportDataPoint: function () {
        ExtUtil.exportData({
            url: '/ea/dataPoint/export',
            params: {
            }
        });
    }
});