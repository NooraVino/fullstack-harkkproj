import React, { useEffect } from 'react';
import giftService from '../services/gift'
import userService from '../services/user'
import Gift from './Gift'
import { Link } from 'react-router-dom'

const UserList = ({ setPage, users, giftGivers, setUsers, loggedUser }) => {

  useEffect(() => {
    setPage('oma')
  })

  const setGiftGiver = async (gift, giftGiver) => {
    if (!gift.givers.includes(giftGiver.id)) {
      gift.givers = gift.givers.concat(giftGiver.id)
    } else {
      gift.givers = gift.givers.filter(g => g !== giftGiver.id)
    }
    try {
      await giftService.addGiver(gift)
      userService.getUsers().then((response) => {
        setUsers(response.filter(user => user.id !== loggedUser.id))
      })
    } catch (exeption) {
    }
  }

  return (
    <div>
      {users
        ? <div>
          <h2 className="header">Kaikkien lahjatoiveet:</h2>

          {users.map((user) => (

            <div key={user.id} className="user" >
              <h3> <span className="header2">{user.username}n toiveet</span></h3>

              { <div >{user.gifts.map(gift =>
                <div key={gift.id + user.id} className="gift-item">

                  <span className="giftGivers-line">
                    {giftGivers &&
                      giftGivers.filter(g => g.username !== user.username).map(giftGiver => (
                        <div key={gift.id + giftGiver.id}>
                          {loggedUser && loggedUser.id === giftGiver.id
                            ? <Link className={gift.givers.includes(giftGiver.id) ? 'button-togglable-green' : 'button-togglable-grey'} key={gift.id + giftGiver.id} onClick={() => setGiftGiver(gift, giftGiver)}> {giftGiver.username} </Link>
                            : <div className={gift.givers.includes(giftGiver.id) ? 'button-steady-green' : 'button-steady-grey'}> {giftGiver.username}  </div>
                          }
                        </div>
                      ))
                    }
                  </span>
                  <Gift gift={gift} />
                </div>
              )}
              </div>
              }
            </div>
          ))
          }
        </div>

        : <div></div>
      }
    </div>
  )
}

export default UserList