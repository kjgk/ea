package com.withub.web.interceptor;


import com.withub.model.exception.BaseBusinessException;
import net.sf.json.JSONSerializer;
import org.apache.commons.lang.StringUtils;
import org.springframework.ui.ModelMap;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class DefaultInterceptor extends HandlerInterceptorAdapter {

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

        if (ex == null) {
            return;
        }

        ex.printStackTrace();
        String message = "";
        if (ex instanceof BaseBusinessException) {
            message = ex.getMessage();
        } else {
            message = ex.toString();
        }

        Map data = new HashMap();
        data.put("success", false);
        data.put("message", message);
        response.getWriter().print(JSONSerializer.toJSON(data).toString());
        response.getWriter().flush();
        response.getWriter().close();
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

        if (modelAndView != null) {
            modelAndView.getModelMap().addAttribute("success", true);

        }

        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        HttpSession httpSession = request.getSession();
        /*if (httpSession.getAttribute("user") == null
                && !request.getRequestURI().startsWith(request.getContextPath() + "/security")) {
            if (request.getRequestURI().endsWith(".page")) {
                response.sendRedirect(StringUtils.isEmpty(request.getContextPath()) ? "/" : request.getContextPath());
            } else {
                Map data = new HashMap();
                data.put("success", false);
                data.put("code", "SessionTimeOut");
                data.put("message", "session超时，请重新登陆！");
                response.getWriter().print(JSONSerializer.toJSON(data).toString());
                response.getWriter().flush();
                response.getWriter().close();
            }
            return false;
        }*/
        return super.preHandle(request, response, handler);
    }

}
