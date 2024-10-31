package com.trhthanhh.event_management.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.trhthanhh.event_management.enums.EventStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Builder
public class EventReqDto {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Code is required")
    private String code;

    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotBlank(message = "Organizer is required")
    private String organizer;

    @NotNull(message = "Status is required")
    private EventStatus status;

    private MultipartFile fileImage;
    private String thumbnail;

    @NotNull(message = "Category's ID is required")
    private String categoryId;

    @NotNull(message = "Start date is required")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime startDate;

    @NotNull(message = "End date is required")
    @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime endDate;
}
