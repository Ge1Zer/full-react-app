import React, { useState} from 'react';
import FormData from 'form-data'

import './App.css';
import axios from "axios";
import {BrowserRouter} from "react-router-dom";

function App() {
  let [file, setFile]=useState('');
  let [fileName, setFileName]=useState('Choose File');
  let [uploader, setUploader]=useState({});

  const onChange= e =>{
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
  };

const _handleSubmit= async e=> {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post('/save', formData, {
            headers: {'Content-Type': "multipart/form-data"}
        });
        const {fileName, filePath} = res.data
        setUploader({fileName, filePath})
    } catch (err) {
        if (err.response.status === 500) {
            console.log('there')
        } else {
            console.log(err.response.data.msg)
        }
    }
};

return (<BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <form onSubmit={_handleSubmit}>

                    <input type="file" name="file" onChange={ onChange }/>
                    <label type={'submit'} onClick={_handleSubmit} >{fileName}</label>

                    <input type={'submit'} value={'UpLoad'}/>

                </form>
                <div>
                    <img src={uploader.filePath} alt="Pic"/>
                </div>
            </div>
        </BrowserRouter>
)
}export default App;