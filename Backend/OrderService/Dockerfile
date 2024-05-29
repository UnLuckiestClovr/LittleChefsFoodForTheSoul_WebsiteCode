# Use the official Maven image to build the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the project files into the container
COPY . .

# Build the application using Maven
RUN mvn clean package

# Use the official Tomcat image as a base image
FROM tomcat:9-jdk17-openjdk-slim

# Remove the default Tomcat webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the WAR file into the webapps directory of Tomcat
COPY --from=build /usr/src/app/target/OrderAPI.war /usr/local/tomcat/webapps/ROOT.war

# Copy the application properties into the container
COPY --from=build /usr/src/app/src/main/resources/application.properties /usr/local/tomcat/conf/application.properties

# Start Tomcat
CMD ["catalina.sh", "run"]
