package com.withub.service.impl.security;

import com.withub.model.system.po.User;
import com.withub.service.system.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    public UserDetails loadUserByUsername(String accountName) throws UsernameNotFoundException {

        UserDetails userDetails = null;

        try {
            User user = userService.getUserByAccount(accountName);
            if (user != null) {
                userDetails = new UserDetailsImpl(user);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userDetails;
    }


}
