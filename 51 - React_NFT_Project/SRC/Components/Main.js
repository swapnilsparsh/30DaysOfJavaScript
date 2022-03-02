import React, { useEffect, useState } from 'react';
import instagramLogo from '../assets/owner/instagram.png'
import twitterLogo from '../assets/owner/twitter.png'
import moreIcon from '../assets/owner/more.png'
import './Main.css'

const Main = ({ selectedPunk, punkListData }) => {
    const [activePunk, setActivePunk] = useState(punkListData[0])

    useEffect(() => {
        setActivePunk(punkListData[selectedPunk])
    },[punkListData, selectedPunk])

  return (
      <div className='main'>
        <div className='mainContent'>
            <div className='punkHighlight'>
                <div className='punkContainer'>
                    <img 
                      className='selectedPunk'
                      src = {activePunk.image_url}
                      alt=''
                      />
                </div>
            </div>
            <div class="balvinder">
              <div className='punkDetails'>
                <div className='title'>{activePunk.name}
                    <span className='itemNumber'>.#{activePunk.token_id}</span>
                </div>
              </div>
              <div className='owner'>
                  <div className='ownerImageContainer'>
                      <img src={activePunk.owner.profile_img_url} alt='' />
              </div>
              <div>
              <div  className='ownerDetails'>
                  <div className='ownerNameandHandle'>{activePunk.owner.address}
                <div className='ownerHandle'>@creativesikh</div>
              </div>
                  <div className='owner link'>
                      <img src={instagramLogo} alt=''/>
                  </div>
                  <div className='owner link'>
                      <img src={twitterLogo} alt=''/>
                  </div>
                  <div className='owner link'>
                      <img src={moreIcon} alt=''/>
                  </div>
                </div>
              </div>
              </div>
            </div>
        </div>
      </div>
  )
}

export default Main