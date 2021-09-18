import styled from "styled-components";

import * as MoodApi from "../lib/api/client";
import { useMoods } from "../lib/hooks/useMoods";
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
    };
  };

  if (!moods) {
    return <RoomDiv></RoomDiv>;
  }

  const relatives = relativeIntensities(moods);
  console.log(relatives);

  return (
    <RoomDiv>
      <MoodButton
        text="I'm happy"
        baseColor={{ r: 256, b: 0, g: 256 }}
        intensity={relatives.happy}
        increaseIntensity={intensityIncreaser("happy")}
      />
      <MoodButton
        text="I feel sad"
        baseColor={{ r: 0, b: 256, g: 0 }}
        intensity={relatives.sad}
        increaseIntensity={intensityIncreaser("sad")}
      />
      <MoodButton
        text="I'm angry"
        baseColor={{ r: 256, b: 0, g: 0 }}
        intensity={relatives.angry}
        increaseIntensity={intensityIncreaser("angry")}
      />
      <MoodButton
        text="I feel scared"
        baseColor={{ r: 0, b: 0, g: 256 }}
        intensity={relatives.scared}
        increaseIntensity={intensityIncreaser("scared")}
      />
    </RoomDiv>
  );
}

function relativeIntensities(moods) {
  const sum = Object.keys(moods).reduce((acc, mood) => acc + moods[mood], 0);
  console.log(sum);
  if (sum === 0) {
    return moods;
  }

  const relativeMoods = {};
  Object.keys(moods).forEach((mood) => {
    relativeMoods[mood] = moods[mood] / sum;
  });
  return relativeMoods;
}

export default Room;
