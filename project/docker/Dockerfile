# Use an official Ubuntu as a base image
FROM ubuntu:latest

# Install Apache and Git
RUN apt-get update && \
    apt-get install -y apache2 git && \
    rm -rf /var/lib/apt/lists/*

COPY /data/ /home

# Run main.sh to install Node.js and npm
RUN chmod +x /home/main.sh
RUN /home/main.sh

# Expose port 80 for Apache
EXPOSE 80

# Clone your Git repository into a temporary directory
WORKDIR /tmp
RUN git clone https://github.com/agricreation/youtubevideo_api.git .

# Move the contents to Apache document root
RUN cp -R /tmp/. /var/www/html && rm -rf /tmp/*

# Start Apache in the foreground
CMD ["apache2ctl", "-D", "FOREGROUND"]

