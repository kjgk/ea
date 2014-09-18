package com.withub.web.servlet;

import com.withub.common.util.StringUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class BigScreenServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        HttpSession session = req.getSession();
        if (session.getAttribute("SPRING_SECURITY_CONTEXT") != null) {
            String appMode = req.getParameter("appMode");
            if (StringUtil.compareValue(appMode, "1")) {
                resp.sendRedirect(req.getContextPath() + "/security/bigScreen.page");
            } else {
                req.getRequestDispatcher("/WEB-INF/pages/bigScreenOpen.jsp").forward(req, resp);
            }
        } else {
            resp.sendRedirect(req.getContextPath() + "/security/bigScreen/login.page");
        }

    }
}
