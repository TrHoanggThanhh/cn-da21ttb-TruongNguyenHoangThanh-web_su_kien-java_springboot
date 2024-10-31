package com.trhthanhh.event_management.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryReqDto {
    @NotBlank(message = "Name is required")
    private String name;
}
