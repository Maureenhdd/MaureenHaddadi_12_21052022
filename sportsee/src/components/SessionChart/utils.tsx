// @ts-nocheck
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'

export const sessionChart = (sessions) => {

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


    // Now I can use this dataset:

    const sessionLength = sessions.map(session => session.sessionLength)
    const days = ["L", "Mar", "Mer", "J", "V", "S", "D"]

    sessions.map(d => d.day = days[d.day - 1])

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
        .domain([Math.min(...sessionLength), Math.max(...sessionLength)])
        .range([height, 50]);
    svg.append("g")
        .attr("class", "axis_line--y")
        .call(d3.axisLeft(y).ticks(7));

    // Add the line
    svg.append("path")
        .datum(sessions)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("transform", `translate(20, 0)`)
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
            .html(`${d.sessionLength} min`)
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
        .data(sessions)
        .join("circle")
        .attr("class", "myCircle")
        .attr("cx", d => x(d.day)+20)
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

}