Ext.define('withub.ext.ea.reportExport.ReportExportScheduleModel', {
    extend: 'Ext.data.Model',
    fields: [
        'objectId',
        'name',
        'reCurrenceTimeUnit',
        'reCurrenceValue',
        'startDate',
        'reCurringTime',
        'rePortNameTemplate',
        'nextTime',
        'dataPoint',
        'dataPointGroupCategory',
        'exportMeans',
        'exportMax',
        'exportMin',
        'exportOriginal',
        'exportIncrement',
        'decimalCount'
    ]
});

