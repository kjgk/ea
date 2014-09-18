Ext.define('withub.ext.ea.dataPoint.DataPointField', {
    extend: 'withub.ext.base.TreeCombo',
    alias: 'widget.datapointfield',
    fieldLabel: '数据点',
    url: '/ea/dataPoint/loadTree',
    searchUrl: '/ea/dataPoint/search',
    showPathName: true,
    pathNameDepth: 2,
    enableSearch: true,
    enableCheck: false,
    emptyText: '请选择数据点',

    initComponent: function () {

        var me = this;

        me.searchFields = ['objectId', 'name', 'dataPointTag', 'pointDataValueType'];
        me.searchTemplate = new Ext.XTemplate(
            '<ul class="search-result">',
            '<tpl for=".">',
            '<li class="list-item {[xindex % 2 === 0 ? "even" : "odd"]}">',
            '<div class="name">{name}</div><div class="desc">{dataPointTag}</div>',
            '</li>',
            '</tpl>',
            '</ul>'
        )
        me.searchRender = function (record) {
            var name = record.get('name');
            var dataPointTag = record.get('dataPointTag');
            if (name) {
                return dataPointTag + '(' + name + ')'
            } else {
                return dataPointTag;
            }
        }

        me.on('beforeselect', function (nodeId, objectId, nodeType, record, index) {
            if (!record.data.leaf) {
                return false;
            }
            if (me.enableCheck) {
                return false;
            }
        });

        if (me.enableCheck) {
            me.enableSearch = false;
            me.params = me.params || {};
            Ext.apply(me.params, {check: true});
            me.on('afterrender', function () {
                me.checkValue = [];
                me.getPicker().on('checkchange', function (node, checked) {
                    if (checked) {
                        me.checkValue.push({
                            dataPointId: node.get('objectId'),
                            dataPointName: node.get('text')
                        });
                    } else {
                        Ext.each(me.checkValue, function (value) {
                            if (value['dataPointId'] == node.get('objectId')) {
                                Ext.Array.remove(me.checkValue, value);
                                return false;
                            }
                        });
                    }
                    var values = [];
                    Ext.each(me.checkValue, function (value) {
                        values.push(value['dataPointName'])
                    });
                    me.setRawValue(values.join(','));
                });
            });
        }

        this.callParent();
    }
});