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
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/main">
          <Room name="main" />
        </Route>
        <Route path="/agileislands">
          <Room name="agileislands" />
        </Route>
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
        {rooms.map((room, i) => {
          return <LinkListItem roomName={room} />;
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
