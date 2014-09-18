$(function () {
    var menuTree;
    $('#username').textedit({
        emptyText: '输入用户名',
        value: PageContext.currentUser['account'],
        onClick: function (text) {
            $.ajax({
                dataType: "json",
                url: PageContext.contextPath + '/system/user/update/account',
                data: {
                    objectId: PageContext.currentUser['objectId'],
                    account: text.val()
                },
                method: 'POST',
                success: function (result) {
                    if (result.success) {
                        $.msgBox({
                            title: "信息",
                            type: "info",
                            content: "修改成功！"
                        });
                        PageContext.currentUser['account'] = result['user']['account'];
                    } else {
                        $.msgBox({
                            title: "信息",
                            type: "error",
                            content: result.message,
                            success: function () {
                                text.val(PageContext.currentUser['account'])
                            }
                        });
                    }
                }
            });
            return true;
        }
    });

    $('#user-level-label').text('用户级别：' + PageContext.currentUser.role['name']);

    $('#password-fieldset-1>.ea-textfield').eq(0).textedit({
        emptyText: '输入当前密码',
        inputType: 'password',
        type: 3
    });
    $('#password-fieldset-1>.ea-textfield').eq(1).textedit({
        emptyText: '输入新密码',
        inputType: 'password',
        type: 3
    });
    $('#password-fieldset-1>.ea-textfield').eq(2).textedit({
        emptyText: '确认新密码',
        inputType: 'password',
        type: 2,
        onClick: function (text) {
            var oldPassword = $('#password-fieldset-1>.ea-textfield').eq(0).find('input');
            var newPassword = $('#password-fieldset-1>.ea-textfield').eq(1).find('input');
            if (oldPassword.val() === '') {
                $.msgBox({
                    title: "信息",
                    content: "请输入当前密码！",
                    afterClose: function () {
                        oldPassword.focus();
                    }
                });
                return;
            }
            if (newPassword.val() === '') {
                $.msgBox({
                    title: "信息",
                    content: "请输入新密码！",
                    afterClose: function () {
                        newPassword.focus();
                    }
                });
                return;
            }
            if (text.val() === '') {
                $.msgBox({
                    title: "信息",
                    content: "请输入确认密码！",
                    afterClose: function () {
                        text.focus();
                    }
                });
                return;
            }
            if (text.val() !== newPassword.val()) {
                $.msgBox({
                    title: "信息",
                    content: "两次密码输入不一致，请重新输入！",
                    afterClose: function () {
                        text.focus();
                    }
                });
                return;
            }
            $.ajax({
                dataType: "json",
                url: PageContext.contextPath + '/system/user/change/password',
                data: {
                    objectId: PageContext.currentUser['objectId'],
                    oldPassword: oldPassword.val(),
                    newPassword: newPassword.val()
                },
                method: 'POST',
                success: function (result) {
                    if (result.success) {
                        $.msgBox({
                            title: "信息",
                            type: "info",
                            content: "密码修改成功！"
                        });
                    } else {
                        $.msgBox({
                            title: "信息",
                            type: "error",
                            content: result.message,
                            afterClose: function () {
                                oldPassword.focus();
                            }
                        });
                    }
                }
            });
            return true;
        }
    });

    var bindCheckBox = function (root) {
        root = root || document.body;
        $(root).find('.ea-checkbox').click(function () {
            var value = $(this).attr('value') === undefined ? 0 : $(this).attr('value');
            if (parseInt(value, 10) !== 0) {
                $(this).attr('value', 0);
                $(this).removeClass('ea-checkbox-checked');
            } else {
                $(this).attr('value', 1);
                $(this).addClass('ea-checkbox-checked');
            }
        });
    }

    bindCheckBox();

    var appendUserLevel = function (item, edit) {
        var button = $('<button></button>');
        var div = $('<div style="width: 220px; display: none;">' + item['name'] + '</div>');
        var text = $('<input style="width: 220px; display: none;" />');
        var li = $('<li class="user-level-item"></li>');
        $('#user-level .ea-list-2>li').last().before(li.append(div).append(text).append(button));
        var orderNo = li.prev().attr('orderNo') ? parseInt(li.prev().attr('orderNo'), 10) + 1 : 1;
        li.attr('objectId', item['objectId'] || '').attr('orderNo', orderNo).click(function () {
            if (li.hasClass('ea-list-2-highlight')) {
                return;
            }
            li.parent().children().removeClass('ea-list-2-highlight');
            li.addClass('ea-list-2-highlight');
            var objectId = li.attr('objectId');
            if (objectId) {
                refreshUserList(objectId);
                refreshMenuTree(objectId);
            } else {
                menuTree.checkAllNodes(false);
                $('#user-permission .ea-checkbox').removeClass('ea-checkbox-checked').attr('value', 0);
            }
        });
        if (edit) {
            text.show();
            text.focus();
            button.text('确认');
            li.parent().children().removeClass('ea-list-2-highlight');
            li.addClass('ea-list-2-highlight');
            menuTree.checkAllNodes(false);
            $('#user-permission .ea-checkbox').removeClass('ea-checkbox-checked').attr('value', 0);
        } else {
            div.show();
            button.text('修改');
        }
        button.click(function () {
            if (div.is(':hidden')) {
                if (text.val() == '') {
                    $.msgBox({
                        title: "信息",
                        content: "内容不能为空！",
                        afterClose: function () {
                            text.focus();
                        }
                    });
                    return;
                }
                var objectId = li.attr('objectId');
                var orderNo = li.attr('orderNo');
                var action = objectId ? 'update' : 'create';
                $.ajax({
                    dataType: 'json',
                    url: PageContext.contextPath + '/system/role/' + action,
                    method: 'POST',
                    data: {
                        objectId: objectId,
                        orderNo: orderNo,
                        name: text.val()
                    },
                    success: function (result) {
                        if (result.success) {
                            li.attr('objectId', result.role.objectId).attr('orderNo', result.role.orderNo);
                            button.text('修改');
                            text.hide();
                            div.show();
                            div.text(text.val());
                        } else {
                            $.msgBox({
                                title: "信息",
                                type: "error",
                                content: result.message
                            });
                        }
                    }
                });
            } else {
                button.text('确认');
                text.show();
                text.focus();
                div.hide();
                text.val(div.text());
            }
        });
    }

    var refreshUserLevelList = function () {
        $.ajax({
            url: PageContext.contextPath + '/system/role/query',
            success: function (result) {
                $('#user-level .ea-list-2 li').filter('.user-level-item').remove();
                $.each(result.items, function (index, item) {
                    appendUserLevel(item, false);
                });
            }
        });
    }


    $('#user-level .ea-list-2>li:last>button').click(function () {
        appendUserLevel({objectId: '', name: ''}, true);
        menuTree.checkAllNodes(false);
        $('#user-config .ea-list-2 li').filter('.user-item').remove();
    });

    $('#user-level .ea-toolbar>li[action="delete"]').click(function () {
        var selected = $('#user-level .ea-list-2>.ea-list-2-highlight');
        var objectId = selected.attr('objectId');
        if (objectId === undefined) {
        } else if (objectId === '') {
            selected.remove();
        } else {
            $.msgBox({
                title: "信息",
                content: "确认删除“" + selected.find('div').text() + "”？",
                type: "confirm",
                buttons: [
                    { value: "是" },
                    { value: "否" }
                ],
                success: function (result) {
                    if (result == "是") {
                        $.ajax({
                            url: PageContext.contextPath + '/system/role/delete/' + objectId,
                            success: function (result) {
                                selected.remove();
                                $('#user-config .ea-list-2 li').filter('.user-item').remove();
                            }
                        });
                    }
                }
            });
        }
    });

    var appendUser = function (item, edit) {
        var button = $('<button></button>');
        var div = $('<div style="width: 164px; display: none;">' + item['account'] + '</div>');
        var text = $('<input style="width: 164px; display: none;" />');
        var li = $('<li class="user-item"></li>');
        $('#user-config .ea-list-2>li').last().before(li.append(div).append(text).append(button));
        var orderNo = li.prev().attr('orderNo') ? parseInt(li.prev().attr('orderNo'), 10) + 1 : 1;
        li.attr('objectId', item['objectId'] || '').attr('orderNo', orderNo).click(function () {
            li.parent().children().removeClass('ea-list-2-highlight');
            li.addClass('ea-list-2-highlight');
        });
        li.click(function () {
            if (li.hasClass('ea-list-2-highlight')) {
                return;
            }
            li.parent().children().removeClass('ea-list-2-highlight');
            li.addClass('ea-list-2-highlight');
            var objectId = li.attr('objectId');
        });
        if (edit) {
            text.show();
            text.focus();
            button.text('确认');
            li.parent().children().removeClass('ea-list-2-highlight');
            li.addClass('ea-list-2-highlight');
        } else {
            div.show();
            button.text('修改');
        }
        button.click(function () {
            if (div.is(':hidden')) {
                var roleId = $('#user-level .ea-list-2-highlight').attr('objectId');
                if (!roleId) {
                    return;
                }
                if (text.val() == '') {
                    $.msgBox({
                        title: "信息",
                        content: "内容不能为空！",
                        afterClose: function () {
                            text.focus();
                        }
                    });
                    return;
                }
                var objectId = li.attr('objectId');
                var orderNo = li.attr('orderNo');
                var action = objectId ? 'update/account' : 'create';
                $.ajax({
                    dataType: "json",
                    url: PageContext.contextPath + '/system/user/' + action,
                    method: 'POST',
                    data: {
                        objectId: objectId,
                        orderNo: orderNo,
                        account: text.val(),
                        'role.objectId': roleId
                    },
                    success: function (result) {
                        if (result.success) {
                            li.attr('objectId', result.user.objectId).attr('orderNo', result.user.orderNo);
                            button.text('修改');
                            text.hide();
                            div.show();
                            div.text(text.val());
                        } else {
                            $.msgBox({
                                title: "信息",
                                type: "error",
                                content: result.message
                            });
                        }
                    }
                });
            } else {
                button.text('确认');
                text.show();
                text.focus();
                div.hide();
                text.val(div.text());
            }
        });
    }

    var refreshUserList = function (objectId) {
        $.ajax({
            url: PageContext.contextPath + '/system/role/listRoleUser',
            data: {
                objectId: objectId
            },
            success: function (result) {
                $('#user-config .ea-list-2 li').filter('.user-item').remove();
                $.each(result.items, function (index, item) {
                    appendUser(item, false);
                });
            }
        });
    }

    var refreshMenuTree = function (objectId) {
        menuTree.checkAllNodes(false);
        var permissionCheckbox = $('#user-permission .ea-checkbox');
        $.ajax({
            url: PageContext.contextPath + '/system/roleMenu/load',
            data: {
                roleId: objectId
            },
            success: function (result) {
                $.each(result['nodeIdList'], function (index, nodeId) {
                    var node = menuTree.getNodesByFilter(function (node) {
                        return nodeId === node.id;
                    }, true);
                    if (node) {
                        menuTree.checkNode(node, true, false)
                    }
                });
                var permission = result.role['permission'];
                if (permission == null) {
                    permission = 0;
                }
                if (permission == 1) {
                    permissionCheckbox.addClass('ea-checkbox-checked').attr('value', permission);
                } else {
                    permissionCheckbox.removeClass('ea-checkbox-checked').attr('value', permission);
                }
            }
        });
    }

    $('#user-config .ea-list-2>li:last>button').click(function () {
        appendUser({objectId: '', name: ''}, true);
    });

    $('#user-config .ea-toolbar>li[action="delete"]').click(function () {
        var selected = $('#user-config .ea-list-2>.ea-list-2-highlight');
        var objectId = selected.attr('objectId');
        if (objectId === undefined) {
        } else if (objectId === '') {
            selected.remove();
        } else {
            $.msgBox({
                title: "信息",
                content: "确认删除“" + selected.find('div').text() + "”？",
                type: "confirm",
                buttons: [
                    { value: "是" },
                    { value: "否" }
                ],
                success: function (result) {
                    if (result == "是") {
                        $.ajax({
                            url: PageContext.contextPath + '/system/user/delete/' + objectId,
                            success: function (result) {
                                selected.remove();
                            }
                        });
                    }
                }
            });
        }
    });

    refreshUserLevelList();

    $.ajax({
        dataType: 'json',
        url: PageContext.contextPath + '/system/menu/getPermissionMenuList',
        method: 'GET',
        success: function (result) {
            var data = result.items;
            $.fn.zTree.init($("#menu-tree"), {
                check: {
                    enable: true,
                    chkboxType: { "Y": "", "N": "" }
                },
                view: {
                    showIcon: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            }, data);
            menuTree = $.fn.zTree.getZTreeObj("menu-tree");
        }
    });

    $.ajax({
        dataType: 'json',
        url: PageContext.contextPath + '/system/user/listUserLog',
        params: {
            limit: 10
        },
        method: 'GET',
        success: function (result) {
            var items = result.items;
            var userLog = $('#user-log');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                userLog.append('<li><a title="' + item['description'] + '">' + item['description'] + '</a>' +
                    '<abbr class="timeago" title="' + item['logTime'] + '"></abbr>' + '</li>');
            }
            $("abbr.timeago").timeago();
        }
    });


    $('#user-permission .ea-toolbar>li[action="selectAll"]').click(function () {
        menuTree.checkAllNodes(true);
    });

    $('#user-permission .ea-toolbar>li[action="selectNone"]').click(function () {
        menuTree.checkAllNodes(false);
    });

    $('#user-permission .ea-button').click(function () {
        var roleId = $('#user-level .ea-list-2-highlight').attr('objectId');
        var menuIds = [], permission;
        if (!roleId) {
            return;
        }
        $.each(menuTree.getCheckedNodes(true), function (index, node) {
            menuIds.push(node.id);
        });
        permission = $('#user-permission .ea-checkbox').attr('value') || 0;
        $.ajax({
            dataType: 'json',
            url: PageContext.contextPath + '/system/roleMenu/save',
            data: {
                roleId: roleId,
                permission: permission,
                menuIds: menuIds.join(',')
            },
            method: 'POST',
            success: function (result) {
                if (result.success) {
                    $.msgBox({
                        title: "信息",
                        type: "info",
                        content: "保存成功！"
                    });
                } else {
                    $.msgBox({
                        title: "信息",
                        type: "error",
                        content: result.message
                    });
                }
            }
        });
    });

    $('#password-fieldset-2>.ea-textfield').eq(0).textedit({
        emptyText: '输入新密码',
        type: 3,
        inputType: 'password'
    });

    $('#password-fieldset-2>.ea-textfield').eq(1).textedit({
        emptyText: '确认新密码',
        type: 2,
        inputType: 'password',
        onClick: function (text) {
            var userId = $('#user-config .ea-list-2-highlight').attr('objectId');
            if (userId === undefined || userId === '') {
                $.msgBox({
                    title: "信息",
                    content: "请选择用户！"
                });
                return;
            }
            var oldPassword = $('#password-fieldset-2>.ea-textfield').eq(0).find('input');
            if (oldPassword.val() === '') {
                $.msgBox({
                    title: "信息",
                    content: "请输入新密码！",
                    afterClose: function () {
                        oldPassword.focus();
                    }
                });
                return;
            }
            if (text.val() === '') {
                $.msgBox({
                    title: "信息",
                    content: "请确认新密码！",
                    afterClose: function () {
                        text.focus();
                    }
                });
                return;
            }
            if (text.val() !== oldPassword.val()) {
                $.msgBox({
                    title: "信息",
                    content: "两次密码输入不一致，请重新输入！",
                    afterClose: function () {
                        text.focus();
                    }
                });
                return;
            }
            $.ajax({
                dataType: 'json',
                url: PageContext.contextPath + '/system/user/update/password',
                data: {
                    password: oldPassword.val(),
                    objectId: userId
                },
                method: 'POST',
                success: function (result) {
                    if (result.success) {
                        $.msgBox({
                            title: "信息",
                            type: "info",
                            content: "密码修改成功！"
                        });
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
    });

    $('#title>div').eq(1).click(function () {
        $('#tab2').hide();
        $('#tab1').fadeIn(200);
        $(this).addClass('title-item-select');
        $('#title>div').eq(2).removeClass('title-item-select');
    }).addClass('title-item-select');

    $('#title>div').eq(2).click(function () {
        $('#tab1').hide();
        $('#tab2').fadeIn(200);
        $(this).addClass('title-item-select');
        $('#title>div').eq(1).removeClass('title-item-select');
    });

    $('#title>a').eq(0).click(function () {
        if (window.parent) {
            window.parent.closeUserManager.call();
        }
    });

    // 任务
    var taskTitle = $('#task-title');
    var taskContent = $('#task-content');
    taskTitle.textedit({
        emptyText: '请输入标题',
        type: 3
    });
    taskContent.textedit({
        emptyText: '请输入内容',
        textarea: true,
        type: 3
    });

    var taskRepeat = $('#task-repeat').click(function () {
        var value = $(this).attr('value') === undefined ? 0 : $(this).attr('value');
        if (parseInt(value, 10) !== 0) {
            $(this).attr('value', 0);
            $(this).removeClass('ea-checkbox-checked');
        } else {
            $(this).attr('value', 1);
            $(this).addClass('ea-checkbox-checked');
        }
    });

    var taskScope = $('.ea-checkbox-1>li[group="task-scope"]').click(function () {
        var me = $(this);
        var value = me.attr('value') === undefined ? 0 : me.attr('value');
        if (parseInt(value, 10) !== 0) {
        } else {
            me.attr('value', 1);
            me.addClass('ea-checkbox-checked');
            me.parent().find('li[group="task-scope"]').each(function () {
                if ($(this).attr('id') != me.attr('id')) {
                    $(this).attr('value', 0);
                    $(this).removeClass('ea-checkbox-checked');
                }
            });
        }
    });

    var taskStartTime = $('#task-startTime>input').datetimepicker({
        changeMonth: true,
        changeYear: true
    });

    var taskTitleInput = taskTitle.find('input'), taskContentInput = taskContent.find('textarea');

    var taskList = $('#task-list');

    var taskButtonOk = $('#task-button-ok');

    var saveTask = function () {
        var taskId = $('#task-id').val();
        var action = taskId == '' ? 'create' : 'update';
        if (taskTitleInput.val() === '') {
            $.msgBox({
                title: "信息",
                content: "请输入任务标题！",
                afterClose: function () {
                    taskTitleInput.focus();
                }
            });
            return;
        }
        if (taskContentInput.val() === '') {
            $.msgBox({
                title: "信息",
                content: "请输入任务内容！",
                afterClose: function () {
                    taskContentInput.focus();
                }
            });
            return;
        }
        if (taskStartTime.val() === '') {
            $.msgBox({
                title: "信息",
                content: "请设定任务开始时间！",
                afterClose: function () {
                    taskStartTime.focus();
                }
            });
            return;
        }
        $.ajax({
            dataType: "json",
            url: PageContext.contextPath + '/ea/task/' + action,
            data: {
                objectId: taskId,
                title: taskTitleInput.val(),
                content: taskContentInput.val(),
                startTime: taskStartTime.val(),
                repeat: taskRepeat.attr('value') == 1 ? 1 : 0,
                scope: $('#task-scope-1').attr('value') == 1 ? 1 : 2
            },
            method: 'POST',
            success: function (result) {
                if (result.success) {
                    $.msgBox({
                        title: "信息",
                        type: "info",
                        content: "任务保存成功！",
                        success: function () {
                            refreshTaskList();
                            if (action == 'create') {
                                taskCreateFn();
                            }
                        }
                    });
                } else {
                    $.msgBox({
                        title: "信息",
                        type: "error",
                        content: result.message,
                        success: function () {
                        }
                    });
                }
            }
        });
    }

    var refreshTaskList = function () {
        var taskId = $('#task-id').val();
        $.ajax({
            dataType: "json",
            url: PageContext.contextPath + '/ea/task/list',
            data: {
            },
            method: 'GET',
            success: function (result) {
                if (result.success) {
                    var ul1 = taskList.find('ul').eq(0).empty();
                    var ul2 = taskList.find('ul').eq(1).empty();
                    $.each([ul1, ul2], function (i, ul) {
                        $.each(result.items, function (index, item) {
                            if (i == 0 && item['status'] == 1) {
                                return
                            }
                            if (i == 1 && item['status'] == 2) {
                                return
                            }
                            var timeStr = '<span style="color: ' + (item['remindStatus'] == 1 ? '#FC9626' : '#429486') + '">' +
                                (item['remindStatus'] == 1 ? '将在' + item['startTime'] + ' ' + (item['repeat'] == 1 ? '每天' : '') + '提醒 ' : '已提醒 ') + '</span>';
                            var li = $('<li taskId="' + item['objectId'] + '" class="' + (taskId == item['objectId'] ? 'selected' : '') + ' ' + (index % 2 == 0 ? 'even' : '') + '">' +
                                '<div class="ea-checkbox" style="float: left"></div>' +
                                '<a title="' + item['title'] + '">' + item['title'] + '</a>' +
                                '<div style="float: right;"> ' + (i == 1 ? timeStr : '') + (item['scope'] == 1 ? '对自己' : '对全员') + '</div>' +
                                '</li>');
                            li.bind('click', function (event) {
                                if (li.hasClass('selected') || $(event.target).hasClass('ea-checkbox')) {
                                    return;
                                }
                                li.parent().find('li').removeClass('selected');
                                li.addClass('selected');
                                $('#task-id').val(li.attr('taskId'));
                                loadTask();
                                taskViewFn();
                            });
                            ul.append(li);
                        });
                        bindCheckBox(ul);
                    })
                } else {
                    $.msgBox({
                        title: "信息",
                        type: "error",
                        content: result.message,
                        success: function () {
                        }
                    });
                }
            }
        });
    }

    var loadTask = function () {
        var taskId = $('#task-id').val();
        $.ajax({
            dataType: "json",
            url: PageContext.contextPath + '/ea/task/load/' + taskId,
            method: 'GET',
            success: function (result) {
                if (result.success) {
                    taskTitleInput.val(result.data['title']);
                    taskContentInput.val(result.data['content']);
                    taskStartTime.val(result.data['startTime']);
                    if (result.data['repeat'] == 1) {
                        taskRepeat.attr('value', 1);
                        taskRepeat.addClass('ea-checkbox-checked');
                    } else {
                        taskRepeat.attr('value', 0);
                        taskRepeat.removeClass('ea-checkbox-checked');
                    }
                    if (result.data['scope'] == 1) {
                        $('#task-scope-1').attr('value', 1);
                        $('#task-scope-1').addClass('ea-checkbox-checked');
                        $('#task-scope-2').attr('value', 0);
                        $('#task-scope-2').removeClass('ea-checkbox-checked');
                    }
                    if (result.data['scope'] == 2) {
                        $('#task-scope-1').attr('value', 0);
                        $('#task-scope-1').removeClass('ea-checkbox-checked');
                        $('#task-scope-2').attr('value', 1);
                        $('#task-scope-2').addClass('ea-checkbox-checked');
                    }
                } else {
                    $.msgBox({
                        title: "信息",
                        type: "error",
                        content: result.message,
                        success: function () {
                        }
                    });
                }
            }
        });
    }

    var taskCreateFn = function () {
        $('#task-id').val('')
        taskTitleInput.val('');
        taskContentInput.val('');
        taskStartTime.val('');
        taskRepeat.attr('value', 0);
        taskRepeat.removeClass('ea-checkbox-checked');
        $('#task-scope-1').attr('value', 1);
        $('#task-scope-1').addClass('ea-checkbox-checked');
        $('#task-scope-2').attr('value', 0);
        $('#task-scope-2').removeClass('ea-checkbox-checked');
        taskList.find('li.selected').removeClass('selected');
        taskButtonOk.unbind('click');
        taskButtonOk.click(function () {
            saveTask();
        });
        taskButtonOk.removeClass('ea-button-disabled');


        $('#task-info .ea-toolbar>li').removeClass('selected');
        $('#task-info .ea-toolbar>li[action="create"]').addClass('selected');
    }

    var taskViewFn = function () {
        var taskId = $('#task-id').val();
        if (taskId == '') {
            return;
        }
        taskButtonOk.unbind('click');
        taskButtonOk.addClass('ea-button-disabled');

        $('#task-info .ea-toolbar>li').removeClass('selected');
        $('#task-info .ea-toolbar>li[action="view"]').addClass('selected');
    }

    var taskEditFn = function () {
        var taskId = $('#task-id').val();
        if (taskId == '') {
            return;
        }
        taskButtonOk.unbind('click');
        taskButtonOk.click(function () {
            saveTask();
        });
        taskButtonOk.removeClass('ea-button-disabled');

        $('#task-info .ea-toolbar>li').removeClass('selected');
        $('#task-info .ea-toolbar>li[action="edit"]').addClass('selected');
    }

    var taskDeleteFn = function () {
        var taskIds = [];
        taskList.find('li>.ea-checkbox-checked').each(function () {
            taskIds.push($(this).parent().attr('taskId'));
        });
        if (taskIds.length > 0) {
            $.msgBox({
                title: "信息",
                content: "确认删除？",
                type: "confirm",
                buttons: [
                    { value: "是" },
                    { value: "否" }
                ],
                success: function (result) {
                    if (result == "是") {
                        $.ajax({
                            dataType: "json",
                            url: PageContext.contextPath + '/ea/task/delete',
                            data: {
                                objectIds: taskIds.join(',')
                            },
                            method: 'POST',
                            success: function (result) {
                                if (result.success) {
                                    $.msgBox({
                                        title: "信息",
                                        type: "info",
                                        content: "任务删除成功！",
                                        success: function () {
                                            refreshTaskList();
                                        }
                                    });
                                } else {
                                    $.msgBox({
                                        title: "信息",
                                        type: "error",
                                        content: result.message,
                                        success: function () {
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    $('#task-info .ea-toolbar>li').click(function () {
        var action = $(this).attr('action');
        if (action == 'create') {
            taskCreateFn();
        }
        if (action == 'edit') {
            taskEditFn();
        }
        if (action == 'view') {
            taskViewFn();
        }
        if (action == 'delete') {
            taskDeleteFn();
        }
    })

    taskList.accordion({
        active: 1,
        heightStyle: 'fill'
    });

    refreshTaskList();

    taskCreateFn();

    if (PageContext['currentUser']['role']['permission'] !== 1 && PageContext['currentUser']['account'] !== 'admin') {
        $('#title>div').eq(2).hide();
    }
});