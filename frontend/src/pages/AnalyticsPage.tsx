import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import axios from "axios";

interface Status {
  status: "sold" | "not sold";
}

const AnalyticsPage = () => {
  const token = localStorage.getItem("token");
  const [response, setResponse] = useState<Status[]>([]);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5005/statusGet", {
          headers: {
            Authorization: `Bearer: ${token}`,
          },
        });
        if (result) {
          setResponse(result.data);
          console.log(result.data);
        } else {
          console.log("unable to fetch");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  useEffect(() => {
    if (!response || response.length === 0) return;

    const width = 530;
    const height = 530;
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const notSoldCount = response.filter(
      (word) => word.status === "not sold"
    ).length; //not sold length
    const soldCount = response.filter((word) => word.status === "sold").length;
    //sold lentgh

    const data = [
      { status: "Sold", value: soldCount },
      { status: "Not sold", value: notSoldCount },
    ];

    //create a pie layout
    const pie = d3
      .pie<{ status: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ status: string; value: number }>>()
      .innerRadius(0) //full pie chart (no inner radius for now)
      .outerRadius(radius); //outer radius for arcs

    const arcs = pie(data);

    //append 'g' element for the pie chart, centered in the SVG
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    //create the pie chart arcs
    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => (i === 0 ? "green" : "red"))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(450, ${i * 20 + 100})`); // Position the legend

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => (i === 0 ? "green" : "red")); //match colors with pie slices

    //add text to legend
    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text((d) => d.status);
  }, [response]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
};

export default AnalyticsPage;
