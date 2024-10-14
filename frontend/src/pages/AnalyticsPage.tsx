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
  }, [token]);

  useEffect(() => {
    if (!response || response.length === 0) return;

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    const notSoldCount = response.filter(
      (word) => word.status === "not sold"
    ).length;
    const soldCount = response.filter((word) => word.status === "sold").length;

    const data = [
      { status: "Sold", value: soldCount },
      { status: "Not sold", value: notSoldCount },
    ];

    const pie = d3
      .pie<{ status: string; value: number }>()
      .value((d) => d.value)
      .padAngle(0.02);

    const arc = d3
      .arc<d3.PieArcDatum<{ status: string; value: number }>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = pie(data);

    //center the pie chart
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); //centered

    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => (i === 0 ? "#4caf50" : "#f44336"))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .transition()
      .duration(750)
      .ease(d3.easeBounce);

    g.selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(
        (d) =>
          `${d.data.status}: ${((d.data.value / response.length) * 100).toFixed(
            1
          )}%`
      )
      .style("fill", "white")
      .style("font-weight", "bold");

    const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(320, ${i * 20 + 100})`);

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => (i === 0 ? "#4caf50" : "#f44336"));

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text((d) => d.status);
  }, [response]);

  return (
    <div className="textRef">
      <svg ref={ref}></svg>
      <h1>Month: October</h1>
    </div>
  );
};

export default AnalyticsPage;
