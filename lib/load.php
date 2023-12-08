<?php

// Allow from any origin
header('Access-Control-Allow-Origin: *');

// Allow methods (GET, POST, etc.)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Allow headers
header('Access-Control-Allow-Headers: Content-Type');


include __DIR__."/class/youtube.class.php";
include __DIR__."/class/operations.class.php";
include_once __DIR__."/class/agricreations.class.php";
include_once __DIR__."/class/db.class.php";
include_once __DIR__."/class/cron.class.php";





function loadTemplate($page){
    include __DIR__."/../db/$page.php";
}

