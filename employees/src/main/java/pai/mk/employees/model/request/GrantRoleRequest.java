package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class GrantRoleRequest {
    @Length(min = 2, max = 10)
    @NotNull(message = "role may not be null")
    private String role;
}
