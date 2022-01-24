package pai.mk.employees.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pai.mk.employees.model.Departament;
import pai.mk.employees.model.Employee;
import pai.mk.employees.model.request.DepartamentCreateRequest;
import pai.mk.employees.model.request.EmployeeCreateRequest;
import pai.mk.employees.repository.DepartamentRepository;
import pai.mk.employees.repository.EmployeeRepository;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartamentRepository departamentRepository;

    public Employee getEmployee(Long id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return employee.get();
        }
        throw new EntityNotFoundException("Can't find any employee under given ID");        
    }

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee createEmployee(@Valid EmployeeCreateRequest request) {
        Optional<Departament> departament = departamentRepository.findById(request.getDepartamentId());
        if (!departament.isPresent()) {
            throw new EntityNotFoundException("Departament not found");
        }
        Employee employee = new Employee();
        BeanUtils.copyProperties(request, employee);
        employee.setDepartament(departament.get());
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public Employee updateEmployee(Long id, @Valid EmployeeCreateRequest request) {
        Optional <Employee> optionalEmployee = employeeRepository.findById(id);
        if (!optionalEmployee.isPresent()) {
            throw new EntityNotFoundException("Employee not present in database");
        }
        Optional <Departament> optionalDepartament = departamentRepository.findById(id);
        if (!optionalDepartament.isPresent()) {
            throw new EntityNotFoundException("Departament not present in database");
        }
        Employee employee = optionalEmployee.get();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setDepartament(optionalDepartament.get());
        return employeeRepository.save(employee);
    }

    public List<Departament> getDepartaments () {
        return departamentRepository.findAll();
    }

    public Departament getDepartament (Long id) {
        Optional<Departament> departament = departamentRepository.findById(id);
        if (departament.isPresent()) {
            return departament.get();
        }
        throw new EntityNotFoundException("Can't find any departament under given ID");       
    }


    public List<Employee> getDepartamentEmployees (Long id) {
        List<Employee> departamentEmployees = employeeRepository.findByDepartamentId(id);
        return departamentEmployees;     
    }

    public Departament createDepartament(@Valid DepartamentCreateRequest request) {
        Departament departament = new Departament();
        BeanUtils.copyProperties(request, departament);
        return departamentRepository.save(departament);
    }

    public void deleteDepartament(Long id) {
        departamentRepository.deleteById(id);
    }

    public Departament updateDepartament(Long id, @Valid DepartamentCreateRequest request) {
        Optional <Departament> optionalDepartament = departamentRepository.findById(id);
        if (!optionalDepartament.isPresent()) {
            throw new EntityNotFoundException("Departament not present in database");
        }
        Departament departament = optionalDepartament.get();
        departament.setName(request.getName());
        departament.setDescription(request.getDescription());
        return departamentRepository.save(departament);
    }
}
