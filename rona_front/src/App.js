import React, { useState, useEffect }  from 'react';
import './App.css';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function App() {
  const [taskList, setTaskList] = useState([])

  const todoList = () => {
    let URL = `http://127.0.0.1:8000/api/`
    fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    });
  }

  useEffect(() => {
    todoList()
  },[]);

  return (
    <div className="container">

    </div>
  );
}

export default App;