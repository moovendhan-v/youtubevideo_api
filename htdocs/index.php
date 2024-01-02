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
// if(isset($_REQUEST['insertrss'])){
//     return operations::inserRssData();
// }
//this condition will works if its admin is logged in
if(isset($_REQUEST['rssfetch'])){
        echo rss::rssFetch();
        return;
}

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
        if (isset($_REQUEST['inserusertcontactmessage'])) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                if (isset($_POST['emails'])) {
                    $email = $_POST['emails'];
                }
                if (isset($_POST['telegram'])) {
                    $telegram = $_POST['telegram'];
                }
                if (isset($_POST['message'])) {
                    $message = $_POST['message'];
                }
                agri::insertUserContactMessage($email, $telegram, $message);
                return;
            } else {
                header('Content-Type: application/json');
                echo json_encode(["status" => "error", "message" => "Invalid Method"]);
                return;
            }
        }
        if (isset($_REQUEST['searchyoutubevideos'])) {
            $query = $_GET['query'];
            echo youtube::buildJson('agricreations_app');
            return;
        }
        
}

$result = youtube::buildJson('agricreations_app');
echo $result;
return;
