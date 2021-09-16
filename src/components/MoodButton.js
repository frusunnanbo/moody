import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    height: 10em;
    width: 10em;
    border-radius: 1em;
    margin: 2em;
    border-width: 1em;
    border-style: solid;
    border-color: ${props => props.borderColor};
    background-color: ${props => props.backgroundColor};

    &:hover {
        background-color: ${props => props.hoverColor};
    }
    &:active {
        background-color: ${props => props.activeColor};
    }
`;

function withAlpha(color, alpha) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function MoodButton({ mood, text, baseColor, intensity, increaseIntensity }) {

    return <StyledButton
        backgroundColor={ withAlpha(baseColor, 0.1) }
        hoverColor={ withAlpha(baseColor, 0.2)}
        activeColor={ withAlpha(baseColor, 0.3)}
        borderColor={ withAlpha(baseColor, intensity * 0.01)}
        onClick={increaseIntensity}
        >
        {text}
    </StyledButton>
}

export default MoodButton;