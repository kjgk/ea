Ext.define('withub.ext.ea.page.PageDesigner', {
    extend: 'Ext.Viewport',
    layout: 'border',
    zIndex: 1000,
    initComponent: function () {

        var me = this;

        this.widgetPanel = Ext.create('Ext.tab.Panel', {
            title: '组件',
            tabPosition: 'right',
            region: 'east',
            width: 200,
            flex: 1
        });

        this.propertyPanel = Ext.create('Ext.grid.property.Grid', {
            title: '属性',
            minHeight: 280,
            flex: 1,
            nameColumnWidth: 120,
            sortableColumns: false,
            source: {},
            hideHeaders: true,
            listeners: {
                propertychange: function (source, field, value, oldValue) {
                    var widget = me.getCurrentWidget();
                    if (widget) {
                        if (field == 'name') {
                            widget.name = value;
                            var currentWidgetButton = me.mainPanel.down('#currentWidgetButton');
                            currentWidgetButton.setText('当前组件：' + widget.name);
                        } else if (field == 'width' && widget.getWidth() != value) {
                            widget.setWidth(value);
                        } else if (field == 'height' && widget.getHeight() != value) {
                            widget.setHeight(value);
                        } else if (field == 'position') {
                            widget.setPosition(parseInt(value.split(',')[0], 10), parseInt(value.split(',')[1], 10), false);
                        } else {
                            widget.getWidgetConfig()[field] = value;
                            widget.fireEvent('widgetconfigchange', field, value);
                        }
                    }
                }
            }
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: '保存',
            handler: function () {
                this.savePage(function () {
                    ExtUtil.Msg.info('保存成功！');
                });
            },
            scope: this
        });

        this.previewButton = Ext.create('Ext.Button', {
            text: '预览',
            handler: function () {
                this.savePage(function () {
                    window.open(PageContext.contextPath + '/loadPage/withub.ext.ea.page.PageDisplay?menuId=' + me.menuId
                        , 'PageDisplay', 'height=' + me.mainPanel.getHeight() + ',width=' + me.mainPanel.getWidth() + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
                });
            },
            scope: this
        });

        this.mainPanel = Ext.create('Ext.panel.Panel', {
            region: 'center',
            layout: 'absolute',
            border: false,
            autoScroll: true,
            html: '<div id="backgroundImage" style=" position: absolute ;top: 0px; left: 0px; z-index: 1"></div>',
            tbar: [
                {
                    iconCls: 'icon-import',
                    text: '导入模版',
                    handler: function () {
                        var menuId = this.menuId;
                        var me = this;
                        ExtUtil.Msg.confirm('该操作将清空原有布局，确认导入?', function (select) {
                            if (select === 'no') {
                                return;
                            }
                            var wind = Ext.create('Ext.Window', {
                                title: '导入模版',
                                width: 320,
                                height: 85,
                                modal: true,
                                border: false,
                                layout: 'fit',
                                buttonAlign: 'center',
                                items: [Ext.create('Ext.form.Panel', {
                                    bodyPadding: 10,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'swfuploadfield',
                                            name: 'attachment',
                                            fieldLabel: '选择模版',
                                            labelWidth: 60,
                                            anchor: '100%',
                                            height: 24,
                                            swfUploadConfig: {
                                                url: PageContext.contextPath + '/ea/page/importTemplate/upload',
                                                fileTypes: '*.jci;',
                                                fileTypesDescription: '所有模版'
                                            },
                                            listeners: {
                                                filequeued: function () {
                                                    this.doUpload(function (result) {
                                                        wind.close();
                                                        var fileName = result['fileName'];
                                                        var mask = new Ext.LoadMask(Ext.getBody(), {
                                                            msg: '正在导入，请稍候...'
                                                        });
                                                        mask.show();
                                                        Ext.Ajax.request({
                                                            method: 'GET',
                                                            url: PageContext.contextPath + '/ea/page/importTemplate',
                                                            params: {
                                                                menuId: menuId,
                                                                fileName: fileName
                                                            },
                                                            success: function (response) {
                                                                mask.hide();
                                                                var result = Ext.decode(response.responseText);
                                                                if (result.success) {
                                                                    ExtUtil.Msg.info("导入成功！");
                                                                    me.mainPanel.removeAll();
                                                                    me.loadWidgetTree();
                                                                    me.loadWidgets();
                                                                    me.backgroundImage = Ext.create('Ext.Img', {
                                                                        renderTo: 'backgroundImage',
                                                                        src: Ext.BLANK_IMAGE_URL,
                                                                        width: 1000,
                                                                        height: 600
                                                                    });
                                                                } else {
                                                                    ExtUtil.Msg.error(result['message']);
                                                                }
                                                            }
                                                        });
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                })]
                            }).show();
                        });
                    },
                    scope: this
                },
                {
                    iconCls: 'icon-export',
                    text: '导出模版',
                    handler: function () {
                        var menuId = this.menuId;
                        this.savePage(function () {
                            ExtUtil.Msg.confirm('确认导出该布局?', function (select) {
                                if (select === 'no') {
                                    return;
                                }
                                ExtUtil.exportData({
                                    title: '模版下载',
                                    url: '/ea/page/exportTemplate',
                                    params: {
                                        menuId: menuId
                                    }
                                });
                            });
                        });
                    },
                    scope: this
                },
                {
                    iconCls: 'icon-image',
                    text: '设置背景图片',
                    handler: function () {
                        var wind = Ext.create('Ext.Window', {
                            title: '设置背景图片',
                            width: 320,
                            height: 85,
                            modal: true,
                            border: false,
                            layout: 'fit',
                            buttonAlign: 'center',
                            items: [
                                Ext.create('Ext.form.Panel', {
                                    bodyPadding: 10,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'swfuploadfield',
                                            name: 'attachment',
                                            fieldLabel: '选择图片',
                                            labelWidth: 60,
                                            anchor: '100%',
                                            height: 24,
                                            swfUploadConfig: {
                                                url: PageContext.contextPath + '/ea/page/backgroundImage/upload',
                                                fileTypes: '*.jpg;*.jpeg;*.png;*.gif;*.bmp;',
                                                fileTypesDescription: '所有图片'
                                            },
                                            listeners: {
                                                filequeued: function () {
                                                    var form = this.up('form').getForm();
                                                    this.doUpload(function (result) {
                                                        me.backgroundImageFileName = result['fileName'];
                                                        me.backgroundImage.setSrc(PageContext.contextPath + '/ea/page/backgroundImage/load?fileName=' + me.backgroundImageFileName);
                                                        wind.close();
                                                    });
                                                }
                                            }
                                        }
                                    ]
                                })
                            ]
                        }).show();
                    }
                },
                {
                    iconCls: 'icon-wrench',
                    text: '设置分辨率',
                    handler: function () {
                        var wind = Ext.create('Ext.window.Window', {
                            bodyPadding: 10,
                            layout: 'form',
                            width: 320,
                            height: 140,
                            modal: true,
                            title: '设置分辨率',
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: '宽度',
                                    itemId: 'width',
                                    allowBlank: false,
                                    minValue: 100,
                                    maxValue: 9999,
                                    anchor: '100%',
                                    value: me.backgroundImage.getWidth()
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: '高度',
                                    itemId: 'height',
                                    allowBlank: false,
                                    allowDecimals: false,
                                    minValue: 100,
                                    maxValue: 9999,
                                    anchor: '100%',
                                    value: me.backgroundImage.getHeight()
                                }
                            ],
                            buttons: [
                                {
                                    text: '确定',
                                    handler: function () {
                                        var width = wind.down('#width');
                                        var height = wind.down('#height');
                                        if (width.isValid() && height.isValid()) {
                                            me.backgroundImage.setSize(width.getValue(), height.getValue());
                                            wind.close();
                                        }
                                    }
                                },
                                {
                                    text: '关闭',
                                    handler: function () {
                                        wind.close();
                                    }
                                }
                            ]
                        });
                        wind.show();
                    }
                },
                '-',
                {
                    itemId: 'currentWidgetButton',
                    text: '',
                    hidden: true,
                    menu: [
                        {
                            text: '复制',
                            iconCls: 'icon-copy',
                            handler: function () {
                                var currentWidget = me.getCurrentWidget();
                                var newWidget = me.createWidget(currentWidget.self.getName(), {
                                    name: currentWidget.name + '-副本',
                                    height: currentWidget.getHeight(),
                                    width: currentWidget.getWidth(),
                                    widgetConfig: Ext.clone(currentWidget.widgetConfig)
                                });
                                me.mainPanel.add(newWidget);
                                me.selectWidget(newWidget);
                                newWidget.center();
                            },
                            scope: me
                        },
                        {
                            text: '删除',
                            iconCls: 'icon-delete',
                            handler: me.deleteCurrentWidget,
                            scope: me
                        }
                    ]
                }
            ],
            listeners: {
                render: function (panel) {
                    var body = panel.body;
                    var dropTarget = new Ext.dd.DropTarget(body, {
                        ddGroup: 'ddd',
                        notifyEnter: function (ddSource, e, data) {
                            body.stopAnimation();
                        },
                        notifyDrop: function (ddSource, e, data) {
                            var record = ddSource.dragData.records[0];
                            if (record.get('attributes')['licenseValid'] == false) {
//                                ExtUtil.Msg.error('该组件未被授权，无法使用！');
//                                return false;
                            }
                            var widgetTag = 'withub.ext.ea.page.widget.' + record.get('attributes')['widgetTag'];
                            var widget;
                            var config = {
                                name: record.get('text'),
                                x: e.getX() + 8,
                                y: e.getY() - 20
                            }
                            widget = me.createWidget(widgetTag, config);
                            panel.add(widget);
                            me.selectWidget(widget);
                            return true;
                        }
                    });
                }
            }
        });

        this.items = [
            this.mainPanel,
            {
                xtype: 'container',
                region: 'east',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                width: 220,
                border: false,
                split: true,
                items: [
                    this.widgetPanel,
                    {
                        xtype: 'splitter'
                    },
                    this.propertyPanel,
                    {
                        height: 48,
                        border: false,
                        layout: {
                            type: 'hbox',
                            padding: '5',
                            align: 'stretch'
                        },
                        defaults: {margins: '0 5 0 5', flex: 1},
                        items: [this.previewButton, this.saveButton]
                    }
                ]
            }
        ];

        this.callParent();

        this.on('afterrender', function () {
            this.loadWidgetTree();
            this.loadWidgets();
            me.backgroundImage = Ext.create('Ext.Img', {
                renderTo: 'backgroundImage',
                width: 1000,
                height: 600,
                src: Ext.BLANK_IMAGE_URL
            });
            me.getEl().addKeyMap({
                key: Ext.EventObject.DELETE,
                fn: function (keyCode, event) {
                    window.console.log(event.getTarget().id)
                    if (me.currentSelected && event.getTarget().id === Ext.getBody().id) {
                        me.deleteCurrentWidget();
                    }
                }
            });
        }, this);
    },

    loadWidgetTree: function () {
        var me = this;
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/widget/getAllValidWidget',
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    Ext.each(result.items, function (item) {
                        var treePanel = Ext.create('Ext.tree.Panel', {
                            title: item.name,
                            border: false,
                            lines: false,
                            store: Ext.create('Ext.data.TreeStore', {
                                fields: ['id', 'text', 'attributes'],
                                root: {
                                    expanded: true,
                                    children: item['widgets']
                                }
                            }),
                            rootVisible: false,
                            viewConfig: {
                                plugins: {
                                    ptype: 'treeviewdragdrop',
                                    enableDrag: true,
                                    enableDrop: false,
                                    ddGroup: 'ddd'
                                }
                            }
                        });
                        me.widgetPanel.add(treePanel);
                    });
                    me.widgetPanel.setActiveTab(0);
                } else {
                    ExtUtil.Msg.error(result.message);
                }
            },
            scope: this
        });

    },

    createWidget: function (type, config) {
        var me = this;
        var widget = Ext.create(type, Ext.apply({
            devMode: true,
            resizable: true,
            draggable: true,
            style: 'z-index: ' + me.zIndex++,
            listeners: {
                resize: function (component, width, height) {
                    if (me.currentSelected == widget.getId()) {
                        if (me.propertyPanel.getSource()['width'] != width) {
                            me.propertyPanel.setProperty('width', width);
                        }
                        if (me.propertyPanel.getSource()['height'] != height) {
                            me.propertyPanel.setProperty('height', height);
                        }
                    }
                },
                afterrender: function () {
                    widget.getEl().on('mousedown', function (element) {
                        if (widget.getId() == me.currentSelected) {
                            return;
                        }
                        me.selectWidget(widget);
                    });
                },
                boxready: function () {
                    widget.dd.on('dragend', function () {
                        me.propertyPanel.setProperty('position', widget.getPosition(true).join(','));
                    });
                    widget.dd.on('drag', function (tracker, event) {
                        var widgetPosition = widget.getPosition(true);
                        var offsets = [
                            [0 , 0]
                        ], newPosition = Ext.clone(widgetPosition), flag = false;
                        Ext.each(me.mainPanel.items, function (v, index) {
                            var item = me.mainPanel.getComponent(index);
                            if (widget.getId() !== item.getId()) {
                                var position = item.getPosition(true);
                                offsets.push(position);
                                offsets.push([position[0] + item.getWidth(), position[1] + item.getHeight()]);
                            }
                        });

                        for (var i = 0; i < offsets.length; i++) {
                            var offset = offsets[i];
                            if (Math.abs(widgetPosition[0] - offset[0]) <= 5) {
                                newPosition[0] = offset[0];
                                flag = true;
                                break;
                            }
                        }
                        for (var i = 0; i < offsets.length; i++) {
                            var offset = offsets[i];
                            if (Math.abs(widgetPosition[1] - offset[1]) <= 5) {
                                newPosition[1] = offset[1];
                                flag = true;
                                break;
                            }
                        }
                        if (flag) {
                            widget.setPosition(newPosition[0], newPosition[1], false);
                        }
                    });
                },
                textchange: function (value) {
                    if (me.propertyPanel.getSource()['position'] == widget.getPosition(true).join(',')) {
                        me.propertyPanel.setProperty('text', value);
                    }
                },
                destroy: function () {
                    me.propertyPanel.setSource({});
                }
            }
        }, config));


        return widget;
    },

    selectWidget: function (widget) {
        var me = this;
        widget.getEl().dom.style.zIndex = me.zIndex++;
        me.currentSelected = widget.getId();
        var source = {
            name: widget.name,
            width: widget.getWidth(),
            height: widget.getHeight(),
            position: widget.getPosition(true).join(','),
            autoFit: widget.getWidgetConfig()['autoFit'] || '0'
        };
        var sourceConfig = {
            name: {
                displayName: '组件名称'
            },
            width: {
                displayName: '宽度',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 1500, allowBlank: false, allowDecimals: false})
            },
            height: {
                displayName: '高度',
                editor: Ext.create('Ext.form.field.Number', {minValue: 1, maxValue: 1000, allowBlank: false, allowDecimals: false})
            },
            position: {
                displayName: '位置',
                editor: Ext.create('Ext.form.field.Text', {
                    enableKeyEvents: true,
                    allowBlank: false,
                    listeners: {
                        keydown: function (field, e) {
                            if (e.getKey() >= 48 && e.getKey() <= 57 || e.getKey() == 188 || e.isSpecialKey()) {
                            } else {
                                e.stopEvent();
                            }
                        }
                    }
                })
            },
            autoFit: {
                displayName: '自动拉伸',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                renderer: function (v) {
                    return {1: '是', 0: '否'}[v];
                },
                value: 0
            }
        }

        var widgetConfig = {}
        for (var key in widget.getDefaultWidgetConfig()) {
            widgetConfig[key] = widget.getWidgetConfig()[key]
        }
        Ext.apply(source, widgetConfig);

        Ext.apply(sourceConfig, widget.getDefaultWidgetConfig());

        me.propertyPanel.setSource(source, sourceConfig);

        var currentWidgetButton = me.mainPanel.down('#currentWidgetButton');
        currentWidgetButton.setText('当前组件：' + widget.name);
        currentWidgetButton.setVisible(true);
    },

    deleteCurrentWidget: function () {
        var me = this;
        ExtUtil.Msg.confirm('确认删除?', function (select) {
            if (select === 'yes') {
                me.getCurrentWidget().destroy();
                me.currentSelected = undefined;
                var currentWidgetButton = me.mainPanel.down('#currentWidgetButton');
                currentWidgetButton.setText('');
                currentWidgetButton.setVisible(false);
            }
        });
    },

    getCurrentWidget: function () {

        return Ext.getCmp(this.currentSelected);
    },

    loadWidgets: function () {
        var me = this;
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/page/load?menuId=' + me.menuId,
            method: 'GET',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.data == undefined) {
                    return;
                }
                if (result.success) {
                    me.pageId = result.data['objectId'];
                    Ext.each(result['items'], function (item) {
                        var widget;
                        var config = {
                            name: item['name'],
                            width: item['width'],
                            height: item['height'],
                            x: item['left'],
                            y: item['top'],
                            widgetConfig: Ext.decode(item['widgetConfig'])
                        };
                        widget = this.createWidget(item['widgetTag'], config);
                        this.mainPanel.add(widget);
                    }, this);
                    if (result.data['backgroundImage']) {
                        me.backgroundImage.setSrc(PageContext.contextPath + '/ea/page/backgroundImage/load?fileName=' + result.data['backgroundImage'])
                    }
                    me.backgroundImage.setSize(result.data.width, result.data.height);
                } else {
                    ExtUtil.Msg.error(result.message);
                }
            },
            scope: this
        });
    },

    savePage: function (callback) {
        var me = this;
        var params = {
            objectId: this.pageId,
            'menu.objectId': this.menuId,
            width: me.backgroundImage.getWidth(),
            height: me.backgroundImage.getHeight(),
            backgroundImage: me.backgroundImageFileName
        };
        Ext.each(this.mainPanel.items, function (item, index) {
            var widget = this.mainPanel.getComponent(index);
            var widgetTag = widget.self.getName();
            params['pageWidgetList[' + index + '].name'] = widget.name;
            params['pageWidgetList[' + index + '].widgetTag'] = widgetTag;
            params['pageWidgetList[' + index + '].width'] = widget.getWidth();
            params['pageWidgetList[' + index + '].height'] = widget.getHeight();
            params['pageWidgetList[' + index + '].left'] = widget.getPosition(true)[0];
            params['pageWidgetList[' + index + '].top'] = widget.getPosition(true)[1];
            params['pageWidgetList[' + index + '].widgetConfig'] = Ext.encode(widget.getWidgetConfig());

        }, this);
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/page/save',
            params: params,
            method: 'POST',
            success: function (response) {
                var result = Ext.decode(response.responseText);
                if (result.success) {
                    callback.call();
                } else {
                    ExtUtil.Msg.error(result['message']);
                }
            }
        });
    }
});


Ext.define(null, {

    override: 'Ext.Editor',

    mimicComplete: function (event, element) {

        if (!this.field.getEl().contains(Ext.get(element)) && !Ext.get(element).hasCls('x-boundlist-item')) {
            this.completeEdit();
        }
    },

    initComponent: function () {
        var me = this,
            field = me.field = Ext.ComponentManager.create(me.field, 'textfield');

        Ext.apply(field, {
            inEditor: true,
            msgTarget: field.msgTarget == 'title' ? 'title' : 'qtip'
        });

        if (field.getXType() === 'datetimeunitfield' || field.getXType() === 'swfuploadfield') {
            Ext.each(field.items, function (item, index) {
                var item = field.getComponent(index);
                me.mon(item, {
                    scope: me,
                    specialkey: me.onSpecialKey
                });
            }, this);
            me.mon(Ext.getDoc(), {
                mousewheel: me.mimicComplete,
                mousedown: me.mimicComplete,
                scope: me
            });
        } else {
            me.mon(field, {
                scope: me,
                blur: {
                    fn: me.onFieldBlur,
                    // slight delay to avoid race condition with startEdits (e.g. grid view refresh)
                    delay: 1
                },
                specialkey: me.onSpecialKey
            });
        }

        if (field.grow) {
            me.mon(field, 'autosize', me.onFieldAutosize, me, {delay: 1});
        }
        me.floating = {
            constrain: me.constrain
        };
        me.items = field;

        me.callParent(arguments);

        me.addEvents(
            'beforestartedit',
            'startedit',
            'beforecomplete',
            'complete',
            'canceledit',
            'specialkey'
        );
    },
    beforeDestroy: function () {
        var me = this;

        Ext.getDoc().un('mousewheel', me.mimicComplete, me);
        Ext.getDoc().un('mousedown', me.mimicComplete, me);

        Ext.destroy(me.field);
        delete me.field;
        delete me.parentEl;
        delete me.boundEl;

        me.callParent(arguments);
    }
});