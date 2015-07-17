var showGroup = [false, false, false, false];
var data = [];

function draw() {

  var width = 1000;
  var height = 600;
  var margin = 60;
  var legend_width = 180;
  var legend_height = 80;

  var opacities = [0.9, 0.9, 0.9, 0.9];
  for (var i = 0; i < 4; i++) {
    if (!showGroup[i]) {
      opacities[i] = 0.1;
    }
  }

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
  svg.selectAll("*").remove();
  svg.attr("width", width).attr("height", height);

  var age_scale = d3.scale.linear().domain([-2, 82]).
      range([margin, width-legend_width]);
  var fare_scale = d3.scale.log().domain([3, 650]).
      range([height-margin, 0]);

  var scatters = svg.append("g");
  var tip = d3.tip().attr("class", "tooltip").html(function(d) {
    var sex, survival;
    if (d["Sex"] == "male") {
      sex = "Male";
    } else {
      sex = "Female";
    }
    if (d["Survived"] == 1) {
      survival = "survived";
    } else {
      survival = "not survived";
    }
    return d["Name"] + "<br>" + sex + ", " + d["Age"] + ", $" + d["Fare"] + ", " + survival;
  });
  svg.call(tip);

  // Draw one rectangle for each male passenger.
  scatters.selectAll("rect")
    .data(male)
    .enter()
    .append("rect");
  scatters.selectAll("rect")
    .attr("x", function(d) {
      return age_scale(d["Age"]) - 5;
    })
    .attr("y", function(d) {
      return fare_scale(d["Fare"]) - 5;
    })
    .attr('width', 6)
    .attr('height', 6)
    .attr("fill", function(d) {
      if (d["Survived"] == 1) {
        return "green";
      } else {
        return "red";
      }
    })
    .attr("opacity", function(d) {
      if (d["Survived"] == 1) {
        return opacities[2];
      } else {
        return opacities[3];
      }
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  // Draw one circle for each female passenger.
  scatters.selectAll("circle")
    .data(female)
    .enter()
    .append("circle");
  scatters.selectAll("circle")
    .attr("cx", function(d) {
      return age_scale(d["Age"]);
    })
    .attr("cy", function(d) {
      return fare_scale(d["Fare"]);
    })
    .attr('r', 3)
    .attr("fill", "transparent")
    .attr("stroke", function(d) {
      if (d["Survived"] == 1) {
        return "green";
      } else {
        return "red";
      }
    })
    .attr("stroke-width", 2)
    .attr("stroke-opacity", function(d) {
      if (d["Survived"] == 1) {
        return opacities[0];
      } else {
        return opacities[1];
      }
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  var age_axis = d3.svg.axis().scale(age_scale)
      .innerTickSize(-width)
      .outerTickSize(0)
      .tickPadding(10);
  var fare_axis = d3.svg.axis().scale(fare_scale).orient("left").ticks(20, ",.1s")
      .innerTickSize(-(width-legend_width-margin))
      .outerTickSize(0)
      .tickPadding(10);
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

  // ================================================================
  // DRAW LEGENDS
  // ================================================================

  // Legend group.
  legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(" + (width-legend_width) + "," + ((height-legend_width)/2) + ")");

  // Outer box for legend.
  legend.append("rect")
    .attr("width", legend_width)
    .attr("height", legend_height)
    .attr("fill", "transparent")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  var checkboxHtml = function(groupId) {
    html = '<input type="checkbox"';
    if (showGroup[groupId]) {
      html += ' checked="checked"';
    }
    html += ' onchange="checkboxCallback(' + groupId + ')"';
    html += '>';
    return html;
  }

  // Legend for female-survived.
  legend.append("foreignObject")
    .attr('x', -7)
    .attr('y', 0)
    .attr("width", 30)
    .attr("height", 30)
    .append("xhtml:body")
    .html(checkboxHtml(0));
  legend.append("circle")
    .attr('r', 5)
    .attr('cx', 25)
    .attr('cy', 10)
    .attr("fill", "transparent")
    .attr("stroke", "green")
    .attr("stroke-width", 3)
    .attr("opacity", opacities[0]);
  legend.append("text")
    .attr('x', 35)
    .attr('y', 15)
    .text("Female, survived")

  // Legend for female-not-survived.
  legend.append("foreignObject")
    .attr('x', -7)
    .attr('y', 20)
    .attr("width", 30)
    .attr("height", 30)
    .append("xhtml:body")
    .html(checkboxHtml(1));
  legend.append("circle")
    .attr('r', 5)
    .attr('cx', 25)
    .attr('cy', 30)
    .attr("fill", "transparent")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("opacity", opacities[1]);
  legend.append("text")
    .attr('x', 35)
    .attr('y', 35)
    .text("Female, not survived");

  // Legend for male-survived.
  legend.append("foreignObject")
    .attr('x', -7)
    .attr('y', 40)
    .attr("width", 30)
    .attr("height", 30)
    .append("xhtml:body")
    .html(checkboxHtml(2));
  legend.append("rect")
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 20)
    .attr('y', 45)
    .attr("fill", "green")
    .attr("opacity", opacities[2]);
  legend.append("text")
    .attr('x', 35)
    .attr('y', 55)
    .text("Male, survived");

  // Legend for male-not-survived.
  legend.append("foreignObject")
    .attr('x', -7)
    .attr('y', 60)
    .attr("width", 30)
    .attr("height", 30)
    .append("xhtml:body")
    .html(checkboxHtml(3));
  legend.append("rect")
    .attr('width', 10)
    .attr('height', 10)
    .attr('x', 20)
    .attr('y', 65)
    .attr("fill", "red")
    .attr("opacity", opacities[3]);
  legend.append("text")
    .attr('x', 35)
    .attr('y', 75)
    .text("Male, not survived");
}

function init(d) {
  showGroup = [true, true, true, true];
  data = d;
  draw();
}

function checkboxCallback(groupId) {
  showGroup[groupId] = !showGroup[groupId];
  draw();
}

d3.csv("data/train.csv", init);
