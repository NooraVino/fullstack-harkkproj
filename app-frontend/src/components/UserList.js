import React, {useState, useEffect  } from 'react';
import axios from 'axios'


const UserList = () => {
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
  axios
  .get('/api/users')
  .then(response=>{
    setUsers(response.data);
    console.log(users)
  })
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(u =>
          <li key={u.id}>
            {u.username}
          </li>
        )}</ul>
    </div>
  )
}

export default UserList