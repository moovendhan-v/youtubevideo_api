<?php
session_start();

include __DIR__.'/lib/load.php';



//this condition will works if its admin is logged in

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
        if(isset($_REQUEST['updatedata'])){
            echo operations::updateData();
            return;
        }
}

$result = youtube::buildJson('agricreations_app');
echo $result;
return;
