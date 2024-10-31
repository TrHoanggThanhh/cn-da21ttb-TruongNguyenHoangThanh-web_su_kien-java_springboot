package com.trhthanhh.event_management.mapper;

import com.trhthanhh.event_management.dto.response.CategoryResDto;
import com.trhthanhh.event_management.entity.Category;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class CategoryDtoMapper implements Function<Category, CategoryResDto> {
    @Override
    public CategoryResDto apply(Category category) {
        return CategoryResDto.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
