package com.withub.web.security;


import com.withub.common.util.DateUtil;
import com.withub.model.ea.UserLog;
import com.withub.model.system.enumeration.LogType;
import com.withub.model.system.po.User;
import com.withub.service.ea.UserLogService;
import com.withub.service.security.SecurityEventPublisher;
import com.withub.service.security.WithubUserDetails;
import com.withub.util.SpringSecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

public class LogoutSuccessHandlerImpl implements org.springframework.security.web.authentication.logout.LogoutSuccessHandler {

    @Autowired
    private UserLogService userLogService;

    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        WithubUserDetails userDetails = (WithubUserDetails) authentication.getPrincipal();
        SecurityEventPublisher.publishLogoutEvent(this, userDetails.getUserId());
        response.sendRedirect(request.getContextPath());

        UserLog userLog = new UserLog();
        try {
            Date date = DateUtil.getCurrentTime();
            User user = userLogService.getUserById(userDetails.getUserId());
            userLog.setUser(user);
            userLog.setLogTime(date);
            userLog.setLogType(LogType.Logout.toString());
            userLog.setDescription("退出系统");
            userLogService.addUserLog(userLog);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
