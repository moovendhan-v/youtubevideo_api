<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


include __DIR__."/class/youtube.class.php";
include_once __DIR__."/class/db.class.php";


function loadTemplate($page){
    include __DIR__."/../db/$page.php";
}

