// import React,{ useState } from 'react'

// import './index.css';

// import { stopBroadcast, startBroadcast } from './Functions';

// export default function Audio({socket,onAlert}) {

//   const [isBroadCasting, setIsBroadCasting] = useState(false);

//   const handleBroadcast = () => {
    
//     if(!isBroadCasting){
//         startBroadcast(socket) 
//         onAlert('Audio Broadcast Has started');
//     } else {
//         stopBroadcast();
//         onAlert('Audio Broadcast Has Ended');
//     }

//     setIsBroadCasting(br => !br);
//   }

//   return (
//       <div>
//           <a id="download" className="d-none">Download</a>
//           <button
//               type="button"
//               onClick={ handleBroadcast }
//               className={ `audio_broadcast_btn-${ isBroadCasting === true ? 'started' : 'ended' }` }>
//               <i className="fa fa-microphone fa-3x"></i>
//           </button>
//       </div>
//   )
// }
