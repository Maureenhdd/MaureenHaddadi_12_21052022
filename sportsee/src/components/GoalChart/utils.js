import * as d3 from "d3";

export const donut_chart = (score) => {
  const width = 260,
    height = 263;
  let angle = 0.5 * Math.PI;
  // append the svg object to the div called 'donut'
  const svg = d3
    .select("#donut")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  //   const radius = Math.min(width, height) / 2 - margin;

  score = score * 100;
  let data = [score];
  // Compute the position of each group on the pie:
  const pie = d3.pie().value((d) => d[1]);

  const data_ready = pie(Object.entries(data));

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("arc")
    .data(data_ready)
    .join("path")
    .attr(
      "d",
      d3
        .arc()
        .innerRadius(100) // This is the size of the donut hole
        .outerRadius(90)
        .startAngle(angle * -1)
        .endAngle(function (d) {
          return -angle + (d.value / 100) * 4 * angle;
        })
        .cornerRadius(10)
    )
    .attr("fill", "#FF0000");

  // title

  d3.select("#donut")
    .append("div")
    .attr("class", "donut_chart--title")
    .html(`Score`);

  // title

  d3.select("#donut")
    .append("div")
    .attr("class", "donut_chart--score")
    .html(`<span>${score}%</span><br/> de votre<br/>objectif`);
};
