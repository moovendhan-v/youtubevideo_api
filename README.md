# Backend API for Flutter App (Youtube video dashboard)

## Overview
This PHP backend API is designed to support a Flutter app's admin dashboard for managing and updating videos. It provides endpoints to interact with video details.

I am upgrading this project for the admin dashboard. like the person who manages all the things within this one admin dashboard.

I integrated some things like.
- Integrated YouTube API 
- Notion API
- Full-text RSS http://ftr.fivefilters.org/


## Technologies Used
- PHP

## Prerequisites
- PHP installed
- Web server (e.g., Apache, Nginx) set up

## Installation
1. Clone the repository
   ```bash
   git clone https://github.com/agricreation/youtubevideo_api/

2. Update all config files in the (/project/config.json) file. 'Create a new one if it does not have.

``` touch /youtubevideo_api/projects/config.json ``` This will be a root configuration for your web app
```
{
    "baseUrl" : "http://localhost/htdocs/",
    "rss" : {
        "host" : "http://ftr.fivefilters.org/", //3LIMITS
        "uri" : [
            "www.gadgets360.com/rss/feeds", //GET YOUR OWN SAMPLES
            "www.theverge.com/rss/tech/index.xml",
            "www.9to5mac.com/feed/",
            "www.9to5google.com/feed/"
        ]
    },
    "mongo":{
        "username" : "your_mongo_admin_user",
        "password" : "your_mongo_admin_password"
    },
    "mysql":{
        "host" : "mysql",
        "username" : "your_mysql_user",
        "password" : "your_mysql_password",
        "database" : "your_database_name"
    },
    "api":{
        "ip": "{YOUR_API_KEY_FOR_IP_INFORMATION}",
    },
    "notion":{
        "api": "{YOUR_NOTION_API_KEY}",
        "database":{
            "todo": "{YOUR_DATABASE_ID}",
            "clientReview": "{YOUR_DATASE_ID}"
        }
    },
    "default" : "{DISCORD_WEBHOOK_URL}}",
    "agricreations" : "{DISCORD_WEBHOOK_URL}",
    "warning" : "{DISCORD_WEBHOOK_URL}"
}
   
```
Update your base URI for javascript 
```/project/js/_initialload.js```
const BASE_URI = "http://localhost/htdocs/"; ```Your uri``

## Using Grunt Tool for development.

Install Npm and nodejs for use of this grunt tool. 

To install a grunt tool ```npm install -g -y grunt-cli```

To run grunt tool ```grunt default``` "To access grunt file" ```cd project/grunt/gruntFile.js```

```Note Dont update any javascript or css file in htdocs file```
