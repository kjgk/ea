Ext.define('withub.ext.Main', {
    extend: 'Ext.Viewport',
    layout: 'border',
    initComponent: function () {

        this.menuContinerId = Ext.id();
        this.menuPanelWidth = 200;
        this.items = [
            {
                region: 'north',
                height: 43,
                contentEl: 'top-nav',
                border: false
            },
            {
                region: 'center',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyStyle: {
                    background: '#1EA5FF'
                },
                items: [
                    {
                        xtype: 'container',
                        height: 34,
                        border: false,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        bodyStyle: {
                            background: '#1EA5FF'
                        },
                        items: [
                            {
                                id: 'collapseImg',
                                xtype: 'image',
                                src: PageContext.contextPath + '/images/icons/icon3.png',
                                width: 10,
                                style: 'z-index: 99; cursor: pointer; border-bottom: 2px solid #157FCC;'
                            },
                            {
                                itemId: 'tabScrollLeft',
                                xtype: 'container',
                                width: 34,
                                hidden: true,
                                style: 'z-index: 99; background: #1EA5FF; border-bottom: 2px solid #157FCC;',
                                html: '<div class="x-tab-scroller x-tab-scroller-left"></div>'
                            },
                            {
                                itemId: 'tabScrollRight',
                                xtype: 'container',
                                width: 34,
                                hidden: true,
                                style: 'z-index: 99; background: #1EA5FF; border-bottom: 2px solid #157FCC;',
                                html: '<div class="x-tab-scroller x-tab-scroller-right"></div>'
                            },
                            {
                                itemId: 'tabBar',
                                xtype: 'dataview',
                                flex: 1,
                                style: 'background-color: #1EA5FF; border-bottom: 2px solid #157FCC; outline: none;',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['id', 'text', 'attributes'],
                                    proxy: {
                                        type: 'memory',
                                        reader: {
                                            type: 'json',
                                            root: 'nodes'
                                        }
                                    }
                                }),
                                tpl: new Ext.XTemplate(
                                    '<div id="sc" style="width: 5000px; position: absolute; left: 0px;">',
                                    '<tpl for=".">',
                                    '<div class="tab-item">',
                                    '{text}',
                                    '</div>',
                                    '</tpl>',
                                    '</div>'
                                ),
                                listeners: {
                                    select: function (event, record) {
                                        var id = record.get('id');
                                        var text = record.get('text');
                                        var page = record.get('attributes')['page'];
                                        var frame = this.tabPanel.getComponent(id);
                                        if (!frame) {
                                            frame = Ext.create('Ext.ux.IFrame', {
                                                itemId: id,
                                                closable: false,
                                                title: text,
                                                src: PageContext.contextPath + '/loadPage/' + page,
                                                listeners: {
                                                    load: function () {
                                                        if (frame.getWin().location.href.indexOf('login.page') != -1) {
                                                            frame.getWin().parent.location.reload();
                                                        }
                                                    },
                                                    scope: this
                                                }
                                            });
                                            frame.on('afterrender', function () {
                                                frame.el.mask('界面加载中...');
                                            });
                                            this.tabPanel.add(frame);
                                        }
                                        this.tabPanel.getLayout().setActiveItem(frame);
                                        if (this.lastActive) {
                                            this.lastActive.isActive = false;
                                        }
                                        this.lastActive = frame.getWin();
                                        this.lastActive.isActive = true;
                                    },
                                    scope: this
                                },
                                overItemCls: 'tab-item-over',
                                selectedItemCls: 'tab-item-selected',
                                itemSelector: 'div.tab-item'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'tabPanel',
                        flex: 1,
                        layout: 'card',
                        style: 'background: #ffffff;',
                        border: false
                    }
                ]
            },
            {
                itemId: 'menu',
                region: 'west',
                border: false,
                bodyCls: 'menu-content-default',
                autoScroll: true,
                html: '<div style="display: none;" id="' + this.menuContinerId + '">',
                width: this.menuPanelWidth
            }
        ];

        this.callParent();

        this.on('afterrender', function (view) {
            this.menuPanel = view.down('#menu');
            this.tabPanel = view.down('#tabPanel');
            this.tabBar = view.down('#tabBar');
            this.tabScrollRight = view.down('#tabScrollRight');
            this.tabScrollLeft = view.down('#tabScrollLeft');
            Ext.defer(this.initMenu, 20, this);
            this.tabScrollRight.getEl().on('click', function () {
                $('#sc').stop();
                var left = parseInt($('#sc').css('left').replace('px'));
                if (this.tabBar.tabWidth - this.tabBar.getWidth() + left > 200) {
                    left -= 200;
                } else {
                    left = this.tabBar.getWidth() - this.tabBar.tabWidth;
                }
                $('#sc').animate({
                    left: left - 50
                }, 250);
            }, this);
            this.tabScrollLeft.getEl().on('click', function () {
                $('#sc').stop();
                var left = parseInt($('#sc').css('left').replace('px'));
                if (left <= -200) {
                    $('#sc').animate({
                        left: '+=200'
                    }, 200)
                } else {
                    $('#sc').animate({
                        left: 0
                    }, 250)
                }
            }, this);

            var collapseImg = Ext.getCmp('collapseImg');
            collapseImg.getEl().on('click', function () {
                if (collapseImg.collapsed) {
                    this.menuPanel.setWidth(this.menuPanelWidth);
                    this.menuPanel.body.removeCls('menu-content-split');
                    collapseImg.setSrc(PageContext.contextPath + '/images/icons/icon3.png');
                } else {
                    this.menuPanel.setWidth(68);
                    this.menuPanel.body.addCls('menu-content-split');
                    collapseImg.setSrc(PageContext.contextPath + '/images/icons/icon4.png');
                }
                collapseImg.collapsed = !collapseImg.collapsed;
            }, this);
            Ext.defer(this.initHomePage, 20, this);
        }, this)
    },

    initMenu: function () {
        var me = this;
        me.menuPanel.getEl().mask('正在加载菜单...');
        Ext.Ajax.request({
            url: PageContext.contextPath + '/security/loadMenu',
            method: 'GET',
            params: {
                node: 'Root'
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);
                var lastViewId, loadCount = 0, actives = [], totalCount = result['nodes'].length;
                var notExpandArray = [];
                Ext.each(result['nodes'], function (node, index) {
                    var divId = Ext.id();
                    jQuery("#" + me.menuContinerId).append("<h3><a href='#'>" + node.text + "</a></h3>" +
                        "<div id='" + divId + "'></div>");

                    if (!node.expanded) {
                        notExpandArray.push(divId)
                    }
                    Ext.Ajax.request({
                        url: PageContext.contextPath + '/security/loadMenu',
                        method: 'GET',
                        params: {
                            node: node.id
                        },
                        success: function (response) {
                            var result = Ext.decode(response.responseText);
                            var height = result.nodes.length * 30;
                            Ext.create('Ext.view.View', {
                                border: false,
                                autoScroll: false,
                                renderTo: divId,
                                height: height,
                                style: 'outline: none;',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['id', 'text', 'attributes'],
                                    proxy: {
                                        type: 'memory',
                                        reader: {
                                            type: 'json',
                                            root: 'nodes'
                                        }
                                    },
                                    data: result
                                }),
                                tpl: new Ext.XTemplate(
                                    '<tpl for=".">',
                                    '<div class="menu-item">',
                                    '{text}',
                                    '</div>',
                                    '</tpl>'
                                ),
                                listeners: {
                                    select: function (event, record) {
                                        if (lastViewId && lastViewId !== event.view.getId()) {
                                            Ext.getCmp(lastViewId).getSelectionModel().deselectAll();
                                        }
                                        lastViewId = event.view.getId();
                                        me.tabPanel.removeAll();
                                        Ext.Ajax.request({
                                            url: PageContext.contextPath + '/security/loadMenu',
                                            method: 'GET',
                                            params: {
                                                node: record.get('id')
                                            },
                                            success: function (response) {
                                                var result = Ext.decode(response.responseText);
                                                var nodes = [];
                                                if (result.nodes.length === 0) {
                                                    nodes.push({
                                                        text: record.get('text'),
                                                        attributes: record.get('attributes')
                                                    })
                                                } else {
                                                    nodes = result.nodes;
                                                }

                                                me.tabBar.getStore().loadData(nodes);
                                                me.tabBar.select(0);
                                                var width = 0;
                                                jQuery('#sc>.tab-item').each(function () {
                                                    width += $(this).outerWidth();
                                                });
                                                me.tabScrollLeft.setVisible(width > me.tabBar.getWidth());
                                                me.tabScrollRight.setVisible(width > me.tabBar.getWidth());
                                                me.tabBar.tabWidth = width;
                                            }
                                        });
                                    }
                                },
                                overItemCls: 'menu-item-over',
                                selectedItemCls: 'menu-item-selected',
                                itemSelector: 'div.menu-item'
                            });

                            actives.push(index);
                            if (++loadCount === totalCount) {
                                me.menuPanel.getEl().unmask();
                                jQuery("#" + me.menuContinerId).multiOpenAccordion({active: actives}).fadeIn(250);

                                Ext.each(notExpandArray, function (divId) {
                                    jQuery("#" + divId).prev().trigger('click');
                                })

                            }
                        }
                    })
                });
            }
        });
    },

    initHomePage: function () {

        var me = this;
        me.tabPanel.getEl().mask('正在加载首页...');
        Ext.Ajax.request({
            url: PageContext.contextPath + '/system/loadHomePage',
            method: 'GET',
            success: function (response) {
                var homeResult = Ext.decode(response.responseText);
                var homePageId = homeResult.homePageId;
                if (Ext.isEmpty(homePageId)) {
                    me.tabPanel.getEl().unmask();
                    return;
                }
                Ext.Ajax.request({
                    url: PageContext.contextPath + '/security/loadMenu',
                    method: 'GET',
                    params: {
                        node: homePageId
                    },
                    success: function (response) {
                        var MenuResult = Ext.decode(response.responseText);
                        var nodes = [];
                        if (MenuResult.nodes.length === 0) {
                            nodes.push({
                                text: homeResult.homeText,
                                attributes: homeResult.homeAttributes
                            })
                        } else {
                            nodes = MenuResult.nodes;
                        }
                        me.tabPanel.getEl().unmask();
                        me.tabBar.getStore().loadData(nodes);
                        me.tabBar.select(0);
                        var width = 0;
                        jQuery('#sc>.tab-item').each(function () {
                            width += $(this).outerWidth();
                        });
                        me.tabScrollLeft.setVisible(width > me.tabBar.getWidth());
                        me.tabScrollRight.setVisible(width > me.tabBar.getWidth());
                        me.tabBar.tabWidth = width;
                    }
                });
            }
        });
    },

    loadPage: function (config) {
        var me = this;
        var text = config['text'];
        var attributes = config['attributes'];
        var page = attributes['page'];
        var openMode = attributes['openMode'];
        var newWindow = attributes['newWindow'];
        var openMsg = attributes['openMsg'];

        if (!page) {
            return;
        }

        if (newWindow) {
            window.open(PageContext.contextPath + '/loadPage/' + page);
            return;
        }

        if (openMode == 0) {
            Ext.create(page, Ext.apply({
                id: Ext.id() + page,
                title: text
            }, {})).show();
            return;
        }

        var frame = Ext.create('Ext.ux.IFrame', {
            id: Ext.id() + page,
            closable: false,
            title: text,
            src: PageContext.contextPath + '/loadPage/' + page,
            listeners: {
                load: function () {
                    if (frame.getWin().location.href.indexOf('login.page') != -1) {
                        frame.getWin().parent.location.reload();
                    }
                },
                scope: this
            }
        });
        frame.on('afterrender', function () {
            frame.el.mask('界面加载中...');
        });
        me.tabPanel.add(frame);
    }
});

