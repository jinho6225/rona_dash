import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";


function DetailBarChart({ data, period, opt=false }) {
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
        .padding(0.1);

    let maxNum = opt ? max(data)+2000 : max(data)+50000
    const yScale = scaleLinear()
        .domain([0, maxNum]) //todo
        .range([dimensions.height, 0]); // change

    const colorScale = scaleLinear()
        .domain([0, (maxNum)/2, maxNum])
        .range(["green", "orange", "red"])
        .clamp(true);

    //create x-axis
    
    const xAxis = axisBottom(xScale)
    .tickValues([]);

    svg
    .select(".x-axis")
    .style("transform", `translateY(${dimensions.height}px) `)
    .call(xAxis)
        

    let title = opt ? 'Deaths' : 'Confirmed'
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
        .on("mouseenter", function(event, value) {
            const index = svg.selectAll(".bar").nodes().indexOf(this);
            select(this)
            .attr("opacity", 0.2)
            .transition()

            svg
                .selectAll(".tooltip")
                .data([value])
                .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
                .attr("class", "tooltip")
                .text(d => `${period[index]}: ${d.toLocaleString()} ${title}`)
                // .text(d => `${d.toLocaleString()} ${title}`)
                .attr("x", xScale(index) + xScale.bandwidth() / 2 - 80)
                .attr("text-anchor", "middle")
                .transition()
                .attr("y", yScale(value) - 8)
                .attr("opacity", 1);
        })
        .on("mouseleave", function(event, value) {
            select(this)
            .attr("opacity", 1)
            .transition()
            svg.selectAll(".tooltip").remove()
        })
        .style("transform", 'scale(1, -1)')
        .attr('x', (value, index) => xScale(index))
        .attr('y', -dimensions.height)
        .attr('width', xScale.bandwidth())          
        .transition()
        .attr('fill', colorScale)
        .attr('height', val => dimensions.height - yScale(val))

    svg
        .selectAll('.y-axis-label')
        .data([title])
        .join(
            enter => enter.append("text").attr('class', 'y-axis-label')
        )
        .attr("fill", "Navy")//set the fill here
        .attr("transform", "rotate(-90)")
        .attr("y", -55)
        .attr("x", 0 - (dimensions.height / 2) - 48)
        .text(d => d)


  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{marginBottom: "1.5rem", marginLeft: "4rem"}}>
        <svg ref={svgRef} className="detail_svg">
            <g className="x-axis" />
            <g className="y-axis" />
        </svg> 
    </div>
  );
}

export default DetailBarChart