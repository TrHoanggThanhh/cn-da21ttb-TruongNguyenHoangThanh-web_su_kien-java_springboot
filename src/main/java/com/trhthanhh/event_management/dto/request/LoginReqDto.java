package com.trhthanhh.event_management.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginReqDto {
    @NotNull(message = "Username is required")
    private String email;

    @NotNull(message = "Password is required")
    private String password;
}
