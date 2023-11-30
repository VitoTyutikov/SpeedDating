package vito.speeddating.security;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthenticationResponse {
    private final String access;
    private final String refresh;
    private final String roles;
    private final Long expiration;

}
