package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class GrantRoleRequest {
    @NotNull(message = "secondName may not be null")
    private String role;
}
