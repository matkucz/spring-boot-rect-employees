package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class DepartamentCreateRequest {
    @NotNull(message = "name may not be null")
    private String name;
    @NotNull(message = "description may not be null")
    private String description;
}
