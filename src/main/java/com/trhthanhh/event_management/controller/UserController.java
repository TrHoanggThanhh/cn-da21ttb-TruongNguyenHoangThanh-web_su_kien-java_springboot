package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("me")
    public DataResponse<UserResDto> getCurrentInformation() {
        final UserResDto userResDto = userService.getCurrentUser();
        return new DataResponse<>(HttpStatus.OK.value(), "Get current information successfully", userResDto);
    }
}
