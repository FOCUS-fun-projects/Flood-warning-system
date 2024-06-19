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
$Station = $_POST["stationupdate"];
$Village = $_POST["villageupdate"];
$Status = $_POST["statusupdate"];

//getting data from subscriber table 
$sql = "UPDATE notification_status SET status = '$Status' WHERE station = '$Station' AND village = '$Village' ";
$result = mysqli_query($conn, $sql);

if ($conn -> query($sql)) 
{
    echo "<script>
            console.log('updated status');
        </script>";
} 
else 
{
    echo "<script>
    console.log('Did not update status');
        </script>";
}
mysqli_close($conn);
?>
