<?php
    $hostname = "localhost";
    $username = "root";
    $password = "";
    $database = "sensor_db";

    $conn = mysqli_connect($hostname, $username, $password, $database);

    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    echo "Database connect ok...";

    if(isset($_POST["temperature"]) && isset($_POST["humidity"]) && isset($_POST["waterlevel"])) {
        // Sanitize input data
        $t = mysqli_real_escape_string($conn, $_POST["temperature"]);
        $h = mysqli_real_escape_string($conn, $_POST["humidity"]);
        $waterLevel = mysqli_real_escape_string($conn, $_POST["waterlevel"]);

        $sql = "INSERT INTO dht11 (temperature, humidity, actual_water_level) VALUES (?,?,?)";

        // Use prepared statement to prevent SQL injection
        $stmt = mysqli_prepare($conn, $sql);

        // Bind the parameters
        mysqli_stmt_bind_param($stmt, "sss", $t, $h, $waterLevel);

        // Execute the statement
        if (mysqli_stmt_execute($stmt)) {
            echo "New record created successfully...";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    }

    // Close connection
    mysqli_close($conn);

?>
