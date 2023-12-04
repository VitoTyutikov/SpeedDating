package vito.speeddating.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import vito.speeddating.dto.ChangeRoleDTO;
import vito.speeddating.dto.ChangeUserNonBlockDTO;
import vito.speeddating.dto.UserDTO;
import vito.speeddating.entity.BlackListTokenEntity;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final BlackListTokenService blackListTokenService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,
            BlackListTokenService blackListTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.blackListTokenService = blackListTokenService;
    }

    public void save(UserEntity user) {
        userRepository.save(user);
    }

    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public UserEntity findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    @Transactional
    public String registerNewUser(@RequestBody UserDTO userDto) {

        try {
            if (userRepository.findByEmail(userDto.getEmail()).isPresent()
                    || userRepository.findByUsername(userDto.getUsername()).isPresent()) {
                throw new RuntimeException("Email or username already registered");
            }
        } catch (Exception e) {
            return "Email or username already registered";
        }

        UserEntity user = new UserEntity();
        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setGender(userDto.getGender());
        user.setProfilePicture(userDto.getProfilePicture());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        user.setDateOfBirth(LocalDate.parse(userDto.getDateOfBirth(), formatter));
        user.setBio(userDto.getBio());
        user.setDateJoined(LocalDate.now());
        user.setCity(userDto.getCity());

        userRepository.save(user);
        return "OK";
    }

    @Transactional
    public void delete(UserEntity user) {
        userRepository.delete(user);
    }

    @Transactional
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public void deleteAll() {
        userRepository.deleteAll();
    }

    @Transactional
    public void deleteByEmail(String email) {
        userRepository.deleteByEmail(email);
    }

    @Transactional
    public void deleteByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return user;
    }

    @Transactional
    public UserEntity update(UserDTO user) {
        try {
            UserEntity userEntity = userRepository.findByUsername(user.getUsername())
                    .orElseThrow(
                            () -> new UsernameNotFoundException("User not found with username: " + user.getUsername()));
            userEntity.setFirstName(user.getFirstName());
            userEntity.setLastName(user.getLastName());
            userEntity.setEmail(user.getEmail());
            userEntity.setGender(user.getGender());
            userEntity.setProfilePicture(user.getProfilePicture());
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            userEntity.setDateOfBirth(LocalDate.parse(user.getDateOfBirth(), formatter));
            userEntity.setBio(user.getBio());
            userEntity.setCity(user.getCity());
            save(userEntity);
            return userEntity;
        } catch (Exception e) {
            return null;
        }

    }

    public void logout(String refreshToken) {
        BlackListTokenEntity blackListToken = new BlackListTokenEntity();
        blackListToken.setToken(refreshToken);
        blackListToken.setAddedAt(LocalDateTime.now());
        blackListTokenService.save(blackListToken);

    }

    @Transactional
    public UserEntity updateNonLocked(ChangeUserNonBlockDTO user) {
        try {
            UserEntity userEntity = userRepository.findById(user.getUserId())
                    .orElseThrow(
                            () -> new UsernameNotFoundException("User not found with Id: " + user.getUserId()));
            userEntity.setAccountNonLocked(user.getNonLocked());
            save(userEntity);
            return userEntity;
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public UserEntity updateRole(ChangeRoleDTO user) {
        try {
            UserEntity userEntity = userRepository.findById(user.getUserId())
                    .orElseThrow(
                            () -> new UsernameNotFoundException("User not found with id: " + user.getUserId()));
            userEntity.setRole(user.getRole());
            save(userEntity);
            return userEntity;
        } catch (Exception e) {
            return null;
        }
    }

}
