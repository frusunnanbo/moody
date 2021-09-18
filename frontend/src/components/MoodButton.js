import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  height: 10em;
  width: 10em;
  border-radius: 1em;
  margin: 2em;
  border: none;
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    background-color: ${(props) => props.activeColor};
  }
`;

function withAlpha(color, alpha) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function MoodButton({ text, baseColor, intensity, increaseIntensity }) {
  const minOpacity = 0.1;
  const backgroundOpacity = minOpacity + intensity * 0.4

  return (
    <StyledButton
      backgroundColor={withAlpha(baseColor, backgroundOpacity)}
      hoverColor={withAlpha(baseColor, backgroundOpacity + 0.1)}
      activeColor={withAlpha(baseColor, backgroundOpacity + 0.2)}
      onClick={increaseIntensity}
    >
      {text}
    </StyledButton>
  );
}

export default MoodButton;
