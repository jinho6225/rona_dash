import React, { useState, useEffect, useRef } from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

function Today() {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let year = today.getFullYear();
  return `${month}/${date}/${year}`;
}

const colors = {
  "Global": '#ffddc1',
  "US": '#ffab91',
};

function Home() {
  const [world, setWorld] = useState([]);
  const [confirmed, setConfirmed] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [data, setDate] = useState([]);
  const [province, setProvince] = useState([]);


  const today = useRef(Today());
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/overview`)
    // fetch(`https://myungjinho85.pythonanywhere.com/api/overview`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setWorld(data.world_df.count);
        setConfirmed(data.confirmed_global_us)
        setDeaths(data.deaths_global_us)
        setDate(data.state_df.Confirmed)
        setProvince(data.state_df.Province_State)
      });
  }, []);

  return (
    <div className="main_chart_container">
      <div className="barChart1">
        <h4 className="title" style={{ margin: "0.3rem" }}>
          Global Total Case
          <span className="date"> (Date: {today.current})</span>
        </h4>
        <BarChart data={world} />
      </div>
      <div className="pieChart1">
        <h4 className="title" style={{ margin: "0.3rem" }}>
          Confirmed (Global / US)
          <span className="date"> (Date: {today.current})</span>
        </h4>
        <PieChart
          data={confirmed}
          colors={colors}
        />
        <div className="fields" >
            {confirmed.map(key => (
              <div key={key.name}>
                <div key={key.name} className="field">
                  <label htmlFor={key.name} style={{ color: colors[key.name] }}>
                      {key.name}
                  </label>
                </div>
                <div key={key.value} className="field">
                  <label htmlFor={key.value} style={{ color: colors[key.name] }}>
                      {key.value.toLocaleString()}
                  </label>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="pieChart2">
        <h4 className="title" style={{ margin: "0.3rem" }}>
          Deaths (Global / US)
          <span className="date"> (Date: {today.current})</span>
        </h4>
        <PieChart
          data={deaths}
          colors={colors}
        />
        <div className="fields" >
            {deaths.map(key => (
              <div key={key.name}>
                <div key={key.name} className="field">
                  <label htmlFor={key.name} style={{ color: colors[key.name] }}>
                      {key.name}
                  </label>
                </div>
                <div key={key.value} className="field">
                  <label htmlFor={key.value} style={{ color: colors[key.name] }}>
                      {key.value.toLocaleString()}
                  </label>
                </div>
              </div>                 
            ))}
        </div>        
      </div>
      <div className="barChart2">
        <h4 className="title" style={{ margin: "0.3rem" }}>
          Total of Confirmed Case By US State
          <span className="date"> (Date: {today.current})</span>
        </h4>
        <BarChart data={data} province={province}  />
      </div>
    </div>
  );
}
export default Home;
