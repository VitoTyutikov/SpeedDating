package vito.speeddating.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EventDTO {
    private String title;

    private LocalDateTime eventDateTime;

    private String address;

    private Double price;
}
