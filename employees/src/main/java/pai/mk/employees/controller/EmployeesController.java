package pai.mk.employees.controller;

import pai.mk.employees.model.Employee;
import pai.mk.employees.model.request.EmployeeCreateRequest;
import pai.mk.employees.service.EmployeeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

import lombok.RequiredArgsConstructor;

@Slf4j
@RestController
@RequestMapping(value = "/api/employee")
@RequiredArgsConstructor
public class EmployeesController {
    
    @Autowired
    private EmployeeService employeeService;

    private ResponseEntity returnErrors (BindingResult bindingResult) {
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();
        Map<String, String> errorsMap = new HashMap<String, String>();
        for (FieldError fieldError : fieldErrors) {
            errorsMap.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        Map<String, Map<String, String>> outputErrors = new HashMap<String, Map<String, String>>();
        outputErrors.put("errors", errorsMap);            
        return ResponseEntity.badRequest().body(outputErrors);
    }

    private ResponseEntity returnExceptionError (String message) {
        Map<String, String> errorMap = new HashMap<String, String>();
        errorMap.put("error", message);
        return ResponseEntity.badRequest().body(errorMap);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getEmployees() {
        log.info("Get employees");
        return ResponseEntity.ok(employeeService.getEmployees());
    }

    @GetMapping("/{employeeId}")
    public ResponseEntity getEmployee(@PathVariable Long employeeId) {
        try {
            return ResponseEntity.ok(employeeService.getEmployee(employeeId));
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity createEmployee (@RequestBody @Valid EmployeeCreateRequest request, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return returnErrors(bindingResult);
            }
            return ResponseEntity.ok(employeeService.createEmployee(request));
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{employeeId}")
    public ResponseEntity updateEmployee (@RequestBody @Valid EmployeeCreateRequest request, @PathVariable Long employeeId, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                log.error("Field errors");
                return returnErrors(bindingResult);
            }
            return ResponseEntity.ok(employeeService.updateEmployee(employeeId, request));
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{employeeId}")
    public ResponseEntity deleteEmployee (@PathVariable Long employeeId) {
        try {
            employeeService.deleteEmployee(employeeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }
}