package vito.speeddating;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.annotation.PostConstruct;
import vito.speeddating.entity.EventEntity;
import vito.speeddating.entity.UserEntity;
import vito.speeddating.service.EventService;
import vito.speeddating.service.UserService;

@SpringBootApplication
public class SpeeddatingApplication {
	@Autowired
	UserService userService;
	@Autowired
	EventService eventService;

	public static void main(String[] args) {
		SpringApplication.run(SpeeddatingApplication.class, args);
	}

	@PostConstruct
	void setUp() {
		userService.deleteAll();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		createUser("test", "Test", "Testovich", "test.doe@example.com", passwordEncoder.encode("test"), "Male",
				"default.jpg", LocalDate.of(2002, 3, 28), "I am a software engineer.", LocalDate.now(), "New York",
				"40.7128, -74.0060",
				"ADMIN", true, 10000.0);

		createUser("admin", "Admin", "Administrator", "admin.doe@example.com", passwordEncoder.encode("admin"), "Male",
				"default.jpg", LocalDate.of(1990, 1, 1), "I am the admin.", LocalDate.now(), "New York",
				"40.7128, -74.0060",
				"ADMIN", true, 10000.0);

		createUser("user", "User", "Userson", "user.doe@example.com", passwordEncoder.encode("user"), "Female",
				"default.jpg", LocalDate.of(1995, 5, 15), "I am a regular user.", LocalDate.now(), "Boston",
				"42.3601, -71.0589",
				"USER", true, 10000.0);

		createUser("anotheruser", "Another", "User", "another.user@example.com", passwordEncoder.encode("another"),
				"Male", "default.jpg", LocalDate.of(1998, 8, 18), "I am another regular user.", LocalDate.now(),
				"San Francisco", "37.7749, -122.4194",
				"USER", false, 10000.0);

		createEvent("Test Event", LocalDateTime.now().plusDays(10), "123 Main Street", 10.0);
		createEvent("Test Event 2", LocalDateTime.now().plusDays(20), "123 Main Street", 25.0);
		createEvent("Another Event", LocalDateTime.now().plusDays(15), "123 Main Street", 100.0);

	}

	void createUser(String username, String firstName, String lastName, String email, String encodedPassword,
			String gender,
			String profilePicture, LocalDate dateOfBirth, String bio, LocalDate dateJoined, String city,
			String location, String role, boolean accountNonLocked, double balance) {

		UserEntity user = new UserEntity();
		user.setUsername(username);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(email);
		user.setPassword(encodedPassword);
		user.setGender(gender);
		user.setProfilePicture(profilePicture);
		user.setDateOfBirth(dateOfBirth);
		user.setBio(bio);
		user.setDateJoined(dateJoined);
		user.setCity(city);
		user.setLocation(location);
		user.setRole(role);
		user.setAccountNonLocked(accountNonLocked);
		user.setBalance(balance);
		userService.save(user);
	}

	void createEvent(String name, LocalDateTime evenDateTime, String address, double price) {
		EventEntity event = new EventEntity();
		event.setTitle(name);
		event.setEventDateTime(evenDateTime);
		event.setAddress(address);
		event.setPrice(price);
		eventService.save(event);
	}
}
