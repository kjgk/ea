Ext.define('withub.ext.ea.dataPoint.DataPointModel', {
    extend: 'Ext.data.Model',
    fields: [
        'objectId',
        'dataPointId',
        'dataPointSliceId',
        'dataPointTag',
        'pointDataType',
        'pointDataValueType',
        'name',
        'original',
        'measureUnit',
        'source',
        'databaseTag'
    ]
});