
const database = {

}

function autoDecreaseMoods(moods) {
    return {
        happy: moods.happy > 0 ? moods.happy - 1 : 0,
        angry: moods.angry > 0 ? moods.angry - 1 : 0,
        sad: moods.sad > 0 ? moods.sad - 1 : 0,
        scared: moods.scared > 0 ? moods.scared - 1 : 1,
    }
}

function increaseMood(roomName, mood) {
    database[roomName][mood] = database[roomName][mood] + 1;
    console.log(database[roomName])
    return database[roomName];
}

function subscribeForMoods(roomName, updateHandler) {
    database[roomName] = {
        happy: 0,
        angry: 0,
        sad: 0,
        scared: 0,
        ...database[roomName]
    }
    const subscriberId = window.setInterval(function () {
        database[roomName] = autoDecreaseMoods(database[roomName]);
        updateHandler(database[roomName]);
    }, 1000);
    return subscriberId;
}

function unsubscribeForMoods(subscriptionId) {
    window.clearInterval(subscriptionId)
}


export { increaseMood, subscribeForMoods, unsubscribeForMoods };