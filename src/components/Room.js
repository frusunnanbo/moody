import MoodButton from "./MoodButton";

function Room({ name }) {
    return <div className="App">
        <MoodButton text="I'm happy" baseColor={{ r: 256, b: 0, g: 256 }} />
        <MoodButton text="I feel sad" baseColor={{ r: 0, b: 256, g: 0 }} />
        <MoodButton text="I'm angry" baseColor={{ r: 256, b: 0, g: 0 }} />
        <MoodButton text="I feel scared" baseColor={{ r: 0, b: 0, g: 256 }} />
    </div>
}

export default Room;