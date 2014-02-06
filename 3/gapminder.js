var CO2_URL = "https://spreadsheets.google.com/spreadsheet/pub?key=0ArfEDsV3bBwCcGhBd2NOQVZ1eWoxZ2tOdVVFWE9HYWc&gid=0";

function main(){
  google.load('visualization', '1', {'packages':['corechart', 'table']});

  // Set a callback to run when the Google Visualization library is loaded.
  google.setOnLoadCallback(drawChart);
  
}

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
  var query = new google.visualization.Query(CO2_URL);
  query.send(handleQueryResponse);
  // Create our data table.
}
var view;
function handleQueryResponse(response) {
  var data = response.getDataTable();
  view = new google.visualization.DataView(data);
  view.setRows( data.getFilteredRows([
    {column: 100, minValue: 0.0}, {column:101, minValue: 0.0}
  ]));//[0, 100,101]);
  view.setColumns([0,100,101]);
  view.hideRows([0]);
  var chart = new google.visualization.BubbleChart(document.getElementById('chart'));
  var options = {
    hAxis: {title: data.getValue(0,100)},
    vAxis: {title: data.getValue(0,101)},
    explorer:{}
  };
  chart.draw(view, options);
  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(view,null);
}
main();
