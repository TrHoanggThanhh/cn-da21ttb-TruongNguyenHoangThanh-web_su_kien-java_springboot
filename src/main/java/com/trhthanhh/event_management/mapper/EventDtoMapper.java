package com.trhthanhh.event_management.mapper;

import com.trhthanhh.event_management.dto.response.EventResDto;
import com.trhthanhh.event_management.entity.Event;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class EventDtoMapper implements Function<Event, EventResDto> {
    @Override
    public EventResDto apply(Event event) {
        return EventResDto.builder()
                .id(event.getId())
                .name(event.getName())
                .code(event.getCode())
                .description(event.getDescription())
                .location(event.getLocation())
                .organizer(event.getOrganizer())
                .status(event.getStatus())
                .thumbnail(event.getThumbnail())
                .categoryName(event.getCategory().getName())
                .quantity(event.getQuantity())
                .isImportant(event.isImportant())
                .startDate(event.getStartDate())
                .endDate(event.getEndDate())
                .build();
    }
}
