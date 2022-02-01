package pai.mk.employees.controller;

import pai.mk.employees.model.UserModel;
import pai.mk.employees.model.request.GrantRoleRequest;
import pai.mk.employees.model.request.UserCreateRequest;
import pai.mk.employees.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
public class UserController {
    
    @Autowired
    private UserService userService;

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

    @PostMapping
    public ResponseEntity createUser (@RequestBody @Valid UserCreateRequest userCreateRequest, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return returnErrors(bindingResult);
            }
            if (userCreateRequest.getRole().equals("ADMIN")) {
                throw new Exception("Can't create admin account");
            }
            userService.createUser(userCreateRequest);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Exception: ", e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getUsers () {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity getUser (@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.getUser(userId));
        } catch (Exception e) {
            log.error("Exception: ", e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{userId}")
    public ResponseEntity editUser (@RequestBody @Valid UserCreateRequest userCreateRequest, @PathVariable Long userId, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return returnErrors(bindingResult);
            }
            userService.editUser(userId, userCreateRequest);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Exception: ", e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{userId}/grant")
    public ResponseEntity grantUserRole (@RequestBody @Valid GrantRoleRequest grantRoleRequest, @PathVariable Long userId, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                returnErrors(bindingResult);
            }
            userService.grantRole(userId, grantRoleRequest);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Exception: ", e.getMessage());
            return returnExceptionError(e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{userId}")
    public ResponseEntity deleteUser (@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}
