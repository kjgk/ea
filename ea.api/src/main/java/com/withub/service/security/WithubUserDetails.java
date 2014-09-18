package com.withub.service.security;


import org.springframework.security.core.userdetails.UserDetails;

public interface WithubUserDetails extends UserDetails {

    public String getUserId();

    public String getSalt();

    public boolean forceChangePassword();
}
