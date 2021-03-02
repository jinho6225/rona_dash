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
    console.log(data, "data");

    // sorting the data
    data.sort((a, b) => b.value - a.value);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height]);

    let maxNum = 5;
    if (maxTotal < 100000) {
      maxNum = maxTotal + 30000;
    } else if (maxTotal < 200000) {
      maxNum = maxTotal + 30000;
    } else if (maxTotal < 400000) {
      maxNum = maxTotal + 30000;
    } else if (maxTotal < 600000) {
      maxNum = maxTotal + 30000;
    } else if (maxTotal < 800000) {
      maxNum = maxTotal + 30000;
    } else if (maxTotal < 1000000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 1200000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 1400000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 1600000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 1800000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 2000000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 2200000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 2400000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 2600000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 2800000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 3000000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 3200000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 3400000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 3600000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 3800000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 4000000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 4200000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 4400000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 4600000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 4800000) {
      maxNum = maxTotal + 200000;
    } else if (maxTotal < 5000000) {
      maxNum = maxTotal + 200000;
    }

    const xScale = scaleLinear()
      .domain([0, maxNum])
      .range([0, dimensions.width]);

    //draw the bars
    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", (entry) => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", Math.floor(yScale.bandwidth()) - 1)
      .transition()
      .attr("width", (entry) => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index));

    //draw the labels
    let fontSz = "0.9em";
    if (dimensions.height < 700) fontSz = "0.7em";
    if (dimensions.height < 550) fontSz = "0.55em";
    if (dimensions.height < 400) fontSz = "0.4em";

    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .style("font-size", fontSz)
      .text((entry) => `${entry.name} (${entry.value} ${unit})`)
      .attr("class", "label")
      .attr("x", (entry) => xScale(entry.value) + 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);

  return (
    <div
      className="svgContainer"
      ref={wrapperRef}
      style={{ marginBottom: "0.3rem" }}
    >
      <svg ref={svgRef} className="racing_svg">
        {/* <g className="x-axis" /> */}
        {/* <g className="y-axis" /> */}
      </svg>
    </div>
  );
}

export default RacingBarChart;
