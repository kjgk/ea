Ext.define('withub.ext.ea.page.widget.Standard-Picture', {
    extend: 'Ext.container.Container',
    width: 480,
    height: 320,
    minWidth: 120,
    minHeight: 120,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },

    initComponent: function () {

        var me = this;

        this.initWidgetConfig();

        this.callParent(this);

        this.on('afterrender', function () {
            if (me.devMode) {
                me.getEl().setStyle({
                    border: '1px solid #88A9C4',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: 'url("' + PageContext.contextPath + '/ea/widget/coverImage/load?widgetTag=Standard-Picture")'
                });
                return;
            }
            me.picturePlayer = jQuery('<ul style="margin: 0px; padding: 0px;"></ul>');
            var pictures = Ext.decode(me.getWidgetConfig()['pictures']);
            pictures = pictures.sort(function (a, b) {
                return a['orderNo'] - b['orderNo']
            });
            Ext.each(pictures, function (picture, e) {
                var src = PageContext.contextPath + '/ea/page/image/load?fileName=' + picture['tempFileName'];
                me.picturePlayer.append('<li>' +
                    '<a class="fancybox" title="' + picture['description'] + '" href="' + src + '&1.jpg">' +
                    '<img alt="" title="' + picture['description'] + '"' +
                    ' style="width: ' + me.getWidth() + 'px; height: ' + me.getHeight() + 'px;"' +
                    ' src="' + src + '" /></a>' +
                    '</li>');
            });
            jQuery('#' + me.getId()).append(me.picturePlayer);

            me.picturePlayer.jDiaporama({
                animationSpeed: "slow",
                delay: me.getWidgetConfig()['interval'],
                paused: me.getWidgetConfig()['autoChange'] == 0,
                status_controls: false
            });

            me.picturePlayer.find('.fancybox').attr('rel', 'gallery').fancybox({
                helpers: {
                    title: {
                        type: 'inside'
                    },
                    thumbs: {
                        width: 50,
                        height: 50
                    }
                }
            });

        });


        this.on('resize', function (component, width, height) {
        });
    },

    getDefaultWidgetConfig: function () {
        return {
            pictures: {
                displayName: '图片文件',
                editor: Ext.create('withub.ext.ea.page.common.SwfUploadList', {}),
                renderer: this.propertyRender.swfUpload,
                value: ''
            },
            autoChange: {
                displayName: '是否自动切换',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {1: '是', 0: '否'}}),
                renderer: function (v) {
                    return {1: '是', 0: '否'}[v];
                },
                value: 1
            },
            interval: {
                displayName: '图片切换间隔',
                editor: Ext.create('Ext.form.field.Number', {
                    allowDecimals: false,
                    selectOnFocus: true,
                    minValue: 1
                }),
                renderer: function (v) {
                    return v + '秒'
                },
                value: 5
            }
        }
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(arguments);

    }
});