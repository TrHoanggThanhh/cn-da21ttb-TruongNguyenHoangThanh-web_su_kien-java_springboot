package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.request.EventReqDto;
import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.entity.Category;
import com.trhthanhh.event_management.entity.Event;
import com.trhthanhh.event_management.enums.EventStatus;
import com.trhthanhh.event_management.exception.DataAlreadyExistsException;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.mapper.EventDtoMapper;
import com.trhthanhh.event_management.repository.CategoryRepository;
import com.trhthanhh.event_management.repository.EventRepository;
import com.trhthanhh.event_management.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final CategoryRepository categoryRepository;
    private final CloudinaryService cloudinaryService;

    @Value("${resource.noImageUrl}")
    private String noImageUrl;

    @Override
    public EventResDto createEvent(EventReqDto eventReqDto) {
        if (eventRepository.existsByCode(eventReqDto.getCode())) {
            throw new DataAlreadyExistsException("Event with code " + eventReqDto.getCode() + " already exists");
        }
        final Category existingCategory = categoryRepository.findById(eventReqDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find category with id " + eventReqDto.getCategoryId()));
        final Event event = Event.builder()
                .name(eventReqDto.getName())
                .code(eventReqDto.getCode())
                .description(eventReqDto.getDescription())
                .location(eventReqDto.getLocation())
                .organizer(eventReqDto.getOrganizer())
                .status(eventReqDto.getStatus())
                .category(existingCategory)
                .maxParticipants(eventReqDto.getMaxParticipants())
                .isImportant(false)
                .startDate(eventReqDto.getStartDate())
                .endDate(eventReqDto.getEndDate())
                .build();
        // Xử lý file hình ảnh
        String thumbnail = noImageUrl;
        // Nếu tồn tại file thì upload lên Cloudinary
        if (eventReqDto.getFileImage() != null && !eventReqDto.getFileImage().isEmpty()) {
            Map<?, ?> data = this.cloudinaryService.upload(eventReqDto.getFileImage());
            thumbnail = (String) data.get("secure_url");
        }
        event.setThumbnail(thumbnail);
        return new EventDtoMapper().apply(eventRepository.save(event));
    }

    @Override
    public EventResDto getEventById(String id) {
        final Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with id " + id));
        return new EventDtoMapper().apply(existingEvent);
    }

    @Override
    public PageDto<EventResDto> getAllEvents(int pageNumber, int pageSize)
    {
        pageNumber--;
        final Pageable pageable = PageRequest.of(pageNumber, pageSize);
        final Page<Event> eventPage = eventRepository.findAll(pageable);
        return PageDto.of(eventPage).map(new EventDtoMapper());
    }

    @Override
    @Transactional
    public EventResDto updateEvent(String id, EventReqDto eventReqDto) {
        final Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with id " + id));
        final Category existingCategory = categoryRepository.findById(eventReqDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find category with id " + eventReqDto.getCategoryId()));
        existingEvent.setName(eventReqDto.getName());
        existingEvent.setCode(eventReqDto.getCode());
        existingEvent.setDescription(eventReqDto.getDescription());
        existingEvent.setLocation(eventReqDto.getLocation());
        existingEvent.setOrganizer(existingEvent.getOrganizer());
        existingEvent.setStatus(eventReqDto.getStatus());
        existingEvent.setMaxParticipants(existingEvent.getMaxParticipants());
        existingEvent.setCurrentParticipants(0);
        existingEvent.setImportant(existingEvent.isImportant());
        existingEvent.setCategory(existingCategory);
        existingEvent.setStartDate(eventReqDto.getStartDate());
        existingEvent.setEndDate(eventReqDto.getEndDate());
        // Xử lý file hình ảnh
        existingEvent.setThumbnail(existingEvent.getThumbnail());
        if (eventReqDto.getFileImage() != null && !eventReqDto.getFileImage().isEmpty()) {
            Map<?, ?> data = this.cloudinaryService.upload(eventReqDto.getFileImage());
            String newThumbnail = (String) data.get("secure_url");
            existingEvent.setThumbnail(newThumbnail);
        }
        eventRepository.save(existingEvent);
        return new EventDtoMapper().apply(existingEvent);
    }

    @Override
    public void deleteEventById(String id) {
        final Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with id " + id));
        event.setStatus(EventStatus.CANCEL);
        eventRepository.save(event);
    }

    @Override
    public PageDto<EventResDto> searchEvents(String keyword, EventStatus status, String categoryId, LocalDateTime startDate, LocalDateTime endDate, int pageNumber, int pageSize) {
        pageNumber--;
        final Pageable pageable = PageRequest.of(pageNumber, pageSize);
        final Page<Event> eventPageSearch = eventRepository.searchEvents(keyword, status, categoryId, startDate, endDate, pageable);
        return PageDto.of(eventPageSearch).map(new EventDtoMapper());
    }
}
