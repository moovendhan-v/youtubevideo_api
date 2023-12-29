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
        $data = ["content" => ">>> 👨🏻‍💻 You have new visitor from : $message"];
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

    public static function getVisitorIp() {
        try {
            // $visitor = $_POST['action'];
            $ipAddress = $_SERVER['REMOTE_ADDR'];
            $useragent = $_SERVER['HTTP_USER_AGENT'];
            
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $forwardedIps = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
                $ipAddress = trim($forwardedIps[0]);
            }
    
            $conn = db::makeConnection();
    
            $apiData = getJsonApis();
            $token = $apiData['api']['ip'];
            $uri = "https://ipinfo.io/{$ipAddress}/json?token={$token}";
            
            $ipInfoResponse = file_get_contents($uri);
    
            if ($ipInfoResponse === false) {
                throw new Exception('Error fetching data from API');
            }
    
            $ipInfoResponseData = json_decode($ipInfoResponse, true);
    
            $city = $ipInfoResponseData['city'];
            $region = $ipInfoResponseData['region'];
            $loc = $ipInfoResponseData['loc'];
            $timezone = $ipInfoResponseData['timezone'];
            $country = $ipInfoResponseData['country'];
    
            $query = "INSERT INTO `agricreations_visitors` (`timezone`, `city`, `region`, `loc`, `ip`, `user_agent`, `country`, `time`)
                      VALUES ('$timezone', '$city', '$region', '$loc', '$ipAddress', '$useragent', '$country', now())";
    
            $result = $conn->query($query);
    
            if (!$result) {
                throw new Exception('🚨 Visitors data not inserted');
            }
    
            echo json_encode(["status" => "success", "message" => $ipAddress, "useragent" => $useragent]);
            self::sendDiscordWebhook(
                "⏳ Timezone: " . $timezone . "\n🌃 City: " . $city . "\n🗺️ Region: " . $region . "\n📍 Location: " . $loc . "\n🔎 IP: " . $ipAddress . "\n🌎 User Agent: " . $useragent . "\n🌐 Country: " . $country,
                "agricreations"
            );
            
            
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => $e->getMessage()]);
            self::sendDiscordWebhook("Exception: " . $e->getMessage(), "warning");
        } finally {
            $conn->close();
        }
    }

    public static function insertUserContactMessage($email, $telegram, $message){
       try {
        $conn = db::makeConnection();
        $query = "INSERT INTO `agricreation_contact` (`email`, `telegram_link`, `message`)
        VALUES ('$email', '$telegram', '$message')";
        $result = $conn->query($query);
         if (!$result) {
             throw new Exception('🚨 Visitors Info Not fetched');
         }
       } catch(Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        self::sendDiscordWebhook("Exception: " . $e->getMessage(), "warning");
    } finally {
        $conn->close();
    }
    }

    public static function getUserContactMessage(){
        try {
         $conn = db::makeConnection();
         $query = " SELECT * FROM `agricreation_contact`";
         $result = $conn->query($query);
         if (!$result) {
             throw new Exception('🚨 Visitors Info Not fetched');
         }
         $userContactMessage = array();
         if($result->num_rows > 0){
             while ($row = $result->fetch_assoc()) {
                $userContactMessage[] = $row;
             }
         }else{
             throw new Exception('🚨 Visitors Info Not fetched');
         }
         return $userContactMessage;
        } catch (Exception $e) {
         echo json_encode(["status" => "error", "message" => $e->getMessage()]);
         self::sendDiscordWebhook("Exception: " . $e->getMessage(), "warning");
     }
    }

    public static function getUserEmailSubscribers(){
       try {
        $conn = db::makeConnection();
        $query = " SELECT * FROM `agricreation_email`";
        $result = $conn->query($query);
        if (!$result) {
            throw new Exception('🚨 Visitors Info Not fetched');
        }
        $visitorDetails = array();
        if($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
                $visitorDetails[] = $row;
            }
        }else{
            throw new Exception('🚨 Visitors Info Not fetched');
        }
        return $visitorDetails;
       } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        self::sendDiscordWebhook("Exception: " . $e->getMessage(), "warning");
    }
       
    }

    public static function getVisitorsInfo(){
        try{
            $conn = db::makeConnection();
            $query = "SELECT * FROM `agricreations_visitors`";
            $result = $conn->query($query);
            if (!$result) {
                throw new Exception('🚨 Visitors Info Not fetched');
            }
            $visitorDetails = array();
            if($result->num_rows > 0){
                $visitorDetails['emailsubscribers'] = self::getUserEmailSubscribers();
                $visitorDetails['contactmessage'] = self::getUserContactMessage();
                while ($row = $result->fetch_assoc()) {
                    $visitorDetails['visitor'][] = $row;
                }
            }else{
                throw new Exception('🚨 Visitors Info Not fetched');
            }
            $jsonResult = json_encode($visitorDetails);
            header('Content-Type: application/json');
            return $jsonResult;
        }
         catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        self::sendDiscordWebhook("Exception: " . $e->getMessage(), "warning");
    } finally {
        $conn->close();
    }
    }


    
}
