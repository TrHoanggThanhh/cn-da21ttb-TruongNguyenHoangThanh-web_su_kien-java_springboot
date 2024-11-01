package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.mapper.UserDtoMapper;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserResDto getUserByEmail(String email) {
        final User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find user with email " + email));
        return new UserDtoMapper().apply(existingUser);
    }
}
