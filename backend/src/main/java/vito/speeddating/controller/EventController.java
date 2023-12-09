package vito.speeddating.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vito.speeddating.dto.EventDTO;
import vito.speeddating.dto.RegisterUserToEventDTO;
import vito.speeddating.entity.EventEntity;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    public String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    public ResponseEntity<List<EventEntity>> getAllEvents() {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.findAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<EventEntity> findById(Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.findById(id));
    }

    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public ResponseEntity<List<EventEntity>> findAllActive() {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.findByEventDateTimeAfter(LocalDateTime.now()));
    }

    @RequestMapping(value = "/upcoming", method = RequestMethod.GET)
    public ResponseEntity<List<EventEntity>> findAllUpcoming() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(eventService.findByEventDateTimeBetween(LocalDateTime.now(), LocalDateTime.now().plusDays(7)));
    }

    @RequestMapping(value = "/past", method = RequestMethod.GET)
    public ResponseEntity<List<EventEntity>> findAllPast() {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.findByEventDateTimeBefore(LocalDateTime.now()));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<EventEntity> addNewEvent(@RequestBody EventDTO eventDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.addNewEvent(eventDTO));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/registerUserToEvent", method = RequestMethod.POST)
    public ResponseEntity<Boolean> registerUserToEvent(@RequestBody RegisterUserToEventDTO registerUserToEventDTO) {
        boolean event;
        try {
            event = eventService.addUserToEvent(registerUserToEventDTO.getUserId(),
                    registerUserToEventDTO.getEventId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(event);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/checkUserRegisteredToEvent", method = RequestMethod.POST)
    public ResponseEntity<Boolean> checkUserRegisteredToEvent(
            @RequestBody RegisterUserToEventDTO registerUserToEventDTO) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(eventService.isUserRegisteredToEvent(registerUserToEventDTO.getUserId(),
                        registerUserToEventDTO.getEventId()));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/getUsersRegisteredToEvent/{eventId}", method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> getUsersRegisteredToEvent(@PathVariable Long eventId) {
        return ResponseEntity.status(HttpStatus.OK).body(eventService.getUsersRegisteredToEvent(eventId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        eventService.delete(eventService.findById(id));
    }

}
