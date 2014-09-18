Ext.define('withub.ext.ea.page.common.FontField', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.fontfield',
    typeAhead: true,
    triggerAction: 'all',
    selectOnTab: true,
    editable: false,
    store: [
        ['微软雅黑', '微软雅黑'],
        ['宋体', '宋体'],
        ['黑体', '黑体'],
        ['楷体', '楷体']
    ],
    lazyRender: true,
    listClass: 'x-combo-list-small'
});



