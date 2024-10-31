package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.request.EventRegistrationReqDto;
import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;

public interface EventRegistrationService {
    EventRegistrationResDto createEventRegistration(EventRegistrationReqDto eventRegistrationReqDto);
    EventRegistrationResDto getEventRegistrationById(String id);
    void deleteEventRegistration(String id);
}
