package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.request.EventRegistrationReqDto;
import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;
import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.service.EventRegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/event-registrations")
@RequiredArgsConstructor
@Tag(name = "Event registration controller")
public class EventRegistrationController {
    private final EventRegistrationService eventRegistrationService;

    @Operation(summary = "Đăng ký tham gia sự kiện")
    @PostMapping
    public DataResponse<EventRegistrationResDto> registerEventRegistration(@Valid @RequestBody EventRegistrationReqDto eventRegistrationReqDto) {
        final EventRegistrationResDto eventRegistration = eventRegistrationService.createEventRegistration(eventRegistrationReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Register event successfully", eventRegistration);
    }

    @Operation(summary = "Tìm theo ID")
    @GetMapping("find")
    public DataResponse<EventRegistrationResDto> getEventRegistrationById(@RequestParam("id") String id) {
        final EventRegistrationResDto eventRegistration = eventRegistrationService.getEventRegistrationById(id);
        return new DataResponse<>(HttpStatus.OK.value(), "Get event registration with id " + id + " successfully", eventRegistration);
    }

    @Operation(summary = "Tất cả sự kiện người dùng đã đăng ký (phân trang)")
    @GetMapping("me")
    public DataResponse<PageDto<EventRegistrationResDto>> getEventRegistrationByCurrentUser(
            @RequestParam(value = "pageNumber", required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") Integer pageSize
    ) {
        final PageDto<EventRegistrationResDto> eventRegistrationDtoPage = eventRegistrationService.getEventRegistrationsByCurrentUser(pageNumber, pageSize);
        return new DataResponse<>(HttpStatus.OK.value(), "Get event registration of current user successfully", eventRegistrationDtoPage);
    }

    @Operation(summary = "Tìm sự kiện dựa vào thông tin đăng ký")
    @GetMapping("event/{eventRegistrationId}")
    public DataResponse<EventResDto> getEventByEventRegistrationId(@Valid @PathVariable("eventRegistrationId") String eventRegistrationId) {
        final EventResDto event = eventRegistrationService.getEventByEventRegistrationId(eventRegistrationId);
        return new DataResponse<>(HttpStatus.OK.value(), "Get event with event registration id " + eventRegistrationId + " successfully", event);
    }

    @Operation(summary = "Hủy tham gia sự kiện")
    @DeleteMapping("{id}")
    public DataResponse<EventRegistrationResDto> deleteEventRegistration(@Valid @PathVariable("id") String id) {
        eventRegistrationService.deleteEventRegistration(id);
        return new DataResponse<>(HttpStatus.NO_CONTENT.value(), "Cancel event registration with id " + id + " successfully");
    }
}
