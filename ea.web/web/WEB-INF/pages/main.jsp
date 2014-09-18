<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="${path}/scripts/jquery/css/vader/jquery-ui-1.9.2.custom.css"/>
<link rel="stylesheet" type="text/css" href="${path}/scripts/poshytip/tip-twitter/tip-twitter.css"/>
<link rel="stylesheet" type="text/css" href="${path}/scripts/extjs/resources/css/ext-all-ea-debug.css"/>
<link rel="stylesheet" type="text/css" href="${path}/css/theme/default.css"/>

<script type="text/javascript" src="${path}/scripts/extjs/ext-all.js"></script>
<script type="text/javascript" src="${path}/scripts/extjs/locale/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="${path}/scripts/withub/common.js"></script>
<script src="${path}/scripts/jquery/jquery-1.9.1.min.js"></script>
<script src="${path}/scripts/jquery/jquery-ui-1.10.3.custom.js"></script>
<script src="${path}/scripts/jquery/jquery.multi-open-accordion-1.5.3.js"></script>
<script src="${path}/scripts/jquery/jquery.mask.js"></script>
<script type="text/javascript" src="${path}/scripts/poshytip/jquery.poshytip.js"></script>
<script type="text/javascript">
    PageContext.contextPath = '${path}';
</script>
<script type="text/javascript" src="${path}/scripts/withub/ext/ex.js"></script>
<script type="text/javascript" src="${path}/scripts/withub/ext/setup.js"></script>
<script type="text/javascript">
    Ext.onReady(function () {
        $.ajax({
            dataType: 'json',
            async: false,
            url: PageContext.contextPath + '/security/getCurrentUserInfo',
            success: function (result) {
                PageContext.currentUser = result['userInfo'];
                $('#title-username').html(PageContext.currentUser.account);
            }
        });
        Ext.create('withub.ext.Main', {

        })
    });

    function exitSystem() {
        ExtUtil.Msg.confirm('确定要退出 EA 系统吗?', function (select) {
            if (select == 'no') {
                return;
            }
            window.open('', '_self', '');
            window.close();
        });
    }

    function openUserManager() {
        var width = 886;
        var height = 620;
        var top = (Ext.getBody().getHeight() - height) / 2;
        var left = (Ext.getBody().getWidth() - width) / 2;
        top = top > 0 ? top : 0;
        left = left > 0 ? left : 0;
        var wrap = $('<iframe id="iframe-user-manager" style="border: none; display: none; position: absolute; width: ' + width + 'px; height: ' + height + 'px; top:' + top + 'px; left: ' + left + 'px; z-index: 9999999;" src="'
                + PageContext.contextPath + '/loadPage/system/user/UserManager.page"></iframe>');
        $('body').append(wrap).mask();
        wrap.fadeIn(400);
    }

    function closeUserManager() {
        $('#iframe-user-manager').remove();
        $('body').unmask();
    }

    var taskList = [], taskIndex = 0;

    $(function () {
        Ext.TaskManager.start({
            run: function () {
                $.ajax({
                    url: '${path}/ea/weather/getWeather',
                    type: 'post',
                    timeout: 4300,
                    dataType: 'json',
                    cache: false,
                    global: false,
                    success: function (result) {
                        if (Ext.isEmpty(result['weatherInfo']['highTemperature']) && Ext.isEmpty(result['weatherInfo']['imageNo']) && Ext.isEmpty(result['weatherInfo']['humidity'])) {
                            $('#weather').hide();
                            return;
                        }
                        $('#weather').show();
                        var weatherImg = "室外温湿度&nbsp;";
                        if (!Ext.isEmpty(result['weatherInfo']['imageNo'])) {
                            weatherImg = "<img src='${path}/images/icons/weather/" + result['weatherInfo']['imageNo'] + ".gif' />&nbsp;&nbsp;";
                        }
                        var highTemperature = result['weatherInfo']['highTemperature'];
                        var humidity = result['weatherInfo']['humidity'];
                        document.getElementById('weather').innerHTML = weatherImg + highTemperature + '&nbsp;&nbsp;' + humidity;
                    }
                });
            },
            interval: 1000 * 60 * 60
        });

        $('#username').poshytip({
            className: 'tip-twitter',
            bgImageFrameSize: 9,
            showTimeout: 1,
            alignTo: 'target',
            alignX: 'center',
            offsetY: 0,
            showOn: 'click',
            slide: false,
            content: function (updateCallback) {
                return '<a href="#" onclick="openUserManager();" class="tip-link tip-link-icon-1">用户管理</a>' +
                        '<a href="${path}/j_spring_security_logout" class="tip-link tip-link-icon-2">注销/切换</a>';
            }
        });

        Ext.TaskManager.start({
            run: function () {
                $.ajax({
                    url: '${path}/ea/task/listTaskRemind',
                    type: 'GET',
                    dataType: 'json',
                    cache: false,
                    global: false,
                    success: function (result) {
                        taskList = result.items;
                        taskIndex = 0;
                    }
                });
            },
            interval: 1000 * 30
        });

        var taskRunner = Ext.TaskManager.start({
            run: function () {

                if (taskList.length > 0) {
                    $('#task-info').show();
                } else {
                    $('#task-info').hide();
                }

                var task = taskList[taskIndex];
                if (task) {
                    $('#task-info').attr(task);
                    $('#title-task-info').html(task.title);
                    if (taskList.length <= taskIndex + 1) {
                        taskIndex = 0;
                    } else {
                        taskIndex++;
                    }
                }
            },
            interval: 1000 * 3
        });

        $('#task-info').poshytip({
            className: 'tip-twitter',
            bgImageFrameSize: 9,
            showTimeout: 1,
            alignTo: 'target',
            alignX: 'center',
            offsetY: 0,
            showOn: 'click',
            slide: false,
            beforehide: function () {
                setTimeout(function () {
                    Ext.TaskManager.start(taskRunner);
                }, 200);
            },
            content: function (updateCallback) {
                Ext.TaskManager.stop(taskRunner);
                return '<pre class="task-info-content">' + $(this).attr('content') + '</pre>' +
                        '<div class="task-info-button" taskRemindId="' + $(this).attr('taskRemindId') + '" onclick="finishTask(this);">不再提醒</div>';
            }
        });
    });

    function finishTask(element) {

        var taskRemindId = $(element).attr('taskRemindId');
        $.ajax({
            dataType: "json",
            url: PageContext.contextPath + '/ea/task/updateTaskRemind',
            data: {
                taskRemindId: taskRemindId
            },
            async: false,
            method: 'POST',
            success: function (result) {
                if (result.success) {
                    var index = 0;
                    if (taskIndex == 0) {
                        index = taskList.length - 1;
                    } else {
                        index = taskIndex - 1;
                        taskIndex = index;
                    }
                    Ext.Array.remove(taskList, taskList[index ]);
                    $(element).hide();
                } else {
                    $.msgBox({
                        title: "信息",
                        type: "error",
                        content: result.message
                    });
                }
            }
        });
    }

</script>


</head>
<body style="padding: 0px; margin: 0px">

<div id="top-nav">
    <div style="width: 80px; height: 43px; background: url('${path}/images/home/20.png'); float: left;"></div>
    <div style="float: right">
        <div id="task-info" style="display: none;">
            <a href="#">
                <span id="title-task-info">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;<img src="${path}/images/home/23.png"/>
            </a>
        </div>
        <div style="font-family: 'Microsoft YaHei'; float: left; padding: 0px 20px; font-size: 14px; line-height: 43px; color: #FFFFFF;"
             id="weather">
        </div>
        <div id="username">
            <a href="#">
                <span id="title-username">&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;<img src="${path}/images/home/23.png"/>
            </a>
        </div>
        <a href="metasys://" title="切换至Metasys系统">
            <div style="width: 135px; height: 43px; background: url('${path}/images/home/3.png'); float: left;"></div>
        </a>

        <div class="split"></div>
        <a href="javascript:exitSystem();" title="退出">
            <div style="width: 44px; height: 43px; background: url('${path}/images/home/21.png'); float: left;"></div>
        </a>
    </div>
</div>
</body>
</html>