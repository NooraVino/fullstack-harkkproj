
import React, { useEffect } from 'react'
import NewGiftForm from './NewGiftForm'



const Home = ({ user, gifts, setGifts, setPage }) => {

  useEffect(() => {
    setPage('muiden')
  }, [])

  return (
    <div className="row">
      <h2 className="header"> Omat lahjatoiveeni:</h2>
      <div className="column">

        {user && gifts
          ? <div className="scroller">
            <span >
              {gifts.map(g =>
                <div key={g.id} className="gift-item">
                  <div className="gift-name">{g.name} </div>
                  <div className="gift-content">{g.content}</div>
                  <div className="gift-url">
                    <a style={{ display: "table-cell" }} href={g.url} target="_blank" rel="noopener noreferrer">{g.url}</a>
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