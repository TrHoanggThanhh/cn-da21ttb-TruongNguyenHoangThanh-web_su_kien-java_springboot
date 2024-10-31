package com.trhthanhh.event_management.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trhthanhh.event_management.enums.EventRegistrationStatus;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Builder
public class EventRegistrationResDto {
    private String id;

    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime registrationDate;

    private EventRegistrationStatus status;

    // Thông tin User
    private String email;
    private String studentCode;

    // Thông tin Event
    private String eventName;
    private String location;
    private String organizer;

    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime startDate;

    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime endDate;
}
