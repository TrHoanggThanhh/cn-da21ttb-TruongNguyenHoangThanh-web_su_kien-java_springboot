package com.trhthanhh.event_management.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterReqDto {
    @NotNull(message = "Username is required")
    private String email;

    @NotNull(message = "Student code is required")
    private String studentCode;

    @NotNull(message = "Password is required")
    private String password;

    @NotNull(message = "First name is required")
    private String firstName;

    @NotNull(message = "Last name is required")
    private String lastName;

    private Long roleId = 1L;
}
