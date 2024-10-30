package com.trhthanhh.event_management.entity;

import com.trhthanhh.event_management.enums.EventRegistrationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event_registrations")
public class EventRegistration extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @Column(name = "registration_date")
    private LocalDateTime registrationDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private EventRegistrationStatus status;
}
