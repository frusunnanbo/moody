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
    const subscriberId = window.setInterval(function () {
        window.fetch(`/api/rooms/${roomName}`)
            .then(response => response.json())
            .then(moods => updateHandler(moods));
    }, 1000);
    return subscriberId;
}

function unsubscribeForMoods(subscriptionId) {
    window.clearInterval(subscriptionId)
}

export { increaseMood, subscribeForMoods, unsubscribeForMoods };