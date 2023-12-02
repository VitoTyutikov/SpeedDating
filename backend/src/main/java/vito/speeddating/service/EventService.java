package vito.speeddating.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vito.speeddating.dto.EventDTO;
import vito.speeddating.entity.EventEntity;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.repository.EventRepository;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserService userService;

    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public void save(EventEntity event) {
        eventRepository.save(event);
    }

    @Transactional
    public void delete(EventEntity event) {
        eventRepository.delete(event);
    }

    @Transactional
    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }

    public EventEntity findById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    public List<EventEntity> findByEventDateTimeBetween(LocalDateTime start, LocalDateTime end) {
        return eventRepository.findByEventDateTimeBetween(start, end);
    }

    public List<EventEntity> findAll() {
        return eventRepository.findAll();
    }

    public List<EventEntity> findByEventDateTimeAfter(LocalDateTime eventDateTime) {
        return eventRepository.findByEventDateTimeAfter(eventDateTime);
    }

    public List<EventEntity> findByEventDateTimeBefore(LocalDateTime eventDateTime) {
        return eventRepository.findByEventDateTimeBefore(eventDateTime);
    }

    @Transactional
    public EventEntity addNewEvent(EventDTO eventDTO) {
        EventEntity event = new EventEntity();
        event.setTitle(eventDTO.getTitle());
        event.setEventDateTime(eventDTO.getEventDateTime());
        event.setAddress(eventDTO.getAddress());
        event.setPrice(eventDTO.getPrice());
        // event.setUser(userService.findByUsername(username));
        // event.setRegisteredUsers(event.getRegisteredUsers());
        eventRepository.save(event);
        // System.out.println(event.toString());
        return event;
    }

    @Transactional
    public boolean addUserToEvent(Long userId, Long eventId) {
        EventEntity event = eventRepository.findById(eventId).orElse(null);
        UserEntity user = userService.findById(userId);
        if (event.getRegisteredUsers().contains(user)) {
            return false;
        }
        event.getRegisteredUsers().add(user);
        eventRepository.save(event);
        return true;
    }

    public boolean isUserRegisteredToEvent(Long userId, Long eventId) {
        EventEntity event = eventRepository.findById(eventId).orElse(null);
        UserEntity user = userService.findById(userId);
        if (event.getRegisteredUsers().contains(user)) {
            return true;
        }
        return false;
    }

    public List<UserEntity> getUsersRegisteredToEvent(Long eventId) {
        EventEntity event = eventRepository.findById(eventId).orElse(null);
        return event.getRegisteredUsers();
    }
}
