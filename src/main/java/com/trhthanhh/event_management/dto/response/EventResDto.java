package com.trhthanhh.event_management.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trhthanhh.event_management.enums.EventStatus;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Builder
public class EventResDto {
    private String id;
    private String name;
    private String code;
    private String description;
    private String location;
    private String organizer;
    private EventStatus status;
    private String thumbnail;
    private String categoryName;
    private int maxParticipants;
    private int currentParticipants;
    private boolean isImportant;

    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime startDate;

    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime endDate;
}
