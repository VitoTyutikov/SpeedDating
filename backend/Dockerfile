# FROM eclipse-temurin:17-jdk-alpine
# VOLUME /tmp
# COPY target/*.jar app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]

# Use a Maven image to build the project
FROM maven:3.8.4-openjdk-17-slim as build

# Copy the source code and pom.xml to the image
COPY src /usr/src/myapp/src
COPY pom.xml /usr/src/myapp

# Set the working directory for the build
WORKDIR /usr/src/myapp

# Package the application
RUN mvn clean package -DskipTests

# Use the Eclipse Temurin JDK image for the final image
FROM eclipse-temurin:17-jdk-alpine


# Copy the built JAR file from the build stage
COPY --from=build /usr/src/myapp/target/*.jar /app.jar

# Define the container's entry point
ENTRYPOINT ["java", "-jar", "/app.jar"]