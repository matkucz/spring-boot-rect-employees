package pai.mk.employees.config;

public class AuthenticationConfigConstants {
    public static final String SECRET = System.getenv("JWT_TOKEN");
    public static final long EXPIRATION_TIME = 1800000; // 30 minutes in miliseconds
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/api/user";
}
