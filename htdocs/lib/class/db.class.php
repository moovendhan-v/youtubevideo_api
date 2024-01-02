<?php



class db{
    public static $conn = null;
    public static function makeConnection(){
        if(db::$conn==null){
            $servername = "mysql";
            $usernames = "your_mysql_user";
            $passwords = "your_mysql_password";
            $dbname = "your_database_name";
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