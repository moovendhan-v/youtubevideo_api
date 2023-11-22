<?php
session_start();

include __DIR__.'/lib/load.php';


if(isset($_SESSION['login']) == "admin"){

if(isset($_REQUEST['update'])){
    return operations::insertData();
}
if(isset($_REQUEST['getchannelinfo'])){
        echo operations::getChannelInfo();
        return;
}
if(isset($_REQUEST['getcatogriesinfo'])){
    echo operations::getCatogriesInfo();
    return;
}
if(isset($_REQUEST['getvideoinfo'])){
    echo operations::getVideoTypeInfo();
    return;
}

}else{
    echo("Not authorised");
    return;
}

$result = youtube::buildJson('agricreations_app');
echo $result;
