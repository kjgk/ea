Ext.define('withub.ext.ea.page.common.DataPointReport', {
    extend: 'Ext.Base'
});

Ext.define('withub.ext.ea.page.common.DataPointReport.DataPointField', {
    extend: 'Ext.form.field.Trigger',
    editable: false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    fieldLabel: null,
    allowAll: true,

    initComponent: function () {
        this.on('focus', this.onTriggerClick, this);
        this.callParent();
    },

    onTriggerClick: function () {

        var me = this, selector;
        selector = Ext.create('withub.ext.ea.page.common.DataPointReport.DataPointList', {
            listeners: {
                select: function (values) {
                    me.setValue(Ext.encode(values));
                },
                afterrender: function () {
                    if (!Ext.isEmpty(me.value)) {
                        var values = Ext.decode(me.value);
                        var data = [];
                        Ext.each(values, function (value) {
                            data.push({
                                dataPointConfig: value
                            })
                        });
                        selector.gridPanel.getStore().loadData(data);
                    }
                }
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

Ext.define('withub.ext.ea.page.common.DataPointReport.DateTimeField', {
    extend: 'Ext.form.field.Trigger',
    editable: false,
    triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
    fieldLabel: null,
    allowAll: true,

    initComponent: function () {
        this.on('focus', this.onTriggerClick, this);
        this.callParent();
    },

    onTriggerClick: function () {

        var me = this, selector;
        selector = Ext.create('withub.ext.ea.page.common.DataPointReport.DateTimeList', {
            listeners: {
                select: function (values) {
                    me.setValue(Ext.encode(values));
                },
                afterrender: function () {
                    if (!Ext.isEmpty(me.value)) {
                        var values = Ext.decode(me.value);
                        var data = [];
                        Ext.each(values, function (value) {
                            data.push({
                                dateTimeConfig: value
                            })
                        });
                        selector.gridPanel.getStore().loadData(data);
                    }
                }
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

Ext.define('withub.ext.ea.page.common.DataPointReport.DataPointList', {
    extend: 'Ext.Window',
    title: '数据点配置',
    width: 640,
    height: 480,
    layout: 'fit',
    modal: true,
    resizable: false,
    initComponent: function () {

        var me = this;
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            border: false,
            store: Ext.create('Ext.data.Store', {
                fields: ['dataPointConfig']
            }),
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: '移动到此处'
                }
            },
            columns: [
                {xtype: 'rownumberer', width: 34},
                {
                    text: '数据点',
                    flex: 1,
                    dataIndex: 'dataPointConfig',
                    renderer: function (v, md, record) {
                        return v['dataPointName'];
                    }
                },
                {
                    text: '显示类型',
                    width: 200,
                    dataIndex: 'dataPointConfig',
                    renderer: function (v, md, record) {
                        var texts = [];
                        Ext.each(v['sectionTypes'], function (sectionType) {
                            texts.push({
                                Original: '原始值',
                                Max: '最大值',
                                Avg: '平均值',
                                Min: '最小值'
                            }[sectionType]);
                        });
                        Ext.each(v['incrementTypes'], function (incrementTypes) {
                            texts.push({
                                Original: '原始值',
                                Increment: '增量',
                                ElectricityPowerConsumption: '电量',
                                ElectricityPrice: '电价'
                            }[incrementTypes]);
                        });
                        return texts.join('，')
                    }
                }
            ],
            flex: 1,
            tbar: [
                {
                    text: '添加数据点',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.page.common.DataPointReport.DataPointConfig', {
                            listeners: {
                                select: function (values) {
                                    me.gridPanel.getStore().loadData([
                                        {
                                            dataPointConfig: values
                                        }
                                    ], true);
                                }
                            }
                        }).show();
                    }
                },
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        var records = me.gridPanel.getSelectionModel().getSelection();
                        if (records.length > 0) {
                            var record = records[0];
                            var dataPointConfig = Ext.create('withub.ext.ea.page.common.DataPointReport.DataPointConfig', {
                                listeners: {
                                    select: function (values) {
                                        record.set({dataPointConfig: values});
                                        record.commit();
                                    }
                                }
                            });
                            dataPointConfig.show();
                            dataPointConfig.formPanel.getForm().setValues(record.get('dataPointConfig'));
                        }
                    }
                },
                {
                    text: '删除',
                    iconCls: 'icon-delete',
                    handler: function () {
                        var records = me.gridPanel.getSelectionModel().getSelection();
                        if (records.length > 0) {
                            me.gridPanel.getStore().remove(records);
                            me.gridPanel.getView().refresh();
                        }
                    }
                }
            ]
        });

        this.items = [this.gridPanel];

        this.buttons = [
            {
                text: '确定',
                handler: function () {
                    var values = [];
                    this.gridPanel.getStore().each(function (record) {
                        values.push(record.get('dataPointConfig'));
                    });
                    this.fireEvent('select', values);
                    this.close();
                },
                scope: this

            },
            {
                text: '关闭 ',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();
    }
});

Ext.define('withub.ext.ea.page.common.DataPointReport.DateTimeList', {
    extend: 'Ext.Window',
    title: '时间段配置',
    width: 640,
    height: 480,
    layout: 'fit',
    modal: true,
    resizable: false,
    initComponent: function () {

        var me = this;
        this.gridPanel = Ext.create('Ext.grid.Panel', {
            border: false,
            store: Ext.create('Ext.data.Store', {
                fields: ['dateTimeConfig']
            }),
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: '移动到此处'
                }
            },
            columns: [
                {xtype: 'rownumberer', width: 34},
                {
                    text: '开始时间',
                    width: 120,
                    dataIndex: 'dateTimeConfig',
                    renderer: function (v, md, record) {
                        return v['startTime'];
                    }
                },
                {
                    text: '结束时间',
                    width: 120,
                    dataIndex: 'dateTimeConfig',
                    renderer: function (v, md, record) {
                        return v['endTime'];
                    }
                },
                {
                    text: '时间格式',
                    flex: 2,
                    dataIndex: 'dateTimeConfig',
                    renderer: function (v, md, record) {
                        return {
                            None: '无',
                            All: '流水账',
                            Hour: '小时',
                            Day: '天',
                            Min: '周',
                            Month: '月',
                            Year: '年'
                        }[v['timeUnit']];
                    }
                },
                {
                    text: '排序',
                    flex: 1,
                    dataIndex: 'dateTimeConfig',
                    renderer: function (v, md, record) {
                        return {
                            Asc: '正序',
                            Desc: '倒序'
                        }[v['sortType']];
                    }
                }
            ],
            flex: 1,
            tbar: [
                {
                    text: '添加时间段',
                    iconCls: 'icon-add',
                    handler: function () {
                        Ext.create('withub.ext.ea.page.common.DataPointReport.DateTimeConfig', {
                            listeners: {
                                select: function (values) {
                                    me.gridPanel.getStore().loadData([
                                        {
                                            dateTimeConfig: values
                                        }
                                    ], true);
                                }
                            }
                        }).show();
                    }
                },
                {
                    text: '编辑',
                    iconCls: 'icon-edit',
                    handler: function () {
                        var records = me.gridPanel.getSelectionModel().getSelection();
                        if (records.length > 0) {
                            var record = records[0];
                            var dateTimeConfig = Ext.create('withub.ext.ea.page.common.DataPointReport.DateTimeConfig', {
                                listeners: {
                                    select: function (values) {
                                        record.set({dateTimeConfig: values});
                                        record.commit();
                                    }
                                }
                            });
                            dateTimeConfig.show();
                            dateTimeConfig.formPanel.getForm().setValues(record.get('dateTimeConfig'));
                        }
                    }
                },
                {
                    text: '删除',
                    iconCls: 'icon-delete',
                    handler: function () {
                        var records = me.gridPanel.getSelectionModel().getSelection();
                        if (records.length > 0) {
                            me.gridPanel.getStore().remove(records);
                            me.gridPanel.getView().refresh();
                        }
                    }
                }
            ]
        });

        this.items = [this.gridPanel];

        this.buttons = [
            {
                text: '确定',
                handler: function () {
                    var values = [];
                    this.gridPanel.getStore().each(function (record) {
                        values.push(record.get('dateTimeConfig'));
                    });
                    this.fireEvent('select', values);
                    this.close();
                },
                scope: this

            },
            {
                text: '关闭 ',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();
    }
});

Ext.define('withub.ext.ea.page.common.DataPointReport.DataPointConfig', {
    extend: 'Ext.Window',
    title: '数据点',
    width: 640,
    modal: true,
    resizable: false,
    showExportBtn: true,
    requires: ['withub.ext.ea.dataPoint.DataPointField'],
    initComponent: function () {

        var me = this;
        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            baseCls: 'x-plain',
            border: false,
            defaults: {
                labelWidth: 120,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'datapointfield',
                    name: 'dataPointId',
                    allowBlank: false,
                    listeners: {
                        select: function (nodeId, objectId, nodeType, record) {
                            var pointDataValueType, form = me.formPanel.getForm();
                            // 通过树节点选择
                            if (nodeId) {
                                pointDataValueType = record.get('attributes')['pointDataValueType']
                            }
                            // 通过检索选择
                            else {
                                pointDataValueType = record.get('pointDataValueType')
                            }

                            form.findField('incrementTypesGroup').setDisabled(true);
                            form.findField('sectionTypesGroup').setDisabled(true);
                            if (pointDataValueType == 1) {
                                form.findField('sectionTypesGroup').setDisabled(false);
                            }
                            if (pointDataValueType == 2) {
                                form.findField('incrementTypesGroup').setDisabled(false);
                            }
                            me.pointDataValueType = pointDataValueType;
                        }
                    }
                },
                {
                    xtype: 'checkboxgroup',
                    name: 'sectionTypesGroup',
                    columns: 4,
                    fieldLabel: '区间值类型显示',
                    allowBlank: false,
                    disabled: true,
                    items: [
                        {boxLabel: '原始值', name: 'sectionTypes', inputValue: 'Original', checked: true},
                        {boxLabel: '最大值', name: 'sectionTypes', inputValue: 'Max', checked: true},
                        {boxLabel: '平均值', name: 'sectionTypes', inputValue: 'Avg', checked: true},
                        {boxLabel: '最小值', name: 'sectionTypes', inputValue: 'Min', checked: true}
                    ]
                },
                {
                    xtype: 'checkboxgroup',
                    name: 'incrementTypesGroup',
                    columns: 4,
                    fieldLabel: '累计值类型显示',
                    allowBlank: false,
                    disabled: true,
                    items: [
                        {boxLabel: '原始值', name: 'incrementTypes', inputValue: 'Original', checked: true},
                        {boxLabel: '增量', name: 'incrementTypes', inputValue: 'Increment', checked: true},
                        {boxLabel: '电量', name: 'incrementTypes', inputValue: 'ElectricityPowerConsumption', checked: true},
                        {boxLabel: '电价', name: 'incrementTypes', inputValue: 'ElectricityPrice', checked: true}
                    ]
                }
            ]
        });

        this.items = [this.formPanel];

        this.buttons = [
            {
                text: '确定',
                handler: function () {
                    var form = this.formPanel.getForm();
                    if (!form.isValid()) {
                        return;
                    }

                    var sectionTypes = form.findField('sectionTypesGroup').getValue().sectionTypes;
                    var incrementTypes = form.findField('incrementTypesGroup').getValue().incrementTypes;
                    this.fireEvent('select',
                        {
                            dataPointId: form.findField('dataPointId').getValue(),
                            dataPointName: form.findField('dataPointId').getRawValue(),
                            sectionTypes: me.pointDataValueType == 1 ? ( Ext.isArray(sectionTypes) ? sectionTypes : [sectionTypes]) : [],
                            incrementTypes: me.pointDataValueType == 2 ? ( Ext.isArray(incrementTypes) ? incrementTypes : [incrementTypes]) : []
                        }
                    );
                    this.close();
                },
                scope: this
            },
            {
                text: '关闭 ',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();

        this.on('afterrender', function () {
            var form = this.formPanel.getForm();
            var pointDataValueType;
            form.findField('dataPointId').on('loadvaluecomplate', function (node) {
                pointDataValueType = node.get('attributes')['pointDataValueType'];
                form.findField('incrementTypesGroup').setDisabled(true);
                form.findField('sectionTypesGroup').setDisabled(true);
                if (pointDataValueType == 1) {
                    form.findField('sectionTypesGroup').setDisabled(false);
                }
                if (pointDataValueType == 2) {
                    form.findField('incrementTypesGroup').setDisabled(false);
                }
                me.pointDataValueType = pointDataValueType;
            });
        }, this)
    }
});

Ext.define('withub.ext.ea.page.common.DataPointReport.DateTimeConfig', {
    extend: 'Ext.Window',
    title: '时间段',
    width: 480,
    modal: true,
    resizable: false,
    showExportBtn: true,
    initComponent: function () {

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            baseCls: 'x-plain',
            border: false,
            defaults: {
                labelWidth: 60,
                anchor: '100%'
            },
            items: [
                {
                    fieldLabel: "开始时间",
                    name: 'startTime',
                    xtype: 'datetimefield',
                    allowBlank: false,
                    value: Ext.Date.clearTime(new Date())
                },
                {
                    fieldLabel: "结束时间",
                    name: 'endTime',
                    xtype: 'datetimefield',
                    allowBlank: false,
                    value: new Date()
                },
                {
                    xtype: 'radiogroup',
                    name: 'timeUnitGroup',
                    fieldLabel: '时间格式',
                    allowBlank: false,
                    columns: 3,
                    items: [
//                        {boxLabel: '无', name: 'timeUnit', inputValue: "None"},
                        {boxLabel: '流水账', name: 'timeUnit', inputValue: "All"},
                        {boxLabel: '小时', name: 'timeUnit', inputValue: "Hour", checked: true},
                        {boxLabel: '天', name: 'timeUnit', inputValue: "Day"},
                        {boxLabel: '周', name: 'timeUnit', inputValue: "Week"},
                        {boxLabel: '月', name: 'timeUnit', inputValue: "Month"},
                        {boxLabel: '年', name: 'timeUnit', inputValue: "Year"}
                    ]
                },
                {
                    xtype: 'radiogroup',
                    name: 'sortTypeGroup',
                    fieldLabel: '时间格式',
                    allowBlank: false,
                    columns: 3,
                    items: [
                        {boxLabel: '正序', name: 'sortType', inputValue: "Asc", checked: true},
                        {boxLabel: '倒序', name: 'sortType', inputValue: "Desc"}
                    ]
                }
            ]
        });

        this.items = [this.formPanel];

        this.buttons = [
            {
                text: '确定',
                handler: function () {
                    var form = this.formPanel.getForm();
                    if (!form.isValid()) {
                        return;
                    }

                    var timeUnit = form.findField('timeUnitGroup').getValue().timeUnit;
                    var sortType = form.findField('sortTypeGroup').getValue().sortType;
                    this.fireEvent('select',
                        {
                            startTime: form.findField('startTime').getRawValue(),
                            endTime: form.findField('endTime').getRawValue(),
                            timeUnit: Ext.isArray(timeUnit) ? timeUnit : [timeUnit],
                            sortType: Ext.isArray(sortType) ? sortType : [sortType]
                        }
                    );
                    this.close();
                },
                scope: this

            },
            {
                text: '关闭 ',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();
    }
});