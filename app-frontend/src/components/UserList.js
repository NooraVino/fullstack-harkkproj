import React, { useState, useEffect } from 'react';
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const UserList = ({ setUser, user }) => {
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
    if (user) {
      userService.getUsers().then((response) => {
        setUsers(response.filter(u => u.id !== user.id))
      })
    }
  }, [])


  if (users) {
    console.log(users)
  }
  return (
    <div>
      <h1>Users</h1>

      {users.map((user) => (
        <div key={user.id}>
          <h2>Name</h2>
          {user.username}
          { <div>{user.gifts.map(gift =>
            <div key={gift.id + user.id}>
              <span><p>Lahjatoiveen nimi: {gift.name}</p></span>
              <span><p>lahjatoiveen Url: {gift.url}</p></span>
              <span><p> lahjatoiveen sisältö:  {gift.content}</p></span>
            </div>
          )}</div>
          }
        </div>


      ))}


    </div>

  )
}

export default UserList