import React from 'react';

let users = [{ id: 1, username: "testi", password: "testi" }, { id: 2, username: "testi2", password: "testi2" }]

const UserList = () => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u =>
          <li key={u.id}>
            {u.username}
          </li>
        )}</ul>
    </div>
  )
}

export default UserList