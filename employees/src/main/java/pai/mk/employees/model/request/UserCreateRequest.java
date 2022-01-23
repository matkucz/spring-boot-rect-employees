package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UserCreateRequest {
    @NotNull(message = "username may not be null")
    private String username;
    @NotNull(message = "password may not be null")
    private String password;
    @NotNull(message = "role may not be null")
    private String role;
}