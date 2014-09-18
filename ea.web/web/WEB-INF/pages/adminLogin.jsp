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
        $('#username').focus();
        var captchaImage = $('#captchaImage');
        captchaImage.css('cursor', 'pointer').bind('click', function () {
            captchaImage.attr('src', captchaImage.attr('_src') + '?t=' + new Date().getTime());
        });
        if (passwordInvalidCount >= maxPasswordInvalidCount) {
            refreshCaptcha();
        }
    });
</script>
</head>
<body>
<table width="1091" border="0" align="center" cellpadding="0" cellspacing="0">
    <tr>
        <td height="198" background="${path}/images/adminLogin/1.png">&nbsp;</td>
    </tr>
    <tr>
        <td height="200" valign="top" background="${path}/images/adminLogin/2.png">
            <table width="900" height="100" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td height="40">&nbsp;</td>
                </tr>
                <tr>
                    <td valign="top">
                        <form id="loginForm" action="${path}/securityLogin" method="post">
                            <input type="hidden" name="loginType" value="Admin"/>
                            <table width="280" border="0" align="right" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width: 80px; height: 28px; padding-left: 32px; background: url('${path}/images/adminLogin/web-2_06.png') no-repeat;">
                                        用户名:
                                    </td>
                                    <td style="width: 200px; ">
                                        <input style="width: 150px;" name="username" type="text" id="username" size="15" maxlength="15"
                                               onKeyPress="if(event.keyCode==13){submitForm();}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="2"></td>
                                </tr>
                                <tr>
                                    <td style="width: 80px; height: 28px; padding-left: 32px; background: url('${path}/images/adminLogin/web-2_10.png') no-repeat;">
                                        密&nbsp;&nbsp;码：
                                    </td>
                                    <td>
                                        <input style="width: 150px;" name="password" type="password" id="password" size="15" maxlength="15"
                                               onKeyPress="if(event.keyCode==13){submitForm();}"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="2">
                                    </td>
                                </tr>
                                <tr id="captchaRow" style="display: none;">
                                    <td style="padding-left: 32px;">
                                        验证码：
                                    </td>
                                    <td>
                                        <input style="width: 60px; height: 19px; font-size: 14px; vertical-align: top;" name="captcha"
                                               type="text" id="captcha"
                                               maxlength="4" onKeyPress="if(event.keyCode==13){submitForm();}"/>
                                        <img id="captchaImage" style="width: 72px; height: 24px;" _src="${path}/security/captcha"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" colspan="2">
                                    </td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>
                                        <a href="javaScript:submitForm();">
                                            <img src="${path}/images/adminLogin/web-3.png" name="Image3" width="64"
                                                 height="21" border="0" id="Image3"
                                                 onmouseout="this.src='${path}/images/adminLogin/web-3.png';"
                                                 onmouseover="this.src='${path}/images/adminLogin/web-4.png';"/>
                                        </a>
                                        <input type="hidden"/>
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
        <td height="228" background="${path}/images/adminLogin/3.png">&nbsp;</td>
    </tr>
</table>
</body>
</html>
