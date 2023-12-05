package vito.speeddating.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBalanceDTO {
    private Long userId;
    private Double amount;
}
