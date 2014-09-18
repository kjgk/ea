Ext.define('withub.ext.ea.electricityPrice.ElectricityPriceRange', {
    title: '分时电价表',
//    extend: 'Ext.Viewport',
    extend: 'Ext.panel.Panel',
    resizable: false,
    modal: true,
    layout: 'fit',
    baseUrl: '/ea/electricityPriceRange',
    requires: ['withub.ext.ea.electricityPrice.ElectricityPriceRangeModel'],

    initComponent: function () {

        var me = this;

        this.panel = Ext.create('Ext.panel.Panel', {
            bodyPadding: 10,
            border: false,
            autoScroll: true,
            baseCls: 'x-plain',
            frame: true,
            html: ''
        });

        this.items = [this.panel];

        this.callParent();

        this.on('afterrender', function () {
            me.addclickEvent();
        });

        this.on('added', function () {
            me.refreshTableData();
        });

        this.on('afterlayout', function () {
            me.addclickEvent();
        });
    },

    doSave: function () {


        var params = [];

        Ext.each(Ext.select("input[id]").elements, function (element, index) {
            if (!Ext.isEmpty(element.value)) {

                params.push(element.id + "_" + element.value)
            }

        }, this);


        var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在保存...'});
        mask.show();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/electricityPriceRange/save',
            method: 'POST',
            params: {
                electricityPriceRange: params
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);

                if (result.success) {
                    mask.hide();
                    ExtUtil.Msg.info("保存成功");
                } else {
                    mask.hide();
                    ExtUtil.Msg.error(result.message);
                }

            },
            scope: this
        });
    },

    refreshTableData: function () {

        var me = this;
        var table;
        ExtUtil.request({
            async: false,
            params: {
                electricityPriceIssueId: this.electricityPriceIssueId
            },
            url: PageContext.contextPath + '/ea/electricityPriceRange/query',
            method: 'GET',
            success: function (result) {
                table = result.items;
            },
            scope: this
        });

        if (Ext.isDefined(me.panel.body)) {
            me.panel.body.update(table);
        } else {
            me.panel.html = table;
        }


    },

    addclickEvent: function () {

        var me = this;

        jQuery('#electricityPriceRange  td').each(function () {
            jQuery(this).children('div').height(jQuery(this).height());
        });

        jQuery('#electricityPriceRange  div[class =noValue]').each(function () {

            jQuery(this).unbind("click");
            jQuery(this).click(function () {

                Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceDetail', {
                    electricityPriceElementIds: this.id,
                    electricityPriceIssueId: me.electricityPriceIssueId,
                    listeners: {
                        success: function () {
                            me.doLayout();
                            me.refreshTableData();
                            me.fireEvent("afterrender");
                        },
                        scope: this
                    }
                }).show();
            })
        })

        jQuery('#electricityPriceRange  div[class = hasValue]').each(function () {
            jQuery(this).unbind("click");
            jQuery(this).click(function () {

                Ext.Ajax.request({
                    url: PageContext.contextPath + '/ea/electricityPrice/load/' + this.id,
                    method: 'GET',
                    params: {
                        electricityPriceIssueId: me.electricityPriceIssueId
                    },
                    success: function (response) {
                        var result = Ext.decode(response.responseText);
                        var dateTimePriceArray = result['dateTimePriceList']
                        Ext.create('withub.ext.ea.electricityPrice.ElectricityPriceDetail', {
                            electricityPriceElementIds: this.id,
                            electricityPriceIssueId: me.electricityPriceIssueId,
                            dateTimePriceArray: dateTimePriceArray,
                            listeners: {
                                success: function () {
                                    me.doLayout();
                                    me.refreshTableData();
                                    me.fireEvent("afterrender");
                                },
                                scope: this
                            }
                        }).show();
                    },
                    scope: this
                });

            })
        })
    }

});

