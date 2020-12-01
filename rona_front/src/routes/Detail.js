import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";


function Detail() {
  const [world, setWorld] = useState([]);
  let { state } = useParams();
    console.log(state)
  useEffect(() => {
    // fetch(`http://127.0.0.1:8000/api/overview`)
    //   .then((res) => res.json())
    //   .then((data) => {

  }, []);

  return (
    <div className="detail_chart_container">
        {state}
    </div>
  );
}
export default Detail;