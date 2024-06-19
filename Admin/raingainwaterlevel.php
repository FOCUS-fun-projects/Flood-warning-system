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

// getting data from subscriber table 
$sql = "SELECT MONTH(datetime) AS month, AVG(raingain) AS avg_raingain, AVG(actual_water_level) AS avg_water_level FROM dht11 GROUP BY MONTH(datetime)ORDER BY month";

$result = mysqli_query($conn, $sql);

// storing data in an array
$data = array();

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// returning response in JSON format
header("Content-Type: application/json");
echo json_encode($data);

mysqli_close($conn);
?>