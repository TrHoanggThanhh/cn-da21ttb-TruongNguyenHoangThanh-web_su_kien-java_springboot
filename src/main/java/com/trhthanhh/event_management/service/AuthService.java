package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.request.LoginReqDto;
import com.trhthanhh.event_management.dto.response.LoginResDto;

public interface AuthService {
    LoginResDto login(LoginReqDto loginReqDto);
    void register();
}
