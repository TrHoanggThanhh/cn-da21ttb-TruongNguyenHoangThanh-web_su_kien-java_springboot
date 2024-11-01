package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.response.UserResDto;

public interface UserService {
    UserResDto getUserByEmail(String email);
//    UserResDto getUserById(String id);
//    PageDto<UserResDto> getAllUsers(int pageNumber, int pageSize);
}
