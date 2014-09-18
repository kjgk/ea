Ext.define('withub.ext.ea.electricityPrice.ElectricityPriceElementsManager', {
    extend: 'Ext.Viewport',
    layout: 'border',
    closable: true,
    requires: [
        'withub.ext.ea.electricityPrice.ElectricityPriceTimeSegmentModel',
        'withub.ext.ea.electricityPrice.ElectricityPriceMonthSegmentModel',
        'withub.ext.ea.electricityPrice.VoltageSegmentModel',
        'withub.ext.ea.electricityPrice.DataPointElectricityConfigModel',
        'withub.ext.ea.electricityPrice.ElectricityPriceIssueModel'
    ],
    initComponent: function () {

        this.treePanel = Ext.create('withub.ext.common.ManagerTree', {
            region: 'west',
            title: '分时电价管理',
            split: true,
            width: 280,
            singleExpand: true,
            margins: '5 0 0 0',
            enableOrderItem: false,
            enableDeleteItem: false,
            baseUrl: '/ea/electricityPriceElements'
        });

        this.mainPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'fit',
            margins: '5 0 5 0',
            border: false,
            items: []
        });

        this.electricityPricePanel = Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceRange', {

        });

        this.electricityUsageCategoryGridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '数据点用电类型列表',
            enableOrderItem: false,
            enableDeleteItem: true,
            baseUrl: '/ea/dataPointElectricityConfig',
            region: 'center',
            margins: '5 0 0 0',
            model: 'withub.ext.ea.electricityPrice.DataPointElectricityConfigModel',
            selModel: {
                mode: 'MULTI'
            },
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '数据点名称', width: 160, dataIndex: 'dataPoint', sortable: false},
                {text: '数据点标识', flex: 1, minWidth: 400, dataIndex: 'dataPointTag', sortable: false} ,
                {text: '电压段(千伏)', width: 120, dataIndex: 'voltageSegment', sortable: false}
            ]
        });

        this.electricityPriceTimeSegmentGridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '分时时间段定义',
            model: 'withub.ext.ea.electricityPrice.ElectricityPriceTimeSegmentModel',
            baseUrl: '/ea/electricityPriceTimeSegment',
            enablePagginBar: true,
            enableDeleteItem: true,
            selModel: {
                mode: 'MULTI'
            },
            columns: [
                {xtype: 'rownumberer', width: 32},
                {text: '名称', width: 150, dataIndex: 'name'},
                {text: '标识', width: 150, dataIndex: 'tag'}
            ]
        });

        this.electricityPriceMonthSegmentGridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '用电月份定义',
            model: 'withub.ext.ea.electricityPrice.ElectricityPriceMonthSegmentModel',
            baseUrl: '/ea/electricityPriceMonthSegment',
            enablePagginBar: true,
            enableDeleteItem: true,
            selModel: {
                mode: 'MULTI'
            },
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '名称', width: 240, dataIndex: 'name' },
                {text: '月份', width: 240, dataIndex: 'months' }
            ]
        });

        this.voltageSegmentGridPanel = Ext.create('withub.ext.common.ManagerGrid', {
            title: '电压区间定义',
            model: 'withub.ext.ea.electricityPrice.VoltageSegmentModel',
            baseUrl: '/ea/voltageSegment',
            enablePagginBar: true,
            enableDeleteItem: true,
            selModel: {
                mode: 'MULTI'
            },
            columns: [
                {xtype: 'rownumberer', width: 32 },
                {text: '电压区间名称', width: 240, dataIndex: 'name' },
                {text: '电压区间开始值(千伏)', width: 240, dataIndex: 'beginValue', align: 'right' },
                {text: '电压区间结束值(千伏)', width: 240, dataIndex: 'endValue', align: 'right'}
            ]
        });


        // 右键事件
        this.electricityUsageCategoryGridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.electricityPrice.DataPointElectricityConfig', {
                            action: 'update',
                            objectId: objectId,
                            listeners: {
                                success: function () {
                                    store.load();
                                },
                                scope: this
                            }
                        }).show();
                    },
                    scope: this
                },
                {
                    text: '更新分时电量',
                    iconCls: 'icon-refresh',
                    handler: function () {
                        var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在更新，请稍候...'});
                        mask.show();
                        Ext.Ajax.request({
                            method: 'POST',
                            params: {
                                dataPointId: record.get('dataPointId')
                            },
                            url: PageContext.contextPath + '/ea/dataPoint/updateElectricityPriceValue',
                            timeout: 1000 * 60 * 60 * 24,
                            success: function (response) {
                                mask.hide();
                                var result = Ext.decode(response.responseText);
                                if (result.success) {
                                    ExtUtil.Msg.info('更新成功！');
                                } else {
                                    ExtUtil.Msg.error(result.message);
                                }
                            }
                        });
                    },
                    scope: this
                }
            );
        }, this);

        this.voltageSegmentGridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.electricityPrice.VoltageSegment', {
                            action: 'update',
                            objectId: objectId,
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

        }, this);

        this.electricityPriceMonthSegmentGridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceMonthSegment', {
                            action: 'update',
                            objectId: objectId,
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

        }, this);

        this.electricityPriceTimeSegmentGridPanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            items.push(
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceTimeSegmentDetail', {
                            action: 'update',
                            objectId: objectId,
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

        }, this);


        this.treePanel.on('load', function () {
            if (this.getRootNode().firstChild.firstChild) {
                if (this.getRootNode().firstChild.firstChild.firstChild) {
                    this.getSelectionModel().select(this.getRootNode().firstChild.firstChild.firstChild)
                }

            }

        });
        // 菜单事件
        this.treePanel.on('select', function (tree, record, index) {

            if (record.get('type') == 'ElectricityPriceTimeSegment') {
                this.mainPanel.removeAll(false);
                this.mainPanel.add(this.electricityPriceTimeSegmentGridPanel);
                this.mainPanel.doLayout();

                var store = this.electricityPriceTimeSegmentGridPanel.getStore();
                store.load();

            } else if (record.get('type') == 'ElectricityPriceMonthSegment') {
                this.mainPanel.removeAll(false);
                this.mainPanel.add(this.electricityPriceMonthSegmentGridPanel);
                this.mainPanel.doLayout();

                var store = this.electricityPriceMonthSegmentGridPanel.getStore();
                store.load();
            } else if (record.get('type') == 'VoltageSegment') {
                this.mainPanel.removeAll(false);
                this.mainPanel.add(this.voltageSegmentGridPanel);
                this.mainPanel.doLayout();

                var store = this.voltageSegmentGridPanel.getStore();
                store.load();
            } else if (record.get('type') == 'ElectricityUsageCategory') {

                this.mainPanel.removeAll(false);
                this.mainPanel.add(this.electricityUsageCategoryGridPanel);
                this.mainPanel.doLayout();

                var store = this.electricityUsageCategoryGridPanel.getStore();
                store.getProxy().extraParams['electricityUsageCategoryId'] = record.get('objectId');
                store.load();
            } else if (record.get('type') == 'ElectricityPrice') {


            } else if (record.get('type') == 'ElectricityPrice_ElectricityPriceIssue') {
                var electricityPriceIssueId = record.get('objectId');
                this.mainPanel.removeAll(false);
                this.electricityPricePanel.electricityPriceIssueId = electricityPriceIssueId;
                this.mainPanel.add(this.electricityPricePanel);
                this.mainPanel.doLayout();
            }


        }, this);

        this.treePanel.on('createcontextmenu', function (items, store, record, index, event) {
            var objectId = record.get('objectId');
            if (record.get('type') == 'ElectricityUsageCategory') {
                items.push(
                    {
                        text: '添加数据点',
                        iconCls: 'icon-add',
                        hidden: record.get('depth') == 3,
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.DataPointElectricityMultiConfig', {
                                electricityUsageCategoryId: objectId,
                                listeners: {
                                    success: function () {
                                        this.electricityUsageCategoryGridPanel.getStore().load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
                items.push(
                    {
                        text: '添加分类',
                        iconCls: 'icon-add',
                        hidden: !(record.get('depth') == 3),
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.ElectricityUsageCategory', {
                                action: 'create',
                                parentId: objectId,
                                listeners: {
                                    success: function () {
                                        if (record.get('leaf')) {
                                            store.load({
                                                node: store.getNodeById(record.get('parentId'))
                                            });
                                        } else {
                                            store.load({
                                                node: record
                                            });
                                        }
                                        this.electricityUsageCategoryGridPanel.getStore().load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
                items.push(
                    {
                        text: '编辑分类',
                        iconCls: 'icon-edit',
                        hidden: record.get('depth') == 3,
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.ElectricityUsageCategory', {
                                action: 'update',
                                objectId: objectId,
                                listeners: {
                                    success: function () {
                                        store.load({
                                            node: store.getNodeById(record.get('parentId'))
                                        });
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
                items.push(
                    {
                        text: '删除分类',
                        iconCls: 'icon-delete',
                        hidden: record.get('depth') == 3,
                        handler: function () {
                            ExtUtil.Msg.confirm('确认删除?', function (select) {
                                if (select == 'no') {
                                    return;
                                }
                                var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在删除...'});
                                mask.show();
                                Ext.Ajax.request({
                                    method: 'GET',
                                    url: PageContext.contextPath + '/ea/electricityUsageCategory/delete/' + objectId,
                                    success: function (response) {
                                        mask.hide();
                                        store.load({
                                            node: store.getNodeById(record.get('parentId'))
                                        });
                                    }
                                });
                            });
                        },
                        scope: this
                    });
            } else if (record.get('type') == 'VoltageSegment') {
                items.push(
                    {
                        text: '添加',
                        iconCls: 'icon-add',
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.VoltageSegment', {
                                action: 'create',
                                listeners: {
                                    success: function () {
                                        this.voltageSegmentGridPanel.getStore().load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
            } else if (record.get('type') == 'ElectricityPriceTimeSegment') {
                items.push(
                    {
                        text: '添加',
                        iconCls: 'icon-add',
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceTimeSegmentDetail', {
                                action: 'create',
                                listeners: {
                                    success: function () {
                                        this.electricityPriceTimeSegmentGridPanel.getStore().load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
            } else if (record.get('type') == 'ElectricityPriceMonthSegment') {
                items.push(
                    {
                        text: '添加',
                        iconCls: 'icon-add',
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceMonthSegment', {
                                action: 'create',
                                listeners: {
                                    success: function () {
                                        this.electricityPriceMonthSegmentGridPanel.getStore().load();
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
            } else if (record.get('type') == 'ElectricityPrice') {
                items.push(
                    {
                        text: '添加',
                        iconCls: 'icon-add',
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceIssue', {
                                action: 'create',
                                listeners: {
                                    success: function () {
                                        store.load({
                                            node: record
                                        });
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    });
            } else if (record.get('type') == 'ElectricityPrice_ElectricityPriceIssue') {
                items.push(
                    {
                        text: '编辑',
                        iconCls: 'icon-edit',
                        handler: function () {
                            Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceIssue', {
                                action: 'update',
                                objectId: objectId,
                                listeners: {
                                    success: function () {
                                        store.load({
                                            node: store.getNodeById(record.get('parentId'))
                                        });
                                    },
                                    scope: this
                                }
                            }).show();
                        },
                        scope: this
                    },
                    {
                        text: '更新分时电量',
                        iconCls: 'icon-refresh',
                        handler: function () {
                            var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在更新，请稍候...'});
                            mask.show();
                            Ext.Ajax.request({
                                method: 'POST',
                                params: {
                                    issueId: objectId
                                },
                                url: PageContext.contextPath + '/ea/dataPoint/updateElectricityPriceValue',
                                timeout: 1000 * 60 * 60 * 24,
                                success: function (response) {
                                    mask.hide();
                                    var result = Ext.decode(response.responseText);
                                    if (result.success) {
                                        ExtUtil.Msg.info('更新成功！');
                                    } else {
                                        ExtUtil.Msg.error(result.message);
                                    }
                                }
                            });
                        },
                        scope: this
                    },
                    {
                        text: '删除',
                        iconCls: 'icon-delete',
                        handler: function () {
                            ExtUtil.Msg.confirm('确认删除?', function (select) {
                                if (select == 'no') {
                                    return;
                                }
                                var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在删除...'});
                                mask.show();
                                Ext.Ajax.request({
                                    method: 'GET',
                                    url: PageContext.contextPath + '/ea/electricityPriceIssue/delete/' + objectId,
                                    success: function (response) {
                                        mask.hide();
                                        store.load({
                                            node: store.getNodeById(record.get('parentId'))
                                        });
                                    }
                                });
                            });
                        },
                        scope: this
                    }
                );
            }

        }, this);

        this.items = [this.treePanel, this.mainPanel];
        this.callParent();
    }
});