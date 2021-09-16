import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    height: 10em;
    width: 10em;
    border-radius: 1em;
    margin: 2em;
    border-width: 1px;
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

function MoodButton({ text, baseColor, intensity, increaseIntensity }) {

    return <StyledButton
        backgroundColor={ withAlpha(baseColor, intensity * 0.01) }
        hoverColor={ withAlpha(baseColor, intensity ? intensity * 0.03 : 0.1)}
        activeColor={ withAlpha(baseColor, intensity ? intensity * 0.05 : 0.15)}
        borderColor={ withAlpha(baseColor, 0.4)}
        onClick={increaseIntensity}
        >
        {text}
    </StyledButton>
}

export default MoodButton;