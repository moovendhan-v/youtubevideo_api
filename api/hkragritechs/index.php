<?php

include __DIR__.'../../../lib/load.php';

if($_SERVER['REQUEST_URI'] === '/youtube_api/api/hkragritechs/'){
    $result = youtube::buildJson('hkragritechs');
    echo($result);
}