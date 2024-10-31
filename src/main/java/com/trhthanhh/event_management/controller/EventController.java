package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.request.EventReqDto;
import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.enums.EventStatus;
import com.trhthanhh.event_management.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("${api.prefix}/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping
    public DataResponse<EventResDto> createEvent(@Valid EventReqDto eventReqDto) {
        final EventResDto event = eventService.createEvent(eventReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Create event successfully", event);
    }

    @GetMapping
    public DataResponse<PageDto<EventResDto>> getAllEvents(
            @RequestParam(name = "pageNumber", required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        final PageDto<EventResDto> eventDtoPage = eventService.getAllEvents(pageNumber, pageSize);
        return new DataResponse<>(HttpStatus.OK.value(), "Get all events successfully", eventDtoPage);
    }

    @GetMapping("search")
    public DataResponse<PageDto<EventResDto>> searchEvents(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "status", required = false) EventStatus status,
            @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss") @RequestParam(name = "startDate", required = false) LocalDateTime startDate,
            @DateTimeFormat(pattern = "dd-MM-yyyy HH:mm:ss") @RequestParam(name = "endDate", required = false) LocalDateTime endDate,
            @RequestParam(name = "pageNumber", required = false, defaultValue = "1") Integer pageNumber,
            @RequestParam(name = "pageSize", required = false, defaultValue = "10") Integer pageSize) {
        final PageDto<EventResDto> eventDtoPageSearch = eventService.searchEvents(keyword, status, startDate, endDate, pageNumber, pageSize);
        return new DataResponse<>(HttpStatus.OK.value(), "Search events successfully", eventDtoPageSearch);
    }

    @GetMapping("find")
    public DataResponse<EventResDto> getEventByCode(@RequestParam("id") String id) {
        final EventResDto event = eventService.getEventById(id);
        return new DataResponse<>(HttpStatus.OK.value(), "Get event with id " + id + " successfully", event);
    }

    @PutMapping("{id}")
    public DataResponse<EventResDto> updateEvent(@Valid @PathVariable("id") String id, @Valid EventReqDto eventReqDto) {
        eventService.updateEvent(id, eventReqDto);
        return new DataResponse<>(HttpStatus.ACCEPTED.value(), "Update event successfully");
    }

    @DeleteMapping("{id}")
    public DataResponse<EventResDto> deleteEventByCode(@Valid @PathVariable("id") String id) {
        eventService.deleteEventById(id);
        return new DataResponse<>(HttpStatus.NO_CONTENT.value(), "Delete event with id " + id + " successfully");
    }
}
