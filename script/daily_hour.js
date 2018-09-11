// var width = 600;
// var height = 580;
var margin = {top: 80, right: 180, bottom: 80, left: 180},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3.select( "body" )
      .append( "svg" )
      .attr( "width", width )
      .attr( "height", height )
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/reg_cau.csv", function(error, data){

  // filter year
  //var data = data.filter(function(d){return d.Year == '2012';});
  // Get every column value
  var elements = Object.keys(data[0])
    .filter(function(d){
      return (d != "Weekday");
    });
  var selection = elements[0];

  var y = d3.scaleLinear()
      .domain([0, 100000])
      .range([height, 0]);

  var x = d3.scaleBand()
      .domain(data.map(function(d){ return d.Weekday;}))
      .range([0, width]);


  var xAxis=d3.axisBottom(x)
      .scale(x);
  var yAxis=d3.axisLeft(y)
      .scale(y);


  /*var xAxis = d3.svg.axis()
    .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
      .orient("left");*/

  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top -5) + ")")
      .style("text-anchor", "middle")
      .text("Weekday");

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+100)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Count"); 

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "12px")
        .style("text-anchor", "middle")
        //.attr("dx", "-.8em")
        //.attr("dy", "-.55em")
        .attr("transform", "rotate(0)" );


  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.selectAll("rectangle")
    .data(data)
    .enter()
    .append("rect")
    .attr("class","rectangle")
    .attr("width", width/data.length)
    .attr("height", function(d){
      return height - y(+d[selection]);
    })
    .attr("x", function(d, i){
      return (width / data.length) * i ;
    })
    .attr("y", function(d){
      return y(+d[selection]);
    })
    .append("title")
    .text(function(d){
      return d.Weekday + " : " + d[selection];
    });

  var selector = d3.select("#drop")
      .append("select")
      .attr("id","dropdown")
      .on("change", function(d){
          selection = document.getElementById("dropdown");

          y.domain([0, d3.max(data, function(d){
        return +d[selection.value];})]);

          yAxis.scale(y);

          d3.selectAll(".rectangle")
              .transition()
              .attr("height", function(d){
          return height - y(+d[selection.value]);
        })
        .attr("x", function(d, i){
          return (width / data.length) * i ;
        })
        .attr("y", function(d){
          return y(+d[selection.value]);
        })
              .ease("linear")
              .select("title")
              .text(function(d){
                return d.Weekday + " : " + d[selection.value];
              });
      
            d3.selectAll("g.y.axis")
              .transition()
              .call(yAxis);

         });

    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })


});
