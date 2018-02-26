vis.releasesPerDecade = vis.releasesPerDecade || {};

vis.releasesPerDecade.init = function() {
  d3.select('#releases-per-decade #releasesPerDecade svg').remove();

  var margin = { top: 200, right: 100, bottom: 200, left: 110 },
      width = $(".slides").width()*0.85 - margin.left - margin.right;
      height = $(".slides").height()*0.95 - margin.top - margin.bottom; 

  var svg = d3.select("#releases-per-decade #releasesPerDecade").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   

  var titleWrapper = svg.append("g").attr("class", "titleWrapper")
      .append("text")
      .attr("class", "title")
      .attr("x", width/2)
      .attr("y", -70)
      .style("text-anchor", "middle")
      .text("Releases per decade");

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], 0.1);

  var yScale = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickPadding(10)
      .orient("bottom");  

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickFormat(d3.format("s"))
      .tickPadding(10)
      .orient("left");    
    
  d3.csv("slides/slide_06/releasesPerDecade.csv", function(error, data) {
    if (error) throw error;
    
    data.forEach(function(d) {
      d.releases = +d.releases;
    }); 

    xScale.domain(data.map(function(d) { return d["decade"]; }));
    yScale.domain([0, d3.max(data, function(d) { return d["releases"]; })]);

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
      .append("text")
        .attr("x", 60)
        .attr("y", -40)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("releases")

    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .attr("transform", "translate(0," + height + ")")
      .append("text")
        .attr("class", "label")
        .attr("transform", "translate(" + width / 2 + "," + margin.bottom / 2 + ")")
        .style("text-anchor", "middle")
        .text("decade");       

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d["decade"]); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d["releases"]); })
        .attr("fill", "#2c7bb6")
        .attr("height", function(d) { return height - yScale(d["releases"]); })
        .on("mouseover", function(d) {  
          d3.select(this)
            .attr("fill", "#d7191c");

          var yPosition = parseFloat(d3.select(this).attr("y") - 12);
          var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;

          svg.append("text")
              .attr("id", "tooltip")
              .attr("x", xPosition)
              .attr("y", yPosition)
              .attr("text-anchor", "middle")
              .attr("fill", "black")
              .attr("font-size", "30px")
              .text(d["releases"]); 
        })
        .on("mouseout", function(d) {
          d3.select(this)
            .transition()
            .duration(250)
            .attr("fill", "#2c7bb6");
          d3.select("#tooltip").remove();
        }); 
  });
} //init