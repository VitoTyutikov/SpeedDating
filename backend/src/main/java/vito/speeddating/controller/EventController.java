package vito.speeddating.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    public List<EventEntity> findAll() {
        return eventService.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public EventEntity findById(Long id) {
        return eventService.findById(id);
    }

    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public List<EventEntity> findAllActive() {
        return eventService.findByEventDateTimeAfter(LocalDateTime.now());
    }

    @RequestMapping(value = "/upcoming", method = RequestMethod.GET)
    public List<EventEntity> findAllUpcoming() {
        return eventService.findByEventDateTimeBetween(LocalDateTime.now(), LocalDateTime.now().plusDays(7));
    }

    @RequestMapping(value = "/past", method = RequestMethod.GET)
    public List<EventEntity> findAllPast() {
        return eventService.findByEventDateTimeBefore(LocalDateTime.now());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public EventEntity addNewEvent(@RequestBody EventDTO eventDTO) {
        return eventService.addNewEvent(eventDTO);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/registerUserToEvent", method = RequestMethod.POST)
    public boolean registerUserToEvent(@RequestBody RegisterUserToEventDTO registerUserToEventDTO) {
        return eventService.addUserToEvent(registerUserToEventDTO.getUserId(), registerUserToEventDTO.getEventId());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/checkUserRegisteredToEvent", method = RequestMethod.POST)
    public boolean checkUserRegisteredToEvent(@RequestBody RegisterUserToEventDTO registerUserToEventDTO) {
        return eventService.isUserRegisteredToEvent(registerUserToEventDTO.getUserId(),
                registerUserToEventDTO.getEventId());
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/getUsersRegisteredToEvent", method = RequestMethod.GET)
    public List<UserEntity> getUsersRegisteredToEvent(@RequestParam Long eventId) {
        return eventService.getUsersRegisteredToEvent(eventId);
    }

}
