import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
        height: 10em;
        width: 10em;
        border-radius: 1em;
        margin: 2em;
`

function MoodButton({ text, baseColor, intensity, increaseIntensity }) {
    
    const backgroundColor = (intensity) => {
        return `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${intensity * 0.01})`;
    }
    return <StyledButton
        onClick={increaseIntensity}
            style={{ backgroundColor: backgroundColor(intensity) }}>
        {text}
    </StyledButton>
}

export default MoodButton;