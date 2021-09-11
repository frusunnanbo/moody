import * as MoodApi from "../lib/api/client"
import { useMoods } from '../lib/hooks/useMoods';
import MoodButton from "./MoodButton";

import './Room.css'

function Room({ name }) {
    const [moods, updateMoods] = useMoods(name);

    const intensityIncreaser = function (mood) {
        return function () {
            MoodApi.increaseMood(name, mood, updateMoods);
        }
    }

    if (!moods) {
        return <div className="Room"></div>;
    }

    return <div className="Room">
        <MoodButton
            mood="happy"
            text="I'm happy"
            baseColor={{ r: 256, b: 0, g: 256 }}
            intensity={moods.happy}
            increaseIntensity={intensityIncreaser("happy")}
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
            increaseIntensity={intensityIncreaser("angry")}
        />
        <MoodButton
            mood="scared"
            text="I feel scared"
            baseColor={{ r: 0, b: 0, g: 256 }}
            intensity={moods.scared}
            increaseIntensity={intensityIncreaser("scared")}
        />
    </div>;
}

export default Room;