import {Finger, FingerCurl, FingerDirection} from 'fingerpose'; 

import * as fp from "fingerpose";

export const handRaiseGesture = new fp.GestureDescription("hand_raise")
handRaiseGesture.addCurl(fp.Finger.Thumb,fp.FingerCurl.NoCurl,1.0)

for(let finger of [Finger.Middle, Finger.Ring, Finger.Index,Finger.Pinky]){
    handRaiseGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
    handRaiseGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
}

export const ThumbsUpGesture = new fp.GestureDescription("thumbs_up")
ThumbsUpGesture.addCurl(fp.Finger.Thumb,fp.FingerCurl.NoCurl,1.0)
ThumbsUpGesture.addDirection(fp.Finger.Thumb,fp.FingerDirection.VerticalUp , 1.0)

for(let finger of [Finger.Middle, Finger.Ring, Finger.Index ,Finger.Pinky]){
    ThumbsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ThumbsUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);

}

export const VictoryGesture = new fp.GestureDescription("victory")
VictoryGesture.addCurl(fp.Finger.Thumb,fp.FingerDirection.HalfCurl , 1.0)
VictoryGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp ,0.5)


for(let finger of [fp.Finger.Middle, fp.Finger.Index]){
    VictoryGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
    VictoryGesture.addDirection(finger, fp.FingerDirection.VerticalUp , 1.0);
}

for(let finger of [fp.Finger.Ring, fp.Finger.Pinky]){
    VictoryGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    VictoryGesture.addDirection(finger, fp.FingerDirection.VerticalDown, 0.5);

}