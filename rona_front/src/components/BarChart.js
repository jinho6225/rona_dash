import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";


function Barchart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current);
    console.log(dimensions)

    if (!dimensions) return;

    //scale
    const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, dimensions.width]) // change
        .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, max(data)+5000000]) //todo
        .range([dimensions.height, 0]); // change

    const colorScale = scaleLinear()
        .domain([0, (max(data)+50000)/2, max(data)+50000])
        .range(["red", "green", "orange"])
        .clamp(true);

    //create x-axis
    const xAxis = axisBottom(xScale)
        .ticks(data.length)
        .tickFormat((d, i) => ['confirmed', "Deaths", "Recovered"][i]); 

    svg
        .select(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

    //create y-axis
    const yAxis = axisLeft(yScale);
    svg
        .select(".y-axis")
        .style("transform", `0`)
        .call(yAxis);

    svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .style("transform", 'scale(1, -1)')
        .attr('x', (value, index) => xScale(index))
        .attr('y', -dimensions.height)
        .attr('width', xScale.bandwidth())
        .transition()
        .attr('fill', colorScale)
        .attr('height', val => dimensions.height - yScale(val))

        svg
        .selectAll(".content")
        .data(data)
        .join(enter => enter.append('text').attr('y', d => yScale(d) - 4))
        .attr('class', 'content')
        .text(d => d.toLocaleString())
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('text-anchor', 'middle')
        .transition()
        .attr('y', d => yScale(d) - 8)
        .attr("opacity", 1);
        

  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{marginBottom: "1.5rem", marginLeft: "4rem"}}>
        <svg ref={svgRef} className="main_svg">
            <g className="x-axis" />
            <g className="y-axis" />
        </svg> 
    </div>
  );
}

export default Barchart