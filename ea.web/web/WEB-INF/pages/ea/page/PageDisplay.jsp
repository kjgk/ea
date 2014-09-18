<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<script type="text/javascript" src="${path}/scripts/jquery/jquery.mousewheel-3.0.6.pack.js"></script>
<script type="text/javascript" src="${path}/scripts/jquery/jquery-month-calendar.js"></script>
<script type="text/javascript" src="${path}/scripts/jDiaporama/jquery.jDiaporama.js"></script>
<script type="text/javascript" src="${path}/scripts/fancyBox/jquery.fancybox.js"></script>
<script type="text/javascript" src="${path}/scripts/fancyBox/helpers/jquery.fancybox-thumbs.js"></script>
<script type="text/javascript" src="${path}/scripts/poshytip/jquery.poshytip.js"></script>
<script type="text/javascript" src="${path}/scripts/mediaelement/mediaelement-and-player.js"></script>
<link rel="stylesheet" type="text/css" href="${path}/scripts/jquery/css/jquery-month-calendar.css"/>
<link rel="stylesheet" type="text/css" href="${path}/scripts/jDiaporama/style.css"/>
<link rel="stylesheet" type="text/css" href="${path}/scripts/fancyBox/jquery.fancybox.css"/>
<link rel="stylesheet" type="text/css" href="${path}/scripts/fancyBox/helpers/jquery.fancybox-thumbs.css"/>
<link rel="stylesheet" type="text/css" href="${path}/scripts/mediaelement/mediaelementplayer.min.css"/>
<link rel="stylesheet" type="text/css" href="${path}/css/pageDesigner.css"/>

<style>
    .standard-text {
        border: none;
        text-align: center;
        line-height: 32px;
    }

    .standard-image {
        border: none;
    }
</style>
<script type="text/javascript">
    isActive = true;
</script>