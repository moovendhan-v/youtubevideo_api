<?php
session_start();

include __DIR__.'/lib/load.php';

if(isset($_REQUEST['email'])){
    return agri::insertVisitorEmail();
}
if(isset($_REQUEST['getvisitorip'])){
    return agri::getVisitorIp();
}
if(isset($_REQUEST['webhook'])){
        $message = isset($_GET['message']);
        $channel = isset($_GET['channel']);
    return agri::sendDiscordWebhook($message, $channel);
}
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
        if(isset($_REQUEST['getvisitorsinfo'])){
            echo agri::getVisitorsInfo();
            return;
        }
        if(isset($_REQUEST['inserusertcontactmessage'])){
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $email = $_POST['emails'];
            $telegram = $_POST['telegram'];
            $message = $_post['message'];
            echo agri::insertUserContactMessage($email , $telegram, $message);
            return;
            }else{
                header('Content-Type: application/json');
                echo json_encode(["status" => "error", "message" => "Invalid Method"]);
                return;
            }
        }

}

$result = youtube::buildJson('agricreations_app');
echo $result;
return;
