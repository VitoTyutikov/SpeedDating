package vito.speeddating.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vito.speeddating.dto.EventDTO;
import vito.speeddating.entity.EventEntity;
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

    @CrossOrigin
    @GetMapping
    public List<EventEntity> findAll() {
        return eventService.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public EventEntity findById(Long id) {
        return eventService.findById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/active", method = RequestMethod.GET)
    public List<EventEntity> findAllActive() {
        return eventService.findByEventDateTimeAfter(LocalDateTime.now());
    }

    @CrossOrigin
    @RequestMapping(value = "/upcoming", method = RequestMethod.GET)
    public List<EventEntity> findAllUpcoming() {
        return eventService.findByEventDateTimeBetween(LocalDateTime.now(), LocalDateTime.now().plusDays(7));
    }

    @CrossOrigin
    @RequestMapping(value = "/past", method = RequestMethod.GET)
    public List<EventEntity> findAllPast() {
        return eventService.findByEventDateTimeBefore(LocalDateTime.now());
    }

    @CrossOrigin
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addNewEvent(@RequestBody EventDTO eventDTO) {
        // String username = getCurrentUserLogin();
        // if (username == "anonymousUser") {
        //     return "Please login first";
        // }
        return eventService.addNewEvent(eventDTO);
    }
}
