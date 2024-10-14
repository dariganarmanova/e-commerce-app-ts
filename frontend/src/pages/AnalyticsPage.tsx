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

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 10; // radius for the pie chart

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // Clear any previous drawings
    svg.selectAll("*").remove();

    // Prepare the data
    const notSoldCount = response.filter(
      (word) => word.status === "not sold"
    ).length;
    const soldCount = response.filter((word) => word.status === "sold").length;

    const data = [
      { status: "Sold", value: soldCount },
      { status: "Not sold", value: notSoldCount },
    ];

    // Create a pie layout
    const pie = d3
      .pie<{ status: string; value: number }>()
      .value((d) => d.value);

    const arc = d3
      .arc<d3.PieArcDatum<{ status: string; value: number }>>()
      .innerRadius(0) // full pie chart (no inner radius for now)
      .outerRadius(radius); // outer radius for arcs

    const arcs = pie(data);

    // Append 'g' element for the pie chart, centered in the SVG
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create the pie chart arcs
    g.selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => (i === 0 ? "green" : "red"))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  }, [response]);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
};

export default AnalyticsPage;
