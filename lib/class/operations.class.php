<?php

class operations {
    public static function insertData(){
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $videoId = $_POST["videoId"];
            $videoImage = $_POST["videoImage"];
            $videoTitle = $_POST["videoTitle"];
            $videoInfo = $_POST["videoInfo"];
            $channel = $_POST["channel"];
            $catogries = $_POST["catogries"];
            $type = $_POST["type"];
            $isLive = $_POST["isLive"];

            if (
                $videoId === null || $videoId === "" ||
                $videoImage === null || $videoImage === "" ||
                $videoTitle === null || $videoTitle === "" ||
                $videoInfo === null || $videoInfo === "" ||
                $channel === null || $channel === "" ||
                $catogries === null || $catogries === "" ||
                $type === null || $type === "" ||
                $isLive === null || $isLive === ""
            ) {
                echo json_encode(["status" => "error", "message" => "Server rejected Data Not Inserted"]);
                return;
            } 


            $conn = db::makeConnection();
            $query = "INSERT INTO `youtube_videos_api` (`videoid`, `image`, `title`, `description`, `channelid`, `catogries`, `type`, `islive`) VALUES ('$videoId', '$videoImage', '$videoTitle', ' $videoInfo', ' $channel', '$catogries', '$type', '$isLive')";
            $result = $conn->query($query);
            if($result){
                echo json_encode(["status" => "success", "message" => "Data received successfully"]);
            }else{
                echo json_encode(["status" => "error", "message" => "Data not inserted"]);
            }
            $conn->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid request method"]);
        }
    }
        
        public static function getChannelInfo(){
            $finalData = array();
            $conn = db::makeConnection();
            $query = "SELECT * FROM `youtube_channel_info`"; // Changed table name
            $result = $conn->query($query);
            if($result){
                if($result->num_rows > 0){
                    while ($row = $result->fetch_assoc()) {
                        $finalData[] = $row['channel_title'];
                    }
                }
                $result->close(); 
            }
            $conn->close();
            $data = [
                        "channel" => $finalData,
                    ];
            $jsonData = json_encode($data);
            header('Content-Type: application/json');
            return $jsonData;
        }

        public static function getCatogriesInfo(){
            $finalData = array();
            $conn = db::makeConnection();
            $query = "SELECT * FROM `youtube_videos_catogries`"; // Changed table name
            $result = $conn->query($query);
            if($result){
                if($result->num_rows > 0){
                    while ($row = $result->fetch_assoc()) {
                        $finalData[] = $row['catogries'];
                    }
                }
                $result->close(); 
            }
            $conn->close();
            $data = [
                        "catogries" => $finalData,
                    ];
            $jsonData = json_encode($data);
            header('Content-Type: application/json');
            return $jsonData;
        }

        public static function getVideoTypeInfo(){
            $finalData = array();
            $conn = db::makeConnection();
            $query = "SELECT * FROM `youtube_video_type`"; // Changed table name
            $result = $conn->query($query);
            if($result){
                if($result->num_rows > 0){
                    while ($row = $result->fetch_assoc()) {
                        $finalData[] = $row['type'];
                    }
                }
                $result->close(); 
            }
            $conn->close();
            $data = [
                        "videoinfo" => $finalData,
                    ];
            $jsonData = json_encode($data);
            header('Content-Type: application/json');
            return $jsonData;
        }

    }
