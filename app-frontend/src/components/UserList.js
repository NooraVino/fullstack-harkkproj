import React, { useState, useEffect } from 'react';
import axios from 'axios'
import userService from '../services/user'

const UserList = () => {
  const [users, setUsers] = useState([]);
 const [user, setUser]= useState(null);

  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    console.log("jsjss")
    userService.getUsers().then((response) => {
      setUsers(response)
    })
  }, [])

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