package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.request.EventRegistrationReqDto;
import com.trhthanhh.event_management.dto.response.EventRegistrationResDto;
import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.entity.Event;
import com.trhthanhh.event_management.entity.EventRegistration;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.enums.EventRegistrationStatus;
import com.trhthanhh.event_management.enums.EventStatus;
import com.trhthanhh.event_management.exception.EmailNotVerifiedException;
import com.trhthanhh.event_management.exception.EventNotAvailableException;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.exception.ScheduleConflictException;
import com.trhthanhh.event_management.mapper.EventDtoMapper;
import com.trhthanhh.event_management.mapper.EventRegistrationDtoMapper;
import com.trhthanhh.event_management.repository.EventRegistrationRepository;
import com.trhthanhh.event_management.repository.EventRepository;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.EventRegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventRegistrationServiceImpl implements EventRegistrationService {
    private final EventRegistrationRepository eventRegistrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Value("${resource.suitableQuantity}")
    private int suitableQuantity;

    @Override
    public EventRegistrationResDto createEventRegistration(EventRegistrationReqDto eventRegistrationReqDto) {
        // Lấy thông tin của User từ SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String username = principal.getUsername();

        final User currentUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find user with email" + username));

        // Kiểm tra User đã vefiry Email hay chưa, chưa thì không cho đăng ký tham gia
        if(!currentUser.isVerified()) {
            throw new EmailNotVerifiedException("Please verify Email before register Event");
        }

        // Kiếm tra Event có tồn tại không và trạng thái Event phải CANCELLED, CLOSED không
        final Event existingEvent = eventRepository.findById(eventRegistrationReqDto.getEventId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with id " + eventRegistrationReqDto.getEventId()));
        if (existingEvent.getStatus().equals(EventStatus.CANCEL)) {
            throw new EventNotAvailableException("Event has been cancelled and cannot be registered for");
        }
        if (existingEvent.getStatus().equals(EventStatus.CLOSE)) {
            throw new EventNotAvailableException("Event has been closed and cannot be registered for");
        }

        final EventRegistration eventRegistration = EventRegistration.builder()
                .user(currentUser)
                .event(existingEvent)
                .registrationDate(LocalDateTime.now())
                .status(EventRegistrationStatus.CONFIRM)
                .build();

        // Kiểm tra trùng lịch
        List<EventRegistration> existingEventRegistrations = eventRegistrationRepository.findByUser(currentUser);
        for (EventRegistration item : existingEventRegistrations) {
            if (item.getStatus().equals(EventRegistrationStatus.CONFIRM)) {
                final LocalDateTime startDate = item.getEvent().getStartDate();
                final LocalDateTime endDate = item.getEvent().getEndDate();
                if (startDate.isBefore(existingEvent.getEndDate()) && existingEvent.getStartDate().isBefore(endDate)) {
                    throw new ScheduleConflictException("User was registered an another Event at this time");
                }
            }
        }
        existingEvent.setQuantity(existingEvent.getQuantity() + 1);
        updateEventImportantBasedOnQuantity(existingEvent);
        eventRepository.save(existingEvent);
        return new EventRegistrationDtoMapper().apply(eventRegistrationRepository.save(eventRegistration));
    }

    @Override
    public EventRegistrationResDto getEventRegistrationById(String id) {
        final EventRegistration existingEventRegistration = eventRegistrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event registration with id " + id));
        return new EventRegistrationDtoMapper().apply(existingEventRegistration);
    }

    @Override
    public EventResDto getEventByEventRegistrationId(String eventRegistrationId) {
        final Event existingEvent = eventRegistrationRepository.findEventByEventRegistrationId(eventRegistrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with event registration id " + eventRegistrationId));
        return new EventDtoMapper().apply(existingEvent);
    }

    @Override
    public PageDto<EventRegistrationResDto> getEventRegistrationsByCurrentUser(Integer pageNumber, Integer pageSize) {
        // Lấy thông tin của User từ SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String username = principal.getUsername();

        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        final Page<EventRegistration> eventRegistrationsPage = eventRegistrationRepository.findEventRegistrationByCurrentUser(username, pageable);
        return PageDto.of(eventRegistrationsPage).map(new EventRegistrationDtoMapper());
    }

    @Override
    @Transactional
    public void deleteEventRegistration(String id) {
        final EventRegistration existingEventRegistration = eventRegistrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event registration with id " + id));
        if (!existingEventRegistration.getStatus().equals(EventRegistrationStatus.CANCEL)) {
            existingEventRegistration.setStatus(EventRegistrationStatus.CANCEL);
            final Event existingEvent = eventRegistrationRepository.findEventByEventRegistrationId(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Cannot find event  with id " + id));
            existingEvent.setQuantity(existingEvent.getQuantity() - 1);
            updateEventImportantBasedOnQuantity(existingEvent);
            eventRepository.save(existingEvent);
            eventRegistrationRepository.save(existingEventRegistration);
        }
    }

    private void updateEventImportantBasedOnQuantity(Event event) {
        event.setImportant(event.getQuantity() >= suitableQuantity);
    }
}
