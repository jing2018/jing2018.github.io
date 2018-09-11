// set the dimensions and margins of the graph
var margin = {top: 20, right: 50, bottom: 50, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%H:%M %p");
var formatTime=d3.timeFormat("%H:%M %p");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Hour); })
    .y(function(d) { return y(d.Count); });

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("dayhour.csv", function(error, data) {
  if (error) throw error;
console.log(data);
  // format the data
  data.forEach(function(d) {
      d.Hour = parseTime(d.Hour);
      d.Count = +d.Count;
  });

  // scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.Hour; }));
  y.domain([0, d3.max(data, function(d) { return d.Count; })]);

  // add the valueline path.
  svg.append("path")
     .data([data])
     .attr("class", "line")
     .attr("d", valueline);

   svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top +15) + ")")
      .style("text-anchor", "middle")
      .text("Dayhour");

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+30)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Count"); 

  // add the dots with tooltips
  svg.selectAll("dot")
     .data(data)
   .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return x(d.Hour); })
     .attr("cy", function(d) { return y(d.Count); })
     .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(formatTime(d.Hour) + "<br/>" + d.Count)
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });

  // add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});

