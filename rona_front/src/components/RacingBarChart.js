import { select, scaleBand, scaleLinear } from "d3";
import React, { useEffect, useRef } from "react";
import useResizeObserver from "./useResizeObserver";

function RacingBarChart({ data, maxTotal, unit }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    console.log(dimensions, 'dime')
    // sorting the data
    data.sort((a, b) => b.value - a.value);

    const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(data.map((value, index) => index))
        .range([0, dimensions.height]);

    const xScale = scaleLinear()
        .domain([0, maxTotal+50000])
        .range([0, dimensions.width]);

    //draw the bars
    svg.selectAll(".bar")
    .data(data, (entry, index) => entry.name)
    .join(enter => enter.append('rect').attr('y', (entry, index) => yScale(index)))
    .attr('fill', entry => entry.color)
    .attr("class", "bar")
    .attr('x', 0)
    .attr('height', Math.floor(yScale.bandwidth()) - 1)
    .transition()
    .attr('width', entry => xScale(entry.value))
    .attr("y", (entry, index) => yScale(index));

    //draw the labels
    let fontSz = '0.9em'
    if (dimensions.height < 700) fontSz = '0.7em'
    if (dimensions.height < 550) fontSz = '0.55em'

    svg.selectAll('.label')
    .data(data, (entry, index) => entry.name)
    .join(enter => enter.append('text').attr('y', (entry, index) => yScale(index) +  yScale.bandwidth() / 2 + 5))
    .style('font-size', fontSz)
    .text(entry => `${entry.name} (${entry.value} ${unit})`)
    .attr('class', 'label')
    .attr('x', entry => xScale(entry.value) + 10)
    .transition()
    .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);

  }, [data, dimensions]);

    return (
    <div className="svgContainer" ref={wrapperRef} style={{ marginBottom: "0.3rem" }}>
        <svg ref={svgRef} className="racing_svg">
            {/* <g className="x-axis" /> */}
            {/* <g className="y-axis" /> */}

        </svg>
    </div>
    );
}

export default RacingBarChart;