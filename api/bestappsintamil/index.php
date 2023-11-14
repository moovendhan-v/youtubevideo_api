<?php

include __DIR__.'../../../lib/load.php';

if($_SERVER['REQUEST_URI'] === '/youtube_api/api/bestappsintamil/'){
    $result = youtube::buildJson('bestappsintamil');
    echo($result);
}