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
  }, []);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.attr("width", 500).attr("height", 500);
    svg.selectAll("circle").data();
  }, []);

  return (
    <div>
      <svg ref={ref}></svg>
    </div>
  );
};

export default AnalyticsPage;
