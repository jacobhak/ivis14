var data = {"Question1" : ["answerP1", "answerP2"],
	    "Question2" : ["answerP1", "answerP2"]};
var width = 1000;
var height = 1000;
var margin = 200;
var edu = ["No formal education","inadequate education","compl compulsory education","Incomplete secondary school: technical/vocational type","Complete secondary school: technical/vocational type ","Incomplete secondary: university-preparatory type","Complete secondary: university-preparatory type","Some university without degree", "University with degree"];

var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
var x=d3.scale.linear().domain([0,1000]).range([margin,width-margin]);
var y=d3.scale.ordinal().domain(edu).rangeBands([height-margin,margin]);
//var r=d3.scale.linear().domain([0,10]).range([0,10]);
var c=d3.scale.category10().domain(["Need to  be very careful", "Most people can be trusted"]);
//d3.scale.ordinal().domain(["Can´t be too careful", "Most people can be trusted"]).range([margin,width-margin]); range([height-margin,margin]);
var xAxis = d3.svg.axis().scale(x).orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickValues(edu)
    .tickFormat(function(d){
	return d.substring(0,15) +"...";
    })
    .orient("left")


svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "axis")
   .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

svg.selectAll(".h").data(d3.range(-8,10,2)).enter()
  .append("line").classed("h",1)
  .attr("x1",margin).attr("x2",height-margin)
  .attr("y1",y).attr("y2",y)
  
svg.selectAll(".v").data(d3.range(1,5)).enter()
  .append("line").classed("v",1)
  .attr("y1",margin).attr("y2",width-margin)
  .attr("x1",x).attr("x2",x)


var dsv = d3.dsv(";", "text/plain");
dsv("xaa",function(csv) {
  // we first sort the data
//  csv.sort(function(a,b) {return b.population-a.population;});
//    csv.forEach(function(d){
//	console.log(d["Most people can be trusted  "]);
//    })
    // then we create the marks, which we put in an initial position

//    var max = d3.max(csv, function(o){
//	return parseInt(o["Original respondent number"]);
//    });
    //y = d3.scale.linear().domain([1, max]).range([0,200]);
//  svg.selectAll("circle").data(csv).enter()
//	.append("circle")
//	.attr("cx",function(d) {return x(0);})
//	.attr("cy",function(d) {return y(0);})
//	.attr("r",function(d) {return 1;});

    svg.selectAll("circle").data(csv).enter()
	.append("circle")
	.attr("cx",function(d) {return x(d["Interview number"]);})
	.attr("cy",function(d) {return y(d["Highest educational level attained  "]);})
	.attr("r",function(d) {return 3;})
	.attr("fill", function(d) {return c(d["Dealing with people "]);})
	.attr("opacity", 0.5)
});
