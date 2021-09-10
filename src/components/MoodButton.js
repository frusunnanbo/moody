import React from 'react';
import './MoodButton.css';

function MoodButton({ mood, text, baseColor, intensity, increaseIntensity }) {
    
    const borderColor = (intensity) => {
        return `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${intensity * 0.01})`;
    }
    return <button
        className={ "MoodButton " + mood }
            onClick={increaseIntensity}
            style={{ borderColor: borderColor(intensity) }}>
        {text}
    </button>
}

export default MoodButton;