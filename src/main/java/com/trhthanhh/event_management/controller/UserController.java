package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
@Tag(name = "Event controller")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Thông tin người dùng hiện tại")
    @GetMapping("me")
    public DataResponse<UserResDto> getCurrentInformation() {
        final UserResDto userResDto = userService.getCurrentUser();
        return new DataResponse<>(HttpStatus.OK.value(), "Get current information successfully", userResDto);
    }
}
