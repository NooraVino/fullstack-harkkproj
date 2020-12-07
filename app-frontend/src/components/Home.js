
import React, {useEffect, useState} from 'react'
import user from '../services/user';
import userService from '../services/user'
import NewGiftForm from './NewGiftForm'

const Home = ({user, setUser}) => {
const [gifts, setGifts] = useState([]);
  
 
  useEffect(() => {
    if (!userService.getToken()) {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        userService.setToken(loggedUser.token)
        setUser(loggedUser)
      }
    } if (user) {
    userService.getOneUser(user.id).then((response) => {
    setUser(response)
    setGifts(response.gifts)
    console.log(response.gifts)
    })}
  
  }, [])
 
  
//console.log({user})
return(
<div>
  hello omasivu
{user
?<div> <ul>
{gifts.map(u =>
  <li key={u.id}>
    <div>{u.name} </div> <div>{u.content}</div> <div><a href={u.url} title={u.url}>{u.url}</a></div>
  </li>
)}</ul>


<NewGiftForm user={user}/>


</div>

:<div>ei käyttäjiä </div> }





  
  
 



</div>
)
}

export default Home