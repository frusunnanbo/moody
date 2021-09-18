import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useState, useEffect } from "react";

import * as MoodApi from "./lib/api/client";
import Home from "./components/Home";
import Room from "./components/Room";
import Version from "./components/Version";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    MoodApi.listRooms().then(setRooms);
  }, []);

  if (rooms.length < 1) {
    return <Router>
      <Version / >
    </Router>
  }

  const defaultRoom = rooms.find((room) => room.defaultRoom);

  return (
    <Router>
      <Switch>
        {rooms.map((room) => {
          return (
            <Route key={room.name} path={"/" + room.name}>
              <Room name={room.name} />
            </Route>
          );
        })}
        <Route path="/rooms">
          <Home rooms={rooms} />
        </Route>
        <Route path="/" exact={true}>
          {defaultRoom ? (
            <Redirect to={"/" + defaultRoom.name} />
          ) : (
            <Redirect to="/rooms" />
          )}
        </Route>
      </Switch>
      <Version />
    </Router>
  );
}

export default App;
