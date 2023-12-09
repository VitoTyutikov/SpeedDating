package vito.speeddating.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vito.speeddating.dto.AddBalanceDTO;
import vito.speeddating.dto.ChangeRoleDTO;
import vito.speeddating.dto.ChangeUserNonBlockDTO;
import vito.speeddating.dto.UserDTO;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.service.EventService;
import vito.speeddating.service.UserService;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final EventService eventService;

    public UserController(UserService userService, EventService eventService) {
        this.userService = userService;
        this.eventService = eventService;
    }

    public String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    public ResponseEntity<UserEntity> getCurrentUser() {
        String login = getCurrentUserLogin();
        return ResponseEntity.status(HttpStatus.OK).body(userService.findByUsername(login));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<List<UserEntity>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserEntity> findById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findById(id));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<UserEntity> registerNewUser(@RequestBody UserDTO userDto) {
        UserEntity registeredUser = userService.registerNewUser(userDto);
        if (registeredUser == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerNewUser(userDto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        eventService.unregisterUserFromAllEvents(id);
        userService.delete(userService.findById(id));
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<UserEntity> update(@RequestBody UserDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.update(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/updateNonLocked", method = RequestMethod.PUT)
    public ResponseEntity<UserEntity> updateNonBlocked(@RequestBody ChangeUserNonBlockDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateNonLocked(user));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/updateRole", method = RequestMethod.PUT)
    public ResponseEntity<UserEntity> updateRole(@RequestBody ChangeRoleDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateRole(user));
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/topup", method = RequestMethod.PUT)
    public ResponseEntity<UserEntity> updateBalance(@RequestBody AddBalanceDTO user) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.updateBalance(user));
    }

    @PutMapping("/profile-picture/{userId}")
    public ResponseEntity<?> updateUserProfilePicture(@PathVariable Long userId,
            @RequestBody String profilePictureUrl) {
        UserEntity user = userService.findById(userId);
        user.setProfilePicture(profilePictureUrl);
        userService.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }
}
