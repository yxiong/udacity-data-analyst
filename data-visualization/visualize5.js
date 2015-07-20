d3.csv("data/train.csv", function(data) {
  // ================================================================
  // Group data according to their ticket fare.
  // ================================================================
  groupedData = [
    {"start": 0, "end": 10,
     "female-survived": 0, "female-total": 0,
     "male-survived": 0, "male-total": 0},
    {"start": 10, "end": 30,
     "female-survived": 0, "female-total": 0,
     "male-survived": 0, "male-total": 0},
    {"start": 30, "end": 100,
     "female-survived": 0, "female-total": 0,
     "male-survived": 0, "male-total": 0},
    {"start": 100, "end": 600,
     "female-survived": 0, "female-total": 0,
     "male-survived": 0, "male-total": 0}
  ];

  var fareRangeStr = function(d) {
    return "[" + d["start"] + "," + d["end"] + ")";
  };

  for (var i = 0; i < data.length; i++) {
    var fare = data[i]["Fare"];
    if (fare == 0) {   // Missing data, ignore.
      continue;
    }
    // Find the right group.
    var j = 0;
    while (fare >= groupedData[j]["end"])  j++;
    if (data[i]["Sex"] == "male") {
      groupedData[j]["male-total"]++;
      if (data[i]["Survived"] == 1) {
        groupedData[j]["male-survived"]++;
      }
    } else {
      groupedData[j]["female-total"]++;
      if (data[i]["Survived"] == 1) {
        groupedData[j]["female-survived"]++;
      }
    }
  }

  // ================================================================
  // Setup svg and axis.
  // ================================================================
  var margin = {top: 20, right: 20, bottom: 50, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var svg = d3.select("#visualization")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var groupNames = ["Female", "Male"];
  var x0 = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)
      .domain(groupedData.map(function(d) { return fareRangeStr(d); }));
  var x1 = d3.scale.ordinal()
      .domain(groupNames).rangeRoundBands([0, x0.rangeBand()]);
  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, 1]);

  // x-axis.
  var xAxis = d3.svg.axis()
      .scale(x0)
      .orient("bottom");
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("x", width/2)
      .attr("y", 35)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Ticket fare range");
  var fareRange = svg.selectAll(".fare-range")
      .data(groupedData)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) {
        return "translate(" + x0(fareRangeStr(d)) + ",0)";
      });

  // y-axis.
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format(".1f"));
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Survival rate");

  // ================================================================
  // Add tooltip.
  // ================================================================
  var tip = d3.tip().attr("class", "tooltip").html(function(d) {
    return "Survived: " + d["survived"] + "<br>Total: " + d["total"] + "<br>Survival rate: " + (Math.round(d["rate"]*100)/100);
  });
  svg.call(tip);

  // ================================================================
  // Draw the bar chart.
  // ================================================================

  var color = d3.scale.ordinal()
      .range(["orange", "darkblue"]);
  fareRange.selectAll("rect")
      .data(function(d) {
        return [{"name": "Female",
                 "survived": d["female-survived"],
                 "total": d["female-total"],
                 "rate": d["female-survived"] / d["female-total"]},
                {"name": "Male",
                 "survived": d["male-survived"],
                 "total": d["male-total"],
                 "rate": d["male-survived"] / d["male-total"]}
                ];
      })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.rate); })
      .attr("height", function(d) { return height - y(d.rate); })
      .style("fill", function(d) { return color(d.name); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);


  // ================================================================
  // Draw legends.
  // ================================================================

  var legend = svg.selectAll(".legend")
      .data(groupNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
    .text(function(d) { return d; });

});
