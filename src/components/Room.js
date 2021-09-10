import { useState, useEffect } from 'react';
import * as MoodApi from "../lib/api/client"
import MoodButton from "./MoodButton";

function Room({ name }) {
    const [moods, updateMoods] = useState({
            happy: 0,
            angry: 0,
            sad: 0,
            scared: 0,
    })
    useEffect(() => {
        const subscriberId = MoodApi.subscribeForMoods(name, updateMoods);
        return () => {
            MoodApi.unsubscribeForMoods(subscriberId)
        };
    }, [name]);

    const intensityIncreaser = function(mood) {
        return function () {
            MoodApi.increaseMood(name, mood, updateMoods);
        }
    }

    return <div className="App"> 
        <MoodButton
            mood="happy"
            text="I'm happy"
            baseColor={{ r: 256, b: 0, g: 256 }}
            intensity={moods.happy}
            increaseIntensity={ intensityIncreaser("happy") }
        />
        <MoodButton
            mood="sad"
            text="I feel sad"
            baseColor={{ r: 0, b: 256, g: 0 }}
            intensity={moods.sad}
            increaseIntensity={intensityIncreaser("sad")}
        />
        <MoodButton
            mood="angry"
            text="I'm angry"
            baseColor={{ r: 256, b: 0, g: 0 }}
            intensity={moods.angry}
            increaseIntensity={ intensityIncreaser("angry") }
        />
        <MoodButton
            mood="scared"
            text="I feel scared"
            baseColor={{ r: 0, b: 0, g: 256 }}
            intensity={moods.scared}
            increaseIntensity={intensityIncreaser("scared")}
        />
    </div>
}

export default Room;