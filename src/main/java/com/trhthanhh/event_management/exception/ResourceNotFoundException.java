package com.trhthanhh.event_management.exception;

import org.springframework.stereotype.Repository;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
