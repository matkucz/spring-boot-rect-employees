package pai.mk.employees;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import pai.mk.employees.model.request.UserCreateRequest;
import pai.mk.employees.service.UserService;

@SpringBootApplication
public class EmployeesApplication {

	@Autowired
    private UserService userService;

	@Value("${adminPassword}")
	private String adminPassword;
	public static void main(String[] args) {
		SpringApplication.run(EmployeesApplication.class, args);
	}

	@PostConstruct
	public void init() {
		UserCreateRequest adminUser = new UserCreateRequest();
		adminUser.setUsername("admin");
		adminUser.setPassword(adminPassword);
		adminUser.setRole("ADMIN");
		userService.createUser(adminUser);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
}
