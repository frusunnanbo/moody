function listRooms() {
    return window.fetch(`api/rooms/`)
        .then(response => response.json());
}

function increaseMood(roomName, mood, callback) {
    window.fetch(`/api/rooms/${roomName}/increase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood: mood }),
    })
    .then(response => callback(response.json()))
}

function subscribeForMoods(roomName, updateHandler) {
    fetchMoods(roomName).then(moods => updateHandler(moods));
    const subscriberId = window.setInterval(function () {
        fetchMoods(roomName)
            .then(moods => updateHandler(moods));
    }, 1000);
    return subscriberId;
}

function unsubscribeForMoods(subscriptionId) {
    window.clearInterval(subscriptionId)
}

function fetchMoods(roomName) {
    return window.fetch(`/api/rooms/${roomName}`)
        .then(response => response.json());
}

function fetchFeatureFlags(flag, roomName) {
    return Promise.resolve({ "curious-mood": true});
}

export {
    listRooms,
    increaseMood,
    subscribeForMoods,
    unsubscribeForMoods,
    fetchFeatureFlags
};