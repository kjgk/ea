<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="/WEB-INF/tld/taglibs.jsp" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title></title>
    <style type="text/css">
        body {
            width: 100%;
            height: 100%;
            padding: 0px;
            margin: 0px;
        }
    </style>
    <script type="text/javascript" src="${path}/scripts/jquery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="${path}/scripts/extjs/ext.js"></script>
    <script type="text/javascript">
        $(function () {
            var mainFrame = window.frames['mainFrame'];
            var currentInterval = 1, interval = 10 * 1000;
            var updateMainFrame = function (menuId) {
                mainFrame.location.href = '${path}/loadPage/withub.ext.ea.page.PageDisplay?menuId=' + menuId;
                currentInterval = 1;
            }

            if (Ext.isIE) {
                $('iframe').css('height', (window.innerHeight - 4) + 'px');
            }

            $.ajax({
                dataType: 'json',
                url: '${path}/system/loadHomePage',
                data: {
                    pageType: 'BigScreen'
                },
                method: 'GET',
                success: function (result) {
                    updateMainFrame(result['homePageId']);
                }
            });

            $.ajax({
                dataType: 'json',
                url: '${path}/ea/bigScreenScrollPage/list',
                method: 'GET',
                success: function (result) {
                    if (result.items.length == 0) {
                        return;
                    }
                    setInterval(function () {
                        var href = window.frames[0].window.location.href;
                        var flag = true;
                        $.each(result.items, function (index, item) {
                            if (href.indexOf(item['menuId']) != -1) {
                                if (currentInterval * (interval / 1000) >= item['displayMinutes'] * 60) {
                                    var nextMenu = result.items[0];
                                    if (index < result.items.length - 1) {
                                        nextMenu = result.items[index + 1];
                                    }
                                    updateMainFrame(nextMenu['menuId']);
                                } else {
                                    currentInterval++;
                                }
                                flag = false;
                            }
                        });
                        if (flag) {
                            currentInterval = 1;
                        }
                    }, interval);
                }
            });
        })
    </script>

</head>

<body>

<iframe name="mainFrame" style="width: 100%; height: 100%; border: none;" src="about:blank"></iframe>

</body>
</html>