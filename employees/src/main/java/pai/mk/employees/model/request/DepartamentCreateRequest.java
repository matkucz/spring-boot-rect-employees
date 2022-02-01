package pai.mk.employees.model.request;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Data
public class DepartamentCreateRequest {
    @Length(min = 2, max = 20)
    @NotNull(message = "name may not be null")
    private String name;
    @Length(min = 1, max = 80)
    @NotNull(message = "description may not be null")
    private String description;
}
