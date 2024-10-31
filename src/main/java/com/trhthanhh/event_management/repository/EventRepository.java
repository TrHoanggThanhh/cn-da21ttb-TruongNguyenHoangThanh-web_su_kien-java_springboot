package com.trhthanhh.event_management.repository;

import com.trhthanhh.event_management.entity.Event;
import com.trhthanhh.event_management.enums.EventStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    boolean existsByCode(String code);
    Optional<Event> findById(String id);
    Page<Event> findAll(Pageable pageable);

    @Query("SELECT e FROM Event e WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR e.name LIKE %:keyword% OR e.location LIKE %:keyword% OR e.organizer LIKE %:keyword%) " +
            "AND (:status IS NULL OR e.status = :status) " +
            "AND (:categoryId IS NULL OR e.category.id = :categoryId) " +
            "AND (:startDate IS NULL OR e.startDate >= :startDate) " +
            "AND (:endDate IS NULL OR e.endDate <= :endDate)")
    Page<Event> searchEvents(@Param("keyword") String keyword,
                             @Param("status") EventStatus status,
                             @Param("categoryId") String categoryId,
                             @Param("startDate") LocalDateTime startDate,
                             @Param("endDate") LocalDateTime endDate,
                             Pageable pageable);
}
