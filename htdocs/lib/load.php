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

function getJsonApis(){
    $_apis = __DIR__.'../../../project/config.json';
    // echo ">>>>>".$_apis;
    $_api = file_get_contents($_apis);
    $apiData = json_decode($_api, true);
    return $apiData;
}

function loadTemplate($page){
    include __DIR__."/../db/$page.php";
}

