package vito.speeddating;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import vito.speeddating.dto.AddBalanceDTO;
import vito.speeddating.dto.UserDTO;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.repository.UserRepository;
import vito.speeddating.service.UserService;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void registerNewUser() {
        UserDTO userDto = new UserDTO(); // create a sample userDto
        userDto.setEmail("test@example.com");
        userDto.setUsername("testuser");
        userDto.setDateOfBirth("2002-09-02");


        when(userRepository.findByEmail(userDto.getEmail())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(userDto.getUsername())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(userDto.getPassword())).thenReturn("encodedPassword");


        UserEntity result = userService.registerNewUser(userDto);


        assertNotNull(result);
        assertEquals(userDto.getUsername(), result.getUsername());
        assertEquals(userDto.getFirstName(), result.getFirstName());


        verify(userRepository, times(1)).save(any(UserEntity.class));
    }


    @Test
    void testUpdateUserNotFound() {
        // Arrange
        UserDTO nonExistentUserDto = new UserDTO();
        nonExistentUserDto.setUsername("nonexistentuser");

        when(userRepository.findByUsername(nonExistentUserDto.getUsername())).thenReturn(Optional.empty());

        UserEntity result = userService.update(nonExistentUserDto);

        assertNull(result);

        verify(userRepository, never()).save(any(UserEntity.class));
    }



    @Test
    void updateBalance() {
        AddBalanceDTO addBalanceDTO = new AddBalanceDTO();
        addBalanceDTO.setUserId(1L);
        addBalanceDTO.setAmount(50.0);

        UserEntity existingUserEntity = new UserEntity();
        existingUserEntity.setId(1L);
        existingUserEntity.setBalance(100.0);

        when(userRepository.findById(addBalanceDTO.getUserId())).thenReturn(Optional.of(existingUserEntity));


        UserEntity result = userService.updateBalance(addBalanceDTO);

        assertNotNull(result, "Expected a non-null result");
        assertEquals(150.0, result.getBalance(), "Balance should be updated correctly");
        
        verify(userRepository, times(1)).save(existingUserEntity);
    }
}

