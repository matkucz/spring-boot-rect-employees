package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class EmployeeCreateRequest {
    @NotNull(message = "firstName may not be null")
    private String firstName;
    @NotNull(message = "lastName may not be null")
    private String lastName;
    @NotNull(message = "departamentId may not be null")
    private Long departamentId;
}
