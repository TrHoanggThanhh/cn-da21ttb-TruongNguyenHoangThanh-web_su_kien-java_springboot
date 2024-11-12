package com.trhthanhh.event_management.service.implement;

import com.trhthanhh.event_management.dto.request.LoginReqDto;
import com.trhthanhh.event_management.dto.request.RegisterReqDto;
import com.trhthanhh.event_management.dto.request.VerifyReqDto;
import com.trhthanhh.event_management.dto.response.LoginResDto;
import com.trhthanhh.event_management.dto.response.UserResDto;
import com.trhthanhh.event_management.entity.Role;
import com.trhthanhh.event_management.entity.User;
import com.trhthanhh.event_management.exception.DataAlreadyExistsException;
import com.trhthanhh.event_management.exception.PermissionDenyException;
import com.trhthanhh.event_management.exception.ResourceNotFoundException;
import com.trhthanhh.event_management.exception.VerificationCodeException;
import com.trhthanhh.event_management.jwt.JWTService;
import com.trhthanhh.event_management.mapper.UserDtoMapper;
import com.trhthanhh.event_management.repository.RoleRepository;
import com.trhthanhh.event_management.repository.UserRepository;
import com.trhthanhh.event_management.service.AuthService;
import com.trhthanhh.event_management.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final EmailService emailService;
    private final UserService userService;

    @Value("${resource.logoImageUrl}")
    private String logoImageUrl;

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
    public UserResDto register(RegisterReqDto registerReqDto) throws MessagingException {
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
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        user.setVerified(false);  // Đánh dấu là chưa xác thực
        return new UserDtoMapper().apply(userRepository.save(user));
    }

    @Override
    public void verifyUser(VerifyReqDto verifyReqDto) {
        Optional<User> optionalUser = userRepository.findByEmail(verifyReqDto.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new VerificationCodeException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(verifyReqDto.getVerificationCode())) {
                user.setVerified(true);  // Đánh dấu tài khoản đã được xác thực
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else {
                throw new VerificationCodeException("Invalid verification code");
            }
        } else {
            throw new ResourceNotFoundException("Cannot find user with email " + verifyReqDto.getEmail());
        }
    }

    @Override
    public void sendEmail() throws MessagingException {
        // Lấy thông tin của User từ SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        String username = principal.getUsername();

        final User existingUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot find user with email " + username));
        if (existingUser.isVerified()) {
            throw new RuntimeException("This account has been verified");
        } else {
            existingUser.setVerificationCode(generateVerificationCode());
            existingUser.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(5));
        }
        // Gửi lại Email xác thực current User
        sendVerificationEmail(existingUser);
        userRepository.save(existingUser);
    }

    private void sendVerificationEmail(User user) throws MessagingException {
        String subject = "XÁC THỰC TÀI KHOẢN NGƯỜI DÙNG";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<head>"
                + "<meta charset=\"UTF-8\">"
                + "</head>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px; text-align: center;\">"
                + "<img src=\"" + logoImageUrl + "\" "
                + "alt=\"Logo Trường Đại học Trà Vinh\" "
                + "style=\"width: 100px; height: auto; margin-bottom: 20px;\">"
                + "<h2 style=\"color: #333;\">Chào mừng đến với Website quản lý sự kiện</h2>"
                + "<p style=\"font-size: 16px;\">Vui lòng nhập mã bên dưới để xác thực tài khoản:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto;\">"
                + "<h3 style=\"color: #333;\">Mã xác thực tài khoản: " + verificationCode + "</h3>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
        emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
