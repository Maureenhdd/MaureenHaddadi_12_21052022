// @ts-nocheck
import React, { useEffect, useState } from 'react';
import './App.css';
import { useQuery } from 'react-query'
import * as d3 from 'd3'



function chart_bar() {
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 835 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;
  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.right},${margin.top})`)

  d3.select('svg').attr("class", 'chart_block');
  d3.json("http://localhost:3000/user/12/activity").then(function (data: any) {
    // List of subgroups = header of the csv files = soil condition here
    const subgroups = ['kilogram', 'calories']
    const groups = data.data.sessions.map(day => day.day)

    data = data.data.sessions
    let calories = Math.max(...data.map(kilo => kilo.calories))

    // Add X axis
    const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.7])
    svg.append("g")
      .attr("transform", `translate(0, ${height + 20})`)
      .call(d3.axisBottom(x).tickSize(0))
      .attr("class", "axis")


    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, calories])
      .range([height, 50])
    svg.append("g")
      .attr("transform", `translate(${width + 10},0)`)
      .attr("class", "axis")
      .call(d3.axisRight(y).ticks(3));
    svg.append("g")
      .selectAll("line")
      .data(y.ticks(5))
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", d => 0)
      .attr("y1", d => y(d))
      .attr("x2", d => width)
      .attr("y2", d => y(d));

    // Another scale for subgroup position?
    const xSubgroup = d3.scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding([0.05])

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#282D30', '#E60000'])

    // create a tooltip
    const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "#E60000")
      .style("color", "white")
      .style("padding", "30px 10px")
      .style("position", "absolute")

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (event, d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)


    }
    const mousemove = function (event, d) {
      tooltip
        .html(`${d.kilogram}kg <br/><br/> ${d.calories}Kcal`)
        .style("left", (event.x + 15) + "px")
        .style("top", (event.y - 80) + "px")

    }


    const mouseleave = function (event, d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in data = loop group per group
      .data(data)
      .join("g")
      .attr("transform", d => `translate(${x(d.day)}, 0)`)

      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

      .selectAll("rect")
      .data(function (d) { return subgroups.map(function (key: string | number) { return { key: key, value: d[key] }; }); })
      .join("rect")
      .attr("x", d => xSubgroup(d.key))
      .attr("y", d => y(d.value))
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("width", 10)
      .attr("fill", d => color(d.key))
      // .transition()
      // .duration(1000)
      .attr("height", d => height - y(d.value))


    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
      .data(subgroups)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", function (d, i) { return 435 + i * (size + 100) + (size / 2) })
      .attr("cy", -20) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d) { return color(d) })

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(["Poids (Kg)", "Calories brûlées (kCal)"])
      .enter()
      .append("text")
      .attr("x", function (d, i) { return 450 + i * (size + 100) + (size / 2) })
      .attr("y", -20) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", "#74798C")
      .text(function (d) { return d })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");

    svg.append("text")
      .attr("x", (20))
      .attr("y", -15)
      .style("font-size", "16px")
      .style("font-weight", "500")
      .text("Activité quotidienne")




  })
}


function session_chart() {

  // set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 30 },
    width = 270 - margin.left - margin.right,
    height = 265 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#session")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  d3.json("http://localhost:3000/user/12/average-sessions",).then(

    // Now I can use this dataset:
    function (data) {
      const sessionLength = data.data.sessions.map(session => session.sessionLength)
      const days = ["L", "Mar", "Mer", "J", "V", "S", "D"]

      data.data.sessions.map(d => d.day = days[d.day - 1])
      console.log(data.data.sessions)

      // Add X axis
      const x = d3.scaleBand()
        .domain(days)
        .range([0, width]);
      svg.append("g")
        .attr("transform", `translate(0, ${height + 10})`)
        .attr("class", "axis_line")
        .call(d3.axisBottom(x).ticks(7));

      // Add Y axis
      const y = d3.scaleLinear()
        .domain([0, Math.max(...sessionLength)])
        .range([height, 40]);
      svg.append("g")
        .attr("class", "axis_line--y")
        .call(d3.axisLeft(y).ticks(7));

      // Add the line
      svg.append("path")
        .datum(data.data.sessions)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("d", d3.line()
          .curve(d3.curveCatmullRom) // Just add that to have a curve instead of segments
          .x(d => x(d.day))
          .y(d => y(d.sessionLength))
        )

      // create a tooltip
      const Tooltip = d3.select("#session")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("padding", "10px")
        .style("position", "absolute")
        .style("z-index", 1)

      const block = d3.select("#session")
        .append("div")
        .attr("class", "highlight")

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function (event, d) {
        Tooltip
          .style("opacity", 1)

        block
          .style("opacity", 1)
          .style("left", `${event.layerX + 5}px`)


      }
      const mousemove = function (event, d) {
        Tooltip
          .html(d.sessionLength)
          .style("left", `${event.layerX + 10}px`)
          .style("top", `${event.layerY}px`)
      }
      const mouseleave = function (event, d) {
        Tooltip
          .style("opacity", 0)

        block
          .style("opacity", 0)
          .style("left", "100%")
      }

      // Add the points
      svg
        .append("g")
        .selectAll("dot")
        .data(data.data.sessions)
        .join("circle")
        .attr("class", "myCircle")
        .attr("cx", d => x(d.day))
        .attr("cy", d => y(d.sessionLength))
        .attr("r", 8)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

      // title

      d3.select("#session").append("div")
        .attr("class", "line_chart--title")
        .html(`Durée moyenne des<br/>sessions`)


    })
}






function App() {
  const [isRendered, setIsRendered] = useState(false)
  useEffect(() => {
    if (isRendered === false) {
      chart_bar()
      session_chart()
    }
    setIsRendered(true)


  }, [])
  const getUser = () => {
    return new Promise(resolve => {
      setTimeout(() => (
        fetch('http://localhost:3000/user/18')
          .then(res => res.json())
          .then(
            (result) => resolve(result)
          )
      ), 500)
    })




  }
  const { isLoading, data, isError, error } = useQuery<any>('user', getUser)

  // if (isLoading) return <h1>Loading...</h1>

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  return (
    <div className="App">
      {/* <h1>{data.data.userInfos.firstName} {data.data.userInfos.lastName}</h1> */}
      <div className="bar_chart" id="my_dataviz"></div>
      <div className="line_chart" id="session"></div>
      <div id="chart"></div>
    </div>
  );
}

export default App;
