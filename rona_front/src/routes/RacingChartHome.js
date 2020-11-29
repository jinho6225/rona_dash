import React, { useEffect, useState, useRef } from "react";
import RacingBarChart from "../components/RacingBarChart";
import useInterval from "../components/useInterval";

const helper = (arr) => {
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
    array.push({
      name: arr[i],
      value: 0,
      color: "#" + randomColor,
    });
  }
  return array;
};

function RacingChartHome() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [confirmedData, setConfirmedData] = useState([]);
  const [deathData, setDeathData] = useState([]);
  const isFirstRender = useRef(true);
  const [dataArr, setDataArr] = useState([]);
  const [deathdataArr, setDeathDataArr] = useState([]);
  const [period, setPeriod] = useState([]);
  const [maxTotal, setMaxTotal] = useState(0);
  const [maxDeathTotal, setMaxDeathTotal] = useState(0);

  const [province, setProvince] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/overview`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataArr(data.list_of_daily_confirmed_record_by_state);
        setDeathDataArr(data.list_of_daily_death_record_by_state);
        setPeriod(data.date_array);
        setMaxTotal(data.max_total_confirmed_count_list);
        setMaxDeathTotal(data.max_total_death_count_list);
        setProvince(data.province_list);
        isFirstRender.current = false;
      });
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      setConfirmedData(helper(province));
      setDeathData(helper(province))
    }
  }, [province]);

  useInterval(() => {
    if (start) {
      let copied = JSON.parse(JSON.stringify(confirmedData));
      let deathCopied = JSON.parse(JSON.stringify(deathData));
      copied.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      deathCopied.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      if (iteration < dataArr.length) {
        for (let i = 0; i < dataArr[iteration].length; i++) {
          copied[i].value = dataArr[iteration][i];
        }
        setConfirmedData(copied);
      }
      if (iteration < deathdataArr.length) {
        for (let i = 0; i < deathdataArr[iteration].length; i++) {
            deathCopied[i].value = deathdataArr[iteration][i];
        }
        setDeathData(deathCopied);
      }
      setIteration(iteration + 1);
      if (iteration === dataArr.length) {
        setStart(!start);
        // setIteration(0);
      }
    }
  }, 200);

  return (
    <div className="container">
      <div className="chart_container">
        <div className="racingChart">
          <h4 className="title" style={{ marginBottom: "0.3rem" }}>
            Total Confirmed by U.S. State
            <span className="date"> (Date: {period[iteration]})</span>
          </h4>
          <RacingBarChart data={confirmedData} maxTotal={maxTotal} unit={'confiremd'} />
        </div>
        <div className="racingChart">
          <h4 className="title" style={{ marginBottom: "0.3rem" }}>
            Total Deaths by U.S. State
            <span className="date"> (Date: {period[iteration]})</span>
          </h4>
          <RacingBarChart data={deathData} maxTotal={maxDeathTotal} unit={'deaths'} />
        </div>
      </div>
      <div className="btn-container">
        <button onClick={() => setStart(!start)}>
            {start ? "Stop the race" : "Start the race!"}
        </button>
        <button onClick={() => {
            setIteration(0)
            setStart(!start)
        }}>
            Restart
        </button>
      </div>
    </div>
  );
}

export default RacingChartHome;
