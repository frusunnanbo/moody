import React, { useState } from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
        height: 100px;
        width: 100px;
        border-radius: 10px;
        margin: 20px; 
`

function MoodButton({ text, baseColor }) {
    const [intensity, setIntensity] = useState(0);

    const increaseIntensity = () => {
        setIntensity(intensity + 1);
    }

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