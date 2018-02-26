vis.releasesPerDayOfTheWeek = vis.releasesPerDayOfTheWeek || {};

vis.releasesPerDayOfTheWeek.init = function() {
  d3.select('#releases-per-day-of-the-week #releasesPerDayOfTheWeek svg').remove();

  var margin = { top: 200, right: 150, bottom: 200, left: 270 },
      width = $(".slides").width()*0.7 - margin.left - margin.right;
      height = $(".slides").height()*0.9 - margin.top - margin.bottom; 

  var svg = d3.select("#releases-per-day-of-the-week #releasesPerDayOfTheWeek").append("svg")
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
      .text("Releases per day of the week");

  var xScale = d3.scale.linear()
      .range([0, width]);

  var yScale = d3.scale.ordinal()
      .rangeRoundBands([height, 0], 0.1);   
      
  var xAxis = d3.svg.axis()
      .scale(xScale)
      .tickFormat(d3.format("s"))
      .tickPadding(10)
      .orient("bottom");      

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .tickSize(0)
      .tickPadding(10)
      .orient("left");    
    
  d3.csv("slides/slide_05/releasesPerDayOfTheWeek.csv", function(error, data) {
    if (error) throw error;
    
    data.forEach(function(d) {
      d.releases = +d.releases;
    }); 

    data = data.sort(function(a, b) { return a["releases"] - b["releases"]; });

    xScale.domain([0, d3.max(data, function(d) { return d["releases"]; })]);
    yScale.domain(data.map(function(d) { return d["day"]; }));

    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .attr("transform", "translate(0," + height + ")")
      .append("text")
        .attr("class", "label")
        .attr("transform", "translate(" + width / 2 + "," + margin.bottom / 2 + ")")
        .style("text-anchor", "middle")
        .text("releases");       

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function(d) { return xScale(d["releases"]); })
        .attr("y", function(d) { return yScale(d["day"]); })
        .attr("fill", "#2c7bb6")
        .attr("height", yScale.rangeBand())
        .on("mouseover", function(d) {  
          d3.select(this)
            .attr("fill", "#d7191c");

          var xPosition = parseFloat(d3.select(this).attr("width"));
          var yPosition = parseFloat(d3.select(this).attr("y")) + yScale.rangeBand() / 2 + 12;

          svg.append("text")
              .attr("id", "tooltip")
              .attr("x", xPosition + 10)
              .attr("y", yPosition)
              .attr("text-anchor", "right")
              .attr("fill", "black")
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