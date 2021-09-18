import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

import * as MoodApi from "./lib/api/client";
import Room from "./components/Room";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    MoodApi.listRooms().then((newRooms) => setRooms(newRooms));
  }, []);

  const defaultRoom = "agileislands";

  return (
    <Router>
      <Switch>
        {rooms.map((room) => {
          return (
            <Route key={room} path={"/" + room}>
              <Room name={room} />
            </Route>
          );
        })}
        <Route path="/rooms">
          <Home rooms={rooms} />
        </Route>
        <Route path="/" exact="true">
          <Redirect to={"/" + defaultRoom} />
        </Route>
      </Switch>
      <Version version={process.env.REACT_APP_GIT_SHA} />
    </Router>
  );
}

const RoomList = styled.div`
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  margin-left: 3rem;
`;

function Home({ rooms }) {
  return (
    <RoomList>
      <h1>Hi there!</h1>
      <p>Please enter a room</p>
      {rooms.map((room) => {
        return <RoomLink key={room} roomName={room} />;
      })}
    </RoomList>
  );
}

const LinkDiv = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  width: 20rem;
  max-width: 100vh;
  background-color: #aed6f1;
  color: #1b4f72;
`;

function RoomLink({ roomName }) {
  return (
    <Link to={"/" + roomName}>
      <LinkDiv>{roomName}</LinkDiv>
    </Link>
  );
}

const VersionDiv = styled.div`
  margin: 0.5em;
  position: absolute;
  bottom: 0;
  right: 0;
`;

function Version({ version }) {
  return <VersionDiv>v{version}</VersionDiv>;
}

export default App;
