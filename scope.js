window.datalength = 100;
        var ctx = document.getElementById("myChart").getContext("2d");
        var myNewChart = new Chart(ctx, {
            type: "line",
            data : {
            labels: new Array(window.datalength),
            datasets: [
                {
                    label: "Acceleration",
                    pointColor: "rgba(220,0,0,0.5)",
                    borderColor : "rgba(250,0,0,1.0)",
                    fill: false,
                    data: "chartData"
                },
                {
                    label: "Traction Force",
                    pointColor: "rgba(220,0,0,0.5)",
                    borderColor : "rgba(0,0,250,1.0)",
                    fill: false,
                    data: "chartData"
                },
                {
                    label: "Velocity",
                    pointColor: "rgba(220,0,0,0.5)",
                    borderColor : "rgba(0,250,0,1.0)",
                    fill: false,
                    data: "chartData"
                }
            ]
        }
        });
        
        window.Data = new Array(window.datalength);
        window.Data2 = new Array(window.datalength);
        window.Data3 = new Array(window.datalength);

        setInterval(function(){
            let ajaxRequests = new XMLHttpRequest();
            ajaxRequests.onreadystatechange = function() {
                if (ajaxRequests.readyState == 4  && ajaxRequests.status == 200)
                {
                    console.log(ajaxRequests.responseText);
                    strData = ajaxRequests.response.toString().split(",");
                    window.Data.shift();
                    window.Data2.shift();
                    window.Data3.shift();
                    window.Data.push(parseFloat(strData[0]));
                    window.Data2.push(parseFloat(strData[1]));
                    window.Data3.push(parseFloat(strData[2]));
                    myNewChart.data.datasets[0].data =  window.Data;
                    myNewChart.data.datasets[1].data =  window.Data2;
                    myNewChart.data.datasets[2].data =  window.Data3;

                    myNewChart.data.labels.shift();
                    var d = new Date();
                    myNewChart.data.labels.push(d.getMinutes() + ":" + d.getSeconds()+ "." + d.getMilliseconds());
                    
                    myNewChart.update();
                    
                }
            }

            ajaxRequests.open("GET", "SensorData" ,true);
            ajaxRequests.send();

        },100);
       