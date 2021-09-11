import { useState, useEffect } from 'react';

import { subscribeForMoods, unsubscribeForMoods } from '../api/client';

export const useMoods = (roomName) => {
    const [moods, updateMoods] = useState({
        happy: 0,
        angry: 0,
        sad: 0,
        scared: 0
    })

    useEffect(() => {
        const subscriberId = subscribeForMoods(roomName, updateMoods);
        return () => {
            unsubscribeForMoods(subscriberId)
        };
    }, [roomName]);

    return [moods, updateMoods];
}