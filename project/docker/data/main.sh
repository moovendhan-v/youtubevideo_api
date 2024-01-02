#!/bin/bash

# Set non-interactive mode for package installations
export DEBIAN_FRONTEND=noninteractive

apt update && apt upgrade -y
# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
apt-get install -y npm
npm install -g -y grunt-cli
npm install -y grunt-dart-sass --save-dev


# Install PHP from Ondřej Surý's PPA
apt-get install -y software-properties-common
add-apt-repository -y ppa:ondrej/php
apt-get update

# Skip time zone question by echoing a default choice
echo "12" | apt-get install -y php

apt install -y php-cli
apt install -y php-cgi
apt install -y php-mysql
apt install -y php-pgsql

apt-get clean

cp -f /home/config.json /var/www/html/project

