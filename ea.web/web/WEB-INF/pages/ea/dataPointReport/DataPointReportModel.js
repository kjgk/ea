Ext.define('withub.ext.ea.dataPointReport.DataPointReportModel', {
    extend: 'Ext.data.Model',
    fields: [
        'pointId',
        'dataPointName',
        'dataPointTag',
        'source',
        'actualValue',
        'utcDateTime'
    ]
});