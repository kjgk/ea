Ext.define('withub.ext.ea.reportExport.ReportExportSchedule', {
    extend: 'withub.ext.common.Window',
    title: '报表导出计划任务',
    width: 600,
    modal: true,
    resizable: false,
    bodyPadding: 10,
    baseUrl: "/ea/reportExportSchedule",
    requires: ['withub.ext.ea.reportExport.ReportExportScheduleModel'],
    layout: 'fit',
    initComponent: function () {

        // this.height = ExtUtil.getFitHeight();  //可以根据浏览器的大小改变高度ExtUtil.getFitHeight(int maxSize) 默认为600

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyStyle: 'padding: 5px 10px',
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            defaults: {
                labelWidth: 95,
                anchor: '100%'
            },
            modal: "withub.ext.ea.reportExport.ReportExportModel",
            items: [
                {
                    fieldLabel: '名称',
                    name: 'name',
                    maxLength: 100,
                    allowBlank: false
                },
                {
                    xtype: 'arraycombo',
                    fieldLabel: '周期',
                    name: 'reCurrenceTimeUnit',
                    data: {Hour: "小时", Day: "天", Week: "星期", Month: "月", Year: "年" },
                    allowBlank: false
                },
                {
                    fieldLabel: '周期值',
                    xtype: 'numberfield',
                    minValue: 1,
                    name: 'reCurrenceValue',
                    allowDecimals: false,
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '开始日期',
                    name: 'startDate',
                    format: 'Y-m-d',
                    allowBlank: false,
                    value: new Date()
                },
                {
                    xtype: 'timefield',
                    fieldLabel: '循环执行时间',
                    name: 'reCurringTime',
                    format: 'H:i',
                    allowBlank: false
                } ,
                {
                    fieldLabel: '报表名称模板',
                    name: 'rePortNameTemplate',
                    maxLength: 100,
                    emptyText: '%Name% %StartTime% 两个元素的组合',
                    allowBlank: false,
                    value: '%Name%[%StartTime%]'
                },
                {
                    xtype: 'treecombo',
                    fieldLabel: '数据点组分类',
                    url: '/ea/dataPointGroupCategory/loadTree',
                    name: 'dataPointGroupCategory.objectId',
                    allowBlank: false,
                    value: this.action == 'create' ? this.dataPointGroupCategoryId : undefined,
                    listeners: {
                        beforeselect: function (nodeId, objectId, nodeType, record, index) {
                            if (!record.data.leaf) {
                                return false;
                            }
                        }
                    }
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '数据格式',
                    allowBlank: false,
                    columns: 6,
                    listeners: {
                        change: function (radiogroup, newValue) {
                            var disableConfig = {
                                All: [
                                    [],
                                    ['ElectricityPrice', 'ElectricityPowerConsumption']
                                ],
                                Hour: [
                                    ['Original'],
                                    ['Original', 'ElectricityPrice', 'ElectricityPowerConsumption']
                                ],
                                Default: [
                                    ['Original'],
                                    ['Original']
                                ]
                            }
                            var dc = disableConfig[newValue['timeUnit']] || disableConfig['Default'];
                            Ext.each(this.formPanel.down('#dataValueTypeGroup').items.items, function (item) {
                                var disabled = false;
                                Ext.each(dc[0], function (item_) {
                                    if (item_ == item.inputValue) {
                                        disabled = true;
                                        return false;
                                    }
                                });
                                item.setDisabled(disabled);
                                item.setValue(!disabled);
                            });
                            Ext.each(this.formPanel.down('#incrementTypeGroup').items.items, function (item) {
                                var disabled = false;
                                Ext.each(dc[1], function (item_) {
                                    if (item_ == item.inputValue) {
                                        disabled = true;
                                        return false;
                                    }
                                });
                                item.setDisabled(disabled);
                                item.setValue(!disabled);
                            });
                        },
                        scope: this
                    },
                    items: [
                        {boxLabel: '流水账', name: 'timeUnit', inputValue: "All", checked: true},
                        {boxLabel: '小时', name: 'timeUnit', inputValue: "Hour"},
                        {boxLabel: '天', name: 'timeUnit', inputValue: "Day"},
                        {boxLabel: '周', name: 'timeUnit', inputValue: "Week"},
                        {boxLabel: '月', name: 'timeUnit', inputValue: "Month"},
                        {boxLabel: '年', name: 'timeUnit', inputValue: "Year"}
                    ]
                },
                {
                    itemId: 'dataValueTypeGroup',
                    xtype: 'checkboxgroup',
                    columns: 4,
                    fieldLabel: '区间值类型显示',
                    allowBlank: false,
                    items: [
                        {boxLabel: '原始值', name: 'sectionTypes', inputValue: 'Original', checked: true, readOnly: true},
                        {boxLabel: '最大值', name: 'sectionTypes', inputValue: 'Max', checked: true},
                        {boxLabel: '平均值', name: 'sectionTypes', inputValue: 'Avg', checked: true},
                        {boxLabel: '最小值', name: 'sectionTypes', inputValue: 'Min', checked: true}
                    ]
                },
                {
                    itemId: 'incrementTypeGroup',
                    xtype: 'checkboxgroup',
                    columns: 4,
                    fieldLabel: '累计值类型显示',
                    allowBlank: false,
                    items: [
                        {boxLabel: '原始值', name: 'incrementTypes', inputValue: 'Original', checked: true },
                        {boxLabel: '增量', name: 'incrementTypes', inputValue: 'Increment', checked: true},
                        {boxLabel: '电量', name: 'incrementTypes', inputValue: 'ElectricityPowerConsumption', checked: false, disabled: true},
                        {boxLabel: '电价', name: 'incrementTypes', inputValue: 'ElectricityPrice', checked: false, disabled: true}
                    ]
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: '按时间排序',
                    allowBlank: false,
                    columns: 4,
                    value: this.sortType,
                    items: [
                        {boxLabel: '升序', name: 'sortType', inputValue: "Asc"},
                        {boxLabel: '降序', name: 'sortType', inputValue: "Desc", checked: true}
                    ]
                },
                {
                    fieldLabel: '小数点位数',
                    xtype: 'numberfield',
                    minValue: 0,
                    maxValue: 10,
                    value: 2,
                    name: 'precision',
                    allowDecimals: false,
                    allowBlank: false
                },
                {
                    fieldLabel: '汇总行文本',
                    xtype: 'textfield',
                    name: 'collectLabel',
                    allowBlank: false,
                    value: '汇总'
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
            var result = action.result;
            form.setValues({
                sectionTypes: (result.data['_sectionTypes'] || '' ).split(','),
                incrementTypes: (result.data['_incrementTypes'] || '' ).split(',')
            });
        });

    }
});

