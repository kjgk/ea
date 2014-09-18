Ext.define('withub.ext.common.ColorSelector', {
    extend: 'Ext.Component',
    width: 80,
    height: 22,
    alias: 'widget.colorSelector',

    getValue: function () {
        return this.value;
    },

    setValue: function (hex) {
        this.value = hex;
        this.colorPicker.css('backgroundColor', '#' + hex);
    },

    initComponent: function () {

        this.callParent(arguments);

        this.on('afterrender', this.initColorPicker, this);
    },

    initColorPicker: function (component) {
        var me = this;
        me.colorPicker = $('#' + me.getId()).ColorPicker({
            color: me.value,
            onShow: function (colpkr) {
                $(colpkr).css({'z-index': 99999});
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                me.setValue(hex);
            }
        });
        me.colorPicker.css('cursor', 'pointer');
        if (me.value) {
            me.colorPicker.css('backgroundColor', '#' + me.value);
        }
    }
});