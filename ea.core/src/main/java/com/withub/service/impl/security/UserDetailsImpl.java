package com.withub.service.impl.security;

import com.withub.model.system.po.User;
import com.withub.service.security.WithubUserDetails;
import com.withub.service.system.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service("userDetails")
public class UserDetailsImpl implements WithubUserDetails {

    @Autowired
    private UserService userService;

    private User user;

    public UserDetailsImpl() {

    }

    public UserDetailsImpl(User user) {

        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> list = new ArrayList<GrantedAuthority>();
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
        list.add(grantedAuthority);
        if (this.user.getName().equalsIgnoreCase("管理员")) {
            grantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
            list.add(grantedAuthority);
        }

        return list;

    }

    @Override
    public String getPassword() {

        return this.user.getPassword();
    }

    @Override
    public String getUsername() {

        return this.user.getName();
    }

    @Override
    public boolean isAccountNonExpired() {

        return true;
    }

    @Override
    public boolean isAccountNonLocked() {

        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {

        return true;
    }

    @Override
    public boolean isEnabled() {

        return true;
    }

    public String getUserId() {

        return this.user.getObjectId();
    }

    public String getSalt() {

        return this.user.getSalt();
    }

    public boolean forceChangePassword() {
//
//        if (!ConfigUtil.getSecurityConfigInfo().isForceChangePassword()) {
//            return false;
//        }
//
//        if (!account.getLastEditor().getObjectId().equals(account.getUser().getObjectId())) {
//            return true;
//        }
//
//        if (DateUtil.getDiffDays(account.getPasswordTime(), DateUtil.getCurrentTime()) >= ConfigUtil.getSecurityConfigInfo().getPasswordIntervalDays()) {
//            return true;
//        }

        return false;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserDetailsImpl that = (UserDetailsImpl) o;

        if (!this.user.getObjectId().equals(that.user.getObjectId())) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {

        return this.user.getObjectId().hashCode();
    }


}
