package pai.mk.employees.repository;

import pai.mk.employees.model.Departament;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartamentRepository extends JpaRepository<Departament, Long> {
}