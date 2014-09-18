Ext.define('withub.ext.ea.dataCollectConfig.DataCollectConfigModel', {
    extend: 'Ext.data.Model',
    fields: [
        'objectId',
        'databaseTag',
        'tableName',
        'historyDataStartUtcDateTime',
        'historyDataEndUtcDateTime',
        'historyDataLastCollectTime',
        'enableHistoryDataCollect',
        'startUtcDateTime',
        'lastCollectTime',
        'enableCollect'
    ]
});