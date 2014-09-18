Ext.define('withub.ext.ea.metasysDatabase.MetasysDatabaseModel', {
    extend: 'Ext.data.Model',
    fields: [
        'objectId',
        'name',
        'databaseTag',
        'hostIp',
        'port',
        'instanceName',
        'databaseName',
        'userName',
        'password',
        'timeNode'
    ]
});