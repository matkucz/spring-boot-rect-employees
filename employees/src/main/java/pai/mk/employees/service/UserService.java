package pai.mk.employees.service;

import pai.mk.employees.model.UserModel;
import pai.mk.employees.model.request.GrantRoleRequest;
import pai.mk.employees.model.request.UserCreateRequest;
import pai.mk.employees.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public UserModel readUserByUsername (String username) {
        return userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);
    }

    public void createUser(UserCreateRequest userCreateRequest) {
        UserModel apiUser = new UserModel();        
        Optional<UserModel> byUsername = userRepository.findByUsername(userCreateRequest.getUsername());
        if (byUsername.isPresent()) {
            throw new RuntimeException("User already registered. Please use different username.");
        }
        apiUser.setUsername(userCreateRequest.getUsername());
        apiUser.setPassword(passwordEncoder.encode(userCreateRequest.getPassword()));
        apiUser.setRole(userCreateRequest.getRole());

        userRepository.save(apiUser);
    }

    public List<UserModel> getUsers () {
        return userRepository.findAll();
    }

    public UserModel getUser (Long userId) {
        return userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }

    public void deleteUser (Long userId) {
        userRepository.deleteById(userId);
    }

    public UserModel editUser (Long userId, UserCreateRequest request) {
        Optional<UserModel> apiUser = userRepository.findById(userId);
        if (!apiUser.isPresent()) {
            throw new EntityNotFoundException("User not present in database");
        }
        UserModel user = apiUser.get();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (!user.getRole().equals(request.getRole())) {
            throw new RuntimeException("Can't change role this way, use grant role method");
        }
        user.setRole(request.getRole());
        return userRepository.save(user);
    }

    public void grantRole (Long userId, GrantRoleRequest grantRoleRequest) {
        Optional<UserModel> apiUser = userRepository.findById(userId);
        if (!apiUser.isPresent()) {
            throw new EntityNotFoundException("User not present in database");
        }
        UserModel editedUser = apiUser.get();
        editedUser.setRole(grantRoleRequest.getRole());
        userRepository.save(editedUser);
    }
}