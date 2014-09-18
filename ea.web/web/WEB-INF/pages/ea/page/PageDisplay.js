Ext.define('withub.ext.ea.page.PageDisplay', {
    extend: 'Ext.Viewport',
    layout: 'border',
    zIndex: 1000,
    initComponent: function () {

        var me = this;

        this.mainPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'absolute',
            autoScroll: true,
            html: '<div id="backgroundImage" style=" position: absolute; top: 0px; left: 0px; z-index: 1"></div>'
        });

        this.items = [
            this.mainPanel
        ];

        this.callParent();

        this.on('afterrender', function () {
            this.loadWidgets();
            me.backgroundImage = Ext.create('Ext.Img', {
                renderTo: 'backgroundImage',
                src: Ext.BLANK_IMAGE_URL
            });
        }, this);
    },

    createWidget: function (type, config) {
        var me = this;
        var widget = Ext.create(type, Ext.apply({
            style: 'z-index: ' + me.zIndex++
        }, config));

        return widget;
    },

    loadWidgets: function () {
        var me = this;
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/page/load',
            params: {
                objectId: me.pageId,
                menuId: me.menuId
            },
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    var rowGroups = [], offsets = [], pageWidth = me.mainPanel.getWidth();
                    Ext.each(result['items'], function (item) {
                        var widgetConfig = Ext.decode(item['widgetConfig']);
                        offsets.push({
                            id: item['objectId'],
                            p1: item['top'],
                            p2: item['height'] + item['top'],
                            autoFit: widgetConfig['autoFit'] || '0',
                            origin: item
                        });
                    });
                    offsets = Ext.Array.sort(offsets, function (a, b) {
                        return a.p1 - b.p1;
                    });
                    Ext.each(offsets, function (offset) {
                        var flag = true;
                        Ext.each(rowGroups, function (rowGroup) {
                            if (offset.p1 < rowGroup.p2 && offset.p2 > rowGroup.p1) {
                                if (offset.p1 < rowGroup.p1) {
                                    rowGroup.p1 = offset.p1;
                                }
                                if (offset.p2 > rowGroup.p2) {
                                    rowGroup.p2 = offset.p2;
                                }
                                if (offset.autoFit == '1') {
                                    rowGroup.autoFit = '1';
                                }
                                rowGroup.details.push(offset.origin);
                                flag = false;
                                return false;
                            }
                        });
                        if (flag) {
                            rowGroups.push({
                                p1: offset.p1,
                                p2: offset.p2,
                                autoFit: offset['autoFit'],
                                details: [offset.origin]
                            });
                        }
                    });

                    Ext.each(rowGroups, function (rowGroup) {
                        rowGroup.details = Ext.Array.sort(rowGroup.details, function (a, b) {
                            return a.left - b.left;
                        });
                        Ext.each(rowGroup.details, function (detail, index) {
                            if (index == 0) {
                                detail.marginLeft = detail.left;
                            } else {
                                var preItem = rowGroup.details[index - 1];
                                detail.marginLeft = detail.left - (preItem.left + preItem.width);
                            }
                        });
                    });

                    Ext.each(rowGroups, function (rowGroup) {

                        var currentLeft = 0;
                        Ext.each(rowGroup.details, function (detail) {
                            var widget, widgetConfig = Ext.decode(detail['widgetConfig']);
                            var autoFit = widgetConfig['autoFit'];
                            var left = detail['left'], top = detail['top'], width = detail['width'], height = detail['height'];

                            if (rowGroup.autoFit == '1') {
                                left = currentLeft + detail['marginLeft'];
                                if(widgetConfig.autoFit == '1') {
                                    width = pageWidth - detail['marginLeft'] - 10;
                                    Ext.each(rowGroup.details, function (_detail) {
                                        if (detail['objectId'] != _detail['objectId']) {
                                            width -= _detail['width'] + _detail['marginLeft'];
                                        }
                                    });
                                }
                                currentLeft += detail['marginLeft'] + width;
                            }

                            var config = {
                                name: detail['name'],
                                width: width,
                                height: height,
                                x: left,
                                y: top,
                                widgetConfig: widgetConfig
                            };

                            widget = me.createWidget(detail['widgetTag'], config);
                            me.mainPanel.add(widget);
                        });
                    });

                    if (result.data['backgroundImage']) {
                        me.backgroundImage.setSrc(PageContext.contextPath + '/ea/page/backgroundImage/load?fileName=' + result.data['backgroundImage'])
                    }
                    me.backgroundImage.setSize(result.data.width, result.data.height);
                } else {
//                    ExtUtil.Msg.error(result.message);
                }
            },
            scope: this
        });
    }
});