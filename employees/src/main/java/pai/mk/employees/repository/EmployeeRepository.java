package pai.mk.employees.repository;

import pai.mk.employees.model.Employee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    List<Employee> findByDepartamentId (Long departamentId);
}