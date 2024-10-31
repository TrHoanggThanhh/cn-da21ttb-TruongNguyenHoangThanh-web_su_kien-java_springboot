package com.trhthanhh.event_management.service;

import com.trhthanhh.event_management.dto.request.CategoryReqDto;
import com.trhthanhh.event_management.dto.response.CategoryResDto;

public interface CategoryService {
    CategoryResDto createCategory(CategoryReqDto categoryReqDto);
    CategoryResDto getCategoryById(String id);
    CategoryResDto updateCategory(String id, CategoryReqDto categoryReqDto);
    void deleteCategoryById(String id);
}
