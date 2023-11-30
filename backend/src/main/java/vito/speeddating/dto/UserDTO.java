package vito.speeddating.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;
    private String profilePicture;
    private String dateOfBirth;
    private String bio;
    private String city;

}
