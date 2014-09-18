Ext.define('withub.ext.ea.page.common.DateTimeUnitField', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.datetimeunitfield',
    height: 22,
    layout: 'hbox',
    fieldLabel: null,

    initComponent: function () {

        this.valueField = Ext.create('Ext.form.field.Number', {
            flex: 1,
            minValue: 1
        });

        var timeUnits = {};
        if (this.timeUnits && Ext.isArray(this.timeUnits)) {
            Ext.each(this.timeUnits, function (timeUnit) {
                timeUnits[timeUnit] = TimeNames[timeUnit];
            })
        } else {
            timeUnits = Ext.clone(TimeNames);
        }

        this.unitField = Ext.create('withub.ext.base.ArrayCombo', {
            width: 55,
            data: timeUnits
        });

        this.items = [this.valueField, this.unitField];

        this.callParent();
    },

    reset: function () {
        this.valueField.reset();
    },

    setValue: function (value) {
        if (value) {
            this.valueField.setValue(value.split('|')[0]);
            this.unitField.setValue(value.split('|')[1]);
        }
    },

    getValue: function () {
        return this.valueField.getValue() + '|' + this.unitField.getValue()
    },

    isValid: function () {
        return true;
    }
});