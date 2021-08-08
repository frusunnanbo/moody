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
    </Router>    
  );
}

function Home({ rooms }) {
  return (
    <div>
      <ul>
        {rooms.map((room) => {
          return <LinkListItem key={ room }roomName={room} />;
        })}
      </ul>
    </div>
  );
}

function LinkListItem({ roomName }) {
  return (
    <li>
      <Link to={"/" + roomName}>{ roomName }</Link>
    </li>
  );
}

export default App;
