import * as MoodApi from "../lib/api/client"
import { useMoods } from '../lib/hooks/useMoods';
import MoodButton from "./MoodButton";

import './Room.css'

function Room({ name }) {
    const [moods] = useMoods(name);

    const intensityIncreaser = function (mood) {
        return function () {
            MoodApi.increaseMood(name, mood);
        }
    }

    if (!moods) {
        return <div className="Room"></div>;
    }

    return <div className="Room">
        <MoodButton
            text="I'm happy"
            baseColor={{ r: 256, b: 0, g: 256 }}
            intensity={moods.happy}
            increaseIntensity={intensityIncreaser("happy")}
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
            increaseIntensity={intensityIncreaser("angry")}
        />
        <MoodButton
            text="I feel scared"
            baseColor={{ r: 0, b: 0, g: 256 }}
            intensity={moods.scared}
            increaseIntensity={intensityIncreaser("scared")}
        />
    </div>;
}

export default Room;