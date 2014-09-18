<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title></title>
    <%--<link rel="stylesheet" type="text/css" href="${path}/scripts/extjs/resources/css/ext-all.css"/>--%>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/extjs/resources/css/ext-all-gray-debug.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/extjs/ux/css/CheckHeader.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/scripts/extjs/ux/css/ItemSelector.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/css/icon.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/css/userSearchField.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/css/simpleSearchFiled.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/css/chart.css"/>
    <link rel="stylesheet" type="text/css" href="${path}/css/table.css"/>

    <link rel="stylesheet" type="text/css" href="${path}/scripts/colorpicker/css/colorpicker.css"/>
    <%--<link rel="stylesheet" type="text/css" href="${path}/css/yahei.css"/>--%>

    <script type="text/javascript" src="${path}/scripts/moment.min.js"></script>

    <script type="text/javascript" src="${path}/scripts/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="${path}/scripts/swfupload/swfupload.js"></script>
    <script type="text/javascript" src="${path}/scripts/swfupload/swfupload.queue.js"></script>
    <script type="text/javascript" src="${path}/scripts/swfupload/swfupload.speed.js"></script>

    <script type="text/javascript" src="${path}/scripts/colorpicker/js/colorpicker.js"></script>

    <script type="text/javascript" src="${path}/scripts/raphael-min.js"></script>
    <script type="text/javascript" src="${path}/scripts/justgage.2.0.1.js"></script>

    <%--<script type="text/javascript" src="${path}/scripts/highcharts/highcharts.src.js"></script>--%>
    <script type="text/javascript" src="${path}/scripts/highstock/highstock.src.js"></script>
    <script type="text/javascript" src="${path}/scripts/highcharts/highcharts-more.js"></script>
    <script type="text/javascript" src="${path}/scripts/withub/highcharts/contextmenu.js"></script>
    <script type="text/javascript" src="${path}/scripts/withub/highcharts/highchartsConfig.js"></script>


    <script type="text/javascript" src="${path}/scripts/highcharts/modules/funnel.js"></script>
    <script type="text/javascript" src="${path}/scripts/highcharts/themes/ea.js"></script>

    <script type="text/javascript" src="${path}/scripts/extjs/ext-all.js"></script>
    <script type="text/javascript" src="${path}/scripts/extjs/locale/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="${path}/scripts/withub/common.js"></script>
    <script type="text/javascript" src="${path}/scripts/withub/ext/util/RendererUtil.js"></script>
    <script type="text/javascript">
        PageContext.contextPath = '${path}';
        if (window.parent.PageContext) {
            PageContext.currentUser = window.parent.PageContext.currentUser;
        }
    </script>
    <script type="text/javascript" src="${path}/scripts/withub/ext/ex.js"></script>
    <script type="text/javascript" src="${path}/scripts/withub/ext/setup.js"></script>
    <script type="text/javascript">
        Ext.onReady(function () {
            var queryString_ = '${pageContext.request.queryString}';
            var pageParams_ = {};
            if (queryString_ != '') {
                Ext.each(queryString_.split('&'), function (str) {
                    pageParams_[str.split('=')[0]] = str.split('=')[1];
                });
            }
            var page = Ext.create('${page}', pageParams_);
            if (page instanceof  Ext.window.Window) {
                page.show();
            }
        });
    </script>
</head>
<body oncontextmenu='return true;'>
<c:if test="${!empty jspPage}">
    <jsp:include page="${jspPage}"></jsp:include>
</c:if>

</body>
</html>