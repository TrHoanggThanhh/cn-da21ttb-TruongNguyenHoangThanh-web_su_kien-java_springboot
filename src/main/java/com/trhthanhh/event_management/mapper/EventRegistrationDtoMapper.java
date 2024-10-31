package com.trhthanhh.event_management.mapper;

import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;
import com.trhthanhh.event_management.entity.EventRegistration;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class EventRegistrationDtoMapper implements Function<EventRegistration, EventRegistrationResDto> {
    @Override
    public EventRegistrationResDto apply(EventRegistration eventRegistration) {
        return EventRegistrationResDto.builder()
                .id(eventRegistration.getId())
                .registrationDate(eventRegistration.getRegistrationDate())
                .status(eventRegistration.getStatus())
                // Thông tin User
                .email(eventRegistration.getUser().getEmail())
                .studentCode(eventRegistration.getUser().getStudentCode())
                // Thông tin Event
                .eventName(eventRegistration.getEvent().getName())
                .location(eventRegistration.getEvent().getLocation())
                .organizer(eventRegistration.getEvent().getOrganizer())
                .startDate(eventRegistration.getEvent().getStartDate())
                .endDate(eventRegistration.getEvent().getEndDate())
                .build();
    }
}
