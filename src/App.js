import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import * as MoodApi from "./lib/api/client"
import Room from './components/Room';
import { useState, useEffect } from "react";

function App() {
  const [rooms, setRooms] = useState([]);
  
  useEffect(() => {
    MoodApi.listRooms()
      .then(newRooms => setRooms(newRooms));
  }, []);

  return (
    <Router>
      <Switch>
        {rooms.map((room) => {
          return (
            <Route key={ room } path={"/" + room}>
              <Room name={ room } />
            </Route>
          );
        }) }
        <Route path="/">
          <Home rooms={ rooms }/>
        </Route>
      </Switch>
      <div className="Version">
        v{process.env.REACT_APP_GIT_SHA}
      </div>
    </Router>    
  );
}

function Home({ rooms }) {
  return (
    <div className="RoomList">
      <h1>Hi there!</h1>
      <p>Please enter a room</p>
        {rooms.map((room) => {
          return <RoomLink key={ room } roomName={room} />;
        })}
    </div>
  );
}

function RoomLink({ roomName }) {
  return (
    <div className="RoomLink">
      <Link to={"/" + roomName}>{ roomName }</Link>
    </div>
  );
}

export default App;
