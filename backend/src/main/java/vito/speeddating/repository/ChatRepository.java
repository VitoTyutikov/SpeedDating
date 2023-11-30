package vito.speeddating.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vito.speeddating.entity.ChatEntity;

public interface ChatRepository extends JpaRepository<ChatEntity, Long> {
    Optional<ChatEntity> findById(Long id);
    Optional<ChatEntity> findBySenderIdAndReceiverId(Long senderId, Long receiverId);
    List<ChatEntity> findAll();
    void deleteById(Long id);
    List<ChatEntity> findBySenderId(Long senderId);
    List<ChatEntity> findByReceiverId(Long receiverId);
    
}
