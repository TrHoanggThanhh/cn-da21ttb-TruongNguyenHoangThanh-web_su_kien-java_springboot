package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.request.EventReqDto;
import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.enums.EventStatus;

import java.time.LocalDateTime;

public interface EventService {
    EventResDto createEvent(EventReqDto eventReqDto);
    EventResDto getEventById(String id);
    PageDto<EventResDto> getAllEvents(int pageNumber, int pageSize);
    EventResDto updateEvent(String id, EventReqDto eventReqDto);
    void deleteEventById(String id);
    PageDto<EventResDto> searchEvents(String keyword, EventStatus status, LocalDateTime startDate, LocalDateTime endDate, int pageNumber, int pageSize);
}
