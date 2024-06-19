<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>chart</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    </head>

    <body>
        <canvas id="myChart"></canvas>
    </body>

    <script>
        var data = {
            labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'des'],
            datasets: [
                {
                    label: 'Water level',
                    data: [],
                    borderColor: 'rgb(189,195,199)',
                    lineTension: 0.3,
                    fill: true,
                    borderWidth: 1,
                    backgroundColor: 'rgba(255,123,255,0.3)'
                },
                {
                    label: 'Raingain',
                    data: [],
                    borderColor: 'rgb(0,123,255)',
                    lineTension: 0.3,
                    fill: true,
                    borderWidth: 1,
                    backgroundColor: 'rgba(0,123,255,0.3)',
                },
            ]
        };

        var config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: "black"
                        }
                    },
                    y: {
                        ticks: {
                            color: "black"
                        }
                    }
                }

            }
        };

        var myChart = new Chart(
            document.getElementById('myChart'),
            config
        );

        $(document).ready(function () {
            avgchart();
    
            setInterval(avgchart, 5000);
        });

        function mycallback(raingainarr, waterlevelarr) {
            for (var i = 0; i < raingainarr.length; i++) {
                data.datasets[0].data.push(waterlevelarr[i]);
                data.datasets[1].data.push(raingainarr[i]);
            }

            myChart.update();
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

                    mycallback(raingainarr, waterlevelarr);
                }
            }
        };
    </script>
</html>