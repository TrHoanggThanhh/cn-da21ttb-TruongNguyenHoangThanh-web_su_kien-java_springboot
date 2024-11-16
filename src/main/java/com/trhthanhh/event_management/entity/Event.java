package com.trhthanhh.event_management.entity;

import com.trhthanhh.event_management.enums.EventStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "events")
public class Event extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "organizer", nullable = false)
    private String organizer;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private EventStatus status;

    @Column(name = "thumbnail")
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "max_participants")
    private int maxParticipants;

    @Column(name = "current_participants")
    private int currentParticipants;

    @Column(name = "is_important")
    private boolean isImportant;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;
}
