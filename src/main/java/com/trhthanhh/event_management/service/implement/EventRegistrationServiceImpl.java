package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.request.EventRegistrationReqDto;
import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;
import com.trhthanhh.event_management.entity.Event;
import com.trhthanhh.event_management.entity.EventRegistration;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.enums.EventRegistrationStatus;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.mapper.EventRegistrationDtoMapper;
import com.trhthanhh.event_management.repository.EventRegistrationRepository;
import com.trhthanhh.event_management.repository.EventRepository;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.EventRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EventRegistrationServiceImpl implements EventRegistrationService {
    private final EventRegistrationRepository eventRegistrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Override
    public EventRegistrationResDto createEventRegistration(EventRegistrationReqDto eventRegistrationReqDto) {
        final User existingUser = userRepository.findById(eventRegistrationReqDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find user with id " + eventRegistrationReqDto.getUserId()));
        final Event existingEvent = eventRepository.findById(eventRegistrationReqDto.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with id " + eventRegistrationReqDto.getEventId()));
        final EventRegistration eventRegistration = EventRegistration.builder()
                .user(existingUser)
                .event(existingEvent)
                .registrationDate(LocalDateTime.now())
                .status(EventRegistrationStatus.CONFIRM)
                .build();
        return new EventRegistrationDtoMapper().apply(eventRegistrationRepository.save(eventRegistration));
    }

    @Override
    public EventRegistrationResDto getEventRegistrationById(String id) {
        final EventRegistration existingEventRegistration = eventRegistrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event registration with id " + id));
        return new EventRegistrationDtoMapper().apply(existingEventRegistration);
    }

    @Override
    public void deleteEventRegistration(String id) {
        final EventRegistration existingEventRegistration = eventRegistrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event registration with id " + id));
        existingEventRegistration.setStatus(EventRegistrationStatus.CANCEL);
        eventRegistrationRepository.save(existingEventRegistration);
    }
}