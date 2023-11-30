package vito.speeddating;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.annotation.PostConstruct;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.service.UserService;
// LocalDateTime is an immutable date-time object that represents a date-time with default format as yyyy-MM-dd-HH-mm-ss
@SpringBootApplication
public class SpeeddatingApplication {
	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(SpeeddatingApplication.class, args);
	}

	@PostConstruct
	void setUp() {

		// // UserEntity founduser = userService.findByEmail("test.doe@example.com");
		// // if(founduser != null) {
		// // userService.deleteByEmail("test.doe@example.com");
		// // }

		userService.deleteAll();

		UserEntity user = new UserEntity();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode("123");
		user.setUsername("test");
		user.setFirstName("Test");
		user.setLastName("Testovich");
		user.setEmail("test.doe@example.com");
		user.setPassword(encodedPassword);
		user.setGender("Male");
		user.setProfilePicture("default.jpg");
		user.setDateOfBirth(LocalDate.of(2002, 3, 28));
		user.setBio("I am a software engineer.");
		user.setDateJoined(LocalDate.now());
		user.setCity("New York");
		user.setLocation("40.7128, -74.0060"); // Example coordinates for New York
		user.setRole("USER");
		user.setAccountNonLocked(true); // Assumin
		userService.save(user);

	}
}
