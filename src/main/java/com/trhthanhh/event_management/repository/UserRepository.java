package com.trhthanhh.event_management.repository;

import com.trhthanhh.event_management.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findById(String id);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN EventRegistration er ON u.id = er.user.id WHERE er.event.id = :eventId")
    Page<User> findUserByEventId(String eventId, Pageable pageable);
}
