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

    public static function sendDiscordWebhook($message, $channel) {
      $apiData = getJsonApis();

        if (empty($message)) {
            echo json_encode(["status" => "error", "message" => "Empty message"]);
            return;
        }
        $data = ["content" => "You have new visitor from : $message"];
        $options = [
            "http" => [
                "header" => "Content-type: application/json",
                "method" => "POST",
                "content" => json_encode($data),
            ],
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($apiData[$channel], false, $context);
        if ($result === false) {
            echo json_encode(["status" => "error", "message" => "Failed to send webhook"]);
        } else {
            echo json_encode(["status" => "success", "message" => "Webhook sent successfully"]);
        }
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
            $query = "INSERT INTO `agricreations_visitors` (`ip`, `user_agent`, `country`, `time`)
            VALUES ('$ipAddress', '$useragent', 'testing', now())";

             $result = $conn->query($query);
             if($result){
                 echo json_encode(["status" => "success", "message" => $ipAddress, "useragent" => $useragent]);
                 self::sendDiscordWebhook($ipAddress . $useragent, "default");
             }else{
                 echo json_encode(["status" => "error", "message" => "Data not inserted"]);
             }
             $conn->close();
    }
}
