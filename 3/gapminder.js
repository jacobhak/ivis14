var CO2_URL = "https://spreadsheets.google.com/spreadsheet/pub?key=0ArfEDsV3bBwCcGhBd2NOQVZ1eWoxZ2tOdVVFWE9HYWc&gid=0";
var CO2 = "co2";
var COAL_URL = 'https://spreadsheets.google.com/pub?key=0Auk0ddvGIrGqcHlqNnRTY1pxbUVka1hObHlPbTlmUUE';
var COAL = "coal";

var dataTables = {};
var requestsSent = 0;
var responsesReceived = 0;

function main(){
  google.load('visualization', '1', {'packages':['corechart', 'table']});
  google.setOnLoadCallback(sendDataRequests);
}

function drawChart() {
  var view = new google.visualization.DataView(dataTables[CO2]);
  view.setRows( dataTables[CO2].getFilteredRows([
    {column: 100, minValue: 0.0}, {column:101, minValue: 0.0}
  ]));//[0, 100,101]);
  view.setColumns([0,100,101]);
  view.hideRows([0]);
  var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
  var options = {
    hAxis: {title: dataTables[CO2].getValue(0,100)},
    vAxis: {title: dataTables[CO2].getValue(0,101)},
    explorer:{}
  };
  chart.draw(view, options);
  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(dataTables[COAL],null);

}

function sendDataRequests() {
  var query = new google.visualization.Query(CO2_URL);
  query.send(addDataCheckIfFinishedFactory(CO2));
  requestsSent++;
  query = new google.visualization.Query(COAL_URL);
  query.send(addDataCheckIfFinishedFactory(COAL));
  requestsSent++;
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
