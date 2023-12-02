package vito.speeddating.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vito.speeddating.dto.UserDTO;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.service.UserService;

@RequestMapping("/user")
@RestController
@CrossOrigin(origins = "http://localhost:3000") 
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public String getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    
    @CrossOrigin
    @GetMapping
    public UserEntity getCurrentUser() {
        String login = getCurrentUserLogin();
        return userService.findByUsername(login);
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<UserEntity> findAll() {
        
        return userService.findAll();
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public UserEntity findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @CrossOrigin
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String registerNewUser(@RequestBody UserDTO userDto) {
        return userService.registerNewUser(userDto);
    }

}
