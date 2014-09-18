<%@ page import="com.withub.web.common.Constants" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<script type="text/javascript" src="${path}/scripts/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="${path}/scripts/jquery/jquery.form.js"></script>
<style type="text/css">
    <!--
    body {
        margin-left: 0px;
        margin-top: 0px;
        background-color: #edf1f5;
    }

    td {
        font-weight: bold;
        font-size: 16px;
        color: #34608A;
    }

    -->
</style>
<script type="text/javascript">
    var passwordInvalidCount = <%= session.getAttribute(Constants.PASSWORD_INVALID_COUNT_KEY) == null ? 0 : session.getAttribute(Constants.PASSWORD_INVALID_COUNT_KEY)%>;
    var maxPasswordInvalidCount = 3;
    var submitFlag = false;
    function submitForm() {
        if (submitFlag) {
            return;
        }
        var username = $('#username');
        var password = $('#password');
        var captcha = $('#captcha');
        var captchaImage = $('#captchaImage');
        $('#loginForm').ajaxSubmit({
            beforeSubmit: function () {
                if ($.trim(username.val()) == "" || $.trim(password.val()) == "") {
                    alert("用户名或密码不能为空，请正确填写！");
                    return false;
                }
                if (captcha.parent().parent().css('display') != 'none' && $.trim(captcha.val()) == "") {
                    alert("验证码不能为空，请正确填写！");
                    return false;
                }
                username.attr('disabled', true);
                password.attr('disabled', true);
                captcha.attr('disabled', true);
                submitFlag = true;
            },
            success: function (response) {
                submitFlag = false;
                username.attr('disabled', false);
                password.attr('disabled', false);
                captcha.attr('disabled', false);
                if (response.success) {
                    window.location.href = '${path}/index.jsp';
                } else {
                    if (response['resultCode'] == '<%= Constants.ACCOUNT_LOCKED%>') {
                        alert('账号被锁！');
                        if (passwordInvalidCount >= maxPasswordInvalidCount) {
                            refreshCaptcha();
                        }

                    } else if (response['resultCode'] == '<%= Constants.PASSWORD_INVALID%>') {
                        alert('用户名密码不匹配，请重新输入！');
                        password.focus().get(0).select();
                        passwordInvalidCount++;
                        if (passwordInvalidCount >= maxPasswordInvalidCount) {
                            refreshCaptcha();
                        }
                    } else if (response['resultCode'] == '<%= Constants.CAPTCHA_INVALID%>') {
                        alert('验证码错误，请重新输入！');
                        refreshCaptcha();
                        captcha.focus().get(0).select();
                    }
                }
            },
            dataType: 'json'
        });
    }

    function refreshCaptcha() {
        $('#captchaRow').css('display', '');
        $('#captcha').val('');
        $('#captchaImage').attr('src', $('#captchaImage').attr('_src') + '?t=' + new Date().getTime());
    }

    $(function () {

        $(':text,:password').focus(function () {
            $(this).parent().addClass('higtlight')
        }).blur(function () {
                    $(this).parent().removeClass('higtlight')
                })

        $('#username').focus();
        var captchaImage = $('#captchaImage');
        captchaImage.css('cursor', 'pointer').bind('click', function () {
            captchaImage.attr('src', captchaImage.attr('_src') + '?t=' + new Date().getTime());
        });
        if (passwordInvalidCount >= maxPasswordInvalidCount) {
            refreshCaptcha();
        }
    });

//    if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0) {
//        $('input:-webkit-autofill').each(function () {
//            var text = $(this).val();
//            var name = $(this).attr('name');
//            $(this).after(this.outerHTML).remove();
//            $('input[name=' + name + ']').val(text);
//        });
//    }

</script>
<style>
    .field {
        padding: 1px 2px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        -khtml-border-radius: 5px;
        border-radius: 5px;
        border: 1px solid #D7D7D7;
    }

    .higtlight {
        border: 1px solid #A3D7ED;
        box-shadow: 0 0 0.3em #A3D7ED;
    }

    .field .user-icon {
        float: left;
        width: 32px;
        height: 32px;
        padding: 1px;
        background: url(${path}/images/login/user.png) #F4F4F4;
    }

    .field .password-icon {
        float: left;
        width: 32px;
        height: 32px;
        padding: 1px;
        background: url(${path}/images/login/key.png) #F4F4F4;
    }

    .field input {
        width: 269px;
        height: 32px;
        padding: 1px 5px;
        font-size: 20px;
        border: none;
        outline: none;
        border-left: 1px solid #D8D8D8;
    }

</style>
</head>
<body>
<table width="1090" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td height="187" background="${path}/images/login/1.png">&nbsp;</td>
    </tr>
    <tr>
        <td height="370" valign="top" background="${path}/images/login/2.png">
            <table width="865" height="100" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td height="145">&nbsp;</td>
                </tr>
                <tr>
                    <td valign="top">
                        <form id="loginForm" action="${path}/securityLogin" method="post">
                            <table width="320" border="0" align="right" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td class="field">
                                        <div class="user-icon"></div>
                                        <input name="username" type="text" id="username" size="15" maxlength="15"
                                               onKeyPress="if(event.keyCode==13){submitForm();}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="1"></td>
                                </tr>
                                <tr>
                                    <td class="field">
                                        <div class="password-icon"></div>
                                        <input name="password" type="password" id="password" size="15" maxlength="15"
                                               onKeyPress="if(event.keyCode==13){submitForm();}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="1">
                                    </td>
                                </tr>
                                <tr id="captchaRow" style="display: none;">
                                    <td>
                                        <div class="password-icon"></div>
                                        <input name="captcha" type="text" id="captcha"
                                               maxlength="4" onKeyPress="if(event.keyCode==13){submitForm();}"/>
                                        <img id="captchaImage" style="width: 72px; height: 24px;" _src="${path}/security/captcha"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="1">
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-left: 220px;">
                                        <a href="javaScript:submitForm();">
                                            <img src="${path}/images/login/sign.jpg"  width="78" height="42" border="0" />
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </form>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td height="85" background="${path}/images/login/3.png">&nbsp;</td>
    </tr>
</table>
</body>
</html>
