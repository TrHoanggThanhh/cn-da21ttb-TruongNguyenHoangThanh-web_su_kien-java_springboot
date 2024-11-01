package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.request.LoginReqDto;
import com.trhthanhh.event_management.dto.request.RegisterReqDto;
import com.trhthanhh.event_management.dto.response.LoginResDto;
import com.trhthanhh.event_management.dto.response.UserResDto;

public interface AuthService {
    LoginResDto login(LoginReqDto loginReqDto);
    UserResDto register(RegisterReqDto registerReqDto);
}
