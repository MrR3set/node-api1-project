import React, { useState, useEffect } from 'react';
import UserList from "./components/UserList"
import axios from "axios";
import './App.css';

function App() {

  const [data,setdata] = useState([])

  const addUser = (user) => {
    console.log("adding",user);
    axios.post(`http://localhost:5000/api/users/`,user)
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`).then(res=>{
      setdata(res.data);
    })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/users").then(res=>{
      setdata(res.data);
  })},[addUser,handleDelete])
  





  return (
    <div className="App">
      <h1>user list</h1>
      <UserList userList={data} handleDelete={handleDelete} addUser={addUser}></UserList>
    </div>
  );
}

export default App;
