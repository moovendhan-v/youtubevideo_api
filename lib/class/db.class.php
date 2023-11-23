<?php

// $jsonContent = file_get_contents(__dir__.'../env.json');
// $data = json_decode($jsonContent, true);

// $mysql_servername = $data['DB_HOST'];
// $mysql_usernames = $data['DB_USER'];
// $mysql_passwords = $data['DB_PASS'];
// $mysql_db = $data['DB_DB'];


class db{
    public static $conn = null;
    public static function makeConnection(){
        if(db::$conn==null){
          
            // Create connection
            $conn = new mysqli($servername, $usernames, $passwords, $dbname);
             // Check connection
            if ($conn->connect_error) {
                print "Connection failed";
            die("Connection failed: " . $conn->connect_error);
        }else{
            db::$conn = $conn;
            return db::$conn;
        }
        }else{
            return db::$conn;
        }
    }
}
db::makeConnection();