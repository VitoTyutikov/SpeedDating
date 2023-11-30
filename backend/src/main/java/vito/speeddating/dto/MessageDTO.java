package vito.speeddating.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDTO {
    private String content;
    private LocalDateTime timeSent;
    private Long chatId;
    private Long senderId;
}
