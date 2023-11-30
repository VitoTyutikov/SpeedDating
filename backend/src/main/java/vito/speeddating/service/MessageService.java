package vito.speeddating.service;

import org.springframework.stereotype.Service;

import vito.speeddating.entity.MessageEntity;
import vito.speeddating.repository.MessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    void save(MessageEntity message){
        messageRepository.save(message);
    }

    void delete(MessageEntity message){
        messageRepository.delete(message);
    }

    void deleteById(Long id){
        messageRepository.deleteById(id);
    }

    void update(MessageEntity message){
        messageRepository.save(message);
    }


}
