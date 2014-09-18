<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title></title>
    <link rel="stylesheet" type="text/css" href="${path}/css/user.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/jquery/css/smoothness/jquery-ui-1.10.3.custom.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/jquery/css/jquery-ui-timepicker-addon.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/ztree/css/zTreeStyle/zTreeStyle.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/msgbox/css/msgBoxLight.css"/>
    <script type="text/javascript">
        PageContext = {};
        PageContext.contextPath = '${path}';
    </script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery-ui-1.10.3.custom.min.js"></script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery-ui-timepicker-addon.js"></script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery-ui-zh-CN.js"></script>
    <script type="text/javascript" src="${path}/scripts/msgbox/jquery.msgBox.js"></script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery-textedit.js"></script>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery.timeago.js"></script>
    <script type="text/javascript" src="${path}/scripts/ztree/jquery.ztree.all-3.5.min.js"></script>

    <script type="text/javascript" src="${path}/scripts/placeholder/jquery.placeholder.js"></script>
    <script type="text/javascript">
        $.ajax({
            dataType: 'json',
            async: false,
            url: PageContext.contextPath + '/security/getCurrentUserInfo',
            success: function (result) {
                PageContext.currentUser = result['userInfo'];
            }
        });
    </script>
    <script type="text/javascript" src="${path}/loadScript/system/user/UserManager.js"></script>
</head>
<body>

<div id="wrap">
    <div id="title">
        <div>用户管理</div>
        <div>当前用户</div>
        <div>高级设置</div>
        <a></a>
    </div>
    <div id="tab1">
        <div id="user-info">
            <div class="ea-panel" style="height: 160px; width: 300px">
                <div class="ea-panel-title">个人信息</div>
                <div class="ea-panel-content" style="padding: 10px;">
                    <div id="username" class="ea-textfield" style="width: 270px;"></div>
                    <div id="user-level-label"></div>
                </div>
            </div>
            <div class="ea-panel" style="height: 230px; width: 300px">
                <div class="ea-panel-title">密码修改</div>
                <div class="ea-panel-content" id="password-fieldset-1" style="padding: 10px;">
                    <div class="ea-textfield" style="width: 270px;"></div>
                    <div class="ea-textfield" style="width: 270px;"></div>
                    <div class="ea-textfield" style="width: 270px;"></div>
                </div>
            </div>
            <div class="ea-panel" style="height: 150px; width: 300px">
                <div class="ea-panel-title">操作信息</div>
                <div class="ea-panel-content">
                    <ul id="user-log" class="ea-list-1">

                    </ul>
                </div>
            </div>
        </div>
        <div id="task-info">
            <div class="ea-panel" style="height: 540px; width: 540px">
                <div class="ea-panel-title">计划任务</div>
                <div class="ea-panel-content" style="padding: 10px;">
                    <div id="task-list" style="width: 520px; height: 268px;">
                        <h3>已完成的任务</h3>

                        <ul>

                        </ul>
                        <h3>计划中的任务</h3>

                        <ul>

                        </ul>
                    </div>
                    <div style="width: 520px; height: 38px; background-color: #AAAAAA;">
                        <ul class="ea-toolbar">
                            <li action="create" style="float: left; background: url(${path}/images/icons/create.png?a=1) no-repeat;">新建</li>
                            <li action="view" style="float: left; background: url(${path}/images/icons/info.png) no-repeat;">详情</li>
                            <li action="edit" style="float: left; background: url(${path}/images/icons/cog.png) no-repeat;">修改</li>
                            <li action="delete" style="float: right; color: #747474; background: url(${path}/images/icons/trash_large.png) no-repeat;">删除</li>
                        </ul>
                    </div>
                    <div>
                        <input id="task-id" type="hidden" />
                        <div id="task-title" class="ea-textfield" style="width: 310px; float: left;"></div>
                        <div id="task-startTime" class="ea-textfield" style="width: 170px; float: left; margin-left: 20px;">
                            <input class="ea-textfield-text placeholder" placeholder="" style="width: 158px;">
                        </div>
                        <div id="task-content" class="ea-textfield" style="width: 310px; height: 120px; float: left;"></div>
                        <div style="width: 180px; float: left; margin: 10px 0px 0px 20px;">
                            <ul class="ea-checkbox-1">
                                <li id="task-repeat">从设定日期每天提醒</li>
                                <li id="task-scope-1" group="task-scope" value="1" class="ea-checkbox-checked">仅对自己提醒</li>
                                <li id="task-scope-2" group="task-scope">对全员用户提醒</li>
                            </ul>
                            <div id="task-button-ok" class="ea-button" style="width: 124px; float: right; margin: 10px 0px 0px 0px;">保存并开启任务</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="tab2" style="display: none;">
        <div id="user-level" class="ea-panel">
            <div class="ea-panel-title">用户级别</div>
            <div class="ea-panel-toolbar">
                <ul class="ea-toolbar">
                    <li action="delete" style="float: right; background: url(${path}/images/icons/trash_large.png) no-repeat;">删除</li>
                </ul>
            </div>
            <div style="clear: both;"></div>
            <div class="ea-panel-content">
                <ul class="ea-list-2">
                    <li>
                        <div>输入添加用户级别</div>
                        <button>添加</button>
                    </li>
                </ul>
            </div>
        </div>
        <div id="user-permission" class="ea-panel">
            <div class="ea-panel-title">用户权限</div>
            <div class="ea-panel-toolbar">
                <ul class="ea-toolbar">
                    <li action="selectAll"
                        style="float: left; background: url(${path}/images/icons/checkbox-3.png) no-repeat left 5px top 5px;">全选
                    </li>
                    <li action="selectNone"
                        style="float: left; background: url(${path}/images/icons/checkbox-2.png) no-repeat left 5px top 5px;">反选
                    </li>
                </ul>
            </div>
            <div style="clear: both;"></div>
            <div class="ea-panel-content">
                <ul id="menu-tree" class="ztree" style="height: 410px; overflow-y: scroll;"></ul>
                <div style="height: 48px;">
                    <div class="ea-checkbox" style="width: 64px; padding: 0px 24px; margin: 18px 0px 0px 32px; float: left;">高级设置</div>
                    <div class="ea-button" style="width: 96px; margin: 10px 0px 0px 0px; float: left;">保存</div>
                </div>
            </div>
        </div>
        <div id="user-config" class="ea-panel">
            <div class="ea-panel-title">用户设置</div>
            <div class="ea-panel-content">
                <div class="ea-panel-toolbar">
                    <ul class="ea-toolbar">
                        <li action="delete" style="float: right; background: url(${path}/images/icons/trash_large.png) no-repeat;">删除</li>
                    </ul>
                </div>
                <div style="clear: both;"></div>
                <div class="ea-panel-content">
                    <ul class="ea-list-2" style="height: 360px; overflow-y: scroll;">
                        <li>
                            <div>输入添加用户</div>
                            <button>添加</button>
                        </li>
                    </ul>
                    <div id="password-fieldset-2">
                        <div class="ea-textfield" style="width: 230px; margin: 10px 0px 0px 10px;"></div>
                        <div class="ea-textfield" style="width: 230px; margin: 10px 0px 10px 10px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>