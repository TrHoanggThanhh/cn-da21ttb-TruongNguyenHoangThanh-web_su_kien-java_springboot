package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.request.LoginReqDto;
import com.trhthanhh.event_management.dto.request.RegisterReqDto;
import com.trhthanhh.event_management.dto.request.VerifyReqDto;
import com.trhthanhh.event_management.dto.response.LoginResDto;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/auth")
@RequiredArgsConstructor
@Tag(name = "Auth controller")
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "Đăng nhập")
    @PostMapping("login")
    public DataResponse<LoginResDto> login(@Valid @RequestBody LoginReqDto loginReqDto) {
        final LoginResDto loginResDto = authService.login(loginReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Login successfully", loginResDto);
    }

    @Operation(summary = "Đăng ký")
    @PostMapping("register")
    public DataResponse<UserResDto> register(@Valid @RequestBody RegisterReqDto registerReqDto) throws MessagingException {
        final UserResDto userResDto = authService.register(registerReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Register successfully", userResDto);
    }

    @Operation(summary = "Xác thực Email")
    @PostMapping("/verifyEmail")
    public DataResponse<?> verifyEmail(@Valid @RequestBody VerifyReqDto verifyReqDto) {
        authService.verifyUser(verifyReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Verify Email successfully");
    }

    @Operation(summary = "Gửi lại mã xác thực qua Email")
    @PostMapping("/resendEmail")
    public DataResponse<?> resendEmail() throws MessagingException {
        authService.resendEmail();
        return new DataResponse<>(HttpStatus.OK.value(), "Resend Email successfully");
    }
}
