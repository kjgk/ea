Ext.define('withub.ext.ea.page.common.ColorField', {
    extend: 'Ext.form.field.Base',
    alias: 'widget.colorfield',

    getValue: function () {
        return this.value;
    },

    setValue: function (hex) {
        if (Ext.isDefined(hex)) {
            this.value = hex;
            $('#' + this.id + ' input').val(hex);
            $('#' + this.id + ' input').css('backgroundColor', '#' + hex);
            $('#' + this.id).css('backgroundColor', '#' + hex);
            this.initColorPicker();
        } else {
            $('#' + this.id + ' input').css('backgroundColor', '#ffffff');
            $('#' + this.id).css('backgroundColor', '#ffffff');
        }

    },

    initComponent: function () {
        this.fieldSubTpl = '<input type="text" maxlength="6" size="4" readonly ="true" id="colorpickerField" value="' + this.value + '"  style="border:0px;background-color: #' + this.value + '" />';
        this.callParent();
        this.on('afterrender', function () {

        }, this);
    },

    initColorPicker: function () {
        var me = this;
        $('#' + me.id).ColorPicker({
            eventName: 'mouseover',
            color: me.value,
            onShow: function (colpkr) {
                $(colpkr).css({'z-index': 99999});
                $(colpkr).fadeIn(500);
                return false;
            },
            onHide: function (colpkr) {
                $(colpkr).fadeOut(500);
                Ext.form.field.Trigger.superclass.onBlur.call(me);
                return false;
            },
            onChange: function (hsb, hex, rgb) {
                me.setValue(hex);
                me.fireEvent('colorChange', hex);
            }
        });
    }
});



