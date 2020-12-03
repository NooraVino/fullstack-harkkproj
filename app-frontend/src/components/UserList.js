import React, { useState, useEffect } from 'react';
import userService from '../services/user'
import {useHistory} from 'react-router-dom'



const UserList = () => {
  const [users, setUsers] = useState([]);
 const [user, setUser]= useState(null);

 const history = useHistory()

  
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
    history.push('/login')
   
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