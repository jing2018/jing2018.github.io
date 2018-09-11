

	// Width and Height of the whole visualization
	var width = 600;
	var height = 580;


	var margin = {top: 20, right: 20, bottom: 20, left: 10},
	 width = 1000 - margin.left - margin.right,
     height = 780 - margin.top - margin.bottom;

	// Create SVG
	var svg = d3.select( "body" )
	    .append( "svg" )
	    .attr( "width", width )
	    .attr( "height", height );

	// Append empty placeholder g element to the SVG
	// g will contain geometry elements
	var g = svg.append( "g" );



	// Width and Height of the whole visualization
	// Set Projection Parameters

	var Projection = d3.geoConicConformal()
	    .scale( 190000 )
	   .rotate([77, 0])
	    .center([-0.05, 38.91])
	    .parallels([38.3, 39.45])
	    .translate( [width/2,height/2] );

	   

	// Create GeoPath function that uses built-in D3 functionality to turn
	// lat/lon coordinates into screen coordinates
	var geoPath = d3.geoPath()
	    .projection( Projection );

	// Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
	g.selectAll( "path" )
	    .data( neighborhoods_json.features )
	    .enter()
	    .append( "path" )
	    // .attr( "fill", "grey" )
	    .attr( "stroke", "white")
	     .attr("opacity", "0.5")
	    .attr( "d", geoPath )
	    .attr( "class", "neighborhoods")
	    .on("mouseover", function(d){
				d3.select("h2").text(d.properties.NBH_NAMES);
				d3.select(this).attr("class","neighbor_hover");
			})
	    .on("mouseout", function(d){
			d3.select("h2").text("");
			d3.select(this).attr("class","neighborhoods");
			});



	var locations = svg.append( "g" );

	locations.selectAll( "path" )
		.data( dock_locations.features )
		.enter()
		.append( "path" )
		//.attr("size", "3.5px")
		//.attr( "fill", "red" )
		.attr( "stroke", "white" )
		.attr( "d", geoPath )
		.attr( "class", "dock")


		.on("mouseover", function(d){
				d3.select("h2").text(d.properties.ADDRESS);
				d3.select(this).attr("class","hover");
			})
		.on("mouseout", function(d){
			d3.select("h2").text("");
			d3.select(this).attr("class","dock");
			});






		
