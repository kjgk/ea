package com.withub.web.security;

import com.withub.common.util.DateUtil;
import com.withub.model.ea.UserLog;
import com.withub.model.system.enumeration.LogType;
import com.withub.service.ea.UserLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class AuthenticationFailureHandlerImpl implements AuthenticationFailureHandler {

    @Autowired
    private UserLogService userLogService;

    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {

        request.setAttribute("authenticationException", e);
        UserLog userLog = new UserLog();
        try {
            Date date = DateUtil.getCurrentTime();
            userLog.setUser(null);
            userLog.setLogTime(date);
            userLog.setLogType(LogType.Login.toString());
            userLog.setDescription("用户:" + request.getParameter("username") + " 登陆失败!");
            userLogService.addUserLog(userLog);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
