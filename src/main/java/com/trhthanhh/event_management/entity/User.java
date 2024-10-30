package com.trhthanhh.event_management.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "student_code", nullable = false, length = 100)
    private String studentCode;

    @Column(name = "password")
    private String password;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
