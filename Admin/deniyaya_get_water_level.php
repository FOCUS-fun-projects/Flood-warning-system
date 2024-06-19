<?php
    $hostname = "localhost";
    $username = "root";
    $password = "";
    $database = "sensor_db";
    $port = 3310;

    $conn = mysqli_connect($hostname, $username, $password, $database, $port);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT actual_water_level FROM dht11 ORDER BY id DESC LIMIT 1";
    $result = mysqli_query($conn, $sql);

    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    header("Content-Type: application/json");
    echo json_encode($data);

    mysqli_close($conn);
?>
