package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.PageDto;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.entity.Event;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.mapper.UserDtoMapper;
import com.trhthanhh.event_management.repository.EventRepository;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

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

    @Override
    public PageDto<UserResDto> getAllUsers(int pageNumber, int pageSize) {
        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        final Page<User> userPage = userRepository.findAll(pageable);
        return PageDto.of(userPage).map(new UserDtoMapper());
    }

    @Override
    public PageDto<UserResDto> getUsersByEventId(String eventId, int pageNumber, int pageSize) {
        final Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find event with id " + eventId));

        pageNumber--;
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        final Page<User> userPage = userRepository.findUserByEventId(eventId, pageable);
        return PageDto.of(userPage).map(new UserDtoMapper());
    }
}
