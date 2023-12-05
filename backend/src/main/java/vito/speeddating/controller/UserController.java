package vito.speeddating.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vito.speeddating.dto.ChangeRoleDTO;
import vito.speeddating.dto.ChangeUserNonBlockDTO;
import vito.speeddating.dto.UserDTO;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.security.TokenRequest;
import vito.speeddating.service.UserService;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    public UserEntity getCurrentUser() {
        String login = getCurrentUserLogin();
        return userService.findByUsername(login);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<UserEntity> findAll() {
        return userService.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UserEntity findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerNewUser(@RequestBody UserDTO userDto) {
        return userService.registerNewUser(userDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        userService.delete(userService.findById(id));
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public UserEntity update(@RequestBody UserDTO user) {
        return userService.update(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/updateNonLocked", method = RequestMethod.PUT)
    public UserEntity updateNonBlocked(@RequestBody ChangeUserNonBlockDTO user) {
        return userService.updateNonLocked(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/updateRole", method = RequestMethod.PUT)
    public UserEntity updateRole(@RequestBody ChangeRoleDTO user) {
        return userService.updateRole(user);
    }


    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @RequestMapping(value = "/topup",method = RequestMethod.PUT)
    public UserEntity updateBalance(@RequestBody AddBalanceDTO user) {
        return userService.updateBalance(user);
    }
}
