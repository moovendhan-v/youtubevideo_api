<?php 

class notion{

    public static function getNotionDatabaeDetails(){
        if (isset($_GET['dbid'])) {
            $dataBaseId = $_GET['dbid'];
            $apiData = getJsonApis();
            $token = $apiData['notion']['api'];
            $curl = curl_init();
            $database_id = $apiData['notion']['database'][$dataBaseId]; 
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
            return $response;
        }else{
            header('Content-Type: application/json');
            echo json_encode(["status" => "fail", "message" => "Check your database id"]);
        }
    
    }
}