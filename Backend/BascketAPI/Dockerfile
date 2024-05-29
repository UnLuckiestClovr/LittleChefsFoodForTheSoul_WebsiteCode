# Use the official Tomcat image as a base image
FROM tomcat:9-jdk17-openjdk-slim

# Remove the default Tomcat webapps
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy the WAR file into the webapps directory of Tomcat
COPY target/BascketAPI.war /usr/local/tomcat/webapps/ROOT.war

# Copy the application properties into the container
COPY src/main/resources/application.properties /usr/local/tomcat/conf/

# Start Tomcat
CMD ["catalina.sh", "run"]