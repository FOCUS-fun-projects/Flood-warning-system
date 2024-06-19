<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $db="sensor_db";
    $port = 3310;

    $conn = new mysqli($servername, $username, $password, $db, $port);

    if ($conn->connect_error) 
    {
        die("Connection failed: " . $conn->connect_error);
    }
?>