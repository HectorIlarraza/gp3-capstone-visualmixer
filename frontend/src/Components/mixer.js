import React, { useEffect, useState, useRef } from "react";

/**
 * TO DO:
 * Need to add loading progress and have buttons be disabled until song is loaded
 * Seek bar
 * Make current track time display
 *
 *
 * @param {object} props
 */
const Mixer = props => {
   /**
    * play/pause - boolean state for play/pause toggling
    * playstate - object state for tracking the current play state (e.g. 'playing', 'paused')
    * time - object state for current time of track / total duration of track
    */
   const [playPause, setPlayPause] = useState(false);
   const [playState, setPlayState] = useState({ state: "stopped" });
   const [time, setTime] = useState({ current: 0, duration: 0 });
   const [loading, setLoading] = useState(true);
   const [firstLoad, setFirstLoad] = useState(true);
   const [fx, setFx] = useState(() => {
      return (
      {
         delay: {
            time: 0,
            feedback: .2,
            dry: .2,
            wet: 1,
         },
         compressor: {
            threshold: -50,
            ratio: 10,
            attack: .02,
            release: 1,
         }
      });
   });

   //Refs for time display
   const timer = useRef();
   const timeStart = useRef();

   //Refs for audio node and decoded audio array
   const track = useRef();
   const decodedAudio = useRef(false);

   //Refs for context elements
   const ctx = useRef();
   const canvasCtx = useRef();

   //Refs for delay nodes
   const delayNode = useRef();
   const feedbackNode = useRef();
   const dryNode = useRef();
   const wetNode = useRef();
   const delayOutNode = useRef();

   //Refs for EQ nodes
   const band1 = useRef();

   //Ref for Compressor node
   const compressorNode = useRef();

   //trigger song fetch after a user interaction has occurred
   useEffect(() => {
      if (!props.showSplash) {
         //Create audio context and canvas context
         ctx.current = new (window.AudioContext || window.webkitAudioContext)();
         timeStart.current = Date.now();

         //Create Delay Nodes
         delayNode.current = ctx.current.createDelay();
         feedbackNode.current = ctx.current.createGain();
         dryNode.current = ctx.current.createGain();
         wetNode.current = ctx.current.createGain();
         delayOutNode.current = ctx.current.createGain();

         // //Create Analyser Node
         // const analyser = ctx.createAnalyser();

         // //Create Filter Nodes
         // const eqLowPass = ctx.createBiquadFilter();
         // const eqBand2 =  ctx.createBiquadFilter();
         // const eqBand3 =  ctx.createBiquadFilter();
         // const eqBand4 =  ctx.createBiquadFilter();
         // const eqHighPass = ctx.createBiquadFilter();

         // //Create Compressor Node
         compressorNode.current = ctx.current.createDynamicsCompressor();
 
         //Fetch Song from Server and decode audio for playback
         fetch("http://www.shawnfaber.com/audio/01%20Packt%20Like%20Sardines%20In%20A%20Crushd%20Tin%20Box.flac")
            .then((data) => {
               console.log (data);
               return data.arrayBuffer();
            })
            .then(arrayBuffer => {
               console.log(arrayBuffer);
               return ctx.current.decodeAudioData(arrayBuffer)
            })
            .then(decodedAudio => {
               console.log (decodedAudio);
               createTrackNode(decodedAudio)
            })
            .catch(err => console.log(err));
      }
   }, [props.showSplash]);

   /**
    * Creates a track node from decoded audio
    * @param {array} audio - decoded audio from fetch
    */
   const createTrackNode = audio => {
      //store decoded audio in ref for future use
      if (!decodedAudio.current) decodedAudio.current = audio;

      //create a new audio source from decoded audio
      track.current = ctx.current.createBufferSource();
      track.current.buffer = decodedAudio.current;

      //intialize time state, set loading state
      setTime({ current: 0, duration: track.current.buffer.duration });
      setLoading(false);
      
      connectNodes();
   };
   
   const connectNodes = () => {
      // delay path dry signal
      track.current.connect(dryNode.current);
      dryNode.current.connect(delayOutNode.current);

      //delay path wet signal
      track.current.connect(delayNode.current);
      delayNode.current.connect(feedbackNode.current);
      feedbackNode.current.connect(delayNode.current);
      delayNode.current.connect(wetNode.current);
      wetNode.current.connect(delayOutNode.current);

      //delay output
      delayOutNode.current.connect(compressorNode.current);

      //compressor path
      compressorNode.current.connect(ctx.current.destination);

   }

   //SET FX settings
   useEffect(() => {
      if (!loading) {
         //Set Delay settings
         delayNode.current.delayTime.value = fx.delay.time;
         feedbackNode.current.gain.value = fx.delay.feedback;
         dryNode.current.gain.value = fx.delay.dry;
         wetNode.current.gain.value = fx.delay.wet;

         //Set compressor settings
         compressorNode.current.threshold.value = fx.compressor.threshold;
         compressorNode.current.ratio.value = fx.compressor.ratio;
         compressorNode.current.attack.value = fx.compressor.attack;
         compressorNode.current.release.value = fx.compressor.release;

      }
   }, [loading, firstLoad, fx])

   
   // CHANGE FX SETTINGS HANDLERS
   const setDelayTime = (e) => {
      setFx(prev => {
         return {
            ...prev,
            delay: {
               time: e.target.valueAsNumber,
               feedback: prev.delay.feedback,
               dry: prev.delay.dry,
               wet: prev.delay.wet,
            },
         }
      })
   }

   //handles start and stop of timer
   const startTimer = () => {
      timer.current = setInterval(() => {
         console.log (ctx.current.currentTime);
         setTime(prev => {
            return {
               ...prev,
               current: ctx.current.currentTime,
            };
         });
      }, 50);
   };
   const stopTimer = () => {
      clearInterval(timer.current);
   };

   //Transport control click handlers
   const handlePlayPause = () => {
      if (playState.state === "stopped") {
         track.current.start(ctx.current.currentTime);
         startTimer();
         setPlayState({ state: "playing" });
      } else if (playState.state === "playing") {
         ctx.current.suspend();
         setPlayState({ state: "paused" });
      } else if (playState.state === "paused") {
         ctx.current.resume();
         setPlayState({ state: "playing" });
      }
      setPlayPause(prev => !prev);
   };

   const handleStop = () => {
      track.current.stop(0);
      setPlayState({ state: "stopped" });
      setPlayPause(false);
      setTime(p => {
         return {
            ...p,
            current: 0,
         }
      })
      stopTimer();
      createTrackNode(decodedAudio.current);
   };

   return (
      <>
         {loading && <h1>Loading Please Wait...</h1>}
         {!loading && (
            <div id="mainMixerContainer">
               <h1>MIXER</h1>
               <button onClick={handlePlayPause}>
                  {playPause ? "Pause" : "Play"}
               </button>
               <button onClick={handleStop}>Stop</button>
               <div>{`${time.current.toFixed(2)} / ${time.duration.toFixed(2)}`}</div>
               <input type="range" min='0' max={time.duration} step='1' value={time.current} />
               <br />
               <label>Delay Time {(fx.delay.time * 1000)}ms</label>
               <input type="range" min='0' max='1' step='.01' value={fx.delay.time} onChange={setDelayTime} />
            </div>
         )}
      </>
   );
};

export { Mixer };
