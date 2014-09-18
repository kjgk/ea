package com.withub.web.servlet;

import com.withub.common.util.StringUtil;
import com.withub.common.util.SystemUtil;
import com.withub.model.system.config.SystemConfigInfo;
import com.withub.util.ConfigUtil;
import com.withub.web.common.Constants;
import org.apache.commons.lang.StringUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SecurityServlet extends HttpServlet {

    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String action = request.getRequestURI().replaceFirst(request.getContextPath(), "")
                .replaceAll(request.getServletPath(), "").replaceAll("/", "");

        try {
            ConfigUtil.getInstance().init();
        } catch (Exception e) {
            e.printStackTrace();
        }
        SystemConfigInfo systemConfigInfo = ConfigUtil.getSystemConfigInfo();
        if (!SystemUtil.authorize(systemConfigInfo.getUniqueCode(), systemConfigInfo.getAuthorizationCode(), "")) {
//            request.getRequestDispatcher("/authorizationError.jsp").forward(request, response);
//            return;
        }

        if (StringUtils.equalsIgnoreCase(action, Constants.SESSION_INVALID)) {
            if (StringUtil.compareValue(request.getHeader("x-requested-with"), "XMLHttpRequest")) {
                response.getWriter().write(Constants.SESSION_INVALID);
            } else {
                response.sendRedirect(request.getContextPath() + "/security/login.page");
            }
        } else if (StringUtils.equalsIgnoreCase(action, Constants.SESSION_EXPIRED)) {
            if (StringUtil.compareValue(request.getHeader("x-requested-with"), "XMLHttpRequest")) {
                response.getWriter().write(Constants.SESSION_EXPIRED);
            } else {
                response.sendRedirect(request.getContextPath() + "/security/login.page");
            }
        } else {
            if (StringUtil.compareValue(request.getHeader("x-requested-with"), "XMLHttpRequest")) {
                response.getWriter().write(Constants.SESSION_INVALID);
            } else {
                response.sendRedirect(request.getContextPath() + "/security/login.page");
            }
        }
    }
}
