
import React, { useEffect, useState } from 'react'
import user from '../services/user';
import userService from '../services/user'
import NewGiftForm from './NewGiftForm'

const Home = ({ user, gifts, setGifts, setPage }) => {
  useEffect(()=> {
    setPage('muiden')
  },[])
  return (
    <div className="row">
      <div className="column">
        {user && gifts
          ? <div> 
            <span >
              {gifts.map(u =>
                <div key={u.id} className="gift-item">
                  <div className="gift-name">{u.name} </div>
                  <div className="gift-content">{u.content}</div>
                  <div className="gift-url">
                    <a href={u.url} title={u.url}>{u.url}</a>
                  </div>
                </div>
              )}</span>
          </div>

          : <div>ei käyttäjiä </div>}
      </div>
      <div className="column">
        <NewGiftForm user={user} gifts={gifts} setGifts={setGifts} />
      </div>


    </div>
  )
}

export default Home