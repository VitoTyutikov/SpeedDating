package vito.speeddating.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vito.speeddating.entity.MessageEntity;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findByChatId(Long chatId);
    
}
