Ext.define('withub.ext.ea.page.widget.Standard-Text', {
    extend: 'Ext.form.Label',
    width: 120,
    height: 32,
    cls: 'standard-text',
    autoEl: 'pre',
    editable: true,
    text: '请输入内容',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },

    initComponent: function () {

        this.initWidgetConfig();

        this.callParent();

        this.on('afterrender', function () {
            var el = this.getEl();
            if (!this.devMode || !this.editable) {
                return;
            }
            el.on('dblclick', function () {
                var editor = new Ext.Editor({
                    hidden: false,
                    hideEl: true,
                    updateEl: true,
                    field: {
                        xtype: 'textarea',
                        fieldStyle: {
                            fontSize: this.getWidgetConfig()['fontSize'] + 'px',
                            fontFamily: this.getWidgetConfig()['fontFamily'],
                            lineHeight: this.getWidgetConfig()['fontSize'] * 3 / 2 + 'px',
                            color: '#' + this.getWidgetConfig()['color'],
                            background: '#FFFFB0',
                            textAlign: this.getWidgetConfig()['textAlign'],
                            fontStyle: this.getWidgetConfig()['fontStyle'],
                            fontWeight: this.getWidgetConfig()['fontWeight'],
                            padding: '0px'
                        },
                        width: el.getWidth(),
                        height: el.getHeight()
                    },
                    listeners: {
                        complete: function (editor, value) {
                            this.putWidgetConfig({
                                text: value
                            });
                            this.fireEvent('textchange', value)
                        },
                        scope: this
                    }
                });
                var text = this.getWidgetConfig()['text'];
                editor.startEdit(el, text);
                editor.field.selectText(text.length, text.length);
            }, this);
        }, this);
    },

    getDefaultWidgetConfig: function () {
        return {
            text: {
                displayName: '内容',
                editor: Ext.create('Ext.form.field.TextArea', {height: 120, width: 200}),
                value: '请输入内容'
            },
            fontSize: {
                displayName: '字体大小（像素）',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 64, allowDecimals: false}),
                value: 16
            },
            fontFamily: {
                displayName: '字体',
                editor: Ext.create('withub.ext.ea.page.common.FontField', {}),
                value: '微软雅黑'
            },
            color: {
                displayName: '字体颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: '000000'
            },
            backgroundColor: {
                displayName: '背景颜色',
                editor: Ext.create('withub.ext.ea.page.common.ColorField', {}),
                renderer: this.propertyRender.color,
                value: ''
            },
            textAlign: {
                displayName: '对齐方式',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {left: '左', center: '中', right: '右'}}),
                renderer: function (v) {
                    return {left: '左', center: '中', right: '右'}[v];
                },
                value: 'center'
            },
            fontWeight: {
                displayName: '粗体',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {'bold': '是', normal: '否'}}),
                renderer: function (v) {
                    return {'bold': '是', normal: '否'}[v];
                },
                value: 'normal'
            },
            fontStyle: {
                displayName: '斜体',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {'italic': '是', normal: '否'}}),
                renderer: function (v) {
                    return {'italic': '是', normal: '否'}[v];
                },
                value: 'normal'
            }
        };
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(this, property, value);

        if (value === undefined) {
            return;
        }

        if (property === 'text') {
            this.setText(value);
        }
        if (property === 'color') {
            this.getEl().setStyle({
                color: '#' + value
            });
        }
        if (property === 'backgroundColor') {
            this.getEl().setStyle({
                backgroundColor: '#' + value
            });
        }
        if (property === 'fontFamily') {
            this.getEl().setStyle({
                fontFamily: value
            });
        }
        if (property === 'fontSize') {
            this.getEl().setStyle({
                fontSize: value + 'px',
                lineHeight: value * 3 / 2 + 'px'
            });
        }
        if (property === 'textAlign') {
            this.getEl().setStyle({
                textAlign: value
            });
        }
        if (property === 'fontWeight') {
            this.getEl().setStyle({
                fontWeight: value
            });
        }
        if (property === 'fontStyle') {
            this.getEl().setStyle({
                fontStyle: value
            });
        }
    }
});