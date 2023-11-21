<?php

include __DIR__.'/lib/load.php';

if($_REQUEST['update'] == "insert"){
    return operations::insertData();
};

$result = youtube::buildJson('agricreations_app');
echo($result);

