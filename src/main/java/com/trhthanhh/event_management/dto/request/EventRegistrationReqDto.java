package com.trhthanhh.event_management.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventRegistrationReqDto {
    @NotBlank(message = "User's ID is required")
    private String userId;

    @NotBlank(message = "Event's ID is required")
    private String eventId;
}
