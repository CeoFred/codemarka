import React,{ useState } from 'react'

import './index.css';

import { stopBroadcast, startBroadcast } from './Functions';

export default function Audio({socket}) {

  const [isBroadCasting, setIsBroadCasting] = useState(false);

  const handleBroadcast = () => {
    
    if(!isBroadCasting){
      function hasGetUserMedia() {
          return !!(
              navigator.mediaDevices && navigator.mediaDevices.getUserMedia
          )
      }

      if (hasGetUserMedia()) {
          console.log('Good to go!');
          const constraints = {
              video: false,
              audio: true
          }
          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
              console.log(stream)
          }).catch(err => {
            console.log(err);
          })
      } else {
          alert('getUserMedia() is not supported by your browser')
      }
    }
    setIsBroadCasting(br => !br);

  }

  return (
      <div>
          <button
              type="button"
              onClick={ handleBroadcast }
              className={ `audio_broadcast_btn-${ isBroadCasting === true ? 'started' : 'ended' }` }>
              <i className="fa fa-microphone fa-3x"></i>
          </button>
      </div>
  )
}
