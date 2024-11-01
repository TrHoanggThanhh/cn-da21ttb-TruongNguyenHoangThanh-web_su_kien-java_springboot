package com.trhthanhh.event_management.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResDto {
    private String id;
    private String email;
    private String studentCode;
    private String fullName;
    private String role;
    private boolean isVerified;
}
