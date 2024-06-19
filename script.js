// ###################################### button #########################################
// function showSubscribeAlert() {
//     alert("If you want to get our updates and notifications instantly, please subscribe us");
//     openPopup()
// }

// window.onload = showSubscribeAlert;
var previousWaterLeveldeniyaya = '';
var previousWaterLevelpanadugama = '';
// var floodwarninglistdeniyaya = [];
// var floodwarninglistpanadugama = [];
// ###################################### button #########################################

function addShakeAnimation() {
    const button = document.getElementById('subscribeButton');
    button.classList.add('shake-animation');
}

function removeShakeAnimation() {
    const button = document.getElementById('subscribeButton');
    button.classList.remove('shake-animation');
}

setInterval(function () {
    addShakeAnimation();

    setTimeout(removeShakeAnimation, 1000);
}, 5000);

function openPopup() {
    document.getElementById('section01f').style.display = 'block';
}

function closePopup() {
    document.getElementById('section01f').style.display = 'none';
}

// ###################################### header #########################################

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
    mapsize = 11.4;
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

function displayWaterlevel(data,) {
    const waterLevel = data[0]['actual_water_level'];
    console.log(waterLevel);

    let waterval = document.getElementById('waterval');
    waterval.innerHTML = waterLevel + ' m';

    mycallback(waterLevel);
    getPreviousWaterLeveldeniyaya();
    var preWaterLeveld = previousWaterLeveldeniyaya;
    getPreviousWaterLevelpanadugama();
    var preWaterLevelp = previousWaterLevelpanadugama;

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

            if(preWaterLeveld < 75){
                sendemail('Galdola','deniyaya',waterLevel);
                sendemail('Waralla','deniyaya',waterLevel);
                sendemail('Aluwana','deniyaya',waterLevel);
                sendemail('Waliwa','deniyaya',waterLevel);
                sendemail('Pansalgoda','deniyaya',waterLevel);
                sendemail('Dehigaspe','deniyaya',waterLevel);
            }

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

            if(preWaterLeveld < 55){
                    sendemail('Galdola','deniyaya',waterLevel);
                    sendemail('Waralla','deniyaya',waterLevel);
                    sendemail('Aluwana','deniyaya',waterLevel);
                    sendemail('Waliwa','deniyaya',waterLevel);
                }
            

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
            
            if(preWaterLeveld < 35){
                sendemail('Galdola','deniyaya',waterLevel);
                sendemail('Waralla','deniyaya',waterLevel);
            }

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
            if (preWaterLevelp < 75){
                sendemail('Matara','Panadugama',waterLevel);
                sendemail('Palatuwa','Panadugama',waterLevel);
                sendemail('Akurassa','Panadugama',waterLevel);
                sendemail('Maramba','Panadugama',waterLevel);
            }

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

            if (preWaterLevelp < 55){
                sendemail('Palatuwa','Panadugama',waterLevel);
                sendemail('Akurassa','Panadugama',waterLevel);
                sendemail('Maramba','Panadugama',waterLevel);
            }

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

            if (preWaterLevelp < 45){
                sendemail('Akurassa','Panadugama',waterLevel);
                sendemail('Maramba','Panadugama',waterLevel);
            }

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

            if (preWaterLevelp < 35){
                sendemail('Maramba','Panadugama',waterLevel);
            }

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

// ############################ subsribeform #####################################

function villagelist(){
    let stationopt = document.getElementById('station').value;
    let villagebody = document.getElementById('villages');

    if (stationopt == 'Deniyaya') {
        villagebody.innerHTML = '<option value="Galdola">Galdola</option>' +
                                '<option value="Morawaka">Morawaka</option>' +
                                '<option value="Waralla">Waralla</option>' +
                                '<option value="Aluwana">Aluwana</option>' +
                                '<option value="Weliwa">Weliwa</option>' +
                                '<option value="Pansalgoda">Pansalgoda</option>' +
                                '<option value="Dehigaspe">Dehigaspe</option>';
    } 
    else if (stationopt == 'Panadugama') {
        villagebody.innerHTML = '<option value="Maramba">Maramba</option>' +
                                '<option value="Akurassa">Akurassa</option>' +
                                '<option value="Palatuwa">Palatuwa</option>' +
                                '<option value="Matara">Matara</option>';
    }
}

//################################### deniyaya notification ##############################################

function getPreviousWaterLeveldeniyaya(){
    $.ajax({
        url: 'deniyaya_nofication_water_level_read.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            previousWaterLeveldeniyaya = data[0]['actual_water_level'];
            console.log('deniyaya pre level',previousWaterLeveldeniyaya);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching water level:', status, error);
            console.log(xhr.responseText);
        }
    });
}

//################################### panadugama notification ##############################################

function getPreviousWaterLevelpanadugama(){
    $.ajax({
        url: 'panadugama_nofication_water_level_read.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            previousWaterLevelpanadugama = data[0]['actual_water_level'];
        },
        error: function (xhr, status, error) {
            console.error('Error fetching water level:', status, error);
            console.log(xhr.responseText);
        }
    });
}

function sendemail(arr1, station, waterl) {
    $.ajax({
        url: 'sendemail.php',
        type: 'POST',
        contentType: 'application/json', 
        data: JSON.stringify({ arr: arr1, sta: station, wtl: waterl }),  
        success: function (data) {
            console.log(data);
        },
    });
}

