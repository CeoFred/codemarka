let mediaRecorder
let context;
let processor;
let hasStartedBroadcast = false;
          
export const startBroadcast = (socket ) => {
function hasGetUserMedia() {
          return !!(
              navigator.mediaDevices && navigator.mediaDevices.getUserMedia
          )
      }

      if (hasGetUserMedia()) {
        const { RTCPeerConnection, RTCSessionDescription } = window;
          console.log('Good to go!');
          
          const constraints = {
              video: true,
              audio: false
          }

          navigator.mediaDevices.getUserMedia(constraints).then(stream => {
            
            const recordedChunks = [];
              const localVideo = document.getElementById('local-video')
              if (localVideo) {
                  localVideo.srcObject = stream
                  console.log(stream);
              }

            // context = new AudioContext();

            // const source = context.createMediaStreamSource(stream);
            // processor = context.createScriptProcessor(1024, 1, 1);
            // source.connect(processor);
            // processor.connect(context.destination);
            // hasStartedBroadcast = true;
            // processor.onaudioprocess = function(e) {
                // console.log(e.inputBuffer);
                // const left = e.inputBuffer.getChannelData(0);
                // String.fromCharCode.apply(null, new Uint16Array(e.inputBuffer));
                
            //     if (socket.connected) {
            //         socket.emit(
            //             'Audio_Broadcast_Data',
            //             String.fromCharCode.apply(
            //                 null,
            //                 new Uint16Array(e.inputBuffer.getChannelData(0))
            //             )
            //         )
            //     }  
            // }
            mediaRecorder = new MediaRecorder(stream,{mimeType: 'audio/webm'});

            mediaRecorder.addEventListener('dataavailable',function(e) {
              if(e.data.size > 0){
                recordedChunks.push(e.data);
              }
            });

            mediaRecorder.addEventListener('stop', function() {
            const a =  document.querySelector('#download');
            a.href = URL.createObjectURL(new Blob(recordedChunks));
            a.download = 'file.mp4';
            a.click();
            });

            mediaRecorder.start()

          }).catch(err => {
            console.log(err);
          })

  } else {
          alert('getUserMedia() is not supported by your browser')
      }
}
export const stopBroadcast = () => {
  if(hasStartedBroadcast){
    console.log('total broadcast time is',processor.context.currentTime)
    processor.context.close();
    mediaRecorder.stop();
    hasStartedBroadcast = false;
  }
}