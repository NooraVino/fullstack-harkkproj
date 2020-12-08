import React, { useState, useEffect } from 'react';
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const UserList = ({setUser}) => {
  const [users, setUsers] = useState([]);
  //const [user, setUser] = useState(null);

  const history = useHistory()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const userp = JSON.parse(loggedUserJSON)
      setUser(userp)
      userService.setToken(userp.token)
    }
  }, [])

  useEffect(() => {
    userService.getUsers().then((response) => {
      setUsers(response)
    //   if (response)
    //   response.gifts.map(s => console.log(s.name))
     })
  }, [])



  return (
    <div>
      <h1>Users</h1>

      
        {users.map((u) =>(
          <div key={u.id}>
            {u.username}
            {/* <span>{u.gifts.map(s => <div key={s.id+u.id +3}>{s.name} </div>)}</span> */}
          </div>
         
          
        ))}

    
    </div>

  )
}

export default UserList