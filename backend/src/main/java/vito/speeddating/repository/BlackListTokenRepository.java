package vito.speeddating.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vito.speeddating.entity.BlackListTokenEntity;

public interface BlackListTokenRepository extends JpaRepository<BlackListTokenEntity, Long> {
    BlackListTokenEntity findByToken(String token);
}