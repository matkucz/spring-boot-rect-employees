package pai.mk.employees.controller;

import pai.mk.employees.model.Departament;
import pai.mk.employees.model.request.DepartamentCreateRequest;
import pai.mk.employees.service.EmployeeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

import lombok.RequiredArgsConstructor;

@Slf4j
@RestController
@RequestMapping(value = "/api/departament")
@RequiredArgsConstructor
public class DepartamentController {

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
    public ResponseEntity<List<Departament>> getDepartaments() {
        log.info("Get departaments");
        return ResponseEntity.ok(employeeService.getDepartaments());
    }

    @GetMapping("/{departamentId}")
    public ResponseEntity getDepartament(@PathVariable Long departamentId) {
        try {
            return ResponseEntity.ok(employeeService.getDepartament(departamentId));
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @GetMapping("/{departamentId}/employee")
    public ResponseEntity getDepartamentEmployees(@PathVariable Long departamentId) {
        try {
            return ResponseEntity.ok(employeeService.getDepartamentEmployees(departamentId));
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity createDepartament (@RequestBody @Valid DepartamentCreateRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            log.error("Field errors");
            return returnErrors(bindingResult);
        }
        return ResponseEntity.ok(employeeService.createDepartament(request));
    }

    @PatchMapping("/{departamentId}")
    public ResponseEntity updateDepartament (@RequestBody @Valid DepartamentCreateRequest request, @PathVariable Long departamentId, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                log.error("Field errors");
                return returnErrors(bindingResult);
            }
            return ResponseEntity.ok(employeeService.updateDepartament(departamentId, request));
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @DeleteMapping("/{departamentId}")
    public ResponseEntity deleteDepartament (@PathVariable Long departamentId) {
        try {
            employeeService.deleteDepartament(departamentId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Exception: " + e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }
}
