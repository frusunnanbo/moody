import React from 'react';
import styled from 'styled-components'

const StyledButton = styled.button`
    height: 100px;
    width: 100px;
`

function MoodButton({ text }) {
    return <StyledButton>{text}</StyledButton>
}

export default MoodButton;