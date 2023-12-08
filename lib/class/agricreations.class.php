<?php

class agri {
    public static function insertVisitorEmail() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $email = $_POST['email'];
            try {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    throw new Exception("Invalid email");
                }
                $conn = db::makeConnection();
                // Use a prepared statement to prevent SQL injection
                $stmt = $conn->prepare("INSERT INTO `agricreation_email` (`email_details`) VALUES (?)");
                $stmt->bind_param("s", $email);
                $stmt->execute();
                if ($stmt->affected_rows > 0) {
                    echo json_encode(["status" => "success", "message" => "Email Updated successfully"]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Email not inserted"]);
                }
                $stmt->close();
                $conn->close();
            } catch (mysqli_sql_exception $e) {
                if (strpos($e->getMessage(), "Duplicate entry") !== false) {
                    echo json_encode(["status" => "error", "message" => "Email already inserted"]);
                } else {
                    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
                }
            } catch (Exception $e) {
                echo json_encode(["status" => "invalid", "message" => $e->getMessage()]);
            }
        }
    }

    private static function sendDiscordWebhook($webhookURL, $message) {
        $data = ["New vistor for agricreations" => $message];
        $options = [
            CURLOPT_URL => $webhookURL,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
        ];
    
        $curl = curl_init();
        curl_setopt_array($curl, $options);
        curl_exec($curl);
        curl_close($curl);
    }

    public static function getVisitorIp(){
        $visitor = $_POST['action'];
        $ipAddress = $_SERVER['REMOTE_ADDR'];
        $useragent = $_SERVER['HTTP_USER_AGENT'];
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $forwardedIps = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                $ipAddress = trim($forwardedIps[0]);
            }
            $conn = db::makeConnection();
            $query = "INSERT INTO `agricreations_visitors` (`ip`, `user_agent`, `country`)
            VALUES ('$ipAddress', '$useragent', 'testing')";

             $result = $conn->query($query);
             if($result){
                 echo json_encode(["status" => "success", "message" => $ipAddress, "useragent" => $useragent]);
                 sendDiscordWebhook("https://discord.com/api/webhooks/1182669005778059355/du5gjQZR5ismWboyDrjFoo2I4tvpb8qiCmiGfbETVQQ0UUWFRCbeOP9eP0_8jvSc51Qx", $ipAddress);
             }else{
                 echo json_encode(["status" => "error", "message" => "Data not inserted"]);
             }
             $conn->close();
    }
}
