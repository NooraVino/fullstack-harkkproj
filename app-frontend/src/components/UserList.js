import React, { useState, useEffect } from 'react';
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const UserList = ({setUser ,user}) => {
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
    if(user){
    userService.getUsers().then((response) => {
      //setUsers(response)
      //console.log(users)
      setUsers(response.filter(u=> u.id !== user.id))
    //   if (response)
    //   response.gifts.map(s => console.log(s.name))
    })
  }}, [])


if (users){
  console.log(users)
}
  return (
    <div>
      <h1>Users</h1>

      
        {users.map((u) =>(
          <div key={u.id}>
            <h2>Name</h2>
            {u.username}
            
            { <div>{u.gifts.map(s => <div key={s.id+u.id}><h3>Lahjatoiveen nimi</h3>{s.name} <div>lahjatoiveen Url</div>{s.url}</div> )}</div> }
          </div>
         
          
        ))}

    
    </div>

  )
}

export default UserList