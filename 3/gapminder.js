var CO2_URL = "https://spreadsheets.google.com/spreadsheet/pub?key=0ArfEDsV3bBwCcGhBd2NOQVZ1eWoxZ2tOdVVFWE9HYWc&gid=0";
var CO2 = "co2";
var COAL_URL = 'https://spreadsheets.google.com/pub?key=0Auk0ddvGIrGqcHlqNnRTY1pxbUVka1hObHlPbTlmUUE';
var COAL = "coal";
var DATA_URLS = [CO2_URL, COAL_URL];
var DATA_NAMES = [CO2, COAL];

var dataTables = {};
var requestsSent = 0;
var responsesReceived = 0;

function main(){
  google.load('visualization', '1', {'packages':['corechart', 'table']});
  google.setOnLoadCallback(sendDataRequests);
}

var options;
var chart;
var view;
function drawChart() {
  view = new google.visualization.DataView(dataTables[CO2]);
  view.setRows( dataTables[CO2].getFilteredRows([
    {column: 100, minValue: 0.0}, {column:101, minValue: 0.0}
  ]));//[0, 100,101]);
  view.setColumns([0,100,101]);
  view.hideRows([0]);
  chart = new google.visualization.BubbleChart(document.getElementById('chart'));
  options = {
    hAxis: {title: dataTables[CO2].getValue(0,100)},
    vAxis: {title: dataTables[CO2].getValue(0,101)},
    explorer:{},
    animation: {
      duration: 500
    }
  };
  chart.draw(view, options);
  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(dataTables[COAL],null);

}

function setHAxisZoom(zoomValue) {
  options.hAxis["viewWindowMode"] = 'explicit';
  options.hAxis["viewWindow"] = {max: zoomValue, min: -zoomValue};
  options.vAxis["viewWindowMode"] = 'explicit';
  options.vAxis["viewWindow"] = {
    max: getCurrentVAxisMax(),
    min: getCurrentVAxisMin()
  };
  chart.draw(view, options);
}

function getCurrentVAxisMin() {
  return chart.getChartLayoutInterface().getVAxisValue(0);
}

function getCurrentVAxisMax() {
  var cli = chart.getChartLayoutInterface();
  return cli.getVAxisValue(
    cli.getChartAreaBoundingBox().height);
}

function sendDataRequests() {
  var query;
  for(var i = 0; i < DATA_URLS.length; i++) {
    query = new google.visualization.Query(DATA_URLS[i]);
    requestsSent++;
    query.send(addDataCheckIfFinishedFactory(DATA_NAMES[i]));

  }
}

function addDataCheckIfFinishedFactory(tableName) {
  return function(response) {
    dataTables[tableName] = response.getDataTable();
    responsesReceived++;
    if (responsesReceived === requestsSent) {
      drawChart();
    }
  };
}
function handleQueryResponse(response) {
  var data = response.getDataTable();
}
main();
