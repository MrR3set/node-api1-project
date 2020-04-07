import React from 'react';

function User(props) {
  return (
    <div className="User" onClick={() => {props.handleDelete(props.user.id)}}>
      <h1>{props.user.name}</h1>
      <p>{props.user.bio}</p>
    </div>
  );
}

export default User;
