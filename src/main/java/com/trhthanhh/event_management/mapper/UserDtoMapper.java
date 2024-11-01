package com.trhthanhh.event_management.mapper;

import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.entity.User;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UserDtoMapper implements Function<User, UserResDto> {
    @Override
    public UserResDto apply(User user) {
        return UserResDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .studentCode(user.getStudentCode())
                .fullName(user.getLastName() + " " + user.getFirstName())
                .role(user.getRole().getName())
                .isVerified(user.isVerified())
                .build();
    }
}
