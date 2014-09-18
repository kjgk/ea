<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title></title>
    <script type="text/javascript">
        PageContext = {};
        window.onload = function () {
            window.document.forms[0].submit();
        }
    </script>
</head>
<body>
<form action="${path}/securityLogin" method="post">
    <input type="hidden" name="username" value="bigscreen"/>
    <input type="hidden" name="password" value="123456"/>
</form>
</body>
</html>
