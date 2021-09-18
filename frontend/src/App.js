import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

import * as MoodApi from "./lib/api/client";
import Home from "./components/Home";
import Room from "./components/Room";

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

const VersionDiv = styled.div`
  margin: 0.5em;
  position: absolute;
  bottom: 0;
  right: 0;
`;

function Version() {
  const version = (process.env.REACT_APP_GIT_SHA || "unknown").slice(0, 7);
  return <VersionDiv>v{version}</VersionDiv>;
}

export default App;
