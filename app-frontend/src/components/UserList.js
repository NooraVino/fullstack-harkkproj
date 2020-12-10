import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'

const UserList = ({ setPage, users }) => {

  const history = useHistory()

  useEffect(() => {
    setPage('oma')
  })

  return (
    <div>
      {users
        ? <div>
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
        : <div></div>
      }

    </div>

  )
}

export default UserList