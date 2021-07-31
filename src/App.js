import './App.css';
import MoodButton from './components/MoodButton'

function App() {
  return (
    <div className="App">
      <MoodButton text="I'm happy" />
      <MoodButton text="I feel sad" />
      <MoodButton text="I'm angry" />
      <MoodButton text="I feel scared" />
    </div>
  );
}

export default App;
