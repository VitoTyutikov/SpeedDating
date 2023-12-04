package vito.speeddating.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeUserNonBlockDTO {
    private Long userId;
    private Boolean nonLocked;
}
