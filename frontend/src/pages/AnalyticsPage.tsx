import React, { useState, useEffect, useRef } from "react";
//import * as d3 from "d3";
import axios from "axios";

interface Status {
  status: "sold" | "not sold";
}

const AnalyticsPage = () => {
  const token = localStorage.getItem("token");
  const [response, setResponse] = useState<Status[]>([]);
  const ref = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5005/statusGet", {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });
      if (result) {
        setResponse(result.data);
        console.log(response);
      } else {
        console.log("unable to fetch");
      }
    };
    fetchData();
  }, []);

  return <div></div>;
};

export default AnalyticsPage;
