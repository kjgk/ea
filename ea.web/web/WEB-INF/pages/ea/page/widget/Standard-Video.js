Ext.define('withub.ext.ea.page.widget.Standard-Video', {
    extend: 'Ext.container.Container',
    width: 480,
    height: 320,
    minWidth: 320,
    minHeight: 240,
    layout: 'fit',
    mixins: {
        base: 'withub.ext.ea.page.widget.Base'
    },

    initComponent: function () {

        var me = this;

        me.initWidgetConfig();

        me.callParent(this);

        me.on('afterrender', function () {
            var src = me.getWidgetConfig()['src'];

            me.videoEl = me.getEl().createChild({
                tag: 'video',
                style: 'width:100%; height:100%;',
                children: [
                    {tag: 'source', type: 'video/mp4', autoplay: me.getWidgetConfig()['autoPlay'] == 1 ? 'autoplay' : '',
                        src: src ? PageContext.contextPath + '/ea/page/video/load?fileName=' + src.split('|')[0] : ''}
                ]
            }, null, true);

            me.videoPlayer = new MediaElementPlayer(me.videoEl, {
                videoWidth: me.getWidth(),
                videoHeight: me.getHeight(),
                alwaysShowControls: false,
                loop: me.getWidgetConfig()['loopPlay'] == 1,
                enableControls: me.getWidgetConfig()['enableControls'] == 1,
                videoVolume: 'horizontal',
                success: function (media, node, player) {
                    media.addEventListener('loadstart', function (e) {
                        if (me.getWidgetConfig()['autoPlay'] == 1) {
                            me.videoPlayer.play();
                        }
                    });
                }
            })
        });

        me.on('resize', function (component, width, height) {
            if (me.videoPlayer) {
                me.videoPlayer.setPlayerSize(width, height);
                me.videoPlayer.setControlsSize(width - 150, height);
            }
        });
    },

    getDefaultWidgetConfig: function () {
        return {
            src: {
                displayName: '视频文件',
                editor: Ext.create('withub.ext.common.SwfUploadField', {
                    fieldLabel: null,
                    autoUpload: true,
                    swfUploadConfig: {
                        url: PageContext.contextPath + '/ea/page/video/upload',
                        fileTypes: '*.mp4;'
                    }
                }),
                renderer: function (v) {
                    if (v) {
                        return v.split('|')[1];
                    }
                },
                value: ''
            },
            autoPlay: {
                displayName: '自动播放',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {0: '否', 1: '是'}}),
                renderer: function (v) {
                    return {0: '否', 1: '是'}[v];
                },
                value: 0
            },
            loopPlay: {
                displayName: '循环播放',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {0: '否', 1: '是'}}),
                renderer: function (v) {
                    return {0: '否', 1: '是'}[v];
                },
                value: 0
            },
            enableControls: {
                displayName: '启用控制条',
                editor: Ext.create('withub.ext.base.ArrayCombo', {data: {0: '否', 1: '是'}}),
                renderer: function (v) {
                    return {0: '否', 1: '是'}[v];
                },
                value: 0
            }
        }
    },

    applyWidgetConfig: function (property, value) {

        this.mixins.base.applyWidgetConfig.call(arguments);

        if (property === 'src') {
            if (this.videoPlayer) {
                this.videoPlayer.setSrc(PageContext.contextPath + '/ea/page/video/load?fileName=' + value.split('|')[0]);
            }
        }

        if (property === 'enableControls') {
            if (this.videoPlayer) {
                this.videoPlayer.options.enableControls = value == 1;
            }
        }

    }
});