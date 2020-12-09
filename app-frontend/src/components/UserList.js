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
      <h2 className="header">Kaikkien lahjatoiveet:</h2>

      {users.map((user) => (
        <div key={user.id} className="user" >
          <h3 className="header"> {user.username}n toiveet</h3> 
          { <div>{user.gifts.map(gift =>
            <div key={gift.id + user.id} className="gift-item">
              <div className="gift-name"> {gift.name}</div>
              <div className="gift-content"> {gift.content}</div>
              <div className="gift-url">
                    <a href={gift.url} title={gift.url}>{gift.url}</a>
                  </div>
            </div>
          )}</div>
          }
        </div>


      ))}


    </div>

  )
}

export default UserList