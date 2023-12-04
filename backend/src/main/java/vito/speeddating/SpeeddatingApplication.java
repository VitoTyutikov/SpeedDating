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
		userService.deleteAll();

		UserEntity user = new UserEntity();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode("test");
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
		user.setRole("ADMIN");
		user.setAccountNonLocked(true); // Assumin
		userService.save(user);

		UserEntity adminUser = new UserEntity();
		String adminEncodedPassword = passwordEncoder.encode("admin");
		adminUser.setUsername("admin");
		adminUser.setFirstName("Admin");
		adminUser.setLastName("Administrator");
		adminUser.setEmail("admin.doe@example.com");
		adminUser.setPassword(adminEncodedPassword);
		adminUser.setGender("Male");
		adminUser.setProfilePicture("default.jpg");
		adminUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
		adminUser.setBio("I am the admin.");
		adminUser.setDateJoined(LocalDate.now());
		adminUser.setCity("New York");
		adminUser.setLocation("40.7128, -74.0060");
		adminUser.setRole("ADMIN");
		adminUser.setAccountNonLocked(true);
		userService.save(adminUser);

		UserEntity regularUser = new UserEntity();
		String userEncodedPassword = passwordEncoder.encode("user");
		regularUser.setUsername("user");
		regularUser.setFirstName("User");
		regularUser.setLastName("Userson");
		regularUser.setEmail("user.doe@example.com");
		regularUser.setPassword(userEncodedPassword);
		regularUser.setGender("Female");
		regularUser.setProfilePicture("default.jpg");
		regularUser.setDateOfBirth(LocalDate.of(1995, 5, 15));
		regularUser.setBio("I am a regular user.");
		regularUser.setDateJoined(LocalDate.now());
		regularUser.setCity("Boston");
		regularUser.setLocation("42.3601, -71.0589"); // Example coordinates for Boston
		regularUser.setRole("USER");
		regularUser.setAccountNonLocked(true);
		userService.save(regularUser);

		// Another regular user setup
		UserEntity anotherUser = new UserEntity();
		String anotherEncodedPassword = passwordEncoder.encode("another");
		anotherUser.setUsername("anotheruser");
		anotherUser.setFirstName("Another");
		anotherUser.setLastName("Userovich");
		anotherUser.setEmail("another.user@example.com");
		anotherUser.setPassword(anotherEncodedPassword);
		anotherUser.setGender("Non-binary");
		anotherUser.setProfilePicture("default.jpg");
		anotherUser.setDateOfBirth(LocalDate.of(1998, 8, 18));
		anotherUser.setBio("I am another regular user.");
		anotherUser.setDateJoined(LocalDate.now());
		anotherUser.setCity("San Francisco");
		anotherUser.setLocation("37.7749, -122.4194"); // Example coordinates for San Francisco
		anotherUser.setRole("USER");
		anotherUser.setAccountNonLocked(false);
		userService.save(anotherUser);
	}
}
