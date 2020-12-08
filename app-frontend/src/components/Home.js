
import React, { useEffect, useState } from 'react'
import user from '../services/user';
import userService from '../services/user'
import NewGiftForm from './NewGiftForm'

const Home = ({ user, gifts, setGifts }) => {


  return (
    <div>
      hello omasivu
      {user && gifts
        ? <div> <div>{user.username}</div><ul>
          {gifts.map(u =>
            <li key={u.id}>
              <div>{u.name} </div> <div>{u.content}</div> <div><a href={u.url} title={u.url}>{u.url}</a></div>
            </li>
          )}</ul>


          <NewGiftForm user={user} gifts={gifts} setGifts={setGifts} />


        </div>

        : <div>ei käyttäjiä </div>}











    </div>
  )
}

export default Home