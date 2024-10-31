package com.trhthanhh.event_management.dto;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;

public record PageDto<T>(List<T> items, int pageNumber, int pageSize, int totalPages, long totalItems) {
    public <R> PageDto<R> map(Function<T, R> mapper) {
        final List<R> items = this.items.stream().map(mapper).toList();
        return new PageDto<>(items, pageNumber, pageSize, totalPages, totalItems);
    }

    public static <R> PageDto<R> of(Page<R> page) {
        return new PageDto<>(
                page.getContent(),
                page.getNumber() + 1,
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements());
    }
}
