import React, {useEffect,useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
  let [name, setName]=useState([]);

  useEffect(() => {
    axios
        .get('http://localhost:5000')
        .then(response => {
          setName(response.data)
        })
  }, []);

  return <div>
                {name}
         </div>

}
export default App;
