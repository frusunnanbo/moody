import React from 'react';
import './MoodButton.css';

function MoodButton({ text, baseColor, intensity, increaseIntensity }) {
    
    const backgroundColor = (intensity) => {
        return `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${intensity * 0.01})`;
    }
    return <button
            className="MoodButton"
            onClick={increaseIntensity}
            style={{ backgroundColor: backgroundColor(intensity) }}>
        {text}
    </button>
}

export default MoodButton;