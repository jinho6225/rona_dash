import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import DetailBarChart from "../components/DetailBarChart";

function Today() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let year = today.getFullYear();
    return `${month}/${date}/${year}`;
  }

function Detail() {
    const [period, setPeriod] = useState([]);
    const [confirmed, setConfirmed] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const today = useRef(Today());


    let { state } = useParams();
    useEffect(() => {
        // fetch(`http://127.0.0.1:8000/api/detail/${state}`)
        fetch(`https://myungjinho85.pythonanywhere.com/api/detail/${state}`)
        .then((res) => res.json())
        .then((data) => {
            // console.log(data, 'data')
            setPeriod(data.period)
            setConfirmed(data.confirmed)
            setDeaths(data.deaths)
        })
    }, [])

    return (
        <div className="detail_chart_container">
            <div className="detailBarChart">
                <h4 className="title" style={{ margin: "0.3rem" }}>
                {state} Confirmed Total
                <span className="date"> (as of {today.current})</span>
                </h4>
                {confirmed.length ? <DetailBarChart data={confirmed} period={period}/> : null}
            </div>
            <div className="detailBarChart">
                <h4 className="title" style={{ margin: "0.3rem" }}>
                {state} Deaths Total
                <span className="date"> (as of {today.current})</span>
                </h4>
                {deaths.length ? <DetailBarChart data={deaths} opt={true} period={period}/> : null}
            </div>
        </div>
    );
}
export default Detail;