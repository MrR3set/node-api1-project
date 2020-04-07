import React, { useState } from 'react';
import User from "./User";

function UserList(props) {

  const [user,setUser] = useState({
    name:"",
    bio:""
  })
  
  const handleChange = (e) => {
    e.preventDefault();
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addUser(user);
  }


  return (
    <div className="userList-wrapper">
      {props.userList.map(user=>{
        return <User key={user.id} user={user} handleDelete={props.handleDelete}></User>
      })}
      <form onSubmit={handleSubmit} className="addForm">
        <label htmlFor='name'>Name</label>
        <input name='name' onChange={handleChange} value={user.name}/>

        <label htmlFor='bio'>Bio</label>
        <input name='bio' onChange={handleChange} value={user.bio}/>
        <button type='submit'>Add User</button>
      </form>
      
    </div>
  );
}

export default UserList;
