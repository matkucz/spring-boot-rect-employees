package pai.mk.employees.repository;

import pai.mk.employees.model.Employee;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{   
}