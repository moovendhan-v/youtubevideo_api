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
        function buildjson($vidid, $title, $description, $thumbnail, $channeltitle, $channelId, $type, $catogries, $channellogo, $islive){
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
                    "type" => $type,
                    "category" => $catogries,
                    "channellogo" => $channellogo,
                    "islive" => $islive,
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
        $query = "SELECT 
        yt.`id`,
        yt.`videoid`,
        yt.`image`,
        yt.`title`,
        yt.`description`,
        ci.`channel_title` AS channel_name,
        ci.`channel_logo` AS channel_logo_image,
        ci.`channel_id` AS yt_channel_id,
        yvc.`catogries` AS video_category,
        yvt.`type` AS video_type,
        yt.`islive` 
    FROM 
        `youtube_videos_api` yt
    LEFT JOIN 
        `youtube_channel_info` ci ON yt.`channelid` = ci.`id`
    LEFT JOIN 
        `youtube_videos_catogries` yvc ON yt.`catogries` = yvc.`id`
    LEFT JOIN 
        `youtube_video_type` yvt ON yt.`type` = yvt.`id`";

    if (isset($_GET["query"])) {
        $query .= " WHERE title LIKE '%" . $_GET['query'] . "%'";
    };

        $result = $conn->query($query);
        $AllData = array();
        if($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
                $AllData[] = buildjson($row['videoid'], $row['title'], $row['description'], $row['image'], $row['channel_name'], $row['yt_channel_id'], $row['video_type'], $row['video_category'], $row['channel_logo_image'],$row['islive']);
            }
        }
        $conn->close();
        // Convert $AllData to JSON
        $jsonData = json_encode($AllData);
        header('Content-Type: application/json');
        return $jsonData;
    }

    public static function searchyoutubeVideos($query){
        $conn = db::makeConnection();
        $query = "SELECT * FROM youtube_videos_api
        WHERE title LIKE '%$query%'";
        $result = $conn->query($query);
        $videos = array();
        if($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
                $videos[] = $row;
            }
        }
        $jsonResult = json_encode($videos);
        header('Content-Type: application/json');
        $conn->close();
        return $jsonResult;
        }
}