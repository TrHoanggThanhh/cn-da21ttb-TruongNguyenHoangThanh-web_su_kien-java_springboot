package com.trhthanhh.event_management.repository;

import com.trhthanhh.event_management.entity.Event;
import com.trhthanhh.event_management.entity.EventRegistration;
import com.trhthanhh.event_management.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, String> {
    Optional<EventRegistration> findById(String id);

    @Query("SELECT er FROM EventRegistration er WHERE er.user = :user")
    List<EventRegistration> findByUser(User user);

    @Query("SELECT er FROM EventRegistration er WHERE er.user.email = :email")
    Page<EventRegistration> findEventRegistrationByCurrentUser(String email, Pageable pageable);

    @Query("SELECT er.event FROM EventRegistration er WHERE er.id = :eventRegistrationId")
    Optional<Event> findEventByEventRegistrationId(String eventRegistrationId);
}
