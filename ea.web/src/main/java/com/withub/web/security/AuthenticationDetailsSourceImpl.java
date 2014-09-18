package com.withub.web.security;

import com.withub.common.util.StringUtil;
import com.withub.model.security.LoginInfo;

import javax.servlet.http.HttpServletRequest;

public class AuthenticationDetailsSourceImpl implements org.springframework.security.authentication.AuthenticationDetailsSource<HttpServletRequest, LoginInfo> {

    @Override
    public LoginInfo buildDetails(HttpServletRequest request) {

        String defaultLoginType = "Web";
        String loginType = request.getParameter("loginType");
        if (StringUtil.isEmpty(loginType)) {
            loginType = defaultLoginType;
        }

        LoginInfo loginInfo = new LoginInfo();
        loginInfo.setClientIdentityCode(request.getRemoteAddr());
        loginInfo.setLoginType(loginType);
        loginInfo.setAccountName(request.getParameter("username"));
        loginInfo.setPassword(request.getParameter("password"));
        return loginInfo;
    }

}
