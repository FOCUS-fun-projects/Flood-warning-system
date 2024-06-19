var section = document.getElementById('section01');

function handleScroll() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 100) {
        section.classList.add('opaque');
    } else {
        section.classList.remove('opaque');
    }
}

window.addEventListener('scroll', handleScroll);

function subscriberfilter(){
    station = document.getElementById('station').value;
    village1 = document.getElementById('village1');
    village2 = document.getElementById('village2');
    village3 = document.getElementById('village3');

    
    if (station == 'Deniyaya') {
        village2.classList.add('active');
        village1.classList.remove('active');
        village3.classList.remove('active');
    } 
    else if (station == 'Panadugama') {
        village1.classList.remove('active');
        village3.classList.add('active');
        village2.classList.remove('active');
    }
    else{
        village3.classList.remove('active');
        village2.classList.remove('active');
        village1.classList.add('active');
    }

    
    if (station == 'Deniyaya') {
        village = document.getElementById('village2').value;
    } 
    else if (station == 'Panadugama') {
        village = document.getElementById('village3').value;
    }
    else{
        village = document.getElementById('village1').value;
    }
    subscribers(station,village)
    
}
//fucntion to display subscribers
function filterbyvillage(){
    station = document.getElementById('station').value;
    
    if (station == 'Deniyaya') {
        village = document.getElementById('village2').value;
    } 
    else if (station == 'Panadugama') {
        village = document.getElementById('village3').value;
    }
    else{
        village = document.getElementById('village1').value;
    }

    subscribers(station, village)
}
//desplay subscribers real time
function subscribers(location,locationvillage){
    //call ajax
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "subscribers.php";
    var asynchronous = true;

    ajax.open(method, url, asynchronous);
    //sending ajax request
    ajax.send();

    //receiving response form subscriber.php
    ajax.onreadystatechange = function()
    {
            if (this.readyState == 4 && this.status == 200)
            {
                //converting JSON back to array
                var data = JSON.parse(this.responseText);
                console.log(data); //for debugging

                //html value for <tbody>
                    var html = "";
                //looping through the data
                for (var a = 0 ; a < data.length; a++)
                {
                    var id = data[a].id;
                    var name = data[a].name;
                    var pnumber = data[a].phonenumber;
                    var email = data[a].email;
                    var station = data[a].station;
                    var village = data[a].village;

                    if(location == station){
                        
                        if(locationvillage == village){
                            //storing at html
                        html +="<tr>";
                        // html +="<td>"+id +"</td>";
            
                        html +="<td>"+station +"</td>";
                        html +="<td>"+village +"</td>";
                        html +="<td>"+name +"</td>";
                        html +="<td>"+pnumber +"</td>";
                        html +="<td>"+email +"</td>";
                        html += "</tr>"
                        }
                        else if(locationvillage == 'all'){
                                //storing at html
                        html +="<tr>";
                        // html +="<td>"+id +"</td>";
                        html +="<td>"+station +"</td>";
                        html +="<td>"+village +"</td>";
                        html +="<td>"+name +"</td>";
                        html +="<td>"+pnumber +"</td>";
                        html +="<td>"+email +"</td>";
                        html += "</tr>"

                        }
                    }
                    else if(location == 'all'){
                        if(locationvillage == village){
                            //storing at html
                        html +="<tr>";
                        // html +="<td>"+id +"</td>";
                        html +="<td>"+station +"</td>";
                        html +="<td>"+village +"</td>";
                        html +="<td>"+name +"</td>";
                        html +="<td>"+pnumber +"</td>";
                        html +="<td>"+email +"</td>";
                        html += "</tr>"
                        }
                        else if(locationvillage == 'all'){
                                //storing at html
                        html +="<tr>";
                       
                        html +="<td>"+station +"</td>";
                        html +="<td>"+village +"</td>";
                        html +="<td>"+name +"</td>";
                        html +="<td>"+pnumber +"</td>";
                        html +="<td>"+email +"</td>";
                        html += "</tr>"

                        }
                    }
                    
                }
                
                document.getElementById("tabledata").innerHTML = html;

            }
    }
};

function notifications(){
    
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "notification.php";
    var asynchronous = true;

    ajax.open(method, url, asynchronous);
   
    ajax.send();

    
    ajax.onreadystatechange = function()
    {
            if (this.readyState == 4 && this.status == 200)
            {
             
                var data = JSON.parse(this.responseText);
                console.log(data); 

               
                    var html = "";
                
                for (var a = 0 ; a < data.length; a++)
                {
                    var id = data[a].id;
                    var station = data[a].station;
                    var village = data[a].village;
                    var status = data[a].status;

                    var stationw = document.getElementById('location').value;
                    if(stationw == 'deniyaya'){
                        var l = 'Deniyaya';
                    }
                    else if(stationw == 'panadugama'){
                        var l = 'Panadugama';
                    }
 
                    if (l === station){

                        if (status == 0) {
                            statusColor = "green";
                            status = "No Danger"
                        } else if (status == 1) {
                            statusColor = "red";
                            status = "Notified"
                        }
                        
                        html +="<tr>";
                        
                            html +="<td>"+station +"</td>";
                            html +="<td>"+village +"</td>";
                            html +="<td><div class='status' style='background-color: " + statusColor + ";'>"+ status+"</div></td>";
                            html +="<td><div class='status' style='background-color: " + statusColor + ";'>"+ status+"</div></td>";
                        html += "</tr>"
                    }
                }
     
                document.getElementById("notification_tabledata").innerHTML = html;

            }
    }
};

function notificationstatusupdate(station, village,status){
    console.log("i am working");

    $.ajax({
        url: 'notificationStatusUpdate.php',
        type: 'POST',
        data:{stationupdate:station,villageupdate:village,statusupdate:status},
        success: function (data) {
            console.log(data);
        },
    });
}

var section = document.getElementById('section01');

function handleScroll() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 100) {
        section.classList.add('opaque');
    } else {
        section.classList.remove('opaque');
    }
}

window.addEventListener('scroll', handleScroll);
// ###################################### rain #########################################

function rain() {
    let amount = 500;
    let body = document.querySelector('.rain');
    let i = 0;
    while (i < amount) {
        let drop = document.createElement('i');

        let size = Math.random() * 3;
        let posX = Math.floor(Math.random() * window.innerWidth);

        let delay = Math.random() * -20;
        let duration = Math.random() * 5;

        drop.style.width = 0.2 + size + 'px';
        drop.style.left = posX + 'px';

        drop.style.animationDelay = delay + 's';
        drop.style.animationDuration = 1 + duration + 's';

        body.appendChild(drop);
        i++
    }
}

rain();

// ###################################### map #########################################

const apiKey = 'pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHKyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA';

const mymap = L.map('map').setView([6.246626, 80.517881], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    ZoomOffset: -1,
    accessToken: apiKey
}).addTo(mymap);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

var previousPolygons = [];

document.getElementById('location').addEventListener('change', function () {

const selectedLocation = this.value;
let newmid = '';
let mapsize = '';

if(selectedLocation === 'panadugama'){
    newmid = [6.045135, 80.517718];
    mapsize = 11;
}
else if(selectedLocation === 'deniyaya'){
    newmid = [6.246626, 80.517881];
    mapsize = 12;
}
else{
    newmid = [6.246626, 80.517881];
    mapsize = 12;
}

mymap.setView(newmid, mapsize);
});

// ###################################### chart #########################################

var data = {
    labels: [0],
    datasets: [
        {
            label: 'Water level',
            data: [0],
            borderColor: 'rgb(189,195,199)',
            lineTension: 0.3,
            fill: true,
            borderWidth: 1,
            backgroundColor: (context) => {
                const bgColor = [
                    'rgba(255,26,104,0.3)',
                    'rgba(255,206,86,0.3)',
                    'rgba(54,162,235,0.3)'
                ];

                if (!context.chart.chartArea) {
                    return;
                }

                console.log(context.chart.chartArea);

                const { ctx, data, chartArea: { top, bottom } } = context.chart;
                const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
                const colorTranches = 1 / (bgColor.length - 1);

                console.log(colorTranches);

                for (let i = 0; i < bgColor.length; i++) {
                    gradientBg.addColorStop(0 + i * colorTranches, bgColor[i])

                }
                return gradientBg;
            }
        },
    ]
};

var config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            x: {
                ticks: {
                    color: "white"
                }
            },
            y: {
                ticks: {
                    color: "white"
                }
            }
        }

    }
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

window.setInterval(waterlevel, 5000);

function mycallback(waterlevel) {
    var now = new Date();
    now = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    var value = waterlevel;

    if (data.datasets[0].data.length >= 10) {
        data.labels.shift();
        data.datasets[0].data.shift();
    }

    data.labels.push(now);
    data.datasets[0].data.push(value);
    myChart.update();
}

function waterlevel() {
    let option = document.getElementById('location').value;
    let file = '';

    if (option === 'deniyaya') {
        file = 'deniyaya_get_water_level.php';
    } else if (option === 'panadugama') {
        file = 'panadugama_get_water_level.php';
    }

    $.ajax({
        url: file,
        type: 'GET',
        dataType: 'json',
        success: function (data,) {
            displayWaterlevel(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching water level:', status, error);
            console.log(xhr.responseText);
        }
    });
}

function displayWaterlevel(data) {
    
    notificationstatusupdate('Deniyaya','Galdola','0');
    notificationstatusupdate('Deniyaya','Weliwa','0');
    notificationstatusupdate('Deniyaya','Waralla','0');
    notificationstatusupdate('Deniyaya','Pansalgoda','0');
    notificationstatusupdate('Deniyaya','Dehigaspe','0');
    notificationstatusupdate('Deniyaya','Aluwana','0');
    notificationstatusupdate('Panadugama','Matara','0');
    notificationstatusupdate('Panadugama','Palatuwa','0');
    notificationstatusupdate('Panadugama','Akurassa','0');
    notificationstatusupdate('Panadugama','Maramba','0');


    const waterLevel = data[0]['actual_water_level'];
    console.log(waterLevel);

    let waterval = document.getElementById('waterval');
    waterval.innerHTML = waterLevel + ' m';

    mycallback(waterLevel);

    let option1 = document.getElementById('location').value;

    if (option1 === 'deniyaya') {

        removePreviousPolygons()

        if (waterLevel > 75) {
            removePreviousPolygons()
            var pitabaddara1 = L.polygon(pitabaddara, {
                color: '#FFBF00',
                fileColor: '#FFBF00',
                fillOpacity: 0.2
            }).addTo(mymap);

            var morawaka2 = L.polygon(morawaka, {
                color: '#FF7F50',
                fileColor: '#FF7F50',
                fillOpacity: 0.2
            }).addTo(mymap);

            var kotapola3 = L.polygon(kotapola, {
                color: '#DE3163',
                fileColor: '#DE3163',
                fillOpacity: 0.2
            }).addTo(mymap);

            var galdolam3= L.marker(galdolamark).addTo(mymap);
            galdolam3.bindPopup('Galdola Bridg');
            var warallam3 = L.marker(warallamark).addTo(mymap);
            warallam3.bindPopup('Waralla');
            var aluwanam2 = L.marker(aluwanamark).addTo(mymap);
            aluwanam2.bindPopup('Aluwana');
            var waliwam2 = L.marker(waliwamark).addTo(mymap);
            waliwam2.bindPopup('Waliwa');
            var pansalgodam1 = L.marker(pansalgodamark).addTo(mymap);
            pansalgodam1.bindPopup('Pansalgoda');
            var dehigaspem1 = L.marker(dehigaspemark).addTo(mymap);
            dehigaspem1.bindPopup('Dehigaspe');

            previousPolygons.push(pitabaddara1, morawaka2, kotapola3, galdolam3, warallam3, aluwanam2, waliwam2, pansalgodam1, dehigaspem1);


            notificationstatusupdate('Deniyaya','Galdola','1');
            notificationstatusupdate('Deniyaya','Weliwa','1');
            notificationstatusupdate('Deniyaya','Waralla','1');
            notificationstatusupdate('Deniyaya','Pansalgoda','1');
            notificationstatusupdate('Deniyaya','Dehigaspe','1');
            notificationstatusupdate('Deniyaya','Aluwana','1');

        }
        else if (waterLevel > 55) {

            removePreviousPolygons()

            var morawaka1 = L.polygon(morawaka, {
                color: '#FFBF00',
                fileColor: '#FFBF00',
                fillOpacity: 0.2
            }).addTo(mymap);

            var kotapola2 = L.polygon(kotapola, {
                color: '#FF7F50',
                fileColor: '#FF7F50',
                fillOpacity: 0.2
            }).addTo(mymap);

            var aluwanam1 = L.marker(aluwanamark).addTo(mymap);
            aluwanam1.bindPopup('Aluwana');
            var waliwam1 = L.marker(waliwamark).addTo(mymap);
            waliwam1.bindPopup('Waliwa');
            var galdolam2= L.marker(galdolamark).addTo(mymap);
            galdolam2.bindPopup('Galdola');
            var warallam2 = L.marker(warallamark).addTo(mymap);
            warallam2.bindPopup('Waralla');

            previousPolygons.push(morawaka1, kotapola2, aluwanam1, waliwam1, galdolam2, warallam2);

            notificationstatusupdate('Deniyaya','Galdola','1');
            notificationstatusupdate('Deniyaya','Weliwa','1');
            notificationstatusupdate('Deniyaya','Waralla','1');
            notificationstatusupdate('Deniyaya','Aluwana','1');
        }
         else if (waterLevel > 35) {

            removePreviousPolygons()

            var kotapola1 = L.polygon(kotapola, {
                color: '#FFBF00',
                fileColor: '#FFBF00',
                fillOpacity: 0.2
            }).addTo(mymap);

            var galdolam3= L.marker(galdolamark).addTo(mymap);
            galdolam3.bindPopup('Galdola');
            var warallam3 = L.marker(warallamark).addTo(mymap);
            warallam3.bindPopup('Waralla');

            previousPolygons.push(kotapola1, galdolam3, warallam3);

            notificationstatusupdate('Deniyaya','Galdola','1');
            notificationstatusupdate('Deniyaya','Waralla','1');
        }
        else {
            removePreviousPolygons()
        }


    } else if (option1 === 'panadugama') {

        removePreviousPolygons()

        if (waterLevel > 75) {

            removePreviousPolygons()

            var matara1 = L.polygon(matara, {
                color: 'yellow',
                fileColor: 'yellow',
                fillOpacity: 0.2
            }).addTo(mymap);

            var palatuwa2 = L.polygon(palatuwa, {
                color: '#FFBF00',
                fileColor: '#FFBF00',
                fillOpacity: 0.2
            }).addTo(mymap);

            var akurassa3 = L.polygon(akurassa, {
                color: '#FF7F50',
                fileColor: '#FF7F50',
                fillOpacity: 0.2
            }).addTo(mymap);

            var maramba4 = L.polygon(maramba, {
                color: '#DE3163',
                fileColor: '#DE3163',
                fillOpacity: 0.2
            }).addTo(mymap);

            var mataram1= L.marker(mataramark).addTo(mymap);
            mataram1.bindPopup('Matara');
            var palatuwam1= L.marker(palatuwamark).addTo(mymap);
            palatuwam1.bindPopup('Palatuwa');
            var akurassam1= L.marker(akurassamark).addTo(mymap);
            akurassam1.bindPopup('Akurassa');
            var marambam1= L.marker(marambamark).addTo(mymap);
            marambam1.bindPopup('Maramba');


            previousPolygons.push(matara1, palatuwa2, akurassa3, maramba4, mataram1, palatuwam1, akurassam1, marambam1);

            notificationstatusupdate('Panadugama','Matara','1');
            notificationstatusupdate('Panadugama','Palatuwa','1');
            notificationstatusupdate('Panadugama','Akurassa','1');
            notificationstatusupdate('Panadugama','Maramba','1');

        }
       else if (waterLevel > 55) {

            removePreviousPolygons()

            var palatuwa1 = L.polygon(palatuwa, {
                color: 'blueyellow',
                fileColor: 'yellow',
                fillOpacity: 0.2
            }).addTo(mymap);

            var akurassa2 = L.polygon(akurassa, {
                color: '#FFBF00',
                fileColor: '#FFBF00',
                fillOpacity: 0.2
            }).addTo(mymap);

            var maramba3 = L.polygon(maramba, {
                color: '#FF7F50',
                fileColor: '#FF7F50',
                fillOpacity: 0.2
            }).addTo(mymap);

            var palatuwam2= L.marker(palatuwamark).addTo(mymap);
            palatuwam2.bindPopup('Palatuwa');
            var akurassam2= L.marker(akurassamark).addTo(mymap);
            akurassam2.bindPopup('Akurassa');
            var marambam2= L.marker(marambamark).addTo(mymap);
            marambam2.bindPopup('Maramba');

            previousPolygons.push(palatuwa1, akurassa2, maramba3, palatuwam2, akurassam2, marambam2);

            notificationstatusupdate('Panadugama','Palatuwa','1');
            notificationstatusupdate('Panadugama','Akurassa','1');
            notificationstatusupdate('Panadugama','Maramba','1');
        }
         else if (waterLevel > 45) {

            removePreviousPolygons()

            var akurassa1 = L.polygon(akurassa, {
                color: 'yellow',
                fileColor: 'yellow',
                fillOpacity: 0.2
            }).addTo(mymap);

            var maramba2 = L.polygon(maramba, {
                color: '#FFBF00',
                fileColor: '#FFBF00',
                fillOpacity: 0.2
            }).addTo(mymap);

            var akurassam3= L.marker(akurassamark).addTo(mymap);
            akurassam3.bindPopup('Akurassa');
            var marambam3= L.marker(marambamark).addTo(mymap);
            marambam3.bindPopup('Maramba');

            previousPolygons.push(akurassa1, maramba2, akurassam3, marambam3);

            notificationstatusupdate('Panadugama','Akurassa','1');
            notificationstatusupdate('Panadugama','Maramba','1');
        }
        else if (waterLevel > 35) {

            removePreviousPolygons()

            var maramba1 = L.polygon(maramba, {
                color: 'yellow',
                fileColor: 'yellow',
                fillOpacity: 0.2
            }).addTo(mymap);

            var marambam4 = L.marker(marambamark).addTo(mymap);
            marambam4.bindPopup('Maramba');

            previousPolygons.push(maramba1, marambam4);
            
            notificationstatusupdate('Panadugama','Maramba','1');
        }
        else {
            removePreviousPolygons()
        }
    }
}

function removePreviousPolygons() {
    for (var i = 0; i < previousPolygons.length; i++) {
        mymap.removeLayer(previousPolygons[i]);
    }
    previousPolygons = [];
}

// ###################################### history #########################################

$(document).ready(function () {
    loadData();

    $('#location').change(function () {
        loadData();
    });
    
    setInterval(loadData, 5000);

    loadraingain();
    setInterval(loadraingain, 5000);

    loadtemperature();
    setInterval(loadtemperature, 5000);

    loadhumidity();
    setInterval(loadhumidity, 5000);

    notifications();
    setInterval(notifications, 5000);

    subscriberfilter()
    setInterval(subscriberfilter, 5000);
});

function loadData() {
    let option = document.getElementById('location').value;
    let file = '';

    if (option === 'deniyaya') {
        file = 'deniyaya_get_data.php';

        document.getElementById('templocation').innerHTML = 'Deniyaya';
        document.getElementById('rainstation').innerHTML = 'Deniyaya';
        document.getElementById('lakestation').innerHTML = 'Deniyaya';

    } else if (option === 'panadugama') {
        file = 'panadugama_get_data.php';

        document.getElementById('templocation').innerHTML = 'Panadugama';
        document.getElementById('rainstation').innerHTML = 'Panadugama';
        document.getElementById('lakestation').innerHTML = 'Panadugama';
    }

    $.ajax({
        url: file,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayData(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching data:', status, error);
            console.log(xhr.responseText);
        }
    });
}

function displayData(data) {
    const tableBody = $('#data-body');

    tableBody.empty();

    data.forEach(function (row) {
        const newRow = $('<tr></tr>');

        Object.entries(row).forEach(([key, value]) => {
            const cell = $('<td></td>');

            if (key === 'temperature') {
                cell.addClass('temperature-column');
                cell.addClass('temperature-animation');
            } else if (key === 'waterLevel') {
                cell.addClass('water-level-column');
                cell.addClass('water-level-animation');
            }

            cell.text(value);
            newRow.append(cell);
        });

        tableBody.append(newRow);
    });
}

// ###################################### raingain #########################################

function loadraingain() {
    let option = document.getElementById('location').value;
    let file = '';

    if (option === 'deniyaya') {
        file = 'deniyaya_get_raingain.php';

    } else if (option === 'panadugama') {
        file = 'panadugama_get_raingain.php';

    }

    $.ajax({
        url: file,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayRaingain(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching raingain:', status, error);
            console.log(xhr.responseText);
        }
    });
}

function displayRaingain(data) {
    const raingain = data[0]['raingain'];
    console.log(raingain);

    let raingainbody = document.getElementById('raingain');
    raingainbody.innerHTML = raingain + ' mm';

}
// ###################################### humidity #########################################

function loadhumidity() {
    let option = document.getElementById('location').value;
    let file = '';

    if (option === 'deniyaya') {
        file = 'deniyaya_get_humidity.php';
    } else if (option === 'panadugama') {
        file = 'panadugama_get_humidity.php';
    }

    $.ajax({
        url: file,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayHumidity(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching humidity:', status, error);
            console.log(xhr.responseText);
        }
    });
}

function displayHumidity(data) {
    const humidity = data[0]['humidity'];
    console.log(humidity);

    let humiditybody = document.getElementById('humidityval');
    humiditybody.innerHTML = humidity + ' %';

    himagecahger(humidity);

}

function himagecahger(humidity) {
    let imgElement = document.getElementById('humidityImage');
    let desc = document.getElementById('humiditydesription');

    if (humidity < 50) {
        imgElement.src = 'imeges/dashboard/wether/weather.png';
        desc.innerHTML = 'Sunny';
    } else if (humidity < 55) {
        imgElement.src = 'imeges/dashboard/wether/clouds.png';
        desc.innerHTML = 'Cloudy';
    } else if (humidity < 60) {
        imgElement.src = 'imeges/dashboard/wether/partly-cloudy.png';
        desc.innerHTML = 'Partly cloudy';
    } else if (humidity > 65 && humidity <= 68) {
        imgElement.src = 'imeges/dashboard/wether/icons8-rain-cloud.png';
        desc.innerHTML = 'Occasional shower';
    } else if (humidity > 68 && humidity <= 70) {
        imgElement.src = 'imeges/dashboard/wether/rain-cloud.png';
        desc.innerHTML = 'Isolated showers';
    } else if (humidity > 70 && humidity <= 75) {
        imgElement.src = 'imeges/dashboard/wether/rain.png';
        desc.innerHTML = 'Drizzle';
    } else if (humidity > 75 && humidity <= 78) {
        imgElement.src = 'imeges/dashboard/wether/heavy-rain.png';
        desc.innerHTML = 'Heavy rain';
    } else if (humidity > 78 && humidity <= 80) {
        imgElement.src = 'imeges/dashboard/wether/storm-with-heavy-rain.png';
        desc.innerHTML = 'Storm with heavy rain';
    } else if (humidity > 80) {
        imgElement.src = 'imeges/dashboard/wether/storm.png';
        desc.innerHTML = 'Storm';
    }
}

// ###################################### temp #########################################

function loadtemperature() {
    let option = document.getElementById('location').value;
    let file = '';

    if (option === 'deniyaya') {
        file = 'deniyaya_get_temperature.php';
    } else if (option === 'panadugama') {
        file = 'panadugama_get_temperature.php';
    }

    $.ajax({
        url: file,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            displayTemperature(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching temperature:', status, error);
            console.log(xhr.responseText);
        }
    });
}

function displayTemperature(data) {
    const temperature = data[0]['temperature'];
    console.log(temperature);

    let temperaturebody = document.getElementById('temperatureval');
    temperaturebody.innerHTML = temperature + ' &deg;c';

    tempamime(temperature);
}

function tempamime(temperature) {

    let number = document.getElementById("number");
    let circleElement = document.getElementById("animatedCircle");
    let counter = 0;
    setInterval(() => {
        if (counter == temperature) {
            clearInterval();
        } else {

            counter += 1;
            number.innerHTML = counter + " &deg;c";
            circleElement.style.strokeDashoffset = (300 - (300 * temperature / 100));
        }
    }, 20)
}

// ########################################## section 06###########################################

var datachart2 = {
    labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    datasets: [
        {
            label: 'Water level',
            data: [],
            borderColor: 'rgb(0, 0, 139)',
            lineTension: 0.3,
            fill: true,
            borderWidth: 1,
            backgroundColor: 'rgba(11, 11, 243, 0.7)'
        },
        {
            label: 'raingain',
            data: [],
            borderColor: 'rgb(0,255,255)',
            lineTension: 0.3,
            fill: true,
            borderWidth: 1,
            backgroundColor: 'rgba(0,255,255,0.7)',
        },
    ]
};

var config2 = {
    type: 'bar',
    data: datachart2,
    options: {
        scales: {
            x: {
                ticks: {
                    color: 'white',
                    font: {
                      size:'13px'
                    }
                }
            },
            y: {
                ticks: {
                    color: 'white', 
                    font: {
                      weight: 'bold',
                      size:'13px'
                    }
                }
            }
        }

    }
};

var myChart2 = new Chart(
    document.getElementById('raingainwaterlevelchart'),
    config2
);

window.setInterval(avgchart, 1000);

function mycallback2(raingainarr, waterlevelarr) {
    for (var i = 0; i < raingainarr.length; i++) {
        datachart2.datasets[0].data.push(waterlevelarr[i]);
        datachart2.datasets[1].data.push(raingainarr[i]);
    }

    myChart2.update();
}

function avgchart() {
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "raingainwaterlevel.php";
    var asynchronous = true;

    ajax.open(method, url, asynchronous);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            var data = JSON.parse(this.responseText);
            console.log(data); 

            var raingainarr = [];
            var waterlevelarr = [];
            
            for (var a = 0; a < data.length; a++) {
                var month = data[a].month;
                var watelevel = data[a].avg_water_level;
                var raingain = data[a].avg_raingain;

                raingainarr.push(raingain);
                waterlevelarr.push(watelevel);
            }
            console.log(raingainarr,waterlevelarr);
            mycallback2(raingainarr, waterlevelarr);
        }
    }
};
