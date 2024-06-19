<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sensor Data Visualization</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script src="town.js"></script>
    <link rel="stylesheet" href="dashboade.css">
    <link rel="stylesheet" href="form.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
</head>

<body>

    <!-- ##################################  section01 ############################################ -->

    <section id="section01" class="section01">
        <div class="sec1title">
            <h1 class="header">Flood Monitoring Dashboard</h1>
        </div>

        <div class="sec1title">
            <label>Select your station</label><select id="location">
                <option value="deniyaya">Deniyaya</option>
                <option value="panadugama">Panadugama</option>
            </select>
        </div>

        <div class="sec1title">
            <button id="subscribeButton" class="subscribe" onclick="openPopup()"><a href="#">Subscribe us</a></button>
        </div>

    </section>

    <!-- ##################################  section02 ############################################ -->

    <section class="section02">
        <div class="detailrow">
            <div id="humidity" class="detailcol">

                <!-- ##################################  humidity ############################################ -->

                <h3>Humidity</h3>
                <div class="humcol">
                    <div class="humimg">
                        <img id="humidityImage" class="humidityimage" src="imeges/dashboard/wether/heavy-rain.png">
                    </div>
                    <div class="humimg">
                        <h1 id="humidityval">85%</h1>
                        <p id="humiditydesription">Light rain</p>
                    </div>

                </div>
            </div>

            <!-- ##################################  temperature ############################################ -->

            <div class="detailcol">
                <h3>Temperature</h3>
                <div class="tmpcol">
                    <div class="tempval">
                        <h1 id="temperatureval">65 &deg;c</h1>
                        <p id="templocation">Anuradhapura</p>
                    </div>
                    <div class="skill">
                        <div class="outer">
                            <div class="inner">
                                <div id="number">
                                    65 &deg;c
                                </div>
                            </div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                            <defs>
                                <linearGradient id="GradientColor">
                                    <stop offset="0%" stop-color="#e91e63" />
                                    <stop offset="100%" stop-color="#673ab7" />
                                </linearGradient>
                            </defs>
                            <circle id="animatedCircle" cx="57.5" cy="57.4" r="45.5" stroke-linecap="round" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- ##################################  raingain ############################################ -->

            <div class="detailcol">
                <div class="rain">
                    <h3>Raingain</h3>
                    <div class="raindetail">
                        <div class="raindetailcol">
                            <h1 id="raingain">110 mm</h1>
                            <p id="rainstation">Anuradhapura</p>
                        </div>
                        <div class="raindetailcol">
                        </div>
                    </div>
                </div>
            </div>

            <!-- ##################################  water level ############################################ -->

            <div class="detailcol">
                <h3>Water level</h3>
                <div class="waterdetail">
                    <div class="waterdetailcol">
                        <h1 id="waterval">10 m</h1>
                        <p id="lakestation">Rajanganaya</p>

                    </div>
                    <duv class="wave wave1"></duv>
                    <duv class="wave wave2"></duv>
                    <duv class="wave wave3"></duv>
                    <duv class="wave wave4"></duv>
                </div>
            </div>
    </section>

    <!-- ##################################  section03 ############################################ -->

    <section class="section03">
        <div class="subcon">
            <div class="maptitle">
                <h3>Risk zones</h3>
            </div>
            <div id="map"></div>
        </div>
        <div id="waterchart" class="subcon">
            <h3>Actual water level</h3>
            <canvas id="myChart"></canvas>
        </div>
    </section>

    <!-- ##################################  history ############################################ -->

    <section class="section04">
        <h3>History</h3>
        <table class="historytable">
            <tr class="theader">
                <th>Date and Time</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Water level</th>
                <th>Raingain</th>
            </tr>
            <tbody id="data-body"></tbody>
        </table>
    </section>

    <!-- ##################################  form ############################################ -->

    <div id="section01f">
        <div class="form">
            <a href="#"><button class="btn-close" onclick="closePopup()">&times;</button></a>
            <h2>Subscribe Us to Get Notifications</h2>
            <form action="#" method="post" enctype="multipart/form-data">
                <label for="name">Name</label>
                <div class="inputbox">
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="village">
                    <div class="station">
                        <label>Station</label>
                        <div class="inputbox">
                            <select id="station" name="station" required onchange="villagelist()">
                                <option value="Other"></option>
                                <option value="Deniyaya">Deniyaya</option>
                                <option value="Panadugama">Panadugama</option>
                            </select>
                        </div>
                    </div>
                    <div class="station"><label>Village</label>
                        <div class="inputbox">
                            <select id="villages" name="village" required>
                                <option value="Other"></option>
                                <option value="Other">Choose station first</option>
                            </select>
                        </div>
                    </div>
                </div>

                <label for="pnumber">Phone number</label>
                <div class="inputbox">
                    <input type="tel" id="pnumber" name="pnumber" required>
                </div>

                <label for="email">Email</label>
                <div class="inputbox">
                    <input type="email" id="email" name="email">
                </div>

                <div class="inputboxsub">
                    <input type="submit" id="subscribe" class="submit" name="submit" value="Subscribe">
                </div>
            </form>
        </div>
    </div>

    <div class="footer">
        <p>&copy; 2023 Flood Warning System. All rights reserved.</p>
    </div>
    
</body>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="script.js"></script>

</html>

<?php
require('config.php');

if (isset($_POST['submit'])) {

    $Name = $_POST["name"];
    $Station = $_POST["station"];
    $Village = $_POST["village"];
    $Pnum = $_POST["pnumber"];
    $Email = $_POST["email"];

    $sql = "INSERT INTO subscriber (name,station,village,phonenumber,email) VALUES('$Name','$Station','$Village','$Pnum','$Email')";

    if ($conn->query($sql)) {
        echo "<script>
                    swal({
                        title: 'Success!',
                        text: 'Subscribed Successfully',
                        icon: 'success',
                        buttons: true,
                    })
                    .then((willCancel)=>{
                        if(willCancel){
                            window.location.href='index.php';
                        }
                    });
                </script>";
    } else {
        echo "<script>
                    swal({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again',
                        icon: 'error',
                        buttons: true,
                    })
                    .then((willCancel)=>{
                        if(willCancel){
                            window.location.href='index.php';
                        }
                    });
                </script>";
    }
}
mysqli_close($conn);
?>