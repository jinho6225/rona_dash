import React, { useEffect, useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import "./App.css";


const randomColor = Math.floor(Math.random()*16777215).toString(16);

const helper = (arr) => {
    let array = []
    for (let i = 0; i < arr.length; i++) {
        array.push({
            name: arr[i],
            value: 0,
            color: "#" + randomColor
        })
    }
    return array
}

function App() {
    const [iteration, setIteration] = useState(300);
    const [start, setStart] = useState(false);
    const [data, setData] = useState([]);

    const [dataArr, setDataArr] = useState([])
    const [period, setPeriod] = useState([])
    const [maxTotal, setMaxTotal] = useState(0)
    const [province, setProvince] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/`)
        .then(res => res.json())
        .then(data => {
            setDataArr(data.list_of_daily_confirmed_record_by_state)
            setPeriod(data.date_array)
            setMaxTotal(data.max_total_confirmed_count_list)
            setProvince(data.province_list)
            let resultArr = helper(province)            
            setData(resultArr)
        })
    }, [])

    
    useInterval(() => {
        if (start) {
            console.log(iteration, 'start')

            let resultArr = helper(province)  
            console.log(resultArr)
            if (iteration < dataArr.length) {
                for (let i = 0; i < dataArr[iteration].length; i++) {
                    resultArr[i].value = dataArr[iteration][i]
                }
                setData(resultArr)
                setIteration(iteration + 1);
                console.log(dataArr.length, 'dataArr.length')
                console.log(iteration, 'insde')

            }

            if (iteration === dataArr.length) {
                setStart(!start)
                setIteration(300);
            }
        }
    }, 1000);

    return (
        <>
        <h3 className='title'>Racing Bar Chart</h3>
        <RacingBarChart data={data} maxTotal={maxTotal} />
        <button onClick={() => setStart(!start)}>
            {start ? "Stop the race" : "Start the race!"}
        </button>
        <p className="date">Date: {period[iteration]}</p>
        </>
    );
}

export default App;