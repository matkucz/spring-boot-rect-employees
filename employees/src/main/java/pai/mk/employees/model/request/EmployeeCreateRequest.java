package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class EmployeeCreateRequest {
    @Length(min = 2, max = 20)
    @NotNull(message = "firstName may not be null")
    private String firstName;
    @NotNull(message = "lastName may not be null")
    @Length(min = 2, max = 20)
    private String lastName;
    @NotNull(message = "departamentId may not be null")
    private Long departamentId;
}
