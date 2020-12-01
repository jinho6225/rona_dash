import React, { useState, useEffect, useRef } from "react";
import BarChart from "../components/BarChart";

function Today() {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let year = today.getFullYear();
  return `${month}/${date}/${year}`;
}

function Home() {
  const [world, setWorld] = useState([]);
  const today = useRef(Today());
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/overview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWorld(data.world_df.count);
      });
  }, []);

  return (
    <div className="main_chart_container">
      <div className="barChart">
        <h4 className="title" style={{ margin: "0.3rem" }}>
          Global Total Case
          <span className="date"> (Date: {today.current})</span>
        </h4>
        <BarChart data={world} />
      </div>
      <div className="pieChart">
        <h4 className="title" style={{ margin: "0.3rem" }}>
          Confirmed (US / Global)
          <span className="date"> (Date: {today.current})</span>
        </h4>
        {/* <PieChart
          data={dataByDate.filter((data) =>
            Object.keys(colors).includes(data.name)
          )}
          colors={colors}
        /> */}
      </div>
    </div>
  );
}
export default Home;
