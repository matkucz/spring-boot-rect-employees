package pai.mk.employees.controller;

import pai.mk.employees.model.request.UserCreateRequest;
import pai.mk.employees.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

@RestController
@RequestMapping(value = "/api/user")
@RequiredArgsConstructor
public class UserController {
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity createUser (@RequestBody @Valid UserCreateRequest userCreateRequest, BindingResult bindingResult) {
        // Logger logger = LogManager.getLogger(UserService.class);
        if (bindingResult.hasErrors()) {
            List<FieldError> errors = bindingResult.getFieldErrors();
            Map<String, String> errorsMap = new HashMap<String, String>();
            for (FieldError fieldError : errors) {
                errorsMap.put(fieldError.getField(), fieldError.getDefaultMessage());                
            }
            Map<String, Map<String, String>> outputErrors = new HashMap<String, Map<String, String>>();
            outputErrors.put("errors", errorsMap);            
            return ResponseEntity.badRequest().body(outputErrors);
        }
        userService.createUser(userCreateRequest);
        return ResponseEntity.ok().build();
    }
}
