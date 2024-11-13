package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.response.UserResDto;

public interface UserService {
    UserResDto getCurrentUser();
    PageDto<UserResDto> getAllUsers(int pageNumber, int pageSize);
    PageDto<UserResDto> getUsersByEventId(String eventId, int pageNumber, int pageSize);
}
