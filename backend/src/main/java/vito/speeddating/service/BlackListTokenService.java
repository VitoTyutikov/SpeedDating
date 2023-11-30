package vito.speeddating.service;

import org.springframework.stereotype.Service;
import vito.speeddating.entity.BlackListTokenEntity;
import vito.speeddating.repository.BlackListTokenRepository;

import java.util.Optional;

@Service
public class BlackListTokenService {

    private final BlackListTokenRepository blackListTokenRepository;

    public BlackListTokenService(BlackListTokenRepository blackListTokenRepository) {
        this.blackListTokenRepository = blackListTokenRepository;
    }

    public BlackListTokenEntity save(BlackListTokenEntity blackListToken) {
        return blackListTokenRepository.save(blackListToken);
    }

    public Optional<BlackListTokenEntity> findByToken(String token) {
        return Optional.ofNullable(blackListTokenRepository.findByToken(token));
    }

    public boolean isBlackListed(String token){
        return blackListTokenRepository.findByToken(token) != null;
    }

    public void delete(BlackListTokenEntity blackListToken) {
        blackListTokenRepository.delete(blackListToken);
    }
}