<?php

class youtube { 
    public $title = "Hkr agri techs";
    public static function fetchYoutubeVideos($database){
        $conn = db::makeConnection();
        $query = "SELECT `id`, `videoId`, `videoTitle`, `description`, `thumbnail` FROM `$database` WHERE 1";
        $result = $conn->query($query);
            $videos = array();
            if($result->num_rows > 0){
                while ($row = $result->fetch_assoc()) {
                    $videos[] = $row;
                }
            }
        $conn->close();
        $jsonResult = json_encode($videos);
        header('Content-Type: application/json');
        return $jsonResult;
    }

    public static function buildJson($database){
        function buildjson($vidid, $title, $description, $thumbnail, $channeltitle, $channelId){
            $data = [
                "kind" => "youtube#searchResult",
                "etag" => "lilIOauO0sC8C8kUxLDdy8_AzG8",
                "id" => [
                    "kind" => "youtube#video",
                    "videoId" => $vidid
                ],
                "snippet" => [
                    "channelId" => $channelId,
                    "title" => $title,
                    "description" => $description,
                    "thumbnails" => [
                        "high" => [
                            "url" => $thumbnail,
                            "width" => 480,
                            "height" => 360
                        ]
                    ],
                    "channelTitle" => $channeltitle,
                    "liveBroadcastContent" => "none"
                ]
            ];
            return $data;
        }
    
        $conn = db::makeConnection();
        $query = "SELECT `id`, `videoId`, `videoTitle`, `description`, `thumbnail` FROM `$database` WHERE 1";
        $result = $conn->query($query);
        $AllData = array();
        if($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
                $AllData[] = buildjson($row['videoId'], $row['videoTitle'], $row['description'], $row['thumbnail'], "hkr agri techs", "UCSjSmjY9cEI_ib-NrBElVXw");
            }
        }
        $conn->close();
        // Convert $AllData to JSON
        $jsonData = json_encode($AllData);
        header('Content-Type: application/json');
        return $jsonData;
    }
}