package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
@Tag(name = "User controller")
public class UserController {
    private final UserService userService;

    @Operation(summary = "Thông tin người dùng hiện tại")
    @GetMapping("me")
    public DataResponse<UserResDto> getCurrentInformation() {
        final UserResDto userResDto = userService.getCurrentUser();
        return new DataResponse<>(HttpStatus.OK.value(), "Get current information successfully", userResDto);
    }

    @Operation(summary = "Tất cả người dùng (phân trang)")
    @GetMapping
    public DataResponse<PageDto<UserResDto>> getAllUsers(
            @RequestParam(name = "pageNumber", required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        final PageDto<UserResDto> userDtoPage = userService.getAllUsers(pageNumber, pageSize);
        return new DataResponse<>(HttpStatus.OK.value(), "Get all users successfully", userDtoPage);
    }

    @Operation(summary = "Tất cả người dùng đăng ký một sự kiện (phân trang)")
    @GetMapping("{eventId}")
    public DataResponse<PageDto<UserResDto>> getUsersByEventId(
            @PathVariable("eventId") String eventId,
            @RequestParam(name = "pageNumber", required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        final PageDto<UserResDto> userDtoPage = userService.getUsersByEventId(eventId, pageNumber, pageSize);
        return new DataResponse<>(HttpStatus.OK.value(), "Get all users register event with id " + eventId + " successfully", userDtoPage);
    }
}
