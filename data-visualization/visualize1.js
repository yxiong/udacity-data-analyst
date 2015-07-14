function draw(data) {

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
  
  var svg = d3.select("body")
      .append("svg").attr("width", 1200).attr("height", 800);

  var age_scale = d3.scale.linear().domain([-2, 82]).range([0, 1200]);
  var fare_scale = d3.scale.log().domain([3, 550]).range([800, 0]);

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
    });

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
    .attr("stroke-width", 3);
}

d3.csv("data/train.csv", draw);
