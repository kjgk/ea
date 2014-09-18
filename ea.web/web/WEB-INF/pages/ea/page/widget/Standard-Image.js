Ext.define('withub.ext.ea.page.widget.Standard-Image', {
    extend: 'Ext.Img',
    width: 120,
    height: 80,
    cls: 'standard-image',
    autoEl: 'div',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },

    initComponent: function () {


        this.initWidgetConfig();

        this.callParent(this);

        this.on('resize', function (component, width, height) {
            this.imgEl.setSize(width - 2, height - 2);
        }, this);
    },

    getDefaultWidgetConfig: function () {
        return {
            src: {
                displayName: '图片',
                editor: Ext.create('withub.ext.common.SwfUploadField', {
                    fieldLabel: null,
                    height: 22,
                    swfUploadConfig: {
                        url: PageContext.contextPath + '/ea/page/image/upload',
                        fileTypes: '*.bmp;*.png;*.jpg;*.jpeg;*.gif;'
                    },
                    reset: function () {
                        this.infoText.reset();
                        this.value = undefined;
                    },
                    setValue: function (value) {
                        this.infoText.setValue(value.split('|')[1]);
                        this.value = value;
                    },
                    getValue: function () {
                        return this.value;
                    },
                    isValid: function () {
                        return true;
                    },
                    listeners: {
                        filequeued: function () {
                            this.doUpload(function (result) {
                                this.setValue(result['tempFileName'] + '|' + result['fileName'])
                            }, this)
                        }
                    }
                }),
                renderer: function (v) {
                    if (v) {
                        return v.split('|')[1];
                    }
                },
                value: ''
            },
            href: {
                displayName: '链接',
                editor: Ext.create('withub.ext.base.TreeCombo', {
                    url: '/ea/page/loadTree',
                    treeWidth: 240
                }),
                value: '',
                renderer: ExtUtil.asyncRenderer('/ea/page/loadPageName')
            }
        }
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(arguments);

        if (property === 'src') {
            this.setSrc(PageContext.contextPath + '/ea/page/image/load?fileName=' + value.split('|')[0]);
        }

        if (property === 'href') {
            if (this.devMode || !value) {
                return;
            }
            var el = this.getEl();
            el.setStyle({
                cursor: 'pointer'
            });
            el.un('click');
            el.on('click', function () {
                window.location.href = PageContext.contextPath + '/loadPage/withub.ext.ea.page.PageDisplay?menuId=' + value;
            });
        }
    }
});