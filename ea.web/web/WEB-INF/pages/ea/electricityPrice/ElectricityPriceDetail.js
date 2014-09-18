Ext.define('withub.ext.ea.electricityPrice.ElectricityPriceDetail', {
    title: '电价设置',
    extend: 'Ext.Window',
    resizable: false,
    modal: true,
    bodyStyle: 'background-color: #ffffff',
    autoScroll: true,
    width: 460,
    height: 500,
    layout: 'fit',

    initComponent: function () {

        var me = this;

        var dateTimePriceArray = this.dateTimePriceArray;

        var timeStr = '';
        for (var i = 0; i < 48; i++) {
            if (i % 2 == 0) {
                var time = me.addZero(parseInt(i / 2) + ":00", 5)
                timeStr += '<option value="' + time + '">' + time + '</option>'
            } else {
                var time = me.addZero(parseInt(i / 2) + ":30", 5)
                timeStr += '<option value="' + time + '">' + time + '</option>'
            }

        }

        var dayOption = '';

        for (var i = 1; i <= 31; i++) {
            dayOption += '<option value="' + i + '" >' + i + '</option>'
        }

        var form = ''
            + '<form id="electricityPriceDetail" style="margin-top: 25px">'
            + '<fieldset class="pricefieldset" style="margin-top: 5px;display: none;" >'

            + '<label >电价(元/度)</label>'
            + '<input type="text" name="price">'
            + '<input type="button" class="dategroupbutton btn btn-mini" value="添加时间组">'
            + '<input type="button" class="deletepricefieldsetbutton btn btn-mini" value="删除">'

            + '<fieldset class="datefieldset"  style="margin-top: 5px;">'
            + '<table border="0">'

            + '<tbody>'

            + '<tr class="datetr">'
            + '<td>'
            + '<label >日期</label>'
            + '<select class="month" name="startMonth" >'
            + '<option value="1" >1月</option>'
            + '<option value="2" >2月</option>'
            + '<option value="3" >3月</option>'
            + '<option value="4" >4月</option>'
            + '<option value="5" >5月</option>'
            + '<option value="6" >6月</option>'
            + '<option value="7" >7月</option>'
            + '<option value="8" >8月</option>'
            + '<option value="9" >9月</option>'
            + '<option value="10" >10月</option>'
            + '<option value="11" >11月</option>'
            + '<option value="12" >12月</option>'
            + '</select> '

            + '<select class="day" name="startDay"> '
            + dayOption
            + '</select>  '
            + '</td>'
            + '<td>'
            + '<label>至</label>'
            + '<select class="month" name="endMonth">'
            + '<option value="1" >1月</option>'
            + '<option value="2" >2月</option>'
            + '<option value="3" >3月</option>'
            + '<option value="4" >4月</option>'
            + '<option value="5" >5月</option>'
            + '<option value="6" >6月</option>'
            + '<option value="7" >7月</option>'
            + '<option value="8" >8月</option>'
            + '<option value="9" >9月</option>'
            + '<option value="10" >10月</option>'
            + '<option value="11" >11月</option>'
            + '<option value="12" >12月</option>'
            + '</select> '

            + '<select class="day" name="endDay"> '
            + dayOption
            + '</select>  '
            + '</td>'
            + '<td>'
            + '<input type="button" class="datebutton  btn btn-mini" value="添加">'
            + '</td>'
            + '<td>'
            + '<input type="button" class="deletebutton  btn btn-mini" value="删除">'
            + '</td>'
            + '</tr>'

            + '<tr class="timetr">'
            + '<td>'
            + '<label >时间</label>'
            + '<select class="time" name="startTime">'
            + timeStr
            + '</select> '
            + '</td>'
            + '<td>'
            + '<label>至</label>'
            + '<select class="time" name="endTime">'
            + timeStr
            + '</select> '
            + '</td>'
            + '<td>'
            + '<input type="button" class="timebutton  btn btn-mini" value="添加">'
            + '</td>'
            + '<td>'
            + '<input type="button" class="deletebutton  btn btn-mini" value="删除">'
            + '</td>'
            + '</tr>'

            + '</tbody>'
            + '</table>'
            + '</fieldset>'

            + '</fieldset>'


            + '<fieldset class="pricefieldset" style="margin-top: 5px;" >'

            + '<label >电价(元/度)</label>'
            + '<input type="text" name="price">'
            + '<input type="button" class="dategroupbutton  btn btn-mini" value="添加时间组">'

            + '<fieldset class="datefieldset"  style="margin-top: 5px;" >'
            + '<table border="0">'
            + '<tbody>'

            + '<tr class="datetr">'
            + '<td>'
            + '<label >日期</label>'

            + '<select class="month" name="startMonth" >'
            + '<option value="1" >1月</option>'
            + '<option value="2" >2月</option>'
            + '<option value="3" >3月</option>'
            + '<option value="4" >4月</option>'
            + '<option value="5" >5月</option>'
            + '<option value="6" >6月</option>'
            + '<option value="7" >7月</option>'
            + '<option value="8" >8月</option>'
            + '<option value="9" >9月</option>'
            + '<option value="10" >10月</option>'
            + '<option value="11" >11月</option>'
            + '<option value="12" >12月</option>'
            + '</select> '

            + '<select class="day" name="startDay"> '
            + dayOption
            + '</select>  '

            + '</td>'
            + '<td>'
            + '<label>至</label>'

            + '<select class="month" name="endMonth">'
            + '<option value="1" >1月</option>'
            + '<option value="2" >2月</option>'
            + '<option value="3" >3月</option>'
            + '<option value="4" >4月</option>'
            + '<option value="5" >5月</option>'
            + '<option value="6" >6月</option>'
            + '<option value="7" >7月</option>'
            + '<option value="8" >8月</option>'
            + '<option value="9" >9月</option>'
            + '<option value="10" >10月</option>'
            + '<option value="11" >11月</option>'
            + '<option value="12" >12月</option>'
            + '</select> '

            + '<select class="day" name="endDay"> '
            + dayOption
            + '</select>  '

            + '</td>'
            + '<td>'
            + '<input type="button" class="datebutton  btn btn-mini" value="添加">'
            + '</td>'
            + '</tr>'

            + '<tr class="timetr">'
            + '<td>'
            + '<label >时间</label>'
            + '<select class="time" name="startTime">'
            + timeStr
            + '</select> '
            + '</td>'
            + '<td>'
            + '<label>至</label>'
            + '<select class="time" name="endTime">'
            + timeStr
            + '</select> '
            + '</td>'
            + '<td>'
            + '<input type="button" class="timebutton btn btn-mini" value="添加">'
            + '</td>'
            + '</tr>'

            + '</tbody>'
            + '</table>'
            + '</fieldset>'
            + '</fieldset>'

            + '</form>';

        this.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            border: false,
            baseCls: 'x-plain',
            defaultType: 'textfield',
            autoScroll: true,
            dockedItems: {
                itemId: 'toolbar',
                xtype: 'toolbar',
                items: [
                    {
                        text: '添加电价',
                        iconCls: 'icon-add',
                        scope: this,
                        handler: this.onAddGroupClick
                    }
                ]
            },
            html: form
        });

        this.items = [this.formPanel];

        this.buttons = [
            {
                text: '保存',
                handler: function () {
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

        this.on('afterrender', function () {

            jQuery('#electricityPriceDetail  select[class *=month]').each(function () {
                jQuery(this).change(function () {

                    var date = new Date();
                    var days = moment(date.getFullYear() + "-" + this.value, "YYYY-MM").daysInMonth();
                    var day = jQuery(this).next();

                    jQuery(day).find('option').each(function (index, option) {
                        jQuery(option).remove()
                    });

                    for (var i = 1; i <= days; i++) {
                        jQuery(day).append(jQuery('<option>', {
                            value: i,
                            text: i
                        }));
                    }

                })
            })

            jQuery('#electricityPriceDetail  :button[class *=timebutton]').each(function () {
                jQuery(this).click(function () {

                    var timetr = jQuery('#electricityPriceDetail  tr[class = timetr]:first');

                    var currentRow = jQuery(this).parent().parent();
                    currentRow.after(jQuery(timetr).clone(true));
                    jQuery(this).remove();
//                    me.setHeight(me.height +30);
                })
            })

            jQuery('#electricityPriceDetail  :button[class *=datebutton]').each(function () {
                jQuery(this).click(function () {

                    var datetr = jQuery('#electricityPriceDetail  tr[class = datetr]:first');
                    var currentfieldSet = jQuery(this).parent().parent();
                    currentfieldSet.after(jQuery(datetr).clone(true));
                    jQuery(this).remove();
//                    me.setHeight(me.height +30);
                })
            })

            jQuery('#electricityPriceDetail  :button[class *=dategroupbutton]').each(function () {
                jQuery(this).click(function () {

                    var datefieldset = jQuery('#electricityPriceDetail  fieldset[class = datefieldset]:first');
                    var currentfieldSet = jQuery(this).parent().find('fieldset:last');
                    currentfieldSet.after(jQuery(datefieldset).clone(true));
//                    me.setHeight(me.height +100);
                })
            })

            jQuery('#electricityPriceDetail  :button[class *=deletebutton]').each(function () {
                jQuery(this).click(function () {
                    jQuery(this).parent().parent().remove();
                })
            })

            jQuery('#electricityPriceDetail  :button[class *=deletepricefieldsetbutton]').each(function () {

                jQuery(this).click(function () {
                    jQuery(this).parent().remove();
                })
            })

            jQuery(dateTimePriceArray).each(function (index, dateTimePrice) {

                if (index != 0) {
                    me.onAddGroupClick();
                }
                // setPrice
                jQuery('#electricityPriceDetail  fieldset[class = pricefieldset]:last').find(':text ').val(dateTimePrice['price']);

                jQuery(dateTimePrice['electricityPriceTimeGroupList']).each(function (index, electricityPriceTimeGroupList) {


                    if (index != 0) {
                        var datefieldset = jQuery('#electricityPriceDetail  fieldset[class = datefieldset]:first');
                        var lastdatefieldset = jQuery('#electricityPriceDetail  fieldset[class = datefieldset]:last');
                        lastdatefieldset.after(jQuery(datefieldset).clone(true));
                    }

                    jQuery(electricityPriceTimeGroupList['dateList']).each(function (index, date) {

                        if (index != 0) {
                            var firstDateTr = jQuery('#electricityPriceDetail  tr[class = datetr]:first');
                            var lastDateTr = jQuery('#electricityPriceDetail  tr[class = datetr]:last');
                            jQuery(lastDateTr).find(':button[class *=datebutton]').remove();
                            lastDateTr.after(jQuery(firstDateTr).clone(true));
                        }

                        var dateTr = jQuery('#electricityPriceDetail  tr[class = datetr]:last');

                        dateTr.find('select[name =startMonth]').val(date['startMonth']);
                        dateTr.find('select[name =startDay]').val(date['startDay']);
                        dateTr.find('select[name =endMonth]').val(date['endMonth']);
                        dateTr.find('select[name =endDay]').val(date['endDay']);
                    })

                    jQuery(electricityPriceTimeGroupList['timeList']).each(function (index, time) {

                        if (index != 0) {
                            var timetr = jQuery('#electricityPriceDetail  tr[class = timetr]:first');
                            var lasttimetr = jQuery('#electricityPriceDetail  tr[class = timetr]:last');
                            jQuery(lasttimetr).find(':button[class *=timebutton]').remove();
                            lasttimetr.after(jQuery(timetr).clone(true));
                        }

                        var timeTr = jQuery('#electricityPriceDetail  tr[class = timetr]:last');

                        timeTr.find('select[name =startTime]').val(time['startTime']);
                        timeTr.find('select[name =endTime]').val(time['endTime']);
                    })


                })
            })
        })

    },

    doSave: function () {

        var me = this;

        var dateTimePriceArray = [];
        var dateTimeArray = [];
        var dateArray = [];
        var timeArray = [];

        var pricefieldArray = jQuery('#electricityPriceDetail  fieldset[class =pricefieldset]');

        pricefieldArray.splice(0, 1);

        jQuery(pricefieldArray).each(function (index, pricefieldset) {

            var price = jQuery(pricefieldset).find(':text[name =price]').val();

//            if (jQuery.isEmptyObject(price)) {
//                ExtUtil.Msg.error("请输入价格");
//                return;
//            }

            var datefieldArray = jQuery(pricefieldset).find('fieldset[class =datefieldset]');

            dateTimeArray = [];
            jQuery(datefieldArray).each(function (index, datefieldset) {
                dateArray = [];
                timeArray = [];
                jQuery(datefieldset).find('tr').each(function (index, tr) {

                    var startMonth , endMonth, startDay , endDay, startTime, endTime;
                    jQuery(tr).find('select[name =startMonth]').each(function (index, select) {
                        startMonth = select.value;
                    });

                    jQuery(tr).find('select[name =startDay]').each(function (index, select) {
                        startDay = select.value;
                    });

                    jQuery(tr).find('select[name =endMonth]').each(function (index, select) {
                        endMonth = select.value;
                    });

                    jQuery(tr).find('select[name =endDay]').each(function (index, select) {
                        endDay = select.value;
                    });

                    jQuery(tr).find('select[name =startTime]').each(function (index, select) {
                        startTime = select.value;
                    });

                    jQuery(tr).find('select[name =endTime]').each(function (index, select) {
                        endTime = select.value;
                    });

                    if (!jQuery.isEmptyObject(startTime) && !jQuery.isEmptyObject(endTime)) {
                        timeArray.push([startTime, endTime]);
                    }
                    if (!jQuery.isEmptyObject(startMonth) && !jQuery.isEmptyObject(endMonth)) {
                        dateArray.push([startMonth, startDay, endMonth, endDay]);
                    }

                });

                if (!jQuery.isEmptyObject(dateArray) && !jQuery.isEmptyObject(timeArray)) {
                    dateTimeArray.push([dateArray, timeArray]);

                } else {
//                    ExtUtil.Msg.error("请至少填写一个日期段和时间段");
//                    return;
                }

            });

            if (!jQuery.isEmptyObject(dateTimeArray)) {
                dateTimePriceArray.push([dateTimeArray, price])

            }

        });

        var mask = new Ext.LoadMask(Ext.getBody(), {msg: '正在保存...'});
        mask.show();
        Ext.Ajax.request({
            url: PageContext.contextPath + '/ea/electricityPriceRange/save',
            method: 'POST',
            params: {
                electricityPriceElementIds: this.electricityPriceElementIds,
                electricityPriceIssueId: this.electricityPriceIssueId,
                dateTimePriceArray: Ext.encode(dateTimePriceArray)
            },
            success: function (response) {
                var result = Ext.decode(response.responseText);

                if (result.success) {
                    mask.hide();
                    me.fireEvent('success');
                    me.close();
                    ExtUtil.Msg.info("保存成功");
                } else {
                    mask.hide();
                    ExtUtil.Msg.error(result.message);
                }

            },
            scope: this
        });
    },

    onAddGroupClick: function () {

        var firstGroup = jQuery('#electricityPriceDetail  fieldset[class = pricefieldset]:first');
        var lastGroup = jQuery('#electricityPriceDetail  fieldset[class = pricefieldset]:last');
        lastGroup.after(jQuery(firstGroup).clone(true));
        jQuery('#electricityPriceDetail  fieldset[class = pricefieldset]:last').css("display", "");

    },

    addZero: function (str, length) {
        return new Array(length - str.length + 1).join("0") + str;
    }


});

