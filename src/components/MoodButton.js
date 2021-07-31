import React, { useState } from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
    height: 100px;
    width: 100px;
`

function MoodButton({ text }) {
    const [intensity, setIntensity] = useState(0);

    const onClick = () => {
        setIntensity(intensity + 1);
    }

    return <StyledButton onClick={onClick}>{text} intensity: { intensity }</StyledButton>
}

export default MoodButton;