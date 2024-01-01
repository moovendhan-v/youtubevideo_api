<?php

include __DIR__.'/lib/load.php';
set_time_limit(300);

$conn = db::makeConnection();

$jsonData = file_get_contents('data.json');

$data = json_decode($jsonData, true);

$arrayLength = count($data['items']);

echo "Length of the array: $arrayLength";

foreach ($data['items'] as $item) {
    // Fetching details
    $channelId = $item['snippet']['channelId'];
    $title = $conn->real_escape_string($item['snippet']['title']);
    $description = $conn->real_escape_string($item['snippet']['description']);
    $thumbnail = $conn->real_escape_string($item['snippet']['thumbnails']['medium']['url']);
    $channelTitle = $conn->real_escape_string($item['snippet']['channelTitle']);
    $videoId = $item['id']['videoId'];

    $kind = $item['id']['kind'];

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

if($kind == "youtube#video"){
            // Retrieve the last inserted ID
            $result = $conn->query("SELECT MAX(id) AS max_id FROM youtube_videos_api");
            $row = $result->fetch_assoc();
            $lastId = $row['max_id'];

            // Increment the last ID for the next insertion
            $nextId = $lastId + 1;

            $sqls = "INSERT INTO `youtube_videos_api` (`id`, `videoid`, `image`, `title`, `description`, `channelid`, `catogries`, `type`, `islive`) 
                    VALUES ('$nextId', '$videoId', '$thumbnail', '$title', '$description', '1', '1', '1', '1')";

            if ($conn->query($sqls) === TRUE) {
                echo "Record inserted successfully<br>";
            } else {
                echo "Error inserting record: " . $conn->error . "<br>";
            }
    }else{
        echo("skipped video type");
    }

    
}

$conn->close();
?>
