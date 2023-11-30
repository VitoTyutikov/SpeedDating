package vito.speeddating.service;

import java.util.List;

import org.springframework.stereotype.Service;

import vito.speeddating.entity.ChatEntity;
import vito.speeddating.repository.ChatRepository;

@Service
public class ChatService {
    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    List<ChatEntity> findBySenderId(Long senderId) {
        return chatRepository.findBySenderId(senderId);
    }

    List<ChatEntity> findByReceiverId(Long receiverId) {
        return chatRepository.findByReceiverId(receiverId);
    }

    ChatEntity findBySenderIdAndReceiverId(Long senderId, Long receiverId) {
        return chatRepository.findBySenderIdAndReceiverId(senderId, receiverId).orElse(null);
    }

    ChatEntity findById(Long id) {
        return chatRepository.findById(id).orElse(null);
    }

    List<ChatEntity> findAll() {
        return chatRepository.findAll();
    }


    public void save(ChatEntity chat) {
        chatRepository.save(chat);
    }

    void delete(ChatEntity chat) {
        chatRepository.delete(chat);
    }

    void deleteById(Long id) {
        chatRepository.deleteById(id);
    }

    void update(ChatEntity chat) {
        chatRepository.save(chat);
    }

}
