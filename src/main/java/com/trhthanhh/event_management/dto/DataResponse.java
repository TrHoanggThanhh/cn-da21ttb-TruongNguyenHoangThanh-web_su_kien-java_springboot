package com.trhthanhh.event_management.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DataResponse<T> {
    private final int status;
    private final String message;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;

    // For PUT, PATCH, DELETE
    public DataResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    // For GET, POST
    public DataResponse(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
