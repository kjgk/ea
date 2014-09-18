Ext.define('withub.ext.ea.widget.WidgetModel', {
    extend: 'Ext.data.Model',
    fields: [
        'objectId',
        'widgetCategory',
        'name',
        'widgetTag',
        'widgetVersion',
        'licenseWidget',
        'license',
        'installTime',
        'allowEvaluate',
        'evaluateExpiredTime',
        'status',
        'description'
    ]
});