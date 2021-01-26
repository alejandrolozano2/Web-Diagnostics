google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Acceleration', 0],
    ['Battery-soc', 0],
  ]);

  var options = {
    width: 400, height: 550,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5,
    forceIFrame: true
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

  chart.draw(data, options);

  setInterval(function() {
    data.setValue(0, 1, window.Data[window.datalength-1]);
    chart.draw(data, options);
  }, 100);
  setInterval(function() {
    data.setValue(1, 1, window.Data2[window.datalength-1]);
    chart.draw(data, options);
  }, 100);

  var data2 = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Speed', 0],
  ]);

  var options2 = {
    width: 500, height: 500,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5,
    forceIFrame: true
  };

  var chart2 = new google.visualization.Gauge(document.getElementById('chart2_div'));

  chart2.draw(data2, options2);

  setInterval(function() {
    data2.setValue(0, 1, window.Data3[window.datalength-1]);
    chart2.draw(data2, options2);
  }, 100);
}