package pai.mk.employees.controller;

import pai.mk.employees.model.Departament;
import pai.mk.employees.model.Employee;
import pai.mk.employees.model.request.DepartamentCreateRequest;
import pai.mk.employees.model.request.EmployeeCreateRequest;
import pai.mk.employees.service.EmployeeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/employees")
@RequiredArgsConstructor
public class EmployeesController {
    
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employee")
    public ResponseEntity<List<Employee>> getEmployees() {
        return ResponseEntity.ok(employeeService.getEmployees());
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<Employee> getEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(employeeService.getEmployee(employeeId));
    }

    @PostMapping("/employee")
    public ResponseEntity<Employee> createEmployee (@RequestBody EmployeeCreateRequest request) {
        return ResponseEntity.ok(employeeService.createEmployee(request));
    }

    @PatchMapping("/employee/{employeeId}")
    public ResponseEntity<Employee> updateEmployee (@RequestBody EmployeeCreateRequest request, @PathVariable Long employeeId) {
        return ResponseEntity.ok(employeeService.updateEmployee(employeeId, request));
    }

    @GetMapping("/departament")
    public ResponseEntity<List<Departament>> getDepartaments() {
        return ResponseEntity.ok(employeeService.getDepartaments());
    }

    @GetMapping("/departament/{departamentId}")
    public ResponseEntity<Departament> getDepartament(@PathVariable Long departamentId) {
        return ResponseEntity.ok(employeeService.getDepartament(departamentId));
    }

    @PostMapping("/departament")
    public ResponseEntity<Departament> createDepartament (@RequestBody DepartamentCreateRequest request) {
        return ResponseEntity.ok(employeeService.createDepartament(request));
    }

    @PatchMapping("/departament/{departamentId}")
    public ResponseEntity<Departament> updateDepartament (@RequestBody DepartamentCreateRequest request, @PathVariable Long departamentId) {
        return ResponseEntity.ok(employeeService.updateDepartament(departamentId, request));
    }
}