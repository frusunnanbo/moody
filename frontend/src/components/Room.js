import styled from 'styled-components';

import * as MoodApi from "../lib/api/client"
import { useMoods } from '../lib/hooks/useMoods';
import MoodButton from "./MoodButton";


const RoomDiv = styled.div`
  text-align: center;
  min-height: 100vh;  
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  font-size: calc(10px + 2vmin); 
`;

function Room({ name }) {
    const [moods] = useMoods(name);

    const intensityIncreaser = function (mood) {
        return function () {
            MoodApi.increaseMood(name, mood);
        }
    }

    if (!moods) {
        return <RoomDiv></RoomDiv>;
    }

    return <RoomDiv>
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
    </RoomDiv>;
}

export default Room;