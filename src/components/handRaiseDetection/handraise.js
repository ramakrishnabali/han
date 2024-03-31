// 0. Clone gestures repo DONE
// 0. Install packages DONE
// 1. Create new gesture definition DONE
// 2. Import gesture into handpose DONE


///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "../../App.css";
import { drawHand } from "./drawhand";

// import {loveYouGesture} from "../../LoveYou"; 
import {handRaiseGesture,ThumbsUpGesture} from "../gestures/gestures"

///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
import victory from "../../assets/victory.png";
import thumbs_up from "../../assets/thumbs_up.png";
import handRaise from "../../assets/handRaise.png"
///////// NEW STUFF IMPORTS

const HandRaise = ()=> {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const [doubt,setDoubt] = useState("")
  const images = { thumbs_up: thumbs_up, victory: victory,hand_raise:handRaise };
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          // fp.Gestures.ThumbsUpGesture,
          handRaiseGesture,
          ThumbsUpGesture,
          // VictoryGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        // if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        //   console.log(gesture.gestures);

        //   const confidence = gesture.gestures.map(
        //     (prediction) => prediction.confidence
        //   );
        //   const maxConfidence = confidence.indexOf(
        //     Math.max.apply(null, confidence)
        //   );
        //   // console.log(gesture.gestures[maxConfidence].name);
        //   setEmoji(gesture.gestures[maxConfidence].name);
        //   console.log(emoji);
        // }

        const ThumbUp_Threshold = 9.0
        const hand_raise_threshold = 9.0
        // const victory_thresohold = 8.5

        const detetedGesture = gesture.gestures.reduce((detected,prediction) =>{
          // console.log(detected,prediction)
          if(prediction.confidence > detected.confidence){
            return prediction
          }
          return detected;
        },{name:null,confidence:0})

        if (detetedGesture.name === "thumbs_up" && detetedGesture.confidence >= ThumbUp_Threshold){
          console.log(detetedGesture)
          setEmoji(detetedGesture.name);  
        }else if (detetedGesture.name === "hand_raise" && detetedGesture.confidence >= hand_raise_threshold){
          console.log(detetedGesture)
          setEmoji(detetedGesture.name);
          setDoubt("I Have a doubt")
        }
        // else if (detetedGesture.name === "victory" && detetedGesture.confidence >= victory_thresohold){
        //   console.log(detetedGesture)
        //   setEmoji(detetedGesture.name);
        // }
      }else{
        setEmoji(null)
        setDoubt("")
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{runHandpose()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {/* NEW STUFF */}
        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
            alt="somthing went wrong"
          />
        ) : (
          ""
        )}

        {
          doubt && <p
                    style={{
                      position: "absolute",
                      marginLeft: "auto",
                      marginRight: "auto",
                      left: 0,
                      bottom: 500,
                      right: 400,
                      textAlign: "center",
                      height: 100,
                      top:100
                    }}
                    >{doubt}</p>
        }
      </header>
    </div>
  );
}

export default HandRaise;
