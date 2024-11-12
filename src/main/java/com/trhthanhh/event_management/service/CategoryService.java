package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.request.CategoryReqDto;
import com.trhthanhh.event_management.dto.response.CategoryResDto;
import org.springframework.data.domain.Page;

public interface CategoryService {
    CategoryResDto createCategory(CategoryReqDto categoryReqDto);
    CategoryResDto getCategoryById(String id);
    CategoryResDto updateCategory(String id, CategoryReqDto categoryReqDto);
    void deleteCategoryById(String id);
    PageDto<CategoryResDto> getAllCategories(int pageNumber, int pageSize);
}
