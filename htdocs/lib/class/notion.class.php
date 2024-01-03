<?php 

class notion{

    public static function getNotionDatabaeDetails(){
    $apiData = getJsonApis();
    $token = $apiData['api']['notion'];
    $curl = curl_init();
    $database_id = 'e719910126a34d28acc95c2bede3b9d6';  // Replace with your actual database ID
    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://api.notion.com/v1/databases/' . $database_id . '/query',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => '{}',  // You can customize the query if needed
    CURLOPT_HTTPHEADER => array(
        'Notion-Version: 2022-02-22',
        'Authorization: Bearer '. $token,
        'Content-Type: application/json',
    ),
    ));
    $response = curl_exec($curl);
    curl_close($curl);
    header('Content-Type: application/json');
    echo $response;
    }
}