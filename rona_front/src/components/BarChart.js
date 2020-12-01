import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, scaleLinear, axisRight, scaleBand } from "d3";
import ResizeObserver from 'resize-observer-polyfill'

const useResizeObserver = (ref) => {
    const [dimensions, setDimenstions] = useState(null);
    useEffect(() => {
        const observeTarget = ref.current
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                setDimenstions(entry.contentRect)
            })
        })
        resizeObserver.observe(observeTarget);
        return () => {
            resizeObserver.unobserve(observeTarget)
        }
    }, [ref])
    return dimensions;
}

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
    //   .domain(data.map((val, index) => index))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale = scaleLinear()
        .domain([0, 150]) //todo
        .range([dimensions.height, 0]); // change

    const colorScale = scaleLinear()
        .domain([75, 100, 150])
        .range(["green", "orange", "red"])
        .clamp(true);

    //create x-axis
    const xAxis = axisBottom(xScale)
        .ticks(data.length);

    svg
        .select(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);

    //create y-axis
    const yAxis = axisRight(yScale);
    svg
        .select(".y-axis")
        .style("transform", `translateX(${dimensions.width}px)`)
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
        .on("mouseenter", (event, val) => {
            svg
                .selectAll(".tooltip")
                .data([val])
                .join(enter => enter.append('text').attr('y', yScale(val) - 4))
                .attr('class', 'tooltip')
                .text(val)
                .attr('x', xScale(data.indexOf(val)) + xScale.bandwidth() / 2)
                .attr('text-anchor', 'middle')
                .transition()
                .attr('y', yScale(val) - 8)
                .attr("opacity", 1);
        })
        .on("mouseleave", () => svg.select(".tooltip").remove())
        .transition()
        .attr('fill', colorScale)
        .attr('height', val => dimensions.height - yScale(val))

  }, [data, dimensions]);

  return (
    <div className="svgContainer" ref={wrapperRef} style={{ marginBottom: "0.3rem" }}>
        <svg ref={svgRef}>
            <g className="x-axis" />
            <g className="y-axis" />
        </svg> 
    </div>
  );
}

export default Barchart