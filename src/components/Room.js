import { useState, useEffect } from 'react';
import * as MoodApi from "../lib/api/client"
import MoodButton from "./MoodButton";

function Room({ name }) {
    const [moods, updateMoods] = useState({
        moods: {
            happy: 0,
            angry: 0,
            sad: 0,
            scared: 0,
    }})
    useEffect(() => {
        function handleMoodChange(moods) {
            updateMoods(moods);
        }
        const subscriberId = MoodApi.subscribeForMoods(name, handleMoodChange);
        return () => {
            MoodApi.unsubscribeForMoods(subscriberId)
        };
    }, [name]);

    const intensityIncreaser = function(mood) {
        return function () {
            updateMoods(MoodApi.increaseMood(name, mood));
        }
    }

    return <div className="App"> 
        <MoodButton
            text="I'm happy"
            baseColor={{ r: 256, b: 0, g: 256 }}
            intensity={moods.happy}
            increaseIntensity={ intensityIncreaser("happy") }
        />
        <MoodButton
            text="I feel sad"
            baseColor={{ r: 0, b: 256, g: 0 }}
            intensity={moods.sad}
            increaseIntensity={intensityIncreaser("sad")}
        />
        <MoodButton
            text="I'm angry"
            baseColor={{ r: 256, b: 0, g: 0 }}
            intensity={moods.angry}
            increaseIntensity={ intensityIncreaser("angry") }
        />
        <MoodButton
            text="I feel scared"
            baseColor={{ r: 0, b: 0, g: 256 }}
            intensity={moods.scared}
            increaseIntensity={intensityIncreaser("scared")}
        />
    </div>
}

export default Room;