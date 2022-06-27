// [   
//     {
//         "device": "TV",
//         "created_date": "2022-06-18",
//         "power_consume": 50
//     },
//     {
//         "device": "Washer",
//         "created_date": "2022-06-19",
//         "power_consume": 60
//     },
//     {
//         "device": "Refrigerator",
//         "created_date": "2022-06-20",
//         "power_consume": 80
//     },
//     {
//         "device": "Selling Fan",
//         "created_date": "2022-06-21",
//         "power_consume": 100
//     }
// ]

async function addDevice() {
    let device_name = document.getElementById("input-name").value;
    let device_pow_consume = Number(document.getElementById("input-pow-consume").value);
    console.log(device_pow_consume)
    if (isNaN(device_pow_consume)) {
        alert("Must input numbers");
    }
    
    try {
    fetch('./dashboard.json')
        .then(response => response.json())
        .then(function(data){
            var devices = data;
            devices.push({
                device: device_name,
                created_date: getCurrDate(),
                power_consume: device_pow_consume
            });
            console.log(devices);
            fetch('./dashboard.json',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(devices),
                }).then(function(response){ 
                    return response.json()})
                    .then(function(data)
                    {console.log(data);}).catch(err=> console.error('Error:', err))
        });
    } catch (e) {
        console.log('try-catch')
        console.log(e)
    }
        
}

function getCurrDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();


    return yyyy + '-' + mm + '-' + dd;
}

function showDevices() {
    fetch('./dashboard.json')
        .then(response => response.json())
        .then(data => {
            var devices = data;
            var tbody_tag = document.createElement("tbody");
            var total = 0, tr;

            for (var i = 0; i < devices.length; i++) {

                tr = tbody_tag.insertRow(-1);


                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = devices[i].device;
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = "00:18:44:11:3A:87";
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = "127.0.0.2";
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = devices[i].created_date;
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = devices[i].power_consume;
                total += devices[i].power_consume;
            }
            console.log(tbody_tag)
            document.getElementById("table").appendChild(tbody_tag);
            document.getElementById("total_consume").innerText = total;
        });
}

function showDevicesDashboard() {
    fetch('./dashboard.json')
        .then(response => response.json())
        .then(data => {
            var devices = data;
            var devices_ec = [];
            for (var i = 0; i < devices.length; i++) {
                devices_ec.push({
                    y: devices[i].power_consume,
                    legendText: devices[i].device + " " + devices[i].power_consume,
                    label: devices[i].device
                })
            }
            var chart = new CanvasJS.Chart("dashboard-display", {
                animationEnabled: true,
                title: {
                    horizontalAlign: "left"
                },
                data: [{
                    type: "doughnut",
                    startAngle: 0,
                    innerRadius: 50,
                    indexLabelFontSize: 10,
                    toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                    dataPoints: devices_ec,
                    showInLegend: true,
                }]
            });
            chart.render();
    });
  
}