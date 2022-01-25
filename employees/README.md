# Simple Spring Boot JWT application

## How to run this project
Setup some environment variables. For example on Linux:
```
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_USER=your-user
export DATABASE_PASSWORD=your-password
export ADMIN_PASSWORD=your-admin-password
export JWT_TOKEN=your-random-token
```
You can set JWT_TOKEN environment variable using Python secrets module:
```
export JWT_TOKEN=$(python3 -c "import secrets;print(secrets.token_hex(16))")
```

Admin account is created automatically after Spring init.

## Using MySQL instead of PostgeSQL

If you are using MySQL instead of Postgre, you need to change few things.
In every class in model package, change
```@Table(name="`table-name`")```
to
```@Table(name="table-name")```
In pom.xml comment out postgre dependecy and insert this:
```
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
```
In application.properties change dialect and datasource url to this:
```
spring.datasource.url = jdbc:mysql://${DATABASE_HOST}:${DATABASE_PORT}/employees
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL8Dialect
```
