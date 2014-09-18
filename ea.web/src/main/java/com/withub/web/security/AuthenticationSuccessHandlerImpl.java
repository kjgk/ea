package com.withub.web.security;

import com.withub.common.util.DateUtil;
import com.withub.model.ea.UserLog;
import com.withub.model.system.enumeration.LogType;
import com.withub.model.system.po.User;
import com.withub.service.ea.UserLogService;
import com.withub.util.SpringSecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {

    @Autowired
    private UserLogService userLogService;

    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        request.setAttribute("authentication", authentication);
        UserLog userLog = new UserLog();
        try {
            Date date = DateUtil.getCurrentTime();
            User user = SpringSecurityUtil.getCurrentUser();
            userLog.setUser(user);
            userLog.setLogTime(date);
            userLog.setLogType(LogType.Login.toString());
            userLog.setDescription("登录系统");
            userLogService.addUserLog(userLog);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
