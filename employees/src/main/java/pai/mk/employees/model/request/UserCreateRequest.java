package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class UserCreateRequest {
    @Length(min = 2, max = 20)
    @NotNull(message = "username may not be null")
    private String username;
    @Length(min = 2, max = 20)
    @NotNull(message = "password may not be null")
    private String password;
    @Length(min = 2, max = 10)
    @NotNull(message = "role may not be null")
    private String role;
}