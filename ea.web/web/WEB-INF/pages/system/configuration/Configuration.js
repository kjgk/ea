Ext.define('withub.ext.system.configuration.Configuration', {
    extend: 'Ext.window.Window',
    width: 520,
    height: 460,
    resizable: false,
    modal: true,
    title: '系统参数配置',
    initComponent: function () {
        this.formPanel = Ext.create('Ext.form.Panel', {
            border: false,
            items: [
                {
                    xtype: 'tabpanel',
                    bodyStyle: 'padding: 5px 10px',
                    border: false,
                    items: [
                        {
                            title: '系统',
                            defaultType: 'textfield',
                            layout: 'anchor',
                            border: false,
                            defaults: {
                                labelWidth: 120,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    fieldLabel: '起始年月',
                                    name: 'systemConfigInfo.beginYear',
                                    allowBlank: false
                                },
                                /*{
                                 fieldLabel: '江森组态监控系统',
                                 name: 'systemConfigInfo.jciUrl',
                                 allowBlank: false
                                 },*/
                                {
                                    fieldLabel: '登录页主题',
                                    name: 'systemConfigInfo.loginPageTheme',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '临时文件路径',
                                    name: 'systemConfigInfo.tempDirectory',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '图片文件路径',
                                    name: 'systemConfigInfo.pictureDirectory',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '视频文件路径',
                                    name: 'systemConfigInfo.videoDirectory',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '报表导出路径',
                                    name: 'systemConfigInfo.reportExportDirectory',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '系统唯一验证码',
                                    name: 'systemConfigInfo.uniqueCode',
                                    allowBlank: false,
                                    readOnly: true
                                } ,
                                {
                                    fieldLabel: '系统授权码',
                                    name: 'systemConfigInfo.authorizationCode',
                                    allowBlank: false,
                                    readOnly: true
                                },
                                {
                                    fieldLabel: '授权时间',
                                    name: 'systemConfigInfo.authorizationTime',
                                    allowBlank: false,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            title: 'EA数据库配置',
                            defaultType: 'textfield',
                            layout: 'anchor',
                            border: false,
                            defaults: {
                                labelWidth: 100,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: '分区表开始年份',
                                    name: 'databaseConfigInfo.pointActualValueTableStartYear',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: '分区表结束年份',
                                    name: 'databaseConfigInfo.pointActualValueTableEndYear',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            title: '天气组件',
                            defaultType: 'textfield',
                            layout: 'anchor',
                            border: false,
                            defaults: {
                                labelWidth: 80,
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '显示',
                                    allowBlank: false,
                                    columns: 6,
                                    items: [
                                        {boxLabel: '是', name: 'weatherConfigInfo.display', inputValue: 1, checked: true},
                                        {boxLabel: '否', name: 'weatherConfigInfo.display', inputValue: 0 }
                                    ]
                                },
                                {
                                    fieldLabel: '城市名',
                                    name: 'weatherConfigInfo.cityName',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '城市代码',
                                    name: 'weatherConfigInfo.cityCode',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: 'WS服务',
                                    name: 'weatherConfigInfo.weatherWebServiceTag',
                                    value: 'WebXml',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '温度数据点(PointID)',
                                    name: 'weatherConfigInfo.humidityDataPoint',
                                    value: '12',
                                    allowBlank: false
                                },
                                {
                                    fieldLabel: '湿度数据点(PointID)',
                                    name: 'weatherConfigInfo.temperatureDataPoint',
                                    value: '13',
                                    allowBlank: false
                                },
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '优先级',
                                    allowBlank: false,
                                    columns: 6,
                                    items: [
                                        {boxLabel: 'Web', name: 'weatherConfigInfo.priority', inputValue: 1, checked: true},
                                        {boxLabel: '数据点', name: 'weatherConfigInfo.priority', inputValue: 0 }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        this.items = [this.formPanel];

        this.buttons = [
            {
                text: '保存',
                handler: function () {
                    var form = this.formPanel.getForm();
                    if (!form.isValid()) {

                        return;
                    }
                    this.doSave();
                },
                scope: this
            },
            {
                text: '取消',
                handler: this.close,
                scope: this
            }
        ];

        this.callParent();


        this.formPanel.getForm().load({
            url: PageContext.contextPath + '/ea/configuration/load',
            method: 'GET'
        });


    },

    doSave: function () {

        var form = this.formPanel.getForm();

        Ext.apply(Ext.form.Basic.prototype, {waitMsgTarget: this.getId()});
        form.submit({
            url: PageContext.contextPath + '/ea/configuration/save',
            success: function (form, action) {
                ExtUtil.Msg.info('保存成功！', function () {
                    this.fireEvent('success');
                    this.close();
                }, this);
            },
            failure: function (form, action) {
                ExtUtil.Msg.error(action.result.message);
            },
            method: 'POST',
            timeout: 60 * 1000,
            scope: this,
            waitMsg: PageContext.waitMsg,
            waitTitle: PageContext.msgTitle
        });
    }
});

