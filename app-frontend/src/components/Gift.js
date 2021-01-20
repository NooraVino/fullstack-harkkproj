import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Gift = ({ gift }) => {
  const [loginVisible, setLoginVisible] = useState(true)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const change = () => {
    if (loginVisible) {
      setLoginVisible(false)
    } else {
      setLoginVisible(true)
    }
  }


  return (
    <div>
      {loginVisible 
       ? <div>
          <div className="gift-name"> {gift.name}
          <Link className="show-more-link" onClick={() => setLoginVisible(false)}><i className="arrow right"></i></Link>
        </div>
        </div>
      :<div>
      <div className="gift-name"> {gift.name}
      <Link className="show-less-link" onClick={() => setLoginVisible(true)}><i className="arrow down"></i></Link>
      </div>
      <div className="gift-content"> {gift.content}</div>
      <div className="gift-url">
        <a style={{ display: "table-cell" }} href={gift.url} target="_blank" rel="noopener noreferrer">{gift.url}</a>
      </div>
</div>
      }
    </div>
  )
}
export default Gift