<?php

class cron{
    public static function runCron(){
        $count;
            $conn = db::makeConnection();
            $query = "SELECT COUNT(*) as count FROM `agricreations_visitors`";
            $result = $conn->query($query);
             if($result->num_rows > 0){
                $row = $result->fetch_assoc();
                $count = $row['count'];
             }
         if($result->num_rows > 0){
            $row = $result->fetch_assoc();
                 agri::sendDiscordWebhook($count);
             }else{
                 echo json_encode(["status" => "error", "message" => "View count feth fails"]);
             }
             $conn->close();
    }
}