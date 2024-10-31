package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.request.EventRegistrationReqDto;
import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;
import com.trhthanhh.event_management.dto.response.EventResDto;

public interface EventRegistrationService {
    EventRegistrationResDto createEventRegistration(EventRegistrationReqDto eventRegistrationReqDto);
    EventRegistrationResDto getEventRegistrationById(String id);
    EventResDto getEventByEventRegistrationId(String eventRegistrationId);
    void deleteEventRegistration(String id);
}
