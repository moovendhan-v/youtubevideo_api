<?php



class db{
    public static $conn = null;
    public static function makeConnection(){
        $apiDatas = getJsonApis();
        if(db::$conn==null){
            $servername = $apiDatas['mysql']['host'];
            $usernames = $apiDatas['mysql']['username'];
            $passwords = $apiDatas['mysql']['password'];
            $dbname = $apiDatas['mysql']['database'];
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