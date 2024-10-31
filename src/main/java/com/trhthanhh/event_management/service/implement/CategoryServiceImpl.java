package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.request.CategoryReqDto;
import com.trhthanhh.event_management.dto.response.CategoryResDto;
import com.trhthanhh.event_management.entity.Category;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.mapper.CategoryDtoMapper;
import com.trhthanhh.event_management.repository.CategoryRepository;
import com.trhthanhh.event_management.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResDto createCategory(CategoryReqDto categoryReqDto) {
        final Category category = Category.builder()
                .name(categoryReqDto.getName())
                .build();
        return new CategoryDtoMapper().apply(categoryRepository.save(category));
    }

    @Override
    public CategoryResDto getCategoryById(String id) {
        final Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find category with id " + id));
        return new CategoryDtoMapper().apply(existingCategory);
    }

    @Override
    @Transactional
    public CategoryResDto updateCategory(String id, CategoryReqDto categoryReqDto) {
        final Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find category with id " + id));
        existingCategory.setName(categoryReqDto.getName());
        return new CategoryDtoMapper().apply(existingCategory);
    }

    @Override
    public void deleteCategoryById(String id) {
        final Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find category with id " + id));
        categoryRepository.delete(existingCategory);
    }
}
