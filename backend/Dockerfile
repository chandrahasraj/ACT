# Use a lightweight OpenJDK base image with Gradle pre-installed
FROM gradle:7.6.0-jdk17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only Gradle configuration and dependencies files first
COPY build.gradle.kts settings.gradle.kts gradle.properties ./

COPY gradle ./gradle

# Download Gradle dependencies and cache them
RUN gradle --no-daemon dependencies

# Copy the rest of the application code
COPY . .

# Build the application
RUN gradle --no-daemon build

FROM amazoncorretto:17-alpine-jdk

WORKDIR /app

# Copy Project Files
COPY . .

RUN ./gradlew clean build -x test

EXPOSE 8080

CMD ["java", "-jar", "./build/libs/backend-0.0.1-SNAPSHOT.jar"]
