package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.request.EventRegistrationReqDto;
import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;
import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.service.EventRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/event-registrations")
@RequiredArgsConstructor
public class EventRegistrationController {
    private final EventRegistrationService eventRegistrationService;

    @PostMapping
    public DataResponse<EventRegistrationResDto> registerEvent(@Valid @RequestBody EventRegistrationReqDto eventRegistrationReqDto) {
        final EventRegistrationResDto eventRegistration = eventRegistrationService.createEventRegistration(eventRegistrationReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Register event successfully", eventRegistration);
    }

    @GetMapping("find")
    public DataResponse<EventRegistrationResDto> getEventRegistrationById(@RequestParam("id") String id) {
        final EventRegistrationResDto eventRegistration = eventRegistrationService.getEventRegistrationById(id);
        return new DataResponse<>(HttpStatus.OK.value(), "Get event registration with id " + id + " successfully", eventRegistration);
    }

    @GetMapping("event/{eventRegistrationId}")
    public DataResponse<EventResDto> getEventByEventRegistrationId(@Valid @PathVariable("eventRegistrationId") String eventRegistrationId) {
        final EventResDto event = eventRegistrationService.getEventByEventRegistrationId(eventRegistrationId);
        return new DataResponse<>(HttpStatus.OK.value(), "Get event with event registration id " + eventRegistrationId + " successfully", event);
    }

    @DeleteMapping("{id}")
    public DataResponse<EventRegistrationResDto> deleteEventRegistration(@Valid @PathVariable("id") String id) {
        eventRegistrationService.deleteEventRegistration(id);
        return new DataResponse<>(HttpStatus.NO_CONTENT.value(), "Cancel event registration with id " + id + " successfully");
    }
}
