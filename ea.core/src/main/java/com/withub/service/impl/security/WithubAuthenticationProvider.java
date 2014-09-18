package com.withub.service.impl.security;

import com.withub.common.util.StringUtil;
import com.withub.model.security.LoginInfo;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;


public class WithubAuthenticationProvider extends DaoAuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        Authentication result = super.authenticate(authentication);

//        if (result.isAuthenticated()) {
//            SecurityEventPublisher.publishLoginEvent(this, (LoginInfo) authentication.getDetails());
//        }

        UserDetailsImpl userDetails = (UserDetailsImpl) result.getPrincipal();
        LoginInfo loginInfo = (LoginInfo) result.getDetails();

        if (StringUtil.compareValue(loginInfo.getLoginType(), "Admin")
                && !StringUtil.compareValue(userDetails.getUserId(), "E77AF63E-CE65-4C91-8045-F8EB4F02EEB8")) {
            throw new BadCredentialsException("Bad credentials");
        }

        return result;
    }
}
