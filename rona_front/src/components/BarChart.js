import React, { useRef, useEffect } from "react";
import { select, axisBottom, scaleLinear, axisLeft, scaleBand, max } from "d3";
import useResizeObserver from "./useResizeObserver";
import { useHistory } from "react-router-dom";


function Barchart({ data, province=false }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef)
  const history = useHistory();

    function handleClick(d, index) {
        if (province) {
            history.push(`/detail/${d[index]}`);
        }
    }  

  useEffect(() => {
    const svg = select(svgRef.current);
    console.log(dimensions)

    if (!dimensions) return;

    //scale
    let padding = province && province.length ? 0.4: 0.5
    const xScale = scaleBand()
        .domain(data.map((value, index) => index))
        .range([0, dimensions.width]) // change
        .padding(padding);

    let maxNum = province && province.length ? max(data)+50000 : max(data)+5000000
    const yScale = scaleLinear()
        .domain([0, maxNum]) //todo
        .range([dimensions.height, 0]); // change

    let color = province && province.length ? ["green", "orange", "red"] : ["red", "green", "orange"]
    const colorScale = scaleLinear()
        .domain([0, maxNum/2, maxNum])
        .range(color)
        .clamp(true);

    //create x-axis
    let xx = province && province.length ? ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Diamond Princess", "District of Columbia", "Florida", "Georgia", "Grand Princess", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] : ['confirmed', "Deaths", "Recovered"]
    const xAxis = axisBottom(xScale)
        .ticks(data.length)
        // .attr("transform",  `translate(10px, 10px) rotate(45deg)`)
        .tickFormat((d, i) => xx[i])

        if (province && province.length) {
            svg
            .select(".x-axis")
            .style("transform", `translateY(${dimensions.height}px) `)
            .call(xAxis)
            .selectAll("text")
            .attr("y", 6)
            .attr("x", -6)
            .attr("dy", ".5em")
            .attr("transform", "rotate(-40)")
            .style("text-anchor", "end");
        } else if (province === false){
            svg
            .select(".x-axis")
            .style("transform", `translateY(${dimensions.height}px) `)
            .call(xAxis)
        }


    //create y-axis
    const yAxis = axisLeft(yScale);
    svg
        .select(".y-axis")
        .style("transform", `0`)
        .call(yAxis);

    if (province && province.length) {
        svg
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .on("mouseenter", function(event, value) {
            const index = svg.selectAll(".bar").nodes().indexOf(this);
            select(this)
            .attr("opacity", 0.3)
            .transition()

            svg
                .selectAll(".tooltip")
                .data([value])
                .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
                .attr("class", "tooltip")
                .text(d => d.toLocaleString())
                .attr("x", xScale(index) + xScale.bandwidth() / 2)
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
        .on("click", function(e, d) {
            const index = svg.selectAll(".bar").nodes().indexOf(this);
            handleClick(province, index);
        })            
        .transition()
        .attr('fill', colorScale)
        .attr('height', val => dimensions.height - yScale(val))

    } else if (province === false){
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
    }

    


  }, [data, dimensions, province]);

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