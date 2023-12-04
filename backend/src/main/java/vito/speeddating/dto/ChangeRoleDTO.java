package vito.speeddating.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeRoleDTO {
    private Long userId;
    private String role;
}
