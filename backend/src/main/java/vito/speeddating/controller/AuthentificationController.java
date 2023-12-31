package vito.speeddating.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import vito.speeddating.entity.BlackListTokenEntity;
import vito.speeddating.security.AuthenticationRequest;
import vito.speeddating.security.AuthenticationResponse;
import vito.speeddating.security.JwtUtil;
import vito.speeddating.security.TokenRequest;
import vito.speeddating.service.BlackListTokenService;
import vito.speeddating.service.UserService;

@RestController
public class AuthentificationController {
    private AuthenticationManager authenticationManager;
    private UserService userService;
    private JwtUtil jwtTokenUtil;
    private BlackListTokenService blackListTokenService;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager,
            UserService userDetailsService, JwtUtil jwtTokenUtil,
            BlackListTokenService blackListTokenService) {
        this.authenticationManager = authenticationManager;
        this.userService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.blackListTokenService = blackListTokenService;

    }

    @RequestMapping(value = "/refresh", method = { RequestMethod.POST })
    public ResponseEntity<?> refreshTokens(@RequestBody TokenRequest tokenRequest) throws Exception {
        final String refreshToken = tokenRequest.getRefreshToken();
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Refresh token is missing");
        }
        final String username = jwtTokenUtil.extractUsername(refreshToken);
        if (username == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Refresh token is missing");
        }
        final UserDetails userDetails = userService.loadUserByUsername(username);
        if (blackListTokenService.isBlackListed(refreshToken)
                || !jwtTokenUtil.validateToken(refreshToken, userDetails, "REFRESH")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is invalid");
        }
        BlackListTokenEntity blackListToken = new BlackListTokenEntity();
        blackListToken.setToken(refreshToken);
        blackListToken.setAddedAt(LocalDateTime.now());
        blackListTokenService.save(blackListToken);
        final Map<String, String> tokens = jwtTokenUtil.generateTokens(userDetails);
        AuthenticationResponse response = new AuthenticationResponse(tokens.get("accessToken"),
                tokens.get("refreshToken"), userDetails.getAuthorities().toString(),
                jwtTokenUtil.extractExpiration(tokens.get("accessToken")).getTime());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @RequestMapping(value = "/authenticate", method = { RequestMethod.POST })
    public ResponseEntity<AuthenticationResponse> createAuthenticationTokens(
            @RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userService.loadUserByUsername(authenticationRequest.getUsername());
        final Map<String, String> tokens = jwtTokenUtil.generateTokens(userDetails);

        final AuthenticationResponse response = new AuthenticationResponse(tokens.get("accessToken"),
                tokens.get("refreshToken"), userDetails.getAuthorities().toString(),
                jwtTokenUtil.extractExpiration(tokens.get("accessToken")).getTime());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @RequestMapping(value = "/afterLogout", method = { RequestMethod.POST })
    public ResponseEntity<String> logout(@RequestBody TokenRequest tokenRequest) {
        userService.logout(tokenRequest.getRefreshToken());
        return ResponseEntity.status(HttpStatus.OK).body("Logout successful");

    }

}
