package vito.speeddating.controller;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddBalanceDTO {
    private Long userId;
    private Double amount;
}
