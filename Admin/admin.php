<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin_dht11</title>
    <link rel="stylesheet" href="admin.css">

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script src="town.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

</head>
<body>
    <section id="section01" class="section01">
        <div class="sec1title">
            <h1 class="header">Flood Monitoring Admin Page</h1>
        </div>
        
        <div class="sec1title">
            <label>Select your station</label><select id="location">
                <option value="deniyaya">Deniyaya</option>
                <option value="panadugama">Panadugama</option>
            </select>
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
                <div class="maptitle"><h3>Risk zones</h3></div>
                <div id="map"></div>
            </div>
            <div id="waterchart" class="subcon">
                <h3>Actual water level</h3>
                <canvas id="myChart"></canvas>
            </div>
        </section>

        
        <!-- ##################################  section05 ############################################ -->
    <section class="section05">
        <section class="notification_status">
            <div class="notification_header">
                <h2>Notification Status on villages</h2>
            </div>   
            <div class="notification_table">
                <table id="sub-table">
                    <thead>
                        <tr>
                            <!-- <th>ID</th> -->
                            <th>Station</th>
                            <th>Village</th>
                            <th>User Status</th>
                            <th>Police station</th>
                        </tr>
                    </thead>
                    <tbody id = "notification_tabledata"> </tbody>
                </table>
            </div>
        </section>
        <section class="subscribers">
            <div class="subscribers_header">
                <h2>Subscribers</h2>
            </div>   
            <div class="subscribers_table">
                <table id="sub-table">
                    <thead>
                        <tr>
                            <!-- <th>ID</th> -->
                            <th>Station<br>
                                <select id="station" onchange="subscriberfilter()">
                                    <option value="all">All</option>
                                    <option value="Deniyaya">Deniyaya</option>
                                    <option value="Panadugama">Panadugama</option>
                                </select>
                            </th>
                            <th>Village<br>
                                <select id="village1" class="villageclass active" onchange="filterbyvillage()">
                                    <option value="all">All</option>
                                    <option value="Galdola">Galdola</option>
                                    <option value="Waralla">Waralla</option>
                                    <option value="Aluwana">Aluwana</option>
                                    <option value="Weliwa">Weliwa</option>
                                    <option value="Pansalgoga">Pansalgoda</option>
                                    <option value="Dehigaspe">Dehigaspe</option>
                                    <option value="Maramba">Maramba</option>
                                    <option value="Akurassa">Akurassa</option>
                                    <option value="Palatuwa">Palatuwa</option>
                                    <option value="Matara">Matara</option>
                                </select>
                                <select id="village2" class="villageclass" onchange="filterbyvillage()">
                                    <option value="all">All</option>
                                    <option value="Galdola">Galdola</option>
                                    <option value="Waralla">Waralla</option>
                                    <option value="Aluwana">Aluwana</option>
                                    <option value="Weliwa">Weliwa</option>
                                    <option value="Pansalgoga">Pansalgoda</option>
                                    <option value="Dehigaspe">Dehigaspe</option>
                                </select>
                                <select id="village3" class="villageclass" onchange="filterbyvillage()">
                                    <option value="all">All</option>
                                    <option value="Maramba">Maramba</option>
                                    <option value="Akurassa">Akurassa</option>
                                    <option value="Palatuwa">Palatuwa</option>
                                    <option value="Matara">Matara</option>
                                </select>
                            </th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody id = "tabledata"> </tbody>
                </table>
            </div>
        </section>
       
    </section>


    <section class="section06">
        <div class="averagechart_header">
            <h2>Monthly Average on Raingain and Water Level</h2>
        </div> 
        <div class="averagechart">
            <canvas id="raingainwaterlevelchart"></canvas>
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

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="admin.js"></script>
   
    <div class="footer">
        <p>&copy; 2023 Flood Warning System. All rights reserved.</p>
    </div>
</body>
</html>