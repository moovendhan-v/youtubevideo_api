<?php

class rss {
    public static function rssFetch() {
        try {
            $apiDatas = getJsonApis();
            if (!isset($apiDatas['rss'])) {
                throw new Exception("RSS API URL is not defined in the configuration.");
            }
            $hostLink = $apiDatas['rss']['host'];
            $uriArray = $apiDatas['rss']['uri'];
            $max = 4;
            $resultArray = [];
            foreach ($uriArray as $uriPath) {
                $targetUrl = $uriPath; 
                $max = 10;
                $endpoint = "$hostLink/makefulltextfeed.php?url=sec://$targetUrl&max=$max&links=preserve&exc=&format=json";
                $result = file_get_contents($endpoint);
                if ($result === false) {
                    throw new Exception("Fetch failed for URI: $uriPath");
                }
                $resultArray[] = json_decode($result, true);
            }
            header('Content-Type: application/json');
            return json_encode($resultArray);
        } catch (Exception $e) {
            echo json_encode(["status" => "fail", "message" => $e->getMessage()]);
        }
    }
}
