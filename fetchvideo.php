<?php

// Replace 'YOUR_API_KEY' and 'VIDEO_URL' with your actual API key and YouTube video URL
$apiKey = 'AIzaSyBG7YBeYmcINh0XGBJ52IFOHHfse9cXFrg';
$videoUrl = 'https://www.youtube.com/watch?v=YykjpeuMNEk';

// Extract video ID from URL
preg_match('/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $videoUrl, $matches);
header('Content-Type: application/json');  // Set the Content-Type header to JSON
if (isset($matches[1])) {
    $videoId = $matches[1];

    // Construct the API endpoint
    $apiEndpoint = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id={$videoId}&key={$apiKey}";

    // Make the API request
    $response = file_get_contents($apiEndpoint);

    // Decode the JSON response
    $videoDetails = json_decode($response, true);

    // Return relevant details as JSON
    if (isset($videoDetails['items'][0]['snippet'])) {
        $snippet = $videoDetails['items'][0]['snippet'];
        $result = array(
            'videoId' => $videoId,
            'title' => $snippet['title'],
            'description' => $snippet['description'],
            // 'publishedAt' => $snippet['publishedAt'],
            'thumbnailUrl' => $snippet['thumbnails']['medium']['url']
        );
        echo json_encode($result);
    } else {
        echo json_encode(['error' => 'Video details not found.']);
    }
} else {
    echo json_encode(['error' => 'Invalid YouTube URL. Couldn\'t extract video ID.']);
}
?>