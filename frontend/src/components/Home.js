import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RoomList = styled.div`
  min-height: 100vh;
  font-size: calc(10px + 2vmin);
  margin-left: 3rem;
`;

function Home({ rooms }) {
  const visibleRooms = rooms.filter((room) => !room.hidden);
  return (
    <RoomList>
      <h1>Hi there!</h1>
      <p>Please enter a room</p>
      {visibleRooms.map((room) => {
        return <RoomLink key={room.name} roomName={room.name} />;
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

export default Home;
