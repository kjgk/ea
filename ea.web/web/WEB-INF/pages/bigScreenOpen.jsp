<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <title></title>
    <script type="text/javascript">
        window.open('${path}/security/bigScreen.page', 'bigscreen'
                , 'width=' + (screen.availWidth) + ',height=' + (screen.availHeight) + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no');
        window.open('', '_self', '');
        window.close();
    </script>
</head>
<body>
</body>
</html>