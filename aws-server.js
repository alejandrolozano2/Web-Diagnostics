var http = require('http');
var fs = require('fs');
var awsIot =  require('aws-iot-device-sdk')
                //Acceleration, Traction Force, Speed
let chartData = [0 , 0 ,0];

http.createServer(function (req, response) {

    
    if(req.method == "GET" && req.url == "/SensorData") {

            response.writeHead(200, { 'Content-Type': 'text/html' });
            
            response.write(chartData.toString());
            response.end();
       
    } else
    {
        fs.readFile('index.html', 'utf-8', function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            
            var result = data.replace('"chartData"', JSON.stringify(chartData));
            response.write(result);
            response.end();
        }); 
    }
}).listen(1337);

var device = awsIot.device({
    keyPath: './33b4f579aa.private.key',
    certPath: './33b4f579aa.cert.pem',
    caPath: './root.ca.pem',
    clientId: 'CMS-Demo-Web-Sub',
    host: 'a2f10453r8iwkf-ats.iot.us-east-1.amazonaws.com'
});

device.on('connect', function() {
    console.log('connect');
    device.subscribe('vt/cvra/1000/cardata');
});


device.on('message', function(topic, payload) {
    var lpayload = JSON.parse(payload.toString());
       
       chartData[2] = lpayload['speed-mph'];
       chartData[0] = lpayload.accelerate;
       chartData[1] = lpayload['battery-soc'] * 100.0;

       console.log(chartData);
});

console.log('Server running at http://127.0.0.1:1337/');




