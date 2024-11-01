package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.mapper.UserDtoMapper;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserResDto getCurrentUser() {
        // Lấy thông tin của User từ SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String username = principal.getUsername();

        final User existingUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find user with email " + username));
        return new UserDtoMapper().apply(existingUser);
    }
}
