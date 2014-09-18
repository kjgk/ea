Ext.define('withub.ext.ea.dataPoint.DataPointConfig', {
    extend: 'withub.ext.common.Window',
    title: '数据点配置',
    baseUrl: '/ea/dataPoint',
    url: '/ea/dataPoint/loadDataPointConfig',
    enableButton1: false,
    enableButton2: false,
    layout: 'fit',
    width: 1000,
    requires: ['Ext.ux.form.ItemSelector'],

    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            baseCls: 'x-plain',
            defaults: {
                labelWidth: 60,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        '数据源: ',
                        {
                            itemId: 'metasysDatabaseId',
                            xtype: 'basecombo',
                            url: '/ea/metasysDatabase/listMetasysDatabase',
                            autoLoad: true,
                            extraParams: {detail: true},
                            emptyText: '请选择数据源',
                            width: 600
                        },
                        {
                            xtype: 'button',
                            text: '连接',
                            iconCls: 'icon-query',
                            handler: this.loadDataPointConfig,
                            scope: this
                        }]
                },
                {
                    xtype: 'itemselector',
                    name: 'itemselector',
                    id: 'itemselector',
                    height: 420,
                    displayField: 'label',
                    valueField: 'value',
                    store: Ext.create('Ext.data.ArrayStore', {
                        fields: ['value', 'label'],
                        data: []
                    }),
                    allowBlank: false,
                    msgTarget: 'side',
                    fromTitle: '可选数据点',
                    toTitle: '已选数据点'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: '快速定位:',
                    name: 'fromDataPointLabel',
                    anchor: '48%',
                    emptyText: '不区分大小写',
                    displayField: true,
                    listeners: {
                        change: function (field, newValue) {
                            if (newValue == null || newValue == '') {
                                Ext.getCmp('itemselector').fromField.boundList.getSelectionModel().deselectAll(true);
                                return;
                            }
                            var fromDatas = Ext.getCmp('itemselector').fromField.getStore();
                            var selectDatas = [];
                            var searchString = eval('/' + newValue + '/i');
                            for (var i = fromDatas.data.items.length - 1; i >= 0; i--) {
                                var label = fromDatas.data.items[i].data.label;
                                if (label.search(searchString) !== -1) {
                                    selectDatas.push(fromDatas.data.items[i]);
                                }
                            }
                            Ext.getCmp('itemselector').fromField.boundList.getSelectionModel().select(selectDatas);
                            this.focus(newValue);
                        }
                    }
                }
            ]
        });

        this.buttons = [
            {
                text: '同步测量单位<span style="color: red;font-size: 8px;">(仅首次同步使用)</span>',
                height: 28,
                handler: this.syncUnitOfMeasure,
                scope: this
            },
            {
                text: '保存',
                handler: function () {
                    var selectedDataPoints = [];
                    var toDatas = Ext.getCmp('itemselector').toField.getStore();
                    for (var i = toDatas.data.items.length - 1; i >= 0; i--) {
                        var value = toDatas.data.items[i].data.value;
                        selectedDataPoints.push(value);
                    }
                    var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在保存...'});
                    mask.show();
                    Ext.Ajax.request({
                        method: 'POST',
                        url: PageContext.contextPath + '/ea/dataPoint/saveSelectedDataPoints',
                        params: {
                            selectedDataPoints: selectedDataPoints,
                            metasysDatabaseId: this.formPanel.down('#metasysDatabaseId').getValue()
                        },
                        success: function (response) {
                            mask.hide();
                            var result = Ext.decode(response.responseText);
                            if (result.success) {
                                ExtUtil.Msg.info('保存成功！', function () {
                                    this.fireEvent('success');
                                    this.close();
                                }, this);
                            } else {
                                ExtUtil.Msg.error(result.message);
                            }

                        },
                        failure: function () {
                            mask.hide();
                            Ext.Msg.alert('提示', '保存失败！');
                        },
                        scope: this
                    });
                },
                scope: this
            }
        ];

        this.items = [this.formPanel];

        this.callParent();

//        this.loadDataPointConfig();
    },

    loadDataPointConfig: function () {
        var metasysDatabase = this.formPanel.down('#metasysDatabaseId')
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/loadDataPointConfig',
            params: {
                metasysDatabaseId: metasysDatabase.getValue()
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);

                var remoteDataPoints = result.remoteDataPoints;
                var localDataPoints = result.localDataPoints;
                var dataPoints = [];

                Ext.each(localDataPoints, function (local) {
                    Ext.each(remoteDataPoints, function (remote, index) {
                        if (remote[0] === local[0]) {
                            dataPoints.push(remote);
                            return false;
                        }
                    });
                });

                Ext.each(dataPoints, function (dataPoint) {
                    Ext.Array.remove(remoteDataPoints, dataPoint);
                });

                Ext.getCmp('itemselector').fromField.getStore().loadData(remoteDataPoints);
                Ext.getCmp('itemselector').toField.getStore().loadData(localDataPoints);
            },
            failure: function (response) {
                ExtUtil.Msg.error(response.responseText);
            },
            scope: this
        });
    },

    fetchRemoteDataPoint: function () {
        var metasysDatabase = this.formPanel.down('#metasysDatabaseId');
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/dataPoint/fetchRemoteDataPoint',
            params: {
                metasysDatabaseId: metasysDatabase.getValue()
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                Ext.getCmp('itemselector').fromField.getStore().loadData(result.remoteDataPoints);
            },
            failure: function (response) {
                ExtUtil.Msg.error(response.responseText);
            },
            scope: this
        });
    },

    syncUnitOfMeasure: function () {
        ExtUtil.Msg.confirm('确认同步测量单位?', function (select) {
            if (select === 'no') {
                return;
            }
            var mask = new Ext.LoadMask(Ext.getBody(), {
                msg: '正在同步，请稍候...'
            });
            mask.show();
            Ext.Ajax.request({
                method: 'POST',
                url: PageContext.contextPath + '/ea/dataPoint/syncUnitOfMeasure',
                success: function (response) {
                    mask.hide();
                    var result = Ext.decode(response.responseText);
                    if (result.success) {
                        ExtUtil.Msg.info("同步成功！");
                    } else {
                        ExtUtil.Msg.error(result['message']);
                    }
                }
            });
        });
    }
});

Ext.define(null, {
    override: 'Ext.ux.form.ItemSelector',
    setupItems: function () {
        var me = this;
        me.fromField = me.createList(me.fromTitle);
        me.toField = me.createList(me.toTitle);

        return [
            me.fromField,
            {
                xtype: 'container',
                margins: '0 4',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        margins: '8 0 0 0',
                        text: '添加',
                        handler: function () {
                            me.onAddBtnClick()
                        }
                    },
                    {
                        xtype: 'button',
                        margins: '8 0 0 0',
                        text: '移除',
                        handler: function () {
                            me.onRemoveBtnClick()
                        }
                    }
                ]
            },
            me.toField
        ];
    }
});