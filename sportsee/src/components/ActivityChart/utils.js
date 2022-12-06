import * as d3 from "d3";

export const chart_bar = (activity) => {
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 835 - margin.left - margin.right,
    height = 290 - margin.top - margin.bottom;
  // append the svg object to the body of the page
  const svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.right},${margin.top})`);

  d3.select("svg").attr("class", "chart_block");
  // List of subgroups = header of the csv files = soil condition here
  const subgroups = ["kilogram", "calories"];
  let groups = activity.map((day) => day.day);

  let data = activity;
  let calories = Math.max(...data.map((kilo) => kilo.calories));

  // Add X axis
  const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.7);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height + 20})`)
    .call(d3.axisBottom(x).tickSize(0))
    .attr("class", "axis");

  // Add Y axis
  const y = d3.scaleLinear().domain([0, calories]).range([height, 50]);
  svg
    .append("g")
    .attr("transform", `translate(${width + 10},0)`)
    .attr("class", "axis")
    .call(d3.axisRight(y).ticks(3));
  svg
    .append("g")
    .selectAll("line")
    .data(y.ticks(5))
    .enter()
    .append("line")
    .attr("class", "grid-line")
    .attr("x1", () => 0)
    .attr("y1", (d) => y(d))
    .attr("x2", () => width)
    .attr("y2", (d) => y(d));

  // Another scale for subgroup position?
  const xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding(0.05);

  // color palette = one color per subgroup
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#282D30", "#E60000"]);

  // create a tooltip
  const tooltip = d3
    .select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "#E60000")
    .style("color", "white")
    .style("padding", "30px 10px")
    .style("position", "absolute")
    .style("transition", "0.1s");

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function (d) {
    tooltip.style("opacity", 1);
    d3.select(this).style("opacity", 1);
  };

  const mousemove = function (event, d) {
    tooltip
      .html(`${d.kilogram}kg <br/><br/> ${d.calories}Kcal`)
      .style("left", `${event.layerX + 20}px`)
      .style("top", `${event.layerY - 130}px`);
  };

  const mouseleave = function (d) {
    tooltip.style("opacity", 0);
    d3.select(this).style("opacity", 0.8);
  };

  // Show the bars
  svg
    .append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .join("g")
    .attr("fill", "blue")
    .attr("id", "fillBar")
    .attr("transform", (d) => `translate(${x(d.day)}, 0)`)

    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)

    .selectAll("rect")
    .data(function (d) {
      return subgroups.map(function (key) {
        return { key: key, value: d[key] };
      });
    })
    .join("rect")
    .attr("x", (d) => xSubgroup(d.key))
    .attr("y", (d) => y(d.value))
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("width", 10)
    .attr("fill", (d) => color(d.key))
    .attr("height", (d) => height - y(d.value));

  // Add one dot in the legend for each name.
  var size = 20;
  svg
    .selectAll("myrect")
    .data(subgroups)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", function (d, i) {
      return 435 + i * (size + 100) + size / 2;
    })
    .attr("cy", -20) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) {
      return color(d);
    });

  // Add one dot in the legend for each name.
  svg
    .selectAll("mylabels")
    .data(["Poids (Kg)", "Calories brûlées (kCal)"])
    .enter()
    .append("text")
    .attr("x", function (d, i) {
      return 450 + i * (size + 100) + size / 2;
    })
    .attr("y", -20) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", "#74798C")
    .text(function (d) {
      return d;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");

  svg
    .append("text")
    .attr("x", 20)
    .attr("y", -15)
    .style("font-size", "16px")
    .style("font-weight", "500")
    .text("Activité quotidienne");

  const groupBar = document.querySelectorAll("g#fillBar");

  groupBar.forEach((bar) => {
    let rectBar = bar.querySelector("rect");
    let x = rectBar?.getAttribute("x");
    let BBox = bar.getBBox();
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("fill", "rgba(196, 196, 196, 0.5)");
    rect.setAttribute("width", BBox.width * 3);
    rect.setAttribute("height", height);
    rect.setAttribute("x", x - 25);
    rect.style.opacity = 0;
    rect.style.transition = "0.2s";
    rect.style.zIndex = 0;

    bar.addEventListener("mouseover", () => {
      rect.style.opacity = 1;
    });

    bar.addEventListener("mouseleave", () => {
      rect.style.opacity = 0;
    });

    bar.prepend(rect);
  });
};
