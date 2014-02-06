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

function handleQueryResponse(response) {
  var data = response.getDataTable();
  var chart = new google.visualization.Table(document.getElementById('chart'));
  chart.draw(data, null);
}
main();
