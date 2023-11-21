<?php

class operations {
    public static function insertData(){
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // $raw_data = file_get_contents("php://input");
            // $decoded_data = json_decode($raw_data, true);
            $videoId = $_POST["videoId"];
            $videoImage = $_POST["videoImage"];
            $videoTitle = $_POST["videoTitle"];
            $videoInfo = $_POST["videoInfo"];
            $channel = $_POST["channel"];
            $catogries = $_POST["catogries"];
            $type = $_POST["type"];
            $isLive = $_POST["isLive"];

            $conn = db::makeConnection();
            $query = "INSERT INTO `youtube_videos_api` (`videoid`, `image`, `title`, `description`, `channelid`, `catogries`, `type`, `islive`) VALUES ('$videoId', '$videoImage', '$videoTitle', ' $videoInfo', ' $channel', '$catogries', '$type', '$isLive')";
            $result = $conn->query($query);
            if($result){
                echo json_encode(["status" => "success", "message" => "Data received successfully"]);
            }else{
                echo json_encode(["status" => "error", "message" => "Data not inserted"]);
            }
            $conn->close();
            // INSERT INTO `youtube_videos_api` (`id`, `videoid`, `image`, `title`, `description`, `channelid`, `catogries`, `type`, `islive`) VALUES (NULL, 't', 't', 't', 't', '1', '1', '1', '1');

        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method"]);
        }

        // public static function fetchYoutubeVideos($database){
        //     $conn = db::makeConnection();
        //     $query = "SELECT `id`, `videoId`, `videoTitle`, `description`, `thumbnail` FROM `$database` WHERE 1";
        //     $result = $conn->query($query);
        //         $videos = array();
        //         if($result->num_rows > 0){
        //             while ($row = $result->fetch_assoc()) {
        //                 $videos[] = $row;
        //             }
        //         }
        //     $conn->close();
        //     $jsonResult = json_encode($videos);
        //     header('Content-Type: application/json');
        //     return $jsonResult;
        }

    }
