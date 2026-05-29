# Docker Setup Guide - Ecommerce API

This guide provides instructions for building and running the Ecommerce API using Docker and Docker Compose.

## Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- Maven 3.9+ (for local builds)
- Java 17+ (for local development)

## Project Structure

```
Ecommerce/
├── Dockerfile              # Multi-stage build for Spring Boot app
├── docker-compose.yml      # Base configuration (PostgreSQL + Spring Boot)
├── docker-compose.dev.yml  # Development overrides
├── docker-compose.prod.yml # Production overrides
├── .dockerignore           # Files to exclude from Docker build
└── .env.docker             # Environment variables
```

## Quick Start

### 1. Build and Run with Docker Compose (Recommended)

```bash
# Start both PostgreSQL and Spring Boot application
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Clean up volumes
docker-compose down -v
```

### 2. Development Environment

```bash
# Start with development settings (more logging, slower startup)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View detailed logs
docker-compose logs -f app

# Debugging: Connect debugger to localhost:5005 (if IDE supports remote debugging)
```

### 3. Production Environment

```bash
# Start with production settings (optimized, security-focused)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Building Docker Image

### Build image locally (without running)

```bash
# Build image
docker build -t ecommerce-api:latest .

# View image details
docker images

# Run container from image
docker run -d \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ecommerce_db \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=Ajju@123 \
  --name ecommerce-app \
  ecommerce-api:latest
```

## Service URLs

Once running, access the application at:

- **API Base URL**: `http://localhost:8080`
- **Health Check**: `http://localhost:8080/actuator/health`
- **Database**: `localhost:5432` (PostgreSQL)
- **Database Admin**: Use pgAdmin or DBeaver at `localhost:5432`

## Database Access

### Connect to PostgreSQL from Host

```bash
# Using psql (if installed)
psql -h localhost -U postgres -d ecommerce_db

# Using Docker
docker exec -it ecommerce-db psql -U postgres -d ecommerce_db
```

### Default Credentials

- **Username**: `postgres`
- **Password**: `Ajju@123`
- **Database**: `ecommerce_db`
- **Port**: `5432`

## Configuration

### Environment Variables

Edit environment variables in:
- `.env.docker` - Base environment variables
- `docker-compose.yml` - Service configuration
- `docker-compose.dev.yml` - Development overrides
- `docker-compose.prod.yml` - Production overrides

### Spring Boot Properties

Key properties configured in docker-compose:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ecommerce_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=Ajju@123
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
```

## Health Checks

Both services include health checks:

- **PostgreSQL**: Checks if database is accepting connections
- **Spring Boot**: Checks `/actuator/health` endpoint

View health status:

```bash
docker-compose ps
```

## Common Commands

```bash
# View running containers
docker-compose ps

# View service logs
docker-compose logs app
docker-compose logs postgres

# Execute command in container
docker exec -it ecommerce-app bash
docker exec -it ecommerce-db bash

# Rebuild image
docker-compose up --build

# Remove all containers and volumes
docker-compose down -v

# Scale services (if applicable)
docker-compose up -d --scale app=3
```

## Troubleshooting

### Application fails to connect to database

1. Check if PostgreSQL is running: `docker-compose ps`
2. Verify network connectivity: `docker network ls`
3. Check logs: `docker-compose logs postgres`
4. Ensure database is healthy: `docker exec ecommerce-db pg_isready -U postgres`

### Port already in use

```bash
# Find process using port 8080
lsof -i :8080
# or for Windows
netstat -ano | findstr :8080

# Change port in docker-compose.yml
# Change "8080:8080" to "8081:8080"
```

### Container fails to start

```bash
# View error logs
docker-compose logs app

# Rebuild image (can fix layer issues)
docker-compose up --build
```

## Performance Optimization

### Dockerfile Optimization
- Multi-stage build reduces image size
- Alpine base image (17MB vs 500MB+) for runtime
- Non-root user for security

### Compose Optimization
- Health checks prevent cascading failures
- Volume persistence for database
- Network isolation for services

## Security Considerations

⚠️ **Warning**: Current setup uses hardcoded credentials. For production:

1. Use Docker secrets or environment variable files
2. Generate strong passwords
3. Use `.env` files (add to `.gitignore`)
4. Consider using external secret management tools (AWS Secrets Manager, HashiCorp Vault)
5. Change default PostgreSQL password
6. Enable SSL for database connections
7. Use network policies and firewall rules

## Next Steps

1. Update credentials in `.env.docker`
2. Test API endpoints using provided Postman collection
3. Set up CI/CD pipeline (GitHub Actions, Jenkins, etc.)
4. Configure logging and monitoring (ELK Stack, Prometheus, etc.)
5. Implement reverse proxy (Nginx, Traefik)
6. Set up automated backups for database volumes

## Support

For issues or questions:
- Check Docker logs: `docker-compose logs -f`
- Review application properties in `src/main/resources/application.properties`
- Consult Docker documentation: https://docs.docker.com/
- Review Spring Boot Docker documentation: https://spring.io/guides/gs/spring-boot-docker/
