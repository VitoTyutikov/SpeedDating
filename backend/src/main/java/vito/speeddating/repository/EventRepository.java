package vito.speeddating.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vito.speeddating.entity.EventEntity;
import java.util.List;
import java.time.LocalDateTime;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Long> {
    Optional<EventEntity> findById(Long id);
    List<EventEntity> findByEventDateTimeBetween(LocalDateTime start, LocalDateTime end);
    List<EventEntity> findByEventDateTimeAfter(LocalDateTime eventDateTime);
    List<EventEntity> findByEventDateTimeBefore(LocalDateTime eventDateTime);
}
