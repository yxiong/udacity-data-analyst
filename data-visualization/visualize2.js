function draw(data) {

  var width = 960;
  var height = 600;
  var margin = 60;
  var legend_width = 160;
  var legend_height = 80;

  // Split data into male and female.
  male = [];
  female = [];
  for (var i = 0; i < data.length; i++) {
    if (isNaN(data[i]["Age"]) || data[i]["Fare"] == 0) {
      continue;
    }
    if (data[i]["Sex"] == "male") {
      male.push(data[i]);
    } else {
      female.push(data[i])
    }
  }
  
  var svg = d3.select("#visualization");
  svg.attr("width", width).attr("height", height);

  var age_scale = d3.scale.linear().domain([-2, 82]).
      range([margin, width-legend_width]);
  var fare_scale = d3.scale.log().domain([3, 550]).
      range([height-margin, 0]);

  // Draw one rectangle for each male passenger.
  d3.select("svg")
    .selectAll("rect")
    .data(male)
    .enter()
    .append("rect");
  d3.selectAll("rect")
    .attr("x", function(d) {
      return age_scale(d["Age"]) - 5;
    })
    .attr("y", function(d) {
      return fare_scale(d["Fare"]) - 5;
    })
    .attr('width', 10)
    .attr('height', 10)
    .attr("fill", function(d) {
      if (d["Survived"] == 1) {
        return "blue";
      } else {
        return "red";
      }
    })
    .attr("opacity", 0.7);

  // Draw one circle for each female passenger.
  d3.select("svg")
    .selectAll("circle")
    .data(female)
    .enter()
    .append("circle");
  d3.selectAll("circle")
    .attr("cx", function(d) {
      return age_scale(d["Age"]);
    })
    .attr("cy", function(d) {
      return fare_scale(d["Fare"]);
    })
    .attr('r', 5)
    .attr("fill", "transparent")
    .attr("stroke", function(d) {
      if (d["Survived"] == 1) {
        return "blue";
      } else {
        return "red";
      }
    })
    .attr("stroke-width", 3)
    .attr("stroke-opacity", 0.7);

  var age_axis = d3.svg.axis().scale(age_scale);
  var fare_axis = d3.svg.axis().scale(fare_scale).orient("left").ticks(20, ",.1s");
  svg.append('g')
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height - margin) + ")")
    .call(age_axis);
  svg.append('g')
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin + ",0)")
    .call(fare_axis);
  svg.append("text")
    .attr("class", "x label")
    .attr("x", width/2)
    .attr("y", height-15)
    .text("Age (years)");
  svg.append("text")
    .attr("class", "y label")
    .attr("transform", "rotate(-90), translate(-300, 15)")
    .text("Ticket fare (dollars)");

  legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width-legend_width) + "," + ((height-legend_width)/2) + ")");

  legend.append("rect")
    .attr("width", legend_width)
    .attr("height", legend_height)
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  legend.append("circle")
    .attr('r', 5)
    .attr('cx', 10)
    .attr('cy', 10)
    .attr("fill", "transparent")
    .attr("stroke", "blue")
    .attr("stroke-width", 3);
  legend.append("text")
    .attr('x', 20)
    .attr('y', 15)
    .text("Female, survived")

  legend.append("circle")
    .attr('r', 5)
    .attr('cx', 10)
    .attr('cy', 30)
    .attr("fill", "transparent")
    .attr("stroke", "red")
    .attr("stroke-width", 3);
  legend.append("text")
    .attr('x', 20)
    .attr('y', 35)
    .text("Female, not survived")
  
  legend.append("rect")
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 5)
    .attr('y', 45)
    .attr("fill", "blue");
  legend.append("text")
    .attr('x', 20)
    .attr('y', 55)
    .text("Male, survived")

  legend.append("rect")
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 5)
    .attr('y', 65)
    .attr("fill", "red");
  legend.append("text")
    .attr('x', 20)
    .attr('y', 75)
    .text("Male, not survived")
}

d3.csv("data/train.csv", draw);
