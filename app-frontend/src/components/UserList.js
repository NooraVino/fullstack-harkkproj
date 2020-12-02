import React, { useState, useEffect } from 'react';
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
    userService.getUsers().then((response) => {
      setUsers(response)
    })
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    userService.setToken(null)
   
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u =>
          <li key={u.id}>
            {u.username}
          </li>
        )}</ul>

<div><button onClick={() => logout()}>Kirjaudu ulos</button></div>
    </div>
    
  )
}

export default UserList