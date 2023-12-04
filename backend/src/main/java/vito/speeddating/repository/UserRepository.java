package vito.speeddating.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vito.speeddating.entity.UserEntity;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findById(Long id);
    List<UserEntity> findAll();
    void deleteByEmail(String email);
    void deleteByUsername(String username);
        
    List<UserEntity> findByGender(String gender);

}
