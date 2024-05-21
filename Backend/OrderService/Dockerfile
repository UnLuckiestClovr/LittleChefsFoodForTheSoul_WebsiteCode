
# Use an OpenJDK base image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the executable JAR file from the target directory into the container at /app
COPY target/OrderAPI.jar /app/OrderAPI.jar

# Expose the port your application listens on
EXPOSE 8081

# Specify the command to run your application
CMD ["java", "-jar", "OrderAPI.jar"]
