package com.withub.util;

import com.withub.common.util.CollectionUtil;
import com.withub.model.system.po.User;
import com.withub.service.security.WithubUserDetails;
import com.withub.service.system.UserService;
import com.withub.spring.SpringContextUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;

import java.util.List;

/**
 * Spring Security 工具类.
 */
public final class SpringSecurityUtil {

    /**
     * 获取当前用户的帐号ID
     *
     * @return String
     *         TODO : 应该监控此方法,捕获主调方法
     */
    public static String getUserId() {

        String userId = "";

        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            WithubUserDetails userDetails = (WithubUserDetails) authentication.getPrincipal();
            userId = userDetails.getUserId();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return userId;
    }

    public static User getCurrentUser() throws Exception {

        UserService userService = (UserService) SpringContextUtil.getInstance().getBean("userService");
        User user = userService.getUserById(getUserId());

        return user;
    }

    public static SessionInformation getAccountSessionInformation(final String userId) throws Exception {

        SessionInformation sessionInformation = null;
        SessionRegistry sessionRegistry = (SessionRegistry) SpringContextUtil.getInstance().getBean("sessionRegistry");
        List<Object> principalList = sessionRegistry.getAllPrincipals();
        if (CollectionUtil.isEmpty(principalList)) {
            return null;
        }
        for (Object principal : principalList) {
            WithubUserDetails withubUserDetails = (WithubUserDetails) principal;
            if (withubUserDetails.getUserId().equals(userId)) {
                sessionInformation = sessionRegistry.getAllSessions(principal, false).get(0);
                break;
            }
        }

        return sessionInformation;
    }
}
