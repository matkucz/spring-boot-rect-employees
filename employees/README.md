# Simple Spring Boot JWT application

## How to run this project
Setup some environment variables. For example on Linux:
```
export PG_DATABASE_HOST=localhost
export PG_DATABASE_PORT=5432
export PG_DATABASE_USER=your-user
export PG_DATABASE_PASSWORD=your-password
export JWT_TOKEN=your-random-token
```
You can set JWT_TOKEN environment variable using Python secrets module:
```
export JWT_TOKEN=$(python3 -c "import secrets;print(secrets.token_hex(16))")
```