package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.request.LoginReqDto;
import com.trhthanhh.event_management.dto.request.RegisterReqDto;
import com.trhthanhh.event_management.dto.response.LoginResDto;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.entity.Role;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.exception.DataAlreadyExistsException;
import com.trhthanhh.event_management.exception.PermissionDenyException;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.jwt.JWTService;
import com.trhthanhh.event_management.mapper.UserDtoMapper;
import com.trhthanhh.event_management.repository.RoleRepository;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public LoginResDto login(LoginReqDto loginReqDto) {
        final Optional<User> optionalUser = userRepository.findByEmail(loginReqDto.getEmail());
        if (optionalUser.isEmpty()) {
            throw new ResourceNotFoundException("Invalid username or password");
        }
        final User existingUser = optionalUser.get();
        if (!passwordEncoder.matches(loginReqDto.getPassword(), existingUser.getPassword())) {
            throw new BadCredentialsException("Wrong username or password");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReqDto.getEmail(),
                        loginReqDto.getPassword()
                )
        );
        if (authentication.isAuthenticated()) {
            String token = jwtService.generateJWT(loginReqDto.getEmail());
            return LoginResDto.builder().token(token).build();
        }
        return null;
    }

    @Override
    public UserResDto register(RegisterReqDto registerReqDto) {
        if (userRepository.existsByEmail(registerReqDto.getEmail())) {
            throw new DataAlreadyExistsException("Email already exist");
        }
        Role existingRole = roleRepository.findById(registerReqDto.getRoleId())
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        if (existingRole.getName().toUpperCase().equals(Role.ADMIN)) {
            throw new PermissionDenyException("You cannot register an admin account");
        }
        final User user = User.builder()
                .email(registerReqDto.getEmail())
                .studentCode(registerReqDto.getStudentCode())
                .password(passwordEncoder.encode(registerReqDto.getPassword()))
                .firstName(registerReqDto.getFirstName())
                .lastName(registerReqDto.getLastName())
                .role(existingRole)
                .build();
        return new UserDtoMapper().apply(userRepository.save(user));
    }
}
