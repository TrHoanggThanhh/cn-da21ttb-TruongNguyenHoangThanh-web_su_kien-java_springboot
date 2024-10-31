package com.trhthanhh.event_management.controller;

import com.trhthanhh.event_management.dto.DataResponse;
import com.trhthanhh.event_management.dto.request.CategoryReqDto;
import com.trhthanhh.event_management.dto.response.CategoryResDto;
import com.trhthanhh.event_management.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public DataResponse<CategoryResDto> createCategory(@Valid @RequestBody CategoryReqDto categoryReqDto) {
        final CategoryResDto category = categoryService.createCategory(categoryReqDto);
        return new DataResponse<>(HttpStatus.OK.value(), "Create category successfully", category);
    }

    @GetMapping("find")
    public DataResponse<CategoryResDto> getCategoryById(@RequestParam("id") String id) {
        final CategoryResDto category = categoryService.getCategoryById(id);
        return new DataResponse<>(HttpStatus.OK.value(), "Get category with id " + id + " successfully", category);
    }

    @PutMapping("{id}")
    public DataResponse<CategoryResDto> updateEvent(@Valid @PathVariable("id") String id, @Valid @RequestBody CategoryReqDto categoryReqDto) {
        categoryService.updateCategory(id, categoryReqDto);
        return new DataResponse<>(HttpStatus.ACCEPTED.value(), "Update category successfully");
    }

    @DeleteMapping("{id}")
    public DataResponse<CategoryResDto> deleteCategoryById(@Valid @PathVariable("id") String id) {
        categoryService.deleteCategoryById(id);
        return new DataResponse<>(HttpStatus.NO_CONTENT.value(), "Delete category with id " + id + " successfully");
    }
}
